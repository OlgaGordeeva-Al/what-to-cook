const fetch = require("node-fetch");

async function translator(words) {
  const response = await fetch(process.env.TRANSLATEAPI, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.IMTOKEN}`
    },
    body: JSON.stringify({
      folder_id: process.env.FOLDERID,
      texts: [words],
      targetLanguageCode: "ru"
    })
  })
  
  const result = await response.json()
  
  return result.translations[0].text
}

module.exports = {translator};
