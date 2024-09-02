import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import MensPage from "./pages/MensPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/RegisterPage";
import { useAppContext } from "./context/AppContext";
import MyCartPage from "./pages/MyCartPage";
import MyProfilePage from "./pages/MyProfilePage";
import WishListPage from "./pages/WishListPage";
import NotificationsPage from "./pages/NotificationsPage";
import CheckoutPage from "./pages/CheckoutPage";
import SettingsPage from "./pages/SettingsPage";
import MyOrdersPage from "./pages/MyOrdersPage";

function App() {
  const { user } = useAppContext();
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout>
              <HomePage />
            </AppLayout>
          }
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <RegisterPage /> : <Navigate to="/" />}
        />
        <Route
          path="/mens"
          element={
            <AppLayout>
              <MensPage />
            </AppLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <AppLayout>
              <ProductDetailPage />
            </AppLayout>
          }
        />
        {user && (
          <>
            <Route
              path="/my-cart"
              element={
                <AppLayout>
                  <MyCartPage />
                </AppLayout>
              }
            />
            <Route
              path="/user/settings"
              element={
                <AppLayout>
                  <SettingsPage />
                </AppLayout>
              }
            />
            <Route
              path="/my-account"
              element={
                <AppLayout>
                  <MyProfilePage />
                </AppLayout>
              }
            />
            <Route
              path="/wishlist"
              element={
                <AppLayout>
                  <WishListPage />
                </AppLayout>
              }
            />
            <Route
              path="/my-orders"
              element={
                <AppLayout>
                  <MyOrdersPage />
                </AppLayout>
              }
            />
            <Route
              path="/notifications"
              element={
                <AppLayout>
                  <NotificationsPage />
                </AppLayout>
              }
            />
            <Route
              path="/checkout"
              element={
                <AppLayout>
                  <CheckoutPage />
                </AppLayout>
              }
            />
          </>
        )}
      </Routes>
      <Toaster />
    </div>
  );
}
export default App;
