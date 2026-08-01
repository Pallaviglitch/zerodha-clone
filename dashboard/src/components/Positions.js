import React, { useEffect, useState } from "react";
import { positions as staticPositions } from "../data/data";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("trading-orders") || "null");
    if (storedOrders && Array.isArray(storedOrders)) {
      const dynamicPositions = storedOrders.map((order) => ({
        product: "CNC",
        name: order.name,
        qty: order.qty,
        avg: order.price,
        price: order.price,
        net: "+0.00%",
        day: "+0.00%",
        isLoss: false,
      }));
      setPositions([...staticPositions, ...dynamicPositions]);
    } else {
      setPositions(staticPositions);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="positions">
        <p>Loading positions...</p>
      </div>
    );
  }

  if (positions.length === 0) {
    return (
      <div className="positions">
        <p>No positions found.</p>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
