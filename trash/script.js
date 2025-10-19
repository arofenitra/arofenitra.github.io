// This is the JavaScript code for the contact section

// Get the contact form element
var contactForm = document.getElementById("contact-form");

// Add an event listener for the submit event
contactForm.addEventListener("submit", function(event) {
  // Prevent the default action of the form
  event.preventDefault();

  // Get the form data
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Create a confirmation alert
  alert("Thank you, " + name + ", for contacting us. We have received your message and will reply to you at " + email + " soon.");
});
