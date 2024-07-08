const express = require("express");
const userRoute = require("../ALOJADSA/src/routes/user.route")
const app = express();

app.use("/x", userRoute)

app.listen(3000);