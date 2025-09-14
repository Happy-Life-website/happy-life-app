console.log("Firebase Contact JS loaded");

// 🔥 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCw3BhLvpT_ueVRAxS79I79gnG9GwSLAHQ",
  authDomain: "happy-life-app-ee753.firebaseapp.com",
  databaseURL: "https://console.firebase.google.com/project/happy-life-app-ee753/database/happy-life-app-ee753-default-rtdb/data/~2F",
  projectId: "happy-life-app-ee753",
  storageBucket: "happy-life-app-ee753.appspot.com",
  messagingSenderId: "738209317344",
  appId: "1:738209317344:web:fb75fe23d828c64a9f6b85",
  measurementId: "G-BSWDHEP283"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ✅ Handle Form Submission
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  console.log("Form submitted");

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !phone) {
    console.log("Validation failed");
    showMessage("Please enter all fields.", "orange");
    return;
  }

  db.ref("contacts").push({
    name: name,
    phone: phone,
    timestamp: new Date().toISOString()
  })
  .then(() => {
    console.log("Data pushed successfully");
    showMessage("Contact saved successfully!", "green");
    document.getElementById("contactForm").reset();
  })
  .catch((error) => {
    console.error("Error saving contact:", error);
    showMessage("Error saving contact.", "red");
  });
});

// ✅ Show status message
function showMessage(msg, color) {
  const el = document.getElementById("statusMsg");
  el.textContent = msg;
  el.style.color = color;
  el.style.display = "block";
  setTimeout(() => { el.style.display = "none"; }, 3000);
}

// 💡 Blinking Emergency Header
setInterval(() => {
  const header = document.getElementById("emergency-header");
  if (header) header.style.visibility = (header.style.visibility === "hidden") ? "visible" : "hidden";
}, 1000);
