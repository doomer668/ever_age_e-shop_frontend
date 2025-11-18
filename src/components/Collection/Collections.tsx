import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import "./Collections.css";

export default function Collections() {
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== "undefined" ? window.innerWidth <= 900 : false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const collections = useMemo(() => {
    const groups = products.reduce<Record<string, string[]>>((acc, p) => {
      const key = (p as any).kolekce;
      if (!key) return acc;
      const img = (p as any).images?.[0] ?? (p as any).image ?? "/placeholder.png";
      (acc[key] ||= []).push(img);
      return acc;
    }, {});
    return Object.entries(groups).map(([name, imgs]) => ({ name, img: imgs[0] }));
  }, []);

  const toggle = (name: string) => {
    setActiveCollection((prev) => (prev === name ? null : name));
  };

  const activeBg = activeCollection
    ? collections.find((c) => c.name === activeCollection)?.img ?? ""
    : "";

  return (
    <section className="collections-section" aria-label="Collections">
      <div className={`collections-inner ${activeCollection ? "expanded" : ""}`}>
        <h2 className="collections-title">Collections</h2>

        <div className="collections-layout">
          <div className="collections-list" role="list">
            {collections.map((c) => {
              const isActive = c.name === activeCollection;
              const productsForThis = products.filter((p) => (p as any).kolekce === c.name);
              return (
                <div key={c.name} role="listitem" className={`collection-block`}>
                  <div
                    className={`collection-card ${isActive ? "active" : ""}`}
                    style={{ backgroundImage: `url(${c.img})` }}
                    tabIndex={0}
                    onClick={() => toggle(c.name)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle(c.name);
                      }
                    }}
                    aria-pressed={isActive}
                    aria-label={`Toggle collection ${c.name}`}
                  >
                    <div className="collection-overlay">
                      <div className="collection-name">{c.name}</div>
                    </div>
                  </div>

                  {/* mobile: render products panel inline under the clicked card */}
                  {isMobile && isActive && (
                    <div
                      className="collection-products has-bg inline"
                      style={{ backgroundImage: c.img ? `url(${c.img})` : undefined }}
                      aria-live="polite"
                    >
                      <div className="collection-products-inner">
                        <h3 className="collection-products-title">Products — {c.name}</h3>
                        <div className="products-grid">
                          {productsForThis.map((p: any) => (
                            <Link key={p.id} to={`/product/${p.id}`} className="product-card">
                              <div
                                className="product-thumb"
                                style={{ backgroundImage: `url(${p.images?.[0] ?? p.image ?? "/placeholder.png"})` }}
                              />
                              <div className="product-info">
                                <div className="product-title">{p.title}</div>
                                {typeof p.price !== "undefined" && (
                                  <div className="product-price">{Number(p.price).toFixed(2)} ₽</div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* desktop: products panel shows at the right as before */}
          {!isMobile && activeCollection && (
            <div
              className="collection-products has-bg"
              style={{ backgroundImage: activeBg ? `url(${activeBg})` : undefined }}
              aria-live="polite"
            >
              <div className="collection-products-inner">
                <h3 className="collection-products-title">Products — {activeCollection}</h3>
                <div className="products-grid">
                  {products
                    .filter((p) => (p as any).kolekce === activeCollection)
                    .map((p: any) => (
                      <Link key={p.id} to={`/product/${p.id}`} className="product-card">
                        <div
                          className="product-thumb"
                          style={{ backgroundImage: `url(${p.images?.[0] ?? p.image ?? "/placeholder.png"})` }}
                        />
                        <div className="product-info">
                          <div className="product-title">{p.title}</div>
                          {typeof p.price !== "undefined" && (
                            <div className="product-price">{Number(p.price).toFixed(2)} ₽</div>
                          )}
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}