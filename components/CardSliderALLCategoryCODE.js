"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const API = "https://businesscentralapi.onrender.com/api/frontend/categories";

/**
 * Props:
 * - categorySlug?: string   // if provided, shows only that category (by slug); otherwise shows all
 * - title?: string          // optional section title
 */
export default function CardSliderALLCategoryCODE({ categorySlug}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setErr("");

        const res = await fetch(API, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const list = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];

        // normalize/guard keys
        const mapped = list.map((c) => ({
          id: c.id ?? c._id ?? c.slug ?? c.name,
          name: c.name ?? c.title ?? "Untitled",
          slug: c.slug ?? "",
          image:
            c.image?.url ??
            c.imageUrl ??
            c.thumbnail ??
            "/img/demo-2.jpg",
          description: c.description ?? "",
          href: c.slug ? `/category/${c.slug}` : "#",
        }));

        let result = mapped;
        if (categorySlug) {
          result = mapped.filter((c) => c.slug === categorySlug);
        }

        if (alive) setCategories(result);
      } catch (e) {
        if (alive) setErr(`Failed to load categories${e instanceof Error ? ` (${e.message})` : ""}`);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [categorySlug]);

  return (
    <div className="position-relative">
      <div className="d-flex align-items-center justify-content-between mb-3">
        {/* <h3 className="m-0">{title}</h3> */}
        {loading && <span className="small text-muted">Loading…</span>}
        {err && <span className="small text-danger">{err}</span>}
      </div>

      <Swiper
        modules={[Navigation]}
        // 👇 This ensures navigation params exist (prevents your error)
        navigation={{ enabled: true }}
        onBeforeInit={(swiper) => {
          // 👇 Attach custom buttons before Swiper initializes
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        slidesPerView={3.5}
        spaceBetween={30}
        breakpoints={{
          0: { slidesPerView: 1.2, spaceBetween: 15 },
          768: { slidesPerView: 2.2, spaceBetween: 20 },
          992: { slidesPerView: 3.5, spaceBetween: 24 },
        }}
        className="mySwiper"
      >
        {(categories.length ? categories : Array.from({ length: loading ? 6 : 0 })).map(
          (cat, idx) => (
            <SwiperSlide key={cat?.id ?? `skeleton-${idx}`}>
              <div className="card-2 card-white">
                {cat ? (
                  <Link href={cat.href} className="">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      width={320}
                      height={180}
                      className="rounded-3 object-fit-cover flex-shrink-0 w-100"
                    />
                    <h5 className="mt-2">{cat.name}</h5>
                    {cat.description ? (
                      <p className="text-muted small mb-0">{cat.description}</p>
                    ) : null}
                  </Link>
                ) : (
                  // skeleton
                  <div>
                    <div
                      className="rounded-3 w-100"
                      style={{
                        height: 180,
                        background: "linear-gradient(90deg, #eee, #f6f6f6, #eee)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.2s infinite",
                      }}
                    />
                    <div
                      className="mt-2"
                      style={{
                        height: 20,
                        width: "70%",
                        background: "#eee",
                        borderRadius: 6,
                      }}
                    />
                  </div>
                )}
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>

      {/* Custom nav buttons */}
      <div
        className="slider-nav position-absolute d-flex gap-2"
        style={{ right: 30, bottom: 30, zIndex: 2 }}
      >
        <button ref={prevRef} className="swiper-prev btn-cc btn-cc-one" aria-label="Previous">
          <i className="bi bi-arrow-left" />
        </button>
        <button ref={nextRef} className="swiper-next btn-cc" aria-label="Next">
          <i className="bi bi-arrow-right" />
        </button>
      </div>

      {/* Optional: chips list (hidden when filtering to single category) */}
      {!categorySlug && (
        <div className="mt-4">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h4 className="m-0">All Categories</h4>
            <Link href="/categories" className="text-decoration-none">
              View all →
            </Link>
          </div>
          <div className="d-flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={`chip-${c.id}`}
                href={c.href}
                className="badge bg-light text-dark border rounded-pill px-3 py-2 text-decoration-none"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
