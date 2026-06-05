import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  isDatabaseSeeded,
  seedCategories,
  seedProducts,
  getUserByEmail,
  createUser,
  getProductBySlug,
  createProduct,
} from "@/lib/db";
import { seedCategories as categories, seedProducts as products } from "@/lib/seed-data";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const force = searchParams.get("force") === "true";
    const expand = searchParams.get("expand") === "true";

    if (expand) {
      let added = 0;
      for (const product of products) {
        const existing = await getProductBySlug(product.slug);
        if (!existing) {
          await createProduct(product);
          added++;
        }
      }
      await seedCategories(categories);
      return NextResponse.json({
        message: `Expanded catalog with ${added} new products`,
        added,
        total: products.length,
      });
    }

    const seeded = await isDatabaseSeeded();
    if (seeded && !force) {
      return NextResponse.json({
        message: "Database already seeded. Use ?expand=true to add new products or ?force=true to reseed.",
      });
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

    if (force) {
      await seedProducts(products);
    } else {
      for (const product of products) {
        const existing = await getProductBySlug(product.slug);
        if (!existing) await createProduct(product);
      }
    }

    return NextResponse.json({
      message: "Database seeded successfully",
      admin: { email: adminEmail, password: adminPassword },
      products: products.length,
      categories: categories.length,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
