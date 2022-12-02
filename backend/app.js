const express = require("express");
const session = require("express-session");
const app = express();
const routeLivre = require("./app/routers/livresRouter");
const routeAuth = require("./app/routers/authRoutes");
const routeCommande = require("./app/routers/commandeRoures");
const bodyparser = require("body-parser");
const cors = require("cors");

const port = process.env.NODE_DOCKER_PORT || 8081;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  session({
    secret: "12345",
    resave: true,
    saveUninitialized: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use("/", routeLivre);
app.use("/auth", routeAuth);
app.use("/commande", routeCommande);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
