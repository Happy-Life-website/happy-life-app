import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCw3BhLvpT_ueVRAxS79I79gnG9GwSLAHQ",
  authDomain: "happy-life-app-ee753.firebaseapp.com",
  databaseURL: "https://happy-life-app-ee753-default-rtdb.firebaseio.com",
  projectId: "happy-life-app-ee753",
  storageBucket: "happy-life-app-ee753.appspot.com",
  messagingSenderId: "738209317344",
  appId: "1:738209317344:web:fb75fe23d828c64a9f6b85",
  measurementId: "G-BSWDHEP283"
};

// ✅ Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ✅ Handle Form
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !phone) {
    showMessage("Please enter all fields.", "orange");
    return;
  }

  try {
    const contactsRef = ref(db, "contacts");
    const newContact = push(contactsRef);
    await set(newContact, {
      name,
      phone,
      timestamp: new Date().toISOString()
    });
    showMessage("Contact saved successfully!", "green");
    document.getElementById("contactForm").reset();
  } catch (error) {
    console.error(error);
    showMessage("Error saving contact.", "red");
  }
});

// ✅ Status Message
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
