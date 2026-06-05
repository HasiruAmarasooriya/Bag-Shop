import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  isDatabaseSeeded,
  seedCategories,
  seedProducts,
  getUserByEmail,
  createUser,
} from "@/lib/db";

const categories = [
  { name: "Handbags", slug: "handbags", description: "Elegant handbags for every occasion" },
  { name: "Tote Bags", slug: "tote-bags", description: "Spacious and stylish tote bags" },
  { name: "Crossbody", slug: "crossbody", description: "Compact crossbody bags" },
  { name: "Clutches", slug: "clutches", description: "Evening clutches and purses" },
  { name: "Backpacks", slug: "backpacks", description: "Fashion-forward backpacks" },
];

const products = [
  {
    name: "Rose Gold Elegance Tote",
    slug: "rose-gold-elegance-tote",
    description: "A stunning rose gold tote bag crafted with premium faux leather. Features spacious interior, gold-tone hardware, and a detachable shoulder strap. Perfect for work or weekend outings.",
    price: 12500,
    comparePrice: 15000,
    images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"],
    category: "Tote Bags",
    tags: ["tote", "rose gold", "elegant"],
    stock: 25,
    featured: true,
    rating: 4.8,
    reviewCount: 42,
    colors: ["Rose Gold", "Black", "Cream"],
    sizes: ["Medium", "Large"],
  },
  {
    name: "Midnight Luxe Crossbody",
    slug: "midnight-luxe-crossbody",
    description: "Sophisticated black crossbody with chain strap detail. Compact yet functional with multiple compartments for your essentials.",
    price: 8900,
    comparePrice: 11000,
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"],
    category: "Crossbody",
    tags: ["crossbody", "black", "chain"],
    stock: 30,
    featured: true,
    rating: 4.6,
    reviewCount: 28,
    colors: ["Black", "Burgundy"],
    sizes: ["Small"],
  },
  {
    name: "Cream Pearl Clutch",
    slug: "cream-pearl-clutch",
    description: "Exquisite cream clutch adorned with pearl embellishments. The perfect companion for weddings and formal events.",
    price: 6500,
    images: ["https://images.unsplash.com/photo-1564422170009-03b1c0e0e0e0?w=800&q=80"],
    category: "Clutches",
    tags: ["clutch", "pearl", "evening"],
    stock: 15,
    featured: true,
    rating: 4.9,
    reviewCount: 18,
    colors: ["Cream", "White"],
    sizes: ["One Size"],
  },
  {
    name: "Sage Green Satchel",
    slug: "sage-green-satchel",
    description: "Trendy sage green satchel with structured silhouette. Features top handle and adjustable crossbody strap.",
    price: 11200,
    comparePrice: 13500,
    images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"],
    category: "Handbags",
    tags: ["satchel", "green", "structured"],
    stock: 20,
    featured: false,
    rating: 4.5,
    reviewCount: 35,
    colors: ["Sage Green", "Tan"],
    sizes: ["Medium"],
  },
  {
    name: "Champagne Evening Bag",
    slug: "champagne-evening-bag",
    description: "Glamorous champagne evening bag with metallic finish. Includes delicate chain strap and magnetic closure.",
    price: 7800,
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80"],
    category: "Clutches",
    tags: ["evening", "metallic", "glamour"],
    stock: 12,
    featured: true,
    rating: 4.7,
    reviewCount: 22,
    colors: ["Champagne", "Silver"],
    sizes: ["One Size"],
  },
  {
    name: "Urban Chic Backpack",
    slug: "urban-chic-backpack",
    description: "Modern minimalist backpack in premium vegan leather. Laptop compartment and anti-theft back pocket included.",
    price: 14500,
    comparePrice: 17000,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"],
    category: "Backpacks",
    tags: ["backpack", "urban", "laptop"],
    stock: 18,
    featured: false,
    rating: 4.4,
    reviewCount: 31,
    colors: ["Black", "Camel", "Navy"],
    sizes: ["Standard"],
  },
  {
    name: "Blush Pink Mini Bag",
    slug: "blush-pink-mini-bag",
    description: "Adorable blush pink mini bag with quilted design. Gold chain strap adds a touch of luxury.",
    price: 5500,
    images: ["https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&q=80"],
    category: "Crossbody",
    tags: ["mini", "pink", "quilted"],
    stock: 35,
    featured: true,
    rating: 4.8,
    reviewCount: 56,
    colors: ["Blush Pink", "White"],
    sizes: ["Mini"],
  },
  {
    name: "Classic Tan Leather Tote",
    slug: "classic-tan-leather-tote",
    description: "Timeless tan leather tote with reinforced handles. Generous capacity for daily essentials and more.",
    price: 16800,
    comparePrice: 19500,
    images: ["https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80"],
    category: "Tote Bags",
    tags: ["leather", "tan", "classic"],
    stock: 10,
    featured: false,
    rating: 4.9,
    reviewCount: 47,
    colors: ["Tan", "Brown"],
    sizes: ["Large"],
  },
];

export async function POST() {
  try {
    const seeded = await isDatabaseSeeded();
    if (seeded) {
      return NextResponse.json({ message: "Database already seeded" });
    }

    await seedCategories(categories);

    const adminEmail = process.env.ADMIN_EMAIL || "admin@hasifashion.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";

    const existingAdmin = await getUserByEmail(adminEmail);
    if (!existingAdmin) {
      const hashed = await bcrypt.hash(adminPassword, 12);
      await createUser({
        name: "Admin",
        email: adminEmail,
        password: hashed,
        role: "admin",
      });
    }

    await seedProducts(products);

    return NextResponse.json({
      message: "Firebase database seeded successfully",
      admin: { email: adminEmail, password: adminPassword },
      products: products.length,
      categories: categories.length,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
