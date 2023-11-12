import { onLoad } from "./utils/utils.js";
import { logOut } from "./utils/utils.js";

onLoad();

// SET NUMBER OF AVAILABLE TICKETS PER CITY
let tickets = {
  madison: 2,
  omaha: 1,
  boulder: 2,
};

// INITIALIZE BUTTON TEXTS AND N° OF TICKETS ACCORDING TO TICKET AVAILABILITY

let buttons = document.querySelectorAll(".ticketButton");

for (let i = 0; i < buttons.length; i++) {
  let cityName = buttons[i].id.slice(0, buttons[i].id.indexOf("Button"));
  if (tickets[cityName] < 1) {
    buttons[i].textContent = "SOLD OUT";
    buttons[i].classList.add("line-through");
  } else {
    buttons[i].textContent = "BUY TICKETS";
  }
}

let numberOfTicketSpans = document.querySelectorAll(".numberOfTickets");

for (let i = 0; i < numberOfTicketSpans.length; i++) {
  let cityName = numberOfTicketSpans[i].id.slice(
    0,
    numberOfTicketSpans[i].id.indexOf("NumberOfTickets")
  );
  numberOfTicketSpans[i].textContent = ` ${tickets[cityName]}`;
}

// TICKET PURCHASE FUNCTION - MODIFY BUTTONS IF TICKETS NO LONGER AVAILABLE FOR A CITY

let getTickets = (place, noTickets) => {
  if (noTickets < 1) {
    swal(
      "No tickes available",
      `Sorry, the concert in ${place} is sold out :(`,
      "error"
    );
  } else {
    tickets[place]--;
    disableSoldOutButtons(place);
    swal(
      "Ticket purchased!",
      `You have your ticket for the concert in ${place}. Enjoy!`,
      "success"
    );
  }
};

// HELPER FUNCTIONS
// disable sold out buttons

function disableSoldOutButtons(place) {
  document.querySelector(`#${place}NumberOfTickets`).textContent =
    tickets[place];
  if (tickets[place] < 1) {
    buttons = document.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].id === place.toLowerCase() + "Button") {
        buttons[i].textContent = "SOLD OUT";
        buttons[i].classList.add("line-through");
      }
    }
  }
}

// BUTTON SPECIFIC FUNCTIONS

let getTicketsMadison = () => {
  getTickets("madison", tickets["madison"]);
};

let getTicketsOmaha = () => {
  getTickets("omaha", tickets["omaha"]);
};

let getTicketsBoulder = () => {
  getTickets("boulder", tickets["boulder"]);
};

// CHECK USER AGE - IF YOUNGER THAN 18 CAN'T BUY TICKETS
/*
let userAge = Number(prompt('How old are you?'));

while(isNaN(userAge)) {
    userAge = Number(prompt('Please enter your real age in numbers.'));
}

if(userAge < 18) {
    swal("You can't buy tickets", 'Sorry, you have to be at least 18 years old to buy tickets :(', 'error');
    let ticketButtons = document.querySelectorAll('.ticketButton');
    for(let i = 0; i < ticketButtons.length; i++) {
        ticketButtons[i].disabled = true;
        ticketButtons[i].classList.add('line-through');
        ticketButtons[i].classList.add('bg-red-500');
        ticketButtons[i].classList.remove('hover:bg-opacity-10');
        ticketButtons[i].classList.remove('hover:bg-neutral-500');
    }
}
*/
