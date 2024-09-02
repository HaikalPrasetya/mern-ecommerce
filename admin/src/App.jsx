import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import AddPage from "./pages/AddPage";
import AppLayout from "./layouts/AppLayout";
import ListProductsPage from "./pages/ListProductsPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import MessagePage from "./pages/MessagePage";
import MessageDetail from "./pages/MessageDetail";
import ListOrdersPage from "./pages/ListOrdersPage";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/add" /> : <LoginPage />}
        />
        {isLoggedIn && (
          <>
            <Route
              path="/add"
              element={
                <AppLayout>
                  <AddPage />
                </AppLayout>
              }
            />
            <Route
              path="/list-products"
              element={
                <AppLayout>
                  <ListProductsPage />
                </AppLayout>
              }
            />
            <Route
              path="/list-orders"
              element={
                <AppLayout>
                  <ListOrdersPage />
                </AppLayout>
              }
            />
            <Route
              path="/update-product/:productId"
              element={
                <AppLayout>
                  <UpdateProductPage />
                </AppLayout>
              }
            />
            <Route
              path="/messages"
              element={
                <AppLayout>
                  <MessagePage />
                </AppLayout>
              }
            />
            <Route
              path="/messages/:id"
              element={
                <AppLayout>
                  <MessageDetail />
                </AppLayout>
              }
            />
          </>
        )}
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
export default App;
