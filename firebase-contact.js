// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCw3BhLvpT_ueVRAxS79I79gnG9GwSLAHQ",
  authDomain: "happy-life-app-ee753.firebaseapp.com",
  databaseURL: "https://happy-life-app-ee753-default-rtdb.firebaseio.com", // IMPORTANT
  projectId: "happy-life-app-ee753",
  storageBucket: "happy-life-app-ee753.appspot.com",
  messagingSenderId: "738209317344",
  appId: "1:738209317344:web:fb75fe23d828c64a9f6b85",
  measurementId: "G-BSWDHEP283"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ✅ Handle form submission
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !phone) {
    showMessage("Please enter all fields.", "orange");
    return;
  }

  // Save to Realtime Database
  db.ref("contacts").push({
    name: name,
    phone: phone,
    timestamp: new Date().toISOString()
  })
  .then(() => {
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
  const statusMsg = document.getElementById("statusMsg");
  statusMsg.textContent = msg;
  statusMsg.style.color = color;
  statusMsg.style.display = "block";
  setTimeout(() => {
    statusMsg.style.display = "none";
  }, 3000);
}
