"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";

const API = "https://businesscentralapi.onrender.com/api/frontend/blogs";

export default function CardOne({
    title = "Enterprise SaaS",
    categoryId,
    categoryName,
    assetBase = "https://businesscentralapi.onrender.com/uploads",
    limit = 12,
    className = "",
}) {
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

    // helpers
    const matchCategory = (b) => {
        const cats = Array.isArray(b?.category) ? b.category : b?.category ? [b.category] : [];
        if (!cats.length && categoryId == null && !categoryName) return true;
        if (categoryId != null) return cats.some((c) => String(c._id) === String(categoryId));
        if (categoryName) {
            const target = String(categoryName).toLowerCase().trim();
            return cats.some((c) => String(c.name).toLowerCase().trim() === target);
        }
        return true;
    };

    const getImage = (b) => {
        const file = b?.imageUrl;
        if (!file) return "/img/demo-2.jpg";
        return file.startsWith("http") ? file : assetBase ? `${assetBase}/${file}` : `/${file}`;
    };

    const getHref = (b) => (b?.slug ? `/${b.slug}` : "#");
    const getTitle = (b) => b?.title || "Untitled";

    const getAuthor = (b) => {
        if (b?.author) {
            if (typeof b.author === "string") return b.author;
            if (typeof b.author === "object") return b.author.name || b.author.fullName || b.author.username || "";
        }
        if (b?.createdBy) {
            if (typeof b.createdBy === "string") return b.createdBy;
            if (typeof b.createdBy === "object") return b.createdBy.name || b.createdBy.username || "";
        }
        // return empty string during loading; after loading we'll show "Unknown author" if still empty
        return "";
    };

    // New: compute an author href if possible (uses slug, username, _id or string)
    const getAuthorHref = (b) => {
        const a = b?.author ?? b?.createdBy;
        if (!a) return "";
        // If a is a string, use it as the slug (slugify)
        if (typeof a === "string") {
            const s = a.trim();
            if (!s) return "";
            const slug = encodeURIComponent(s.toLowerCase().replace(/\s+/g, "-"));
            return `/author/${slug}`;
        }
        // a is an object
        if (typeof a === "object") {
            const slugSource = a?.slug || a?.username || a?._id || a?.id;
            if (slugSource) return `/author/${encodeURIComponent(String(slugSource))}`;
        }
        return "";
    };

    const getDate = (b) => {
        const raw = b?.publishedAt || b?.createdAt || b?.date;
        if (!raw) return "";
        try {
            const d = new Date(raw);
            if (Number.isNaN(d.getTime())) return String(raw);
            return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
        } catch {
            return String(raw);
        }
    };

    const getExcerpt = (b, max = 220) => {
        const candidates = [b?.shortDescription, b?.excerpt, b?.summary, b?.description];
        for (const c of candidates) {
            if (typeof c === "string" && c.trim()) {
                const s = c.trim();
                if (s.length <= max) return s;
                return `${s.slice(0, max).trim()}…`;
            }
        }
        return "";
    };

    // get categories & primary label
    const getCategories = (b) => {
        const cats = Array.isArray(b?.category) ? b.category : b?.category ? [b.category] : [];
        return cats.map((c) => {
            const name = c?.name || String(c) || "";
            const slug = c?.slug || c?._id || encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"));
            return { name, href: `/category/${slug}` };
        });
    };

    const getPrimaryCategoryLabel = (b) => {
        const cats = getCategories(b);
        return cats.length ? cats[0].name : "";
    };

    const filtered = useMemo(() => {
        const f = blogs.filter(matchCategory);
        return limit ? f.slice(0, limit) : f;
    }, [blogs, limit, categoryId, categoryName]);

    // split featured + others
    const featured = filtered.length > 0 ? filtered[0] : null;
    const others = filtered.length > 1 ? filtered.slice(1, 4) : []; // up to 3

    // Inline skeleton styles (easy to adjust or replace with CSS classes)
    const s = {
        base: { background: "#e9ecef", borderRadius: 6, display: "block", overflow: "hidden" },
        img: { width: "100%", height: 260, background: "#e0e0e0", borderRadius: 6 },
        title: (w = "60%") => ({ height: 20, width: w, background: "#e0e0e0", borderRadius: 4, marginBottom: 10 }),
        line: (w = "100%", h = 12) => ({ height: h, width: w, background: "#e0e0e0", borderRadius: 4, marginBottom: 8 }),
        smallLine: (w = "40%", h = 10) => ({ height: h, width: w, background: "#e0e0e0", borderRadius: 4, marginBottom: 0 }),
        smallCardImg: { width: "100%", height: 90, background: "#e0e0e0", borderRadius: 6, marginBottom: 8 },
        smallCardTitle: { height: 16, width: "80%", background: "#e0e0e0", borderRadius: 4, marginBottom: 6 },
        smallMeta: { height: 12, width: "60%", background: "#e0e0e0", borderRadius: 4 }
    };

    return (
        <>

            <div className="row">
                <div className="col-lg-10">
                    {loading ? (
                        // Skeleton for featured
                        <div className="card-g-flex" style={{ display: "flex", gap: 20 }}>
                            <div className="pic-im" style={{ flex: "0 0 50%" }}>
                                <div style={s.img} aria-hidden="true" />
                            </div>
                            <div className="content-one" style={{ flex: "1" }}>
                                <div style={s.title("50%")} aria-hidden="true" />
                                <div style={s.smallLine("30%")} aria-hidden="true" />
                                <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
                                    <div style={s.smallLine("25%")} aria-hidden="true" />
                                    <div style={s.smallLine("15%")} aria-hidden="true" />
                                </div>
                                <div style={s.line()} aria-hidden="true" />
                                <div style={s.line("90%")} aria-hidden="true" />
                                <div style={s.line("80%")} aria-hidden="true" />
                            </div>
                        </div>
                    ) : (
                        featured ? (
                            <div className="card-g-flex">
                                <div className="pic-im">
                                    <Link href={getHref(featured)} className="d-block h-100">
                                        <div>
                                            <Image
                                                src={getImage(featured)}
                                                alt={getTitle(featured)}
                                                width={640}
                                                height={360}
                                            />
                                        </div>
                                    </Link>
                                </div>
                                <div className="content-one">
                                    <h3 className="card-title">
                                        <Link href={getHref(featured)}>
                                            {getTitle(featured)}
                                        </Link>
                                    </h3>
                                    {/* {getPrimaryCategoryLabel(featured) && (
                                        <p className="mb-1">
                                            <Link href={getCategories(featured)[0].href} className="text-decoration-none text-primary">
                                                <small>{getPrimaryCategoryLabel(featured)}</small>
                                            </Link>
                                        </p>
                                    )} */}
                                    <p className="card-text">{getExcerpt(featured, 200)}</p>
                                    <p className="text-muteds mb-2">
                                        {getAuthor(featured) ? (
                                            getAuthorHref(featured) ? (
                                                <Link href={getAuthorHref(featured)} className="link-st">
                                                    <small className="me-2 link-st-s">{getAuthor(featured)}</small>
                                                </Link>
                                            ) : (
                                                <small className="me-2 link-st-s">{getAuthor(featured)}</small>
                                            )
                                        ) : (
                                            <small className="me-2 link-st-s">Unknown author</small>
                                        )}
                                        {getDate(featured) && <small className="me-2 link-st-s">/ {getDate(featured)}</small>}
                                    </p>

                                </div>
                            </div>
                        ) : null
                    )}
                </div>
            </div>

            <div className="row" style={{ paddingTop: "40px" }}>
                {loading ? (
                    // Skeleton for the "others" list (3 placeholders)
                    <>
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="col-lg-3">
                                <div className="card-single-list" style={{ paddingBottom: 10 }}>
                                    <div style={s.smallCardImg} aria-hidden="true" />
                                    <div style={s.smallCardTitle} aria-hidden="true" />
                                    <div style={s.smallMeta} aria-hidden="true" />
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    !error && others.map((b, idx) => (
                        <div key={b?._id ?? b?.slug ?? idx} className="col-lg-4">
                            <div className="card-single-list">
                                <h3 className="card-title">
                                    <Link href={getHref(b)}>
                                        {getTitle(b)}
                                    </Link>
                                </h3>
                                <div className="mt-auto">
                                    <small className="text-muteda">
                                        {getAuthor(b) ? (
                                            getAuthorHref(b) ? (
                                                <Link href={getAuthorHref(b)} className="link-st">
                                                    <span className="me-2 link-st-s">{getAuthor(b)}</span>
                                                </Link>
                                            ) : (
                                                <span className="me-2 link-st-s">{getAuthor(b)}</span>
                                            )
                                        ) : (
                                            <span className="me-2 link-st-s">Unknown author</span>
                                        )}
                                        {getDate(b) && <span>/ {getDate(b)}</span>}
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </>
    );
}

CardOne.propTypes = {
    title: PropTypes.string,
    categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    categoryName: PropTypes.string,
    assetBase: PropTypes.string,
    limit: PropTypes.number,
    className: PropTypes.string,
};