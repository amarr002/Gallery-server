const express = require("express");
const userRoutes = require("./routes/user");
const staticRoutes = require("./routes/staticRoutes");
const imageRoutes = require("./routes/image");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { restrictLoggedUser } = require("./middleware/auth");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(cors());
app.use(cors({ origin: true, credentials: true }));
// app.use(cookieParser());
// app.use(bodyParser());
// app.use(bodyParser.json({ limit: '500mb',extended: true }));
// app.use(bodyParser.urlencoded({ limit: '500mb', extended: true , parameterLimit: 100000}));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 200000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));
app.use(express.static("images"));

app.use("/", staticRoutes);
app.use("/user", userRoutes);
app.use("/user/login", restrictLoggedUser);
app.use("/user", imageRoutes);

const port = 3000;
app.listen(port, () => {
  console.log("server is running");
});

const DB =
  "mongodb+srv://uamar1288:helloimage123@cluster0.gwwaicx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB, {
    //     useNewUrlParser: true,
    //   useUnifiedTopology: true
  })
  .then(() => console.log("DB connection is successfull"));
