const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();


async function getAuthSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();

  const googleSheets = google.sheets({
    version: "v4",
    auth: client,
  });

  const spreadsheetId = "1sx0cH1gsTob6eOlfzftLg_x15thAmKgBKv-kn_IfIME";
  return {
    auth,
    client,
    googleSheets,
    spreadsheetId,
  };
};

module.exports = getAuthSheets;