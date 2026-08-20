//------ CONTACT FORM -----

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  status.textContent = "Sending...";

  const formData = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim(),
  };

  try {
    const response = await fetch(
      "https://gauravkumar42githubio-production.up.railway.app/api/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      status.textContent = "✅ Message sent successfully!";
      form.reset();
    } else {
      status.textContent = `❌ ${data.message}`;
    }

  } catch (error) {
    console.error("Error:", error);
    status.textContent = "⚠️ Error sending message.";
  }
});

  // Scroll Animation 

  const reveals = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);