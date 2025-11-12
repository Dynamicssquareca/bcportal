"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import PropTypes from "prop-types";

const API = "https://businesscentralapi.onrender.com/api/frontend/blogs";

/**
 * Usage:
 * <CardSliderOne categoryId="69119a6ba5cd4d830e58a2ff" assetBase="https://businesscentralapi.onrender.com/uploads" />
 * or
 * <CardSliderOne categoryName="Dynamics GP" assetBase="https://businesscentralapi.onrender.com/uploads" />
 */
function CardSliderOne({
  categoryId,        // e.g. "69119a6ba5cd4d830e58a2ff"
  categoryName,      // e.g. "Dynamics GP"
  assetBase = "https://businesscentralapi.onrender.com/uploads",    // e.g. "https://businesscentralapi.onrender.com/uploads"
  limit = 12,
  slidesPerView = 3.5,
  showNav = true,
  className = "",
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(API, { signal: controller.signal, cache: "no-store" });
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
        if (!ignore) setBlogs(list);
      } catch (e) {
        if (!ignore && e.name !== "AbortError") setError(e?.message || "Failed to load blogs");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => { ignore = true; controller.abort(); };
  }, []);

  // --- helpers bound to your shape -------------------------------------------
  const matchCategory = (b) => {
    const cat = b?.category;
    if (!cat) return false;

    if (categoryId != null) return String(cat._id) === String(categoryId);
    if (categoryName) return (cat.name || "").toLowerCase() === String(categoryName).toLowerCase();
    return true; // no filter provided -> include all
  };

  const getImage = (b) => {
    const file = b?.imageUrl;
    if (!file) return "/img/demo-2.jpg";
    // Build absolute URL if needed
    return file.startsWith("http") ? file : (assetBase ? `${assetBase}/${file}` : `/${file}`);
  };

  const getHref = (b) => (b?.slug ? `${b.slug}` : "#");
  const getTitle = (b) => b?.title || "Untitled";

  const filtered = useMemo(() => {
    const f = blogs.filter(matchCategory);
    return limit ? f.slice(0, limit) : f;
  }, [blogs, limit, categoryId, categoryName]);

  // store swiper instance via onSwiper
  const handleOnSwiper = (s) => {
    swiperRef.current = s;
  };

  // Safe navigation init: retry until swiper & refs are attached
  useEffect(() => {
    let mounted = true;
    let attempts = 0;
    const maxAttempts = 12; // ~1.2s with retryDelay 100ms
    const retryDelay = 100;

    const tryInitNavigation = () => {
      attempts += 1;
      if (!mounted) return;
      const s = swiperRef.current;

      // retry if swiper or its params not ready
      if (!s || !s.params) {
        if (attempts < maxAttempts) return setTimeout(tryInitNavigation, retryDelay);
        return;
      }

      // retry if refs not attached yet
      if (!prevRef.current || !nextRef.current) {
        if (attempts < maxAttempts) return setTimeout(tryInitNavigation, retryDelay);
        return;
      }

      try {
        s.params.navigation = s.params.navigation || {};
        s.params.navigation.prevEl = prevRef.current;
        s.params.navigation.nextEl = nextRef.current;

        // defensive checks before calling navigation methods
        if (s.navigation) {
          try {
            if (typeof s.navigation.destroy === "function") {
              s.navigation.destroy();
            }
          } catch (err) {
            // ignore destroy errors
          }
          if (typeof s.navigation.init === "function") s.navigation.init();
          if (typeof s.navigation.update === "function") s.navigation.update();
        }
      } catch (err) {
        if (attempts < maxAttempts) return setTimeout(tryInitNavigation, retryDelay);
      }
    };

    // start attempts after a tick so refs/onSwiper have a chance to run
    setTimeout(tryInitNavigation, 0);

    return () => { mounted = false; };
  }, []); // run once after mount

  return (
    <div className={className}>
      <div className="relative">
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={30}
          modules={[Navigation]}
          onSwiper={handleOnSwiper}
          breakpoints={{
            0: { slidesPerView: 1.2, spaceBetween: 15 },
            768: { slidesPerView: 2.2, spaceBetween: 20 },
            992: { slidesPerView: 3.5, spaceBetween: 24 },
          }}
          className="mySwiper"
        >
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <SwiperSlide key={`skeleton-${i}`}>
                <div className="card-2">
                  <div className="rounded-3 w-full" style={{ height: 160, background: "rgba(0,0,0,0.06)" }} />
                  <h5 className="mt-2" style={{ opacity: 0.5 }}>Loading…</h5>
                </div>
              </SwiperSlide>
            ))}

          {!loading && error && (
            <SwiperSlide>
              <div className="card-2"><h5 style={{ color: "crimson" }}>Error: {error}</h5></div>
            </SwiperSlide>
          )}

          {!loading && !error && filtered.length === 0 && (
            <SwiperSlide>
              <div className="card-2"><h5>No posts found for this category.</h5></div>
            </SwiperSlide>
          )}

          {!loading && !error &&
            filtered.map((b, idx) => {
              const img = getImage(b);
              return (
                <SwiperSlide key={b?._id ?? b?.slug ?? idx}>
                  <div className="card-2">
                    <Link href={getHref(b)}>
                      <Image
                        src={img}
                        alt={getTitle(b)}
                        width={640}
                        height={360}
                        className="rounded-3 object-cover w-full h-auto"
                        priority={idx < 2}
                        // If img is relative (starts with "/"), keep unoptimized to avoid domain issues
                        unoptimized={!img.startsWith("http")}
                      />
                      <h5 className="mt-2">{getTitle(b)}</h5>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>

        {showNav && (
          <div className="slider-nav position-absolute d-flex gap-2 myswip-n" style={{ right: 30, bottom: "30px" }}>
            <button ref={prevRef} className="swiper-prev btn-cc" aria-label="Previous">
              <i className="bi bi-arrow-left" />
            </button>
            <button ref={nextRef} className="swiper-next btn-cc" aria-label="Next">
              <i className="bi bi-arrow-right" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

CardSliderOne.propTypes = {
  categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  categoryName: PropTypes.string,
  assetBase: PropTypes.string,
  limit: PropTypes.number,
  slidesPerView: PropTypes.number,
  showNav: PropTypes.bool,
  className: PropTypes.string,
};

export default CardSliderOne;
