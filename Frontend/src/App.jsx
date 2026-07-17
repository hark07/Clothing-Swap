import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SwapRequests from "./pages/SwapRequests";
import ItemDetails from "./pages/ItemDetails";
import Chat from "./pages/Chat";
import AddItem from "./pages/AddItem";
import Products from "./pages/Products";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/swaps"
          element={<SwapRequests />}
        />

        <Route
          path="/chat/:swapId"
          element={<Chat />}
        />

        <Route
          path="/item/:id"
          element={<ItemDetails />}
        />

        <Route
          path="/add-item"
          element={<AddItem />}
        />
      </Routes>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;
