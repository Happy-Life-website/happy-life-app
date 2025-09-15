// netlify/functions/submitContact.js
const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, phone } = JSON.parse(event.body);

    if (!name || !phone) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing fields" }) };
    }

    // Save to a JSON file (simple backend)
    const filePath = path.resolve(__dirname, "contacts.json");
    let contacts = [];
    if (fs.existsSync(filePath)) {
      contacts = JSON.parse(fs.readFileSync(filePath));
    }
    contacts.push({ name, phone, timestamp: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Contact saved successfully!" }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
