/*========== menu icon navbar ==========*/
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  /*========== sticky navbar ==========*/
  let header = document.querySelector(".header");

  header.classList.toggle("sticky", window.scrollY > 100);

  /*========== remove menu icon navbar when click navbar link (scroll) ==========*/
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

/*========== swiper ==========*/
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 50,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/*========== dark light mode ==========*/
let darkModeIcon = document.querySelector("#darkMode-icon");

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle("bx-sun");
  document.body.classList.toggle("dark-mode");
};

/*========== scroll reveal ==========*/
ScrollReveal({
  // reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img img", { origin: "left" });
ScrollReveal().reveal(".home-content h3, .home-content p, .about-content", {
  origin: "right",
});

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.json());

// Serve the HTML page
app.use(express.static('public'));

// POST endpoint for handling form submissions
app.post('/submit', (req, res) => {
  const formData = req.body;

  // Send email
  sendEmail(formData)
    .then(() => {
      res.json({ success: true });
    })
    .catch(error => {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, error: 'Failed to send email' });
    });
});

// function saveFormData(event) {
//   event.preventDefault();

//   const full_name = document.getElementById('full_name').value;
//   const email = document.getElementById('email').value;
//   const mobile_number = document.getElementById('mobile_number').value;
//   const subject = document.getElementById('subject').value;
//   const message = document.getElementById('message').value;

//   const formData = {
//     full_name,
//     email,
//     mobile_number,
//     subject,
//     message,
//   };

//   // Retrieve existing data from local storage or initialize an empty array
//   const savedData = JSON.parse(localStorage.getItem('formData')) || [];

//   // Add the new form data to the array
//   savedData.push(formData);

//   // Save the updated data back to local storage
//   localStorage.setItem('formData', JSON.stringify(savedData));

//   // Display the data using Tabulator
//   displayFormData(savedData);
// }

// function displayFormData(data) {
//   // Your Tabulator initialization
//   const table = new Tabulator("#form-data-table", {
//     data: data,
//     columns: [
//       { title: "Full Name", field: "full_name" },
//       { title: "Email", field: "email" },
//       { title: "Mobile Number", field: "mobile_number" },
//       { title: "Subject", field: "subject" },
//       { title: "Message", field: "message" },
//     ],
//   });

//   // Optionally, you can append the table to a specific element
//   // For example, assuming you have a <div id="form-data-table"></div> in your HTML
//   // document.getElementById('form-data-table').appendChild(table.getElement());
// }

