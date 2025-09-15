document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const statusMsg = document.getElementById("statusMsg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !phone) {
      showMessage("Please enter all fields.", "orange");
      return;
    }

    try {
      const response = await fetch("/.netlify/functions/submitContact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });

      const result = await response.json();

      if (response.ok) {
        showMessage("Contact saved successfully!", "green");
        form.reset();
      } else {
        showMessage(result.error || "Something went wrong.", "red");
      }
    } catch (err) {
      console.error(err);
      showMessage("Something went wrong. Please try again.", "red");
    }
  });

  function showMessage(msg, color) {
    statusMsg.textContent = msg;
    statusMsg.style.color = color;
    statusMsg.style.display = "block";
    setTimeout(() => {
      statusMsg.style.display = "none";
    }, 3000);
  }
});
