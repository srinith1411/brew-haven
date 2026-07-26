const nl = document.querySelectorAll('.nav-links a');

nl.forEach(link=>{
    link.addEventListener('click',()=>{
        change(link);
    });
});

function change(link){
    nl.forEach(link=>link.classList.remove('active'));
    link.classList.add('active');
}


// Reservation Form

const form = document.querySelector("#reservation-form");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const guestsInput = document.querySelector("#guests");
const dateInput = document.querySelector("#date");
const timeInput = document.querySelector("#time");
const messageInput = document.querySelector("#message");

const successMessage = document.querySelector("#success-message");


form.addEventListener("submit", function(event){

    event.preventDefault();

    let name = nameInput.value;
    let email = emailInput.value;
    let phone = phoneInput.value;
    let guests = guestsInput.value;
    let date = dateInput.value;
    let time = timeInput.value;
    let message = messageInput.value;


    if(name === ""){
        alert("Please enter your name");
        return;
    }

    if(email === ""){
        alert("Please enter your email");
        return;
    }

    if(phone.length !== 10){
        alert("Enter valid phone number");
        return;
    }

    if(guests < 1){
        alert("Number of guests should be at least 1");
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


// Dynamic Menu

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


menuBtn.addEventListener("click", function(event){

    event.preventDefault();


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

            menuGrid.innerHTML += `

            <div class="menu-card extra-card">

                <img src="assets/${item.image}" alt="${item.name}">

                <h3>${item.name}</h3>

                <p>${item.description}</p>

                <span class="price">${item.price}</span>

            </div>

            `;

        });


        menuBtn.textContent = "Hide Full Menu";

        menuShown = true;

    }

});