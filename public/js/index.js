let field = document.querySelector("#field");
let free = document.querySelectorAll(".free-row");
let paid = document.querySelectorAll(".paid-row");

document.addEventListener("keyup", (e) => {
  console.log(field.value);
});

console.log("hello");

field.addEventListener("change", (e) => {
  hideShowRow();
});

paid.forEach((item, index, arr) => {
  item.style.display = "none";
});
free.forEach((item, index, arr) => {
  item.style.display = "block";
});

function hideShowRow() {
  if (field.value == "paid") {
    // free.forEach((item, index, arr) => {
    //   item.classList.add("hide");
    // });
    free.forEach((item, index, arr) => {
      item.style.display = "none";
    });
    paid.forEach((item, index, arr) => {
      item.style.display = "block";
      item.style.width = "100%";
    });
  } else if (field.value == "free") {
    paid.forEach((item, index, arr) => {
      item.style.display = "none";
    });
    free.forEach((item, index, arr) => {
      item.style.display = "block";
      item.style.width = "100%";
    });
  }
}
