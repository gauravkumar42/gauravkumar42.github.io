// ------ CONTACT FORM ------
// Only runs on pages that actually have #contact-form. Previously this was
// unguarded in app.js, so if app.js were ever included on a page without
// the form, `form.addEventListener(...)` would throw and silently kill
// every other script on the page. Guarding it removes that landmine.

(() => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!form) return;

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
})();
