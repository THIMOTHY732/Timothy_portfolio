'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const form = event.target;
  const sendButton = form.querySelector(".form-btn span"); // target the text
  const icon = form.querySelector(".form-btn ion-icon");   // target the icon

  // Change button state to "Sending..."
  sendButton.textContent = "Sending...";
  form.querySelector(".form-btn").disabled = true;
  icon.setAttribute("name", "hourglass-outline");

  const params = {
    name: document.querySelector('input[name="name"]').value,
    email: document.querySelector('input[name="email"]').value,
    subject: document.querySelector('input[name="title"]').value,
    message: document.querySelector('textarea[name="message"]').value
  };

  // Use your actual EmailJS service and template IDs
  emailjs.send("service_jvyv6ed", "template_hb84l68", params)
    .then(function(response) {
      // Success state
      sendButton.textContent = "Sent ✅";
      icon.setAttribute("name", "checkmark-circle-outline");

      // Reset form and button after 2 seconds
      setTimeout(() => {
        form.reset();
        sendButton.textContent = "Send Message";
        icon.setAttribute("name", "paper-plane");
        form.querySelector(".form-btn").disabled = false;
      }, 2000);
    }, function(error) {
      // Error state
      sendButton.textContent = "Failed ❌";
      icon.setAttribute("name", "close-circle-outline");

      // Reset button after 2 seconds
      setTimeout(() => {
        sendButton.textContent = "Send Message";
        icon.setAttribute("name", "paper-plane");
        form.querySelector(".form-btn").disabled = false;
      }, 2000);

      console.error("Error:", error);
    });
});


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
 // ======== Smooth Achievements Count-Up Animation ========
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".achievement-number");
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const duration = 1800;
      const startTime = performance.now();

      const updateCount = currentTime => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const value = Math.floor(easedProgress * target);
        counter.textContent = value;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = `${target}+`;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const section = document.querySelector(".achievements-section");
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounters();
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  observer.observe(section);
});



}
