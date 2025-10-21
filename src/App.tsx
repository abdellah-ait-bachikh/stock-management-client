import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/categories" element={<Layout />}>
        <Route index element={<h1>categories</h1>} />
      </Route>
      <Route path="/products" element={<Layout />}>
        <Route index element={<h1>Products</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
