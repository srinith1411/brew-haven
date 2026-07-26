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



// Hide booking button when entering reservation

if(navBookBtn){

navBookBtn.addEventListener("click",()=>{

    navBookBtn.style.display="none";

});

}



// Store bookings

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

if(name===""){
alert("Please enter your name");
return;
}


if(email===""){
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


if(date===""){
alert("Please select date");
return;
}



// Future date check

let selectedDate = new Date(date);

let today = new Date();

today.setHours(0,0,0,0);


if(selectedDate < today){

alert("Please select a future date");

return;

}



if(time===""){

alert("Please select time slot");

return;

}




// Check duplicate slot

let slotBooked = bookings.some(booking=>{

return booking.date === date &&
       booking.time === time;

});



if(slotBooked){

successMessage.innerHTML =
"Sorry, this slot is already booked. Please choose another time.";

successMessage.style.color="red";
successMessage.style.display="block";

return;

}





// Create reservation object

let reservation = {

name:name,
email:email,
phone:phone,
guests:guests,
date:date,
time:time,
message:message

};




// Save

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



// Clear form

form.reset();




// After 5 seconds

setTimeout(()=>{


// Hide message

successMessage.style.display="none";



// Show button again

if(navBookBtn){

navBookBtn.style.display="";

}



// Scroll home

document.querySelector("#hero")
.scrollIntoView({
behavior:"smooth"
});



},5000);



});


}