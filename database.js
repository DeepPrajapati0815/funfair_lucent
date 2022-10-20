var mysql = require("mysql");

var con = mysql.createConnection({
  host: "ap-south.connect.psdb.cloud",
  database: "my_db",
  username: "8d9o278ekg9f6x1wtko8",
  password: "pscale_pw_5OkEUhx1snKT1nl8l0EWsTo1V1330MUdO5wDJy27z2H",
});

async function getTransactionData() {
  await con.connect(function (err) {
    if (err) console.log(err);
    console.log("Connected!");

    var sql = "SELECT * FROM transactions;";
    con.query(sql, function (err, result) {
      if (err) console.log(err);
      console.log(result);
    });
  });
}

getTotalQuantity = function () {
  return new Promise(function (resolve, reject) {
    con.query("SELECT * from coins;", function (err, rows) {
      if (rows === undefined) {
        reject(new Error("Error rows is undefined"));
      } else {
        resolve(rows);
      }
    });
  });
};

async function updateQuantity(color, selectedQuanitity) {
  await con.connect(function (err) {
    if (err) console.log(err);
    console.log("Connected!");

    var sql = `update coins set currentQuantity = currentQuantity - ${selectedQuanitity},leftQuantity = leftQuantity + ${selectedQuanitity} where colour = '${color}';`;
    con.query(sql, function (err, result) {
      if (err) console.log(err);
      console.log(result);
    });
  });
}

// console.log(getTotalQuantity());
// console.log(updateQuantity("blue", 3));

async function freeCustomer(blueQuanity, pinkQuantity, greenQunatity) {
  const bluePrice = blueQuanity * 5;
  const pinkPrice = pinkQuantity * 20;
  const greenPrice = greenQunatity * 10;
  const totalPrice = bluePrice + pinkPrice + greenPrice;

  con.connect(function (err) {
    if (err) {
      console.log(err);
    }
    console.log("Connected!");

    var sql = `insert into transactions (yellow,blue,green,pink,orange,price,customerType) 
    values (0,${blueQuanity},${greenQunatity},${pinkQuantity},0,${totalPrice},"free")`;
    con.query(sql, function (err, result) {
      if (err) console.log(err);
      console.log(result);
    });
  });
}

// console.log(freeCustomer(2, 3, 1));

async function paidCustomer(blueQuanity, orangeQuantity, yellowQunatity) {
  const bluePrice = blueQuanity * 5;
  const orangePrice = orangeQuantity * 20;
  const yellowPrice = yellowQunatity * 10;
  const totalPrice = bluePrice + orangePrice + yellowPrice;

  await con.connect(function (err) {
    if (err) console.log(err);
    console.log("Connected!");

    var sql = `insert into transactions (yellow,blue,green,pink,orange,price,customerType) 
    values (${yellowPrice},${blueQuanity},0,0,${orangePrice},${totalPrice},"paid")`;
    con.query(sql, function (err, result) {
      if (err) console.log(err);
      console.log(result);
    });
  });
}

// console.log(paidCustomer(3, 2, 2));
// console.log(getTransactionData());

module.exports = {
  con,
  getTransactionData,
  getTotalQuantity,
  updateQuantity,
  freeCustomer,
  paidCustomer,
};
