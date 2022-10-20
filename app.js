const express = require("express");
const mydb = require("./database");
const ejs = require("ejs");
mydb.con;

const app = express();
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let quantity = [];

app.get("/", (req, res) => {
  mydb
    .getTotalQuantity()
    .then((data) => {
      quantity = data;
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(quantity);
  res.render("index", { quantity: quantity });
});

app.post("/submit", (req, res) => {
  const userType = req.body.usertype;
  const blueQuantity = Number(req.body.blue);
  const yellowQuantity = Number(req.body.yellow);
  const orangeQuantity = Number(req.body.orange);
  const pinkQuantity = Number(req.body.pink);
  const greenQuantity = Number(req.body.green);

  if (req.body.userType === "free") {
    try {
      mydb.freeCustomer(blueQuantity, pinkQuantity, greenQuantity);
      mydb.updateQuantity("blue", blueQuantity);
      mydb.updateQuantity("pink", pinkQuantity);
      mydb.updateQuantity("green", greenQuantity);
    } catch (error) {
      console.log(err);
    }
  }
  if (req.body.userType === "paid") {
    try {
      mydb.paidCustomer(blueQuantity, orangeQuantity, yellowQuantity);
      mydb.updateQuantity("blue", blueQuantity);
      mydb.updateQuantity("orange", orangeQuantity);
      mydb.updateQuantity("yellow", yellowQuantity);
    } catch (error) {
      console.log(error);
    }
  }
  res.redirect("/");
});

app.listen(2000);
