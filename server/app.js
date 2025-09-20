require("dotenv").config();
const express = require(`express`);
const mongoose = require(`mongoose`);
const morgan = require("morgan");
const cors = require(`cors`);
const app = express();
const taskRoutes = require("./routes/taskRoute");
const authRoute = require("./routes/authRoute");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/", authRoute);
app.use("/api", taskRoutes);

mongoose
  .connect(process.env.DBURI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Running in PORT ${process.env.PORT} and connected to database`
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });
