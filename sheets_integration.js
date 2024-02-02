const { google } = require("googleapis");
const dotenv = require("dotenv");
const math = require("mathjs");

dotenv.config();

async function configureGoogleSheetsAPI() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  return googleSheets;
}

async function retrieveData(googleSheets, spreadsheetId, range) {
  const response = await googleSheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  return response.data.values;
}

function processStudentData(data) {
  if (!Array.isArray(data)) {
    console.error("Data is not an array");
    return [];
  }

  const processedData = data.map((row) => {
    const [matricula, aluno, faltas, p1, p2, p3] = row;
    const totalAulas = 60;
    const maxFaltas = totalAulas * 0.25;

    if (faltas > maxFaltas) {
      return [...row, "Reprovado por Falta", 0];
    }

    const average = math.mean([parseFloat(p1), parseFloat(p2), parseFloat(p3)]);
    let situation = "";
    let naf = 0;

    if (average < 5) {
      situation = "Reprovado por Nota";
    } else if (average >= 5 && average < 7) {
      situation = "Exame Final";
      naf = math.ceil(10 - average); // Calculate NAF, rounded up
    } else {
      situation = "Aprovado";
    }

    return [...row, situation, naf];
  });

  return processedData;
}

async function updateGoogleSheet(googleSheets, spreadsheetId, range, values) {
  await googleSheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    resource: {
      values,
    },
  });
}

async function main() {
  const googleSheets = await configureGoogleSheetsAPI();
  const spreadsheetId = "1sx0cH1gsTob6eOlfzftLg_x15thAmKgBKv-kn_IfIME";
  const range = "engenharia_de_software!A4:F27"

  const data = await retrieveData(googleSheets, spreadsheetId, range);

  const processedData = processStudentData(data);

  const updateRange = `engenharia_de_software!A4:H27${processedData.length + 1}`; // Adjust this to match the range of the original data
  await updateGoogleSheet(
    googleSheets,
    spreadsheetId,
    updateRange,
    processedData
  );
}

main().catch(console.error);
