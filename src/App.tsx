import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { products } from "./data/products";
import { CartProvider } from "./context/CartContext";
import { Header } from "./components/Header/Header";
import  InfoPage  from "./pages/InfoPage/InfoPage";
// import { HomePage } from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage.tsx";
import CollabPage from "./pages/CollabPage/CollabPage.tsx";

const App: React.FC = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector(".app-header") as HTMLElement;
    if (header) {
      const updateHeaderHeight = () => setHeaderHeight(header.offsetHeight);
      updateHeaderHeight();
      window.addEventListener("resize", updateHeaderHeight);
      return () => window.removeEventListener("resize", updateHeaderHeight);
    }
  }, []);

  return (
      <BrowserRouter>
        <CartProvider>
          <Header />
          <main style={{ paddingTop: headerHeight }}>
            <Routes>
              <Route path="/" element={<Navigate to={`/product/${products[0].id}`} replace />} />
              <Route path="/info" element={<InfoPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/collab/:id" element={<CollabPage />} />
              <Route path="*" element={<Navigate to={`/product/${products[0].id}`} replace />} />
            </Routes>
          </main>
        </CartProvider>
      </BrowserRouter>
  );
};

export default App;