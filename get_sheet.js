const getAuthSheets = require("./autentica.js");

async function main(){
    const {googleSheets,auth,spreadsheetId} = await getAuthSheets();
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: spreadsheetId,
        range: "engenharia_de_software",
        valueRenderOption:  "UNFORMATTED_VALUE",
        dateTimeRenderOption: "FORMATTED_STRING",
    });
    console.log(getRows.data.values);
}
main()