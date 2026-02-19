import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ProductProvider, useProducts } from "./context/ProductContext";
import { Header } from "./components/Header/Header";
import  InfoPage  from "./pages/InfoPage/InfoPage";
// import { HomePage } from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage.tsx";
import CollabPage from "./pages/CollabPage/CollabPage.tsx";
import { productApi } from "./services/api";

const AppRoutes: React.FC = () => {
  const { products, loading } = useProducts();
  const [headerHeight, setHeaderHeight] = useState(0);

  console.log("productApiGetAll:", productApi.getAll);

  useEffect(() => {
    const header = document.querySelector(".app-header") as HTMLElement;
    if (header) {
      const updateHeaderHeight = () => setHeaderHeight(header.offsetHeight);
      updateHeaderHeight();
      window.addEventListener("resize", updateHeaderHeight);
      return () => window.removeEventListener("resize", updateHeaderHeight);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!products.length || !products[0]?.uuid) return <div>No products available</div>;

  return (
    <>
      <Header />
      <main style={{ paddingTop: headerHeight }}>
        <Routes>
          <Route path="/" element={<Navigate to={`/product/${products[0].uuid}`} replace />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/collab/:id" element={<CollabPage />} />
          <Route path="*" element={<Navigate to={`/product/${products[0].uuid}`} replace />} />
        </Routes>
      </main>
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <ProductProvider>
          <AppRoutes />
        </ProductProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;