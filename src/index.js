function doGet(e) {
  const searchDate = e?.parameter?.searchDate ?? JAPAN_TIME;

  if (searchDate && !isValidDateFormat(searchDate)) {
    return handleException(ERROR_MESSAGE.DATE_FORMAT)
  }
  const messagesInfo = getUnreadEmailsSummary(searchDate);
  return ContentService.createTextOutput(JSON.stringify(messagesInfo)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e.postData.contents) {
      throw new Error(ERROR_MESSAGE.NO_POST_DATA);
    }

    const requestBody = JSON.parse(e.postData.contents);
    let result;

    switch (requestBody.path) {
      case "CREATE":
        result = createDraft(requestBody);
        break;
      case "DELETE":
        result = deleteEmail(requestBody);
        break;
      default:
        throw new Error(ERROR_MESSAGE.INVALID_PATH);
    }

    return createJsonOutput(result);
  } catch (error) {
    return handleException(error);
  }
}

function testDoGet() {
  Logger.log(doGet());
}

function testDoPostCreate() {
  const testDataCreate = {
    postData: {
      contents: JSON.stringify({
        path: "CREATE",
        from: "example@example.com",
        subject: "Test Subject",
        body: "Test Body"
      })
    }
  };

  const responseCreate = doPost(testDataCreate);
  Logger.log("Create Response: " + responseCreate.getContent());
}

function testDoPostDelete() {
  const testDataDelete = {
    postData: {
      contents: JSON.stringify({
        path: "DELETE",
        messageId: "18d4a9f0446a4992"
      })
    }
  };

  const responseDelete = doPost(testDataDelete);
  Logger.log("Delete Response: " + responseDelete.getContent());
}