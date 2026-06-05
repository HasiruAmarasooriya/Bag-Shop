import { getAdminDb, admin } from "./firebase-admin";
import { slugify } from "./utils";

const Timestamp = admin.firestore.Timestamp;

function isTimestamp(value: unknown): value is { toDate: () => Date } {
  return (
    value !== null &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof (value as { toDate: unknown }).toDate === "function"
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serializeDoc(id: string, data: Record<string, any>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = { _id: id };
  for (const [key, value] of Object.entries(data)) {
    if (isTimestamp(value)) {
      result[key] = value.toDate().toISOString();
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = serializeNested(value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }
  return result;
}

function serializeNested(obj: Record<string, unknown>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (isTimestamp(value)) {
      result[key] = value.toDate().toISOString();
    } else {
      result[key] = value;
    }
  }
  return result;
}

const now = () => Timestamp.now();

// ─── Users ───────────────────────────────────────────────────────────────────

export async function getUserByEmail(email: string) {
  const db = getAdminDb();
  const snap = await db.collection("users").where("email", "==", email).get();
  if (snap.empty) return null;
  const d = snap.docs[0];
  return serializeDoc(d.id, d.data());
}

export async function getUserById(id: string) {
  const db = getAdminDb();
  const snap = await db.collection("users").doc(id).get();
  if (!snap.exists) return null;
  return serializeDoc(snap.id, snap.data()!);
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) {
  const db = getAdminDb();
  const ref = await db.collection("users").add({
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role || "user",
    wishlist: [],
    createdAt: now(),
    updatedAt: now(),
  });
  const snap = await ref.get();
  return serializeDoc(ref.id, snap.data()!);
}

export async function updateUser(id: string, data: Record<string, unknown>) {
  const db = getAdminDb();
  await db.collection("users").doc(id).update({ ...data, updatedAt: now() });
  return getUserById(id);
}

export async function getAllUsers() {
  const db = getAdminDb();
  const snap = await db.collection("users").get();
  const users = snap.docs.map((d) => {
    const user = serializeDoc(d.id, d.data());
    delete user.password;
    return user;
  });
  users.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return users;
}

export async function countUsers(role?: string) {
  const db = getAdminDb();
  const snap = await db.collection("users").get();
  if (!role) return snap.size;
  return snap.docs.filter((d) => d.data().role === role).length;
}

export async function getWishlistProducts(userId: string) {
  const user = await getUserById(userId);
  if (!user?.wishlist?.length) return [];
  const products = await Promise.all(
    (user.wishlist as string[]).map((id) => getProductById(id))
  );
  return products.filter(Boolean);
}

export async function toggleWishlist(userId: string, productId: string) {
  const user = await getUserById(userId);
  if (!user) return null;

  const wishlist: string[] = [...(user.wishlist || [])];
  const index = wishlist.indexOf(productId);
  if (index > -1) wishlist.splice(index, 1);
  else wishlist.push(productId);

  const db = getAdminDb();
  await db.collection("users").doc(userId).update({ wishlist, updatedAt: now() });
  return wishlist;
}

// ─── Products ────────────────────────────────────────────────────────────────

export async function getProducts(
  opts: {
    category?: string;
    featured?: boolean;
    search?: string;
    sort?: string;
    limitCount?: number;
  } = {}
) {
  const db = getAdminDb();
  let query: FirebaseFirestore.Query = db.collection("products");

  if (opts.category) {
    query = query.where("category", "==", opts.category);
  } else if (opts.featured) {
    query = query.where("featured", "==", true);
  }

  const snap = await query.get();
  let products = snap.docs.map((d) => serializeDoc(d.id, d.data()));

  products.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (opts.search) {
    const term = opts.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.tags?.some((t: string) => t.toLowerCase().includes(term))
    );
  }

  if (opts.sort === "price-asc") products.sort((a, b) => a.price - b.price);
  else if (opts.sort === "price-desc")
    products.sort((a, b) => b.price - a.price);
  else if (opts.sort === "rating")
    products.sort((a, b) => b.rating - a.rating);

  if (opts.limitCount) products = products.slice(0, opts.limitCount);
  return products;
}

export async function getProductById(id: string) {
  const db = getAdminDb();
  const snap = await db.collection("products").doc(id).get();
  if (!snap.exists) return null;
  return serializeDoc(snap.id, snap.data()!);
}

export async function getProductBySlug(slug: string) {
  const db = getAdminDb();
  const snap = await db.collection("products").where("slug", "==", slug).get();
  if (snap.empty) return null;
  const d = snap.docs[0];
  return serializeDoc(d.id, d.data());
}

export async function getProductByIdOrSlug(idOrSlug: string) {
  const byId = await getProductById(idOrSlug);
  if (byId) return byId;
  return getProductBySlug(idOrSlug);
}

export async function createProduct(data: Record<string, unknown>) {
  const db = getAdminDb();
  const slug = (data.slug as string) || slugify(data.name as string);
  const ref = await db.collection("products").add({
    ...data,
    slug,
    rating: data.rating ?? 0,
    reviewCount: data.reviewCount ?? 0,
    createdAt: now(),
    updatedAt: now(),
  });
  const snap = await ref.get();
  return serializeDoc(ref.id, snap.data()!);
}

export async function updateProduct(id: string, data: Record<string, unknown>) {
  const db = getAdminDb();
  await db.collection("products").doc(id).update({ ...data, updatedAt: now() });
  return getProductById(id);
}

export async function deleteProduct(id: string) {
  const db = getAdminDb();
  await db.collection("products").doc(id).delete();
}

export async function countProducts() {
  const db = getAdminDb();
  const snap = await db.collection("products").get();
  return snap.size;
}

export async function decrementStock(productId: string, quantity: number) {
  const product = await getProductById(productId);
  if (!product) return;
  const db = getAdminDb();
  await db.collection("products").doc(productId).update({
    stock: product.stock - quantity,
    updatedAt: now(),
  });
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export async function getOrders(userId?: string) {
  const db = getAdminDb();
  const query = userId
    ? db.collection("orders").where("userId", "==", userId)
    : db.collection("orders");

  const snap = await query.get();
  const orders = await Promise.all(
    snap.docs.map(async (d) => {
      const order = serializeDoc(d.id, d.data());
      const user = await getUserById(order.userId);
      if (user) {
        order.userId = { _id: user._id, name: user.name, email: user.email };
      }
      return order;
    })
  );
  orders.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return orders;
}

export async function createOrder(data: {
  userId: string;
  items: unknown[];
  total: number;
  shippingAddress: unknown;
  paymentMethod: string;
}) {
  const db = getAdminDb();
  const ref = await db.collection("orders").add({
    ...data,
    status: "pending",
    createdAt: now(),
    updatedAt: now(),
  });
  const snap = await ref.get();
  return serializeDoc(ref.id, snap.data()!);
}

export async function updateOrderStatus(id: string, status: string) {
  const db = getAdminDb();
  await db.collection("orders").doc(id).update({ status, updatedAt: now() });
  const snap = await db.collection("orders").doc(id).get();
  return serializeDoc(snap.id, snap.data()!);
}

export async function countOrders() {
  const db = getAdminDb();
  const snap = await db.collection("orders").get();
  return snap.size;
}

export async function getTotalRevenue() {
  const db = getAdminDb();
  const snap = await db.collection("orders").get();
  return snap.docs
    .filter((d) => d.data().status !== "cancelled")
    .reduce((sum, d) => sum + (d.data().total || 0), 0);
}

export async function getRecentOrders(count = 5) {
  const db = getAdminDb();
  const snap = await db.collection("orders").get();
  const orders = await Promise.all(
    snap.docs.map(async (d) => {
      const order = serializeDoc(d.id, d.data());
      const user = await getUserById(order.userId);
      if (user) {
        order.userId = { _id: user._id, name: user.name, email: user.email };
      }
      return order;
    })
  );
  orders.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return orders.slice(0, count);
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function getCategories() {
  const db = getAdminDb();
  const snap = await db.collection("categories").get();
  return snap.docs.map((d) => serializeDoc(d.id, d.data()));
}

export async function createCategory(data: {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
}) {
  const db = getAdminDb();
  const slug = data.slug || slugify(data.name);
  const ref = await db.collection("categories").add({ ...data, slug });
  const snap = await ref.get();
  return serializeDoc(ref.id, snap.data()!);
}

export async function updateCategory(
  id: string,
  data: Partial<{ name: string; slug: string; description: string; image: string }>
) {
  const db = getAdminDb();
  await db.collection("categories").doc(id).update(data);
  const snap = await db.collection("categories").doc(id).get();
  return serializeDoc(id, snap.data()!);
}

export async function getCategoryById(id: string) {
  const db = getAdminDb();
  const snap = await db.collection("categories").doc(id).get();
  if (!snap.exists) return null;
  return serializeDoc(id, snap.data()!);
}

export async function seedCategories(
  categories: { name: string; slug: string; description?: string }[]
) {
  const db = getAdminDb();
  const batch = db.batch();
  const existing = await db.collection("categories").get();
  existing.docs.forEach((d) => batch.delete(d.ref));
  categories.forEach((cat) => {
    const ref = db.collection("categories").doc();
    batch.set(ref, cat);
  });
  await batch.commit();
}

export async function seedProducts(products: Record<string, unknown>[]) {
  const db = getAdminDb();
  const batch = db.batch();
  products.forEach((product) => {
    const ref = db.collection("products").doc();
    batch.set(ref, {
      ...product,
      rating: product.rating ?? 0,
      reviewCount: product.reviewCount ?? 0,
      createdAt: now(),
      updatedAt: now(),
    });
  });
  await batch.commit();
}

export async function isDatabaseSeeded() {
  const db = getAdminDb();
  const snap = await db.collection("products").limit(1).get();
  return !snap.empty;
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

export async function getGalleryItems() {
  const db = getAdminDb();
  const snap = await db.collection("gallery").get();
  const items = snap.docs.map((d) => serializeDoc(d.id, d.data()));
  items.sort(
    (a, b) =>
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );
  return items;
}

export async function createGalleryItem(data: {
  title: string;
  category: string;
  image: string;
  span?: string;
}) {
  const db = getAdminDb();
  const ref = await db.collection("gallery").add({
    ...data,
    span: data.span || "normal",
    createdAt: now(),
  });
  const snap = await ref.get();
  return serializeDoc(ref.id, snap.data()!);
}

export async function updateGalleryItem(
  id: string,
  data: Partial<{ title: string; category: string; image: string; span: string }>
) {
  const db = getAdminDb();
  await db.collection("gallery").doc(id).update(data);
  const snap = await db.collection("gallery").doc(id).get();
  return serializeDoc(id, snap.data()!);
}

export async function deleteGalleryItem(id: string) {
  const db = getAdminDb();
  await db.collection("gallery").doc(id).delete();
}
