require("dotenv").config();
const express = require("express");
const app = express();
const PORT=process.env.PORT || 5000;
const mongoDB = require("./db");
mongoDB();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

const start=async()=>{
  try {
      await mongoDB(process.env.MONGO_URI);
      app.listen(PORT,()=>{
          console.log(`${PORT} Yes I am connected`);
      });
  } catch (error) {
      console.log(error);
  }
};

start();
