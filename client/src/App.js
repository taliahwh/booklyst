import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderListScreen from './screens/OrderListScreen';
import AdminUserListScreen from './screens/AdminUserListScreen';
import AdminEditUserScreen from './screens/AdminEditUserScreen';
import AdminProductListScreen from './screens/AdminProductListScreen';
import AdminOrderListScreen from './screens/AdminOrderListScreen';
import EditProductScreen from './screens/EditProductScreen';
import WishlistScreen from './screens/WishlistScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="container px-6 py-4 mx-auto">
        <Routes>
          <Route path="/" exact element={<HomeScreen />} />
          <Route path="/page/:pageNumber" exact element={<HomeScreen />} />
          <Route
            path="search/:keyword/page/:pageNumber"
            exact
            element={<HomeScreen />}
          />
          <Route path="/search/:keyword" exact element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart/:id" element={<CartScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/wishlist" element={<WishlistScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/myorders" element={<OrderListScreen />} />
          <Route path="/admin/users" element={<AdminUserListScreen />} />
          <Route path="/admin/user/:id" element={<AdminEditUserScreen />} />
          <Route
            path="/admin/products"
            exact
            element={<AdminProductListScreen />}
          />
          <Route
            path="/admin/products/:pageNumber"
            exact
            element={<AdminProductListScreen />}
          />
          <Route path="/admin/orders" element={<AdminOrderListScreen />} />
          <Route
            path="/admin/product/:id/edit"
            element={<EditProductScreen />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
