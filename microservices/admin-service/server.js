const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

require('dotenv').config();
// const awsServerlessExpress = require("aws-serverless-express");
//create a database connection -> u can also
//create a separate file for this and then import/use that file here

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.get('/api/admin/health', (req, res) => {
  const response = {
    status: 'success',
    message: 'Application is healthy',
    timestamp: new Date().toISOString(),
  };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(response),
  };
});


app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));

module.exports = app;


// const server = awsServerlessExpress.createServer(app);

// exports.handler = (event, context) => {
//   return awsServerlessExpress.proxy(server, event, context);
// };
