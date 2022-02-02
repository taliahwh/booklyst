import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="container px-6 py-4 mx-auto">
        <Routes>
          <Route path="/" exact element={<HomeScreen />} />
          <Route path="/product/:id" exact element={<ProductScreen />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
