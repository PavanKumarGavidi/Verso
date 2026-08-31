import { useEffect } from "react";
import { StoreProvider, useStore } from "./lib/store";
import { useRoute } from "./lib/router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { QuickView } from "./components/QuickView";
import { Toasts } from "./components/Toasts";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Checkout } from "./pages/Checkout";
import { Admin } from "./pages/Admin";

function Shell() {
  const route = useRoute();
  const { setCartOpen } = useStore();

  useEffect(() => {
    if (route.path === "/" && route.query.get("s")) {
      const id = route.query.get("s")!;
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    setCartOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.path, route.query.toString()]);

  const isAdminRoute = route.path.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <div className="grain min-h-screen">
        <Admin />
        <Toasts />
      </div>
    );
  }

  return (
    <div className="grain flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {route.path === "/shop" ? (
          <Shop route={route} />
        ) : route.path === "/checkout" ? (
          <Checkout />
        ) : (
          <Home />
        )}
      </main>
      <Footer />
      <CartDrawer />
      <QuickView />
      <Toasts />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
