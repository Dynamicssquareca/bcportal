'use client';
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const BlogSearch = () => {
  const [query, setQuery] = useState('');
  const [allResults, setAllResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadCount, setLoadCount] = useState(9);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const searchRef = useRef(null);

  // Normalize slug / build href
  const getHref = (slug) => {
    if (!slug) return '/';
    const str = String(slug).trim();

    // if it's an absolute URL (http:// or https://), return as-is
    if (/^https?:\/\//i.test(str)) return str;

    // remove leading slashes then add a single leading slash
    return `/${str.replace(/^\/+/, '')}`;
  };

  // Debounce search
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim().length > 2) {
        fetchResults(query);
        setShowDropdown(true);
      } else {
        clearResults();
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [query]);

  // Click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchResults = async (searchTerm) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://businesscentralapi.onrender.com/api/frontend/blogsearch/${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await res.json();
      const results = data || [];
      setAllResults(results);
      setVisibleResults(results.slice(0, 9));
      setLoadCount(9);
    } catch (err) {
      console.error('Search error:', err);
      clearResults();
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setAllResults([]);
    setVisibleResults([]);
    setLoadCount(9);
    setShowDropdown(false);
  };

  const handleLoadMore = () => {
    const nextCount = loadCount + 9;
    setVisibleResults(allResults.slice(0, nextCount));
    setLoadCount(nextCount);
  };

  const handleFocus = () => {
    if (query.trim().length > 2 && allResults.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleResultClick = () => {
    setShowDropdown(false);
    setIsMobileSearchOpen(false);
  };

  return (
    <div ref={searchRef} className="search-wrapper position-relative">
      {/* ---------------- Desktop Search (md and up) ---------------- */}
      <div className="desktop-search d-none d-md-block">
        <div className="input-group w-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              if (query.trim().length > 2) {
                fetchResults(query);
                setShowDropdown(true);
              }
            }}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>

        {query.length > 2 && showDropdown && (
          <div className="search-results position-absolute bg-white border mt-2 p-3 shadow-sm">
            {loading && <p>Loading...</p>}

            {!loading && visibleResults.length > 0 && (
              <>
                {visibleResults.map((post, index) => {
                  const href = getHref(post.slug ?? post.url ?? '');
                  const key = post._id || post.slug || `${href}-${index}`;
                  const isAbsolute = /^https?:\/\//i.test(href);

                  return (
                    <div key={key} className="car-ll-01 mb-2">
                      <a
                        href={href}
                        onClick={handleResultClick}
                        {...(isAbsolute ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        <h5>{post.title}</h5>
                      </a>
                    </div>
                  );
                })}
                {visibleResults.length < allResults.length && (
                  <div className="text-center">
                    <button className="btn btn-outline-secondary" onClick={handleLoadMore}>
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}

            {!loading && visibleResults.length === 0 && (
              <p>No blog found for "{query}"</p>
            )}
          </div>
        )}
      </div>

      {/* ---------------- Mobile Search Icon (toggle) ---------------- */}
      <div className="mobile-search-icon d-block d-md-none">
        <button
          className="btn"
          onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          aria-label="Toggle mobile search"
        >
          <i className={`bi ${isMobileSearchOpen ? 'bi-x-lg' : 'bi-search'}`}></i>
        </button>
      </div>

      {/* ---------------- Mobile Search Box ---------------- */}
      {isMobileSearchOpen && (
        <div
          className="mobile-search position-fixed start-0 w-100 bg-dark p-3"
          style={{ top: '65px', zIndex: 1050 }}
        >
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button
              className="btn btn-secondary"
              onClick={() => {
                if (query.trim().length > 2) {
                  fetchResults(query);
                  setShowDropdown(true);
                }
              }}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>

          {query.length > 2 && showDropdown && (
            <div className="mobile-results bg-white text-dark mt-2 p-2 rounded">
              {loading && <p>Loading...</p>}

              {!loading && visibleResults.length > 0 && (
                <>
                  {visibleResults.map((post, index) => {
                    const href = getHref(post.slug ?? post.url ?? '');
                    const key = post._id || post.slug || `${href}-${index}`;
                    const isAbsolute = /^https?:\/\//i.test(href);

                    return (
                      <div key={key} className="car-ll-01 mb-2">
                        <a
                          href={href}
                          onClick={handleResultClick}
                          {...(isAbsolute ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          <h5>{post.title}</h5>
                        </a>
                      </div>
                    );
                  })}
                  {visibleResults.length < allResults.length && (
                    <div className="text-center">
                      <button className="btn btn-outline-secondary" onClick={handleLoadMore}>
                        Load More
                      </button>
                    </div>
                  )}
                </>
              )}

              {!loading && visibleResults.length === 0 && (
                <p>No blog found for "{query}"</p>
              )}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        /* ---------- Desktop ---------- */
        .car-ll-01 a h5 {
          font-size: 14px;
          color: #273266;
          font-weight: 400;
          margin: 0;
          padding: 10px;
          background: #f5f4f4;
          border-radius: 5px;
          transition: 0.3s ease;
          border: 1px solid transparent;
        }
        .car-ll-01 a h5:hover {
          transform: scale(1.02);
          border-color: #bb2b36;
        }
        .search-results {
          width: 450px;
          max-height: 300px;
          overflow-y: auto;
          border-radius: 6px;
          left:-210px
        }

        /* ---------- Mobile ---------- */
        .mobile-search {
          animation: slideDown 0.3s ease-in-out;
        }
        .mobile-results {
          max-height: 250px;
          overflow-y: auto;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BlogSearch;
