const seatContainer = document.querySelectorAll("#seatContainer button");
const couponInput = document.getElementById("couponInput");
const couponBtn = document.getElementById("couponBtn");
const seatStates = document.getElementById("seatStates");
const defaultText = document.getElementById("defaultText");
const ticketPrice = document.getElementById("ticketPrice");
const selectedSeat = document.getElementById("selectedSeat");
const seatCounter = document.getElementById("seatCounter");
const discountContainer = document.getElementById("discountContainer");
const discountPrice = document.getElementById("discountPrice");
const grandTotal = document.getElementById("grandTotal");
const newArr = [];

for (const seat of seatContainer) {
  seat.addEventListener("click", function (e) {
    if (newArr.includes(e.target)) {
      alert("This is booked. Please select another one.");
      return;
    }

    newArr.push(e.target);

    if (newArr.length > 4) {
      alert(`You can't select more than one 4 seats`);
      return;
    }

    e.target.classList.add("bg-main", "text-white");

    const div = document.createElement("div");
    div.classList.add("flex", "justify-between", "items-center");

    const seatText = document.createElement("p");
    const classText = document.createElement("p");
    const priceText = document.createElement("p");

    div.append(seatText, classText, priceText);
    seatText.innerText = e.target.innerText;
    classText.innerText = "Economy";
    priceText.innerText = 550;

    seatStates.appendChild(div);

    defaultText.classList.add("hidden");

    selectedSeat.innerText = newArr.length;
    ticketPrice.innerText = 550 * newArr.length;

    const availableSeat = Number(seatCounter.innerText) - 1;

    seatCounter.innerText = availableSeat;

    if (newArr.length === 4) {
      couponInput.removeAttribute("disabled");
      couponBtn.removeAttribute("disabled");
    }
  });
}

couponBtn.addEventListener("click", function () {
  const inputValue = couponInput.value;

  if (inputValue === " " || !inputValue) {
    document.getElementById("couponInvalid").classList.remove("hidden");
    return;
  } else {
    document.getElementById("couponInvalid").classList.add("hidden");
  }

  if (inputValue !== "Couple20" && inputValue !== "NEW15") {
    document.getElementById("couponError").classList.remove("hidden");
    return;
  }

  if (inputValue === "Couple20" || inputValue === "NEW15") {
    document.getElementById("couponError").classList.add("hidden");

    couponInput.classList.add("hidden");
    couponBtn.classList.add("hidden");

    discountContainer.classList.remove("hidden");
    discountContainer.classList.add("flex");

    const totalPrice = 550 * newArr.length;

    if (inputValue === "Couple20") {
      const discount = totalPrice * 0.2;
      discountPrice.innerText = "BDT: " + "-" + discount;
      grandTotal.innerText = "BDT: " + (totalPrice - discount);
    } else if (inputValue === "NEW15") {
      const discount = totalPrice * 0.15;
      discountPrice.innerText = "BDT: " + "-" + discount;
      grandTotal.innerText = "BDT: " + (totalPrice - discount);
    }
  }
});
