import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productApi }  from "../../services/api.ts";
import { useCart } from "../../context/CartContext";
import type { Product } from "../../data/products.ts";
// import "./ProductPage.css";

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addItem } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        productApi.getAll()
            .then((products) => {
                const found = products.find((p: Product) => p.uuid === id);
                setProduct(found || null);
            })
            .catch((error) => console.error("Failed to fetch product:", error))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div>Loading...</div>;

    if (!product) {
        return (
            <main className="product-page">
                <div>Product not found.</div>
            </main>
        );
    }

    // const images = [
    //     product.image,
    //     "/products/product-one-alt1.jpg",
    //     "/products/product-one-alt2.jpg",
    // ];

    const images = product.imageUrls;

    const handleAddToCart = () => {
        addItem({
            id: product.uuid,
            title: product.name,
            price: product.price,
            image: product.imageUrls[0],
            qty: 1, // Добавляем один товар
        });
    };

    return (
        <main className="product-page">
            <div className="product-left">
                <div className="product-images">
                    {images.map((src, index) => (
                        <img key={index} src={src} alt={`${product.name} ${index + 1}`} className="product-image" />
                    ))}
                </div>
            </div>
            <div className="product-right ">
                <div className="product-info">
                    <h1 className="product-title">{product.name}</h1>
                    <p className="product-description">{product.description}</p>
                    <p className="product-availability">
                        {product.status === "ACTIVE" ? "IN_STOCK" : "OUT_OF_STOCK"}
                    </p>
                    {product.status === "ACTIVE" && (
                        <button className="add-to-cart-btn" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
};

export default ProductPage;