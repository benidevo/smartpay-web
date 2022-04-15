import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Items from "./pages/Item/index";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Bills from "./pages/Bills";
import Customers from "./pages/Customers";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
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
            path="/items"
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
