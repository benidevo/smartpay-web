import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Items from "./pages/Product";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Bills from "./pages/Bills";
import Customers from "./pages/Customers";
import { NavigateSetter } from "./utils/navigation";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigateSetter />
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Homepage />
              </ProtectedRoutes>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/bills"
            element={
              <ProtectedRoutes>
                <Bills />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoutes>
                <Customers />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoutes>
                <Items />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <Cart />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function ProtectedRoutes({ children }) {
  if (localStorage.getItem("accessToken")) {
    return children;
  }
  return <Navigate to="/login" />;
}

export default App;
