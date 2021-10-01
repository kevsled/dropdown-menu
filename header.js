// Notes:
//  1) https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/


// Using IIFE to run code immediately but keep variables out of global space.
(function createHeader() {
    'use strict';

    // navbar link definitions
    const homeLink = '/';
    const servicesLink = '/views/services';
    const aboutLink = '/views/about';
    const contactLink = '/views/contact.html';

    // social link definitions
    // updating these links will not update social links in the footer file
    const twitterLink   = "https://www.twitter.com";
    const youtubeLink   = "https://www.youtube.com";
    const facebookLink  = "https://www.facebook.com";
    const instagramLink = "https://www.instagram.com";
    const yelpLink      = "https://www.yelp.com";

    // create and populate the header as a template
    // all styling is from header.css except '.maxWidth' which is from index.css
    // .social-item is used solely to hide the element during media queries (changing screen size)
    const headerTemplate = document.createElement('template');
    headerTemplate.innerHTML = `
    <nav class="navbar-container maxWidth">
        <div class="hamburger-box" tabindex="0">
            <div class="hamburger-inner"></div>
        </div>
        <ul class="navbar-list">
            <li class="navbar-item"><a class="navbar-link" href=${homeLink}>Home</a></li>
            <li class="navbar-item"><a class="navbar-link" href=${servicesLink}>Services</a></li>
            <li class="navbar-item"><a class="navbar-link" href=${aboutLink}>About</a></li>
            <li class="navbar-item"><a class="navbar-link" href=${contactLink}>Contact</a></li>
            <li class="navbar-item social-item"><a href=${facebookLink} target="_blank" class="navbar-link navbar-social"><i class="fab fa-facebook-square h-fab"></i></a></li>
            <li class="navbar-item social-item"><a href=${yelpLink} target="_blank" class="navbar-link navbar-social"><i class="fab fa-yelp h-fab"></i></a></li>
        </ul>
    </nav>
    `

    //<!-- <button class="appt-button" type="button" onclick=${buttonHandler}>Request An Appointment</button> -->
    // Display the template content in the header tag (assumes one header per web page)
    const headerElement = document.getElementsByTagName('header')[0];
    headerElement.appendChild(headerTemplate.content);

    // Add event listeners
    const hamburgerBox = document.querySelector(".hamburger-box");
    hamburgerBox.addEventListener('click', clickHamburger);
    hamburgerBox.addEventListener('keydown', keyHamburger);
    document.addEventListener('keydown', escapeHamburger);
    document.querySelector('.navbar-list').addEventListener('click', closeHamburgerOnLink)

    // handles clicks of the hamburger menu icon
    function clickHamburger() {
        animateHamburger();
    }

    // handles key presses when focused on hamburger menu icon
    function keyHamburger(event) {
        const key = event.keyCode;
        const multiPress = (event.shiftKey || event.ctrlKey || event.altKey); // check if shift, ctrl, or alt were also pressed
        const acceptableKey = (key == 13 || key == 32); // ensure only 'enter' and 'spacebar' were pressed
        if(acceptableKey && !multiPress) { animateHamburger() } 
    }

    // handles closing the hamburger menu when 'esc' is pressed
    function escapeHamburger(event) {
        const key = event.keyCode;
        const element = document.querySelector(".menu-opened"); // check if the menu is opened (null if not)
        if(key == 27 && element) {     
            document.querySelector(".hamburger-box").focus(); // change focus to hamburger button otherwise the user can still toggle invisible links
            animateHamburger() 
        }
    }

    // handles closing the hamburger menu when a menu link is navigated to
    function closeHamburgerOnLink(event) {
        const targetClass = event.target.classList;
        const isTarget = targetClass.contains('navbar-link') || targetClass.contains('fab');
        const menuOpen = document.querySelector('.menu-opened');
        if(isTarget && menuOpen) { animateHamburger() }
    }

    function animateHamburger() {
        // get elements
        const elementHamburger = document.querySelector(".hamburger-box");
        const elementNavbar = document.querySelector(".navbar-list");
        const elementBody = document.querySelector("body");

        // change element classes
        elementHamburger.classList.toggle("hamburger-box-active");
        elementHamburger.firstElementChild.classList.toggle("hamburger-active");
        elementNavbar.classList.toggle("menu-opened");
        elementBody.classList.toggle("disableScroll");
    }
})()