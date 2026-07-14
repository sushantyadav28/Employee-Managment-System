const employeeRoutes = require("./routes/employeeRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./database/mogodb");

const app = express();


app.use(cors());
app.use(express.json());
app.use("/api", employeeRoutes);

connectDB();

app.get("/", (req, res) => {
  res.send("API is running....");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
