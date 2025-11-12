"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const API = "https://businesscentralapi.onrender.com/api/frontend/categories";

// ✅ List of category names (or slugs) you want to show
const ALLOWED_CATEGORIES = ["Business Central", "Dynamics NAV", "Dynamics GP","Copilot","Saas","Industries","Digital Transformation"];

export default function CategoryNavClient({ limit = 7 }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(API, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const items = Array.isArray(data)
          ? data
          : data?.categories ?? data?.data ?? [];

        // ✅ normalize shape
        let normalized = items.map((it, i) => {
          const name = typeof it === "string" ? it : it?.name ?? it?.title ?? `Category ${i + 1}`;
          const slug =
            typeof it === "string"
              ? name.toLowerCase().replace(/\s+/g, "-")
              : it?.slug ?? name.toLowerCase().replace(/\s+/g, "-");
          const url = it?.url ?? `/category/${slug}`;
          return { name, slug, url, id: it?.id ?? slug };
        });

        // ✅ filter by allowed categories
        normalized = normalized.filter((cat) =>
          ALLOWED_CATEGORIES.includes(cat.name)
        );

        // ✅ apply limit
        normalized = normalized.slice(0, limit);

        setCategories(normalized);
      } catch (err) {
        console.error("Category fetch failed:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [limit]);

  return (
    <nav className="cate-nav">
      <div className="category-bar">
        <div className="categories" role="list">
          {loading ? (
            <div>Loading…</div>
          ) : error ? (
            <div>Error loading categories</div>
          ) : categories.length > 0 ? (
            categories.map((cat, idx) => (
              <React.Fragment key={cat.id ?? idx}>
                <Link href={cat.url}>{cat.name}</Link>
                {idx < categories.length - 1 && <span className="divider">|</span>}
              </React.Fragment>
            ))
          ) : (
            <div>No categories found</div>
          )}
        </div>
      </div>
    </nav>
  );
}
