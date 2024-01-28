isValidDateFormat = (dateString) => {
  const regex = /^\d{4}\/\d{2}\/\d{2}$/;
  return regex.test(dateString);
}
createJsonOutput = (result) => {
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
handleException = (error) => {
  return ContentService.createTextOutput(
    JSON.stringify({ error: error.toString() })
  ).setMimeType(ContentService.MimeType.JSON);
}