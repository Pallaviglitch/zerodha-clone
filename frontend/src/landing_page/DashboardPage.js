import React, { useEffect, useState } from "react";

function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("trading-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="dashboard-page">
      <h2>Welcome{user ? `, ${user.name}` : " back"}</h2>
      <p>Your trading workspace is ready.</p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Portfolio</h3>
          <p className="dashboard-highlight">₹4,28,750</p>
          <p>+12.4% this month</p>
        </div>
        <div className="dashboard-card">
          <h3>Watchlist</h3>
          <p className="dashboard-highlight">14 stocks</p>
          <p>High momentum setup</p>
        </div>
        <div className="dashboard-card">
          <h3>Orders</h3>
          <p className="dashboard-highlight">3 pending</p>
          <p>2 buy, 1 sell</p>
        </div>
        <div className="dashboard-card">
          <h3>Risk</h3>
          <p className="dashboard-highlight">Low</p>
          <p>Balanced exposure</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
