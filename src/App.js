import React, { useState, useEffect } from "react";
import { Navbar, Products, Cart, Checkout, ProductDetail } from "./components";
import { CssBaseline } from "@material-ui/core";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "./components/Layout/loading";
import "toastr/build/toastr.min.css";
import toastr from "toastr";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);

    setLoading(false);
  };

  const handleAddToCart = async (event, productId, quantity) => {
    event.persist();
    setLoading(true);
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
    setLoading(false);
    return toastr.success("You have added the product", "Notice", {
      timeOut: 2000,
    });
  };

  const handleUpdateCart = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveCart = async (productId) => {
    const response = await commerce.cart.remove(productId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    setLoading(true);
    const response = await commerce.cart.empty();

    setCart(response.cart);
    setLoading(false);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    const incomingOrder = await commerce.checkout.capture(
      checkoutTokenId,
      newOrder
    );
    setOrder(incomingOrder);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      {loading ? (
        <Loading />
      ) : (
        <>
          <CssBaseline />
          <Navbar totalItems={cart.total_items} />
          <Switch>
            <Route exact path="/">
              <Products products={products} onAddToCart={handleAddToCart} />
            </Route>
            <Route exact path="/cart">
              <Cart
                cart={cart}
                handleUpdateCart={handleUpdateCart}
                handleRemoveCart={handleRemoveCart}
                handleEmptyCart={handleEmptyCart}
              />
            </Route>
            <Route exact path="/checkout">
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
                refreshCart={refreshCart}
              />
            </Route>
            <Route exact path="/product/:productId">
              <ProductDetail
                products={products}
                onAddToCart={handleAddToCart}
              />
            </Route>
          </Switch>
        </>
      )}
    </Router>
  );
};

export default App;
