// ------ CONTACT FORM ------
// Only runs on pages that have #contact-form, guarded so a missing form
// can't throw and silently kill other scripts on the page.

(() => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    status.textContent = 'Sending...';

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    try {
      const response = await fetch(
        'https://gauravkumar42githubio-production.up.railway.app/api/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        status.textContent = '✅ Message sent successfully!';
        form.reset();
      } else {
        status.textContent = `❌ ${data.message}`;
      }
    } catch (error) {
      console.error('Error:', error);
      status.textContent = '⚠️ Error sending message.';
    }
  });
})();