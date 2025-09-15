// Make sure to wrap everything after the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // 🔥 Your Supabase config
  const SUPABASE_URL = "https://boavgvgvaqgoatzhvvzk.supabase.co"; // replace with your URL
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvYXZndmd2YXFnb2F0emh2dnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MjI1OTIsImV4cCI6MjA3MzQ5ODU5Mn0.IFnYM79NJBJcWa_gVxFRfs3VQWQIfHnP1nXoxWzbMjs"; // replace with your anon key

  // Initialize Supabase client
  const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Handle form submission
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
      const { data, error } = await supabase
        .from("contacts")
        .insert([{ name, phone }]);

      if (error) throw error;

      showMessage("Contact saved successfully!", "green");
      form.reset();
    } catch (err) {
      console.error(err);
      showMessage("Something went wrong. Please try again.", "red");
    }
  });

  // Function to show status message
  function showMessage(msg, color) {
    statusMsg.textContent = msg;
    statusMsg.style.color = color;
    statusMsg.style.display = "block";
    setTimeout(() => {
      statusMsg.style.display = "none";
    }, 3000);
  }
});
