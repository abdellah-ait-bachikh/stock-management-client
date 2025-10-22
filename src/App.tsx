import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/home/Home";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { user } from "./lib/const";

const App = () => {
  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="categories" element={<Layout />}>
            <Route index element={<h1>categories</h1>} />
          </Route>
          <Route path="products" element={<Layout />}>
            <Route index element={<h1>Products</h1>} />
          </Route>
          <Route path="auth/login" element={<Navigate to="/" />} />
          <Route path="auth/register" element={<Navigate to="/" />} />
          <Route path="/*" element={<h1>note found</h1>} />
        </>
      ) : (
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to="/auth/register" />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/*" element={<h1>note found</h1>} />
        </Route>
      )}
    </Routes>
  );
};

export default App;
