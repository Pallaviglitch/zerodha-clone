const mongoose = require("mongoose");

let connectionPromise = null;

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not configured");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 10000,
      autoIndex: true,
    });
  }

  return connectionPromise;
}

async function closeDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  connectionPromise = null;
}

async function seedDemoData({
  HoldingsModel,
  PositionsModel,
  OrdersModel,
  UsersModel,
  sampleHoldings,
  samplePositions,
  sampleOrders,
  sampleUsers,
}) {
  await connectDatabase();

  const [holdingsCount, positionsCount, ordersCount, usersCount] = await Promise.all([
    HoldingsModel.countDocuments(),
    PositionsModel.countDocuments(),
    OrdersModel.countDocuments(),
    UsersModel.countDocuments(),
  ]);

  const operations = [];

  if (holdingsCount === 0 && Array.isArray(sampleHoldings)) {
    operations.push(HoldingsModel.insertMany(sampleHoldings));
  }

  if (positionsCount === 0 && Array.isArray(samplePositions)) {
    operations.push(PositionsModel.insertMany(samplePositions));
  }

  if (ordersCount === 0 && Array.isArray(sampleOrders)) {
    operations.push(OrdersModel.insertMany(sampleOrders));
  }

  if (usersCount === 0 && Array.isArray(sampleUsers)) {
    operations.push(UsersModel.insertMany(sampleUsers));
  }

  if (operations.length > 0) {
    await Promise.all(operations);
  }

  return {
    holdings: await HoldingsModel.find({}).lean(),
    positions: await PositionsModel.find({}).lean(),
    orders: await OrdersModel.find({}).lean(),
    users: await UsersModel.find({}).lean(),
  };
}

module.exports = {
  connectDatabase,
  closeDatabase,
  seedDemoData,
};
