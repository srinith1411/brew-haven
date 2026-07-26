// =========================
// NAVBAR ACTIVE LINK
// =========================

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


if(navLinks.length > 0){
    navLinks[0].classList.add("active");
}



// =========================
// RESERVATION FORM
// =========================

const form = document.querySelector("#reservation-form");

if(form){

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const guestsInput = document.querySelector("#guests");
const dateInput = document.querySelector("#date");
const timeInput = document.querySelector("#time-slot");
const messageInput = document.querySelector("#message");

const successMessage = document.querySelector("#success-message");

const navBookBtn = document.querySelector("#nav-book-btn");



// Hide booking button when reservation starts

if(navBookBtn){

navBookBtn.addEventListener("click",()=>{

    successMessage.style.display="none";

    navBookBtn.style.display="none";

});

}



// Existing bookings

let bookings = JSON.parse(
    localStorage.getItem("brewHavenBookings")
) || [];




form.addEventListener("submit",(event)=>{

event.preventDefault();



let name = nameInput.value.trim();

let email = emailInput.value.trim();

let phone = phoneInput.value.trim();

let guests = Number(guestsInput.value);

let date = dateInput.value;

let time = timeInput.value;

let message = messageInput.value.trim();




// Validation

if(name === ""){

alert("Please enter your name");

return;

}



if(email === ""){

alert("Please enter your email");

return;

}



if(!/^[0-9]{10}$/.test(phone)){

alert("Enter valid phone number");

return;

}



if(guests < 1){

alert("Number of guests should be at least 1");

return;

}



if(date === ""){

alert("Please select date");

return;

}



// Future date validation

let selectedDate = new Date(date);

let today = new Date();

today.setHours(0,0,0,0);


if(selectedDate < today){

alert("Please select a future date");

return;

}




if(time === ""){

alert("Please select time slot");

return;

}




// Check existing booking

const slotBooked = bookings.some(booking=>{

return booking.date === date &&
       booking.time === time;

});



if(slotBooked){

successMessage.innerHTML =
`Sorry, this slot is already booked.<br>
Please choose another time.`;

successMessage.style.color="red";

successMessage.style.display="block";

return;

}




// New reservation object

const reservation = {

name:name,

email:email,

phone:phone,

guests:guests,

date:date,

time:time,

message:message

};




// Save booking

bookings.push(reservation);


localStorage.setItem(
"brewHavenBookings",
JSON.stringify(bookings)
);




// Success message

let formattedDate =
new Date(date).toLocaleDateString("en-GB");



successMessage.innerHTML =
`Table booked successfully!<br>
Date: ${formattedDate}<br>
Time: ${time}`;


successMessage.style.color="green";

successMessage.style.display="block";



if(navBookBtn){

navBookBtn.style.display="block";

}



form.reset();



setTimeout(()=>{

successMessage.style.display="none";

},5000);



});


}





// =========================
// DYNAMIC MENU
// =========================


const extraMenuItems = [

{
image:"coldcoffee.png",
name:"Cold Coffee",
description:"Chilled coffee blended with milk and ice for a refreshing taste.",
price:"$5.49"
},

{
image:"filtercoffee.png",
name:"Filter Coffee",
description:"Traditional South Indian coffee prepared with rich aroma and flavor.",
price:"$3.99"
},

{
image:"caramelmacchiato.png",
name:"Caramel Macchiato",
description:"Espresso combined with milk and caramel sweetness.",
price:"$6.99"
},

{
image:"affogato.png",
name:"Affogato",
description:"Hot espresso poured over creamy vanilla ice cream.",
price:"$7.49"
},

{
image:"flatwhite.png",
name:"Flat White",
description:"Smooth espresso with steamed milk and velvety microfoam.",
price:"$5.99"
}

];



const menuBtn = document.querySelector("#view-menu");

const menuGrid = document.querySelector("#menu-grid");


let menuShown=false;



if(menuBtn){


menuBtn.addEventListener("click",()=>{



if(menuShown){


document.querySelectorAll(".extra-card")
.forEach(card=>{

card.remove();

});


menuBtn.textContent="View Full Menu";


menuShown=false;



}

else{



extraMenuItems.forEach(item=>{


menuGrid.insertAdjacentHTML(
"beforeend",

`
<div class="menu-card extra-card">

<img src="assets/${item.image}" alt="${item.name}">

<h3>${item.name}</h3>

<p>${item.description}</p>

<span class="price">${item.price}</span>

</div>


);


});


menuBtn.textContent="Hide Full Menu";


menuShown=true;



}



});


}