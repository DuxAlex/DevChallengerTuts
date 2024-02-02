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

async function main() {
  const googleSheets = await configureGoogleSheetsAPI();

  async function retrieveData(googleSheets, spreadsheetId, range) {
    const response = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
  }

  function processStudentData(data) {
    const processedData = data.map((row) => {
      const [matricula, aluno, faltas, p1, p2, p3] = row;
      const totalAulas = 100; // Assuming total number of classes
      const maxFaltas = totalAulas * 0.25;

      if (faltas > maxFaltas) {
        return [...row, "Reprovado por Falta", 0];
      }

      const average = math.mean([
        parseFloat(p1),
        parseFloat(p2),
        parseFloat(p3),
      ]);
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
    const spreadsheetId = "1sx0cH1gsTob6eOlfzftLg_x15thAmKgBKv-kn_IfIME"; // Replace with your spreadsheet ID
    const range = "engenharia_de_software"; // Replace with your actual range

    // Retrieve data
    const data = await retrieveData(googleSheets, spreadsheetId, range);

    // Process data
    const processedData = processStudentData(data);

    // Update Google Sheet
    const updateRange = `${range}!A4:H${processedData.length + 1}`; // Adjust range based on processed data
    await updateGoogleSheet(
      googleSheets,
      spreadsheetId,
      updateRange,
      processedData
    );
  }

}
main().catch(console.error);
//main().then((resultado) => { console.log(resultado); }).catch((erro) => { console.error(erro); });