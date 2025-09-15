// Initialize Supabase (do NOT include <script> tag here)
const SUPABASE_URL = "https://boavgvgvaqgoatzhvvzk.supabase.co"; // replace with your URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvYXZndmd2YXFnb2F0emh2dnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MjI1OTIsImV4cCI6MjA3MzQ5ODU5Mn0.IFnYM79NJBJcWa_gVxFRfs3VQWQIfHnP1nXoxWzbMjs"; // replace with your key

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Handle form submission
document.getElementById("contactForm").addEventListener("submit", async (e) => {
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
    document.getElementById("contactForm").reset();
  } catch (err) {
    console.error(err);
    showMessage("Something went wrong. Please try again.", "red");
  }
});

// Show status message
function showMessage(msg, color) {
  const statusMsg = document.getElementById("statusMsg");
  statusMsg.textContent = msg;
  statusMsg.style.color = color;
  statusMsg.style.display = "block";
  setTimeout(() => {
    statusMsg.style.display = "none";
  }, 3000);
}
