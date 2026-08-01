import React, { useContext, useState } from "react";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    setSubmitting(true);
    setError(null);

    try {
      const currentOrders = JSON.parse(localStorage.getItem("trading-orders") || "[]");
      const newOrder = {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "BUY",
      };
      localStorage.setItem("trading-orders", JSON.stringify([...currentOrders, newOrder]));
      generalContext.closeBuyWindow();
      window.location.reload();
    } catch (err) {
      console.error("Order failed", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" type="button" onClick={handleBuyClick} disabled={submitting}>
            {submitting ? "Placing..." : "Buy"}
          </button>
          <button className="btn btn-grey" type="button" onClick={handleCancelClick} disabled={submitting}>
            Cancel
          </button>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default BuyActionWindow;
