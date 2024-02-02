const getAuthSheets = require("./autentica");

async function main(){
    const {googleSheets,auth,spreadsheetId} = await getAuthSheets();
    const {values} = {
      "values":[
        ["0",	"alex",	"8",	"35",	"63",	"61", "reprovado",	"6,5"]
      ]
    }
    const rows = await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "engenharia_de_software",
        valueInputOption: "USER_ENTERED",
        resource:{
          values:values,
        }
    });
    rows.data;
}
main()