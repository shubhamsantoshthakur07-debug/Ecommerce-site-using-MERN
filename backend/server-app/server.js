const dns = require("dns");

// Set custom DNS servers (Google DNS)
dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);

console.log("DNS servers set successfully");

const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Routes
const stateRoute = require("./admin/state.route.js");
const cityRoute = require("./admin/city.route.js");
const productCatgRoute = require("./admin/productcatg.route.js");
const vendorRoute = require("./vendor/vendor.route.js");
const customerRoute = require("./customer/customer.route.js");
const productRoute = require("./product/product.route.js");
const billRoute = require("./admin/bills/bill.route.js");
const saleRoute = require("./vendor/sales.route.js");
const paymentdetailsRoute = require("./admin/bills/paymentdetails.route.js");
const paymentRoute = require("./payment.js");

const PORT = process.env.PORT || 9191;

/* =======================
   MIDDLEWARE (IMPORTANT ORDER)
======================= */

app.use(cors());

// ✅ MUST BE BEFORE ROUTES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   ROUTES
======================= */

app.use("/state", stateRoute);
app.use("/city", cityRoute);
app.use("/productcatg", productCatgRoute);
app.use("/vendor", vendorRoute);
app.use("/customer", customerRoute);
app.use("/product", productRoute);
app.use("/bill", billRoute);
app.use("/sales", saleRoute);
app.use("/paymentdetails", paymentdetailsRoute);
app.use("/payment", paymentRoute);

/* =======================
   DATABASE CONNECTION
======================= */

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ Database connected");
  })
  .catch((err) => {
    console.log("❌ Cannot connect to database:", err);
  });

/* =======================
   SERVER START
======================= */

app.listen(PORT, () => {
  console.log("🚀 Server running on port:", PORT);
});