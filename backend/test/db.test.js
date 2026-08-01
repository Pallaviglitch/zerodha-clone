const test = require("node:test");
const assert = require("node:assert/strict");

const { connectDatabase, closeDatabase } = require("../utils/db");
const { HoldingsModel } = require("../model/HoldingsModel");

test("connects to MongoDB and stores a holding", async () => {
  await connectDatabase();

  const created = await HoldingsModel.create({
    name: "TESTSTOCK",
    qty: 2,
    avg: 100,
    price: 110,
    net: "+10%",
    day: "+2%",
  });

  const found = await HoldingsModel.findById(created._id);

  assert.ok(found);
  assert.equal(found.name, "TESTSTOCK");

  await closeDatabase();
});
