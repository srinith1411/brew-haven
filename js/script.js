const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        changeActive(link);
    });
});

function changeActive(link){
    navLinks.forEach(link => {
        link.classList.remove("active");
    });

    link.classList.add("active");
}

navLinks[0].classList.add("active");


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

const hourInput = document.querySelector("#hour");
const minuteInput = document.querySelector("#minute");
const periodInput = document.querySelector("#period");

const messageInput = document.querySelector("#message");

const successMessage = document.querySelector("#success-message");


form.addEventListener("submit", function(event){

    event.preventDefault();


    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let phone = phoneInput.value.trim();
    let guests = guestsInput.value;
    let date = dateInput.value;

    let time = `${hourInput.value}:${minuteInput.value} ${periodInput.value}`;

    let message = messageInput.value.trim();


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


    if(hourInput.value === "" || minuteInput.value === "" || periodInput.value === ""){
        alert("Please select booking time");
        return;
    }


    const reservation = {

        name:name,
        email:email,
        phone:phone,
        guests:guests,
        date:date,
        time:time,
        message:message

    };


    localStorage.setItem(
        "reservation",
        JSON.stringify(reservation)
    );


    successMessage.textContent = "Table booked successfully!";

    form.reset();

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

let menuShown = false;


if(menuBtn){

menuBtn.addEventListener("click", function(){

    if(menuShown){

        const extraCards = document.querySelectorAll(".extra-card");

        extraCards.forEach(card=>{
            card.remove();
        });


        menuBtn.textContent = "View Full Menu";

        menuShown = false;

    }
    else{


        extraMenuItems.forEach(item=>{

            menuGrid.insertAdjacentHTML("beforeend",`

                <div class="menu-card extra-card">

                    <img src="assets/${item.image}" alt="${item.name}">

                    <h3>${item.name}</h3>

                    <p>${item.description}</p>

                    <span class="price">${item.price}</span>

                </div>

            `);

        });


        menuBtn.textContent = "Hide Full Menu";

        menuShown = true;

    }

});

}