getUnreadEmailsSummary = (searchDate) => {
  const targetDate = new Date(searchDate);
  const dateString = Utilities.formatDate(targetDate, Session.getScriptTimeZone(), DATE_FORMAT);
  const startUnixTime = START_UNIX_TIME_CONSTANT(dateString);
  const endUnixTime = startUnixTime + SECONDS_IN_A_DAY;
  const query = `${QUERY_PREFIX}${startUnixTime} before:${endUnixTime}${QUERY_SUFFIX}`;
  const threads = GmailApp.search(query);
  const emailSummaries = [];

  for (let i = 0; i < threads.length; i++) {
    const messages = threads[i].getMessages();
    for (let j = 0; j < messages.length; j++) {
      const message = messages[j];
      const messageId = message.getId();
      const receivedDate = Utilities.formatDate(message.getDate(), Session.getScriptTimeZone(), DATE_TIME_FORMAT);
      const subject = message.getSubject();
      const from = message.getFrom();
      const body = message.getPlainBody();
      const truncatedBody = body.substring(0, MAX_BODY_LENGTH);
      const formattedMessage = MESSAGE_TEMPLATE
        .replace("${messageId}", messageId)
        .replace("${receivedDate}", receivedDate)
        .replace("${subject}", subject)
        .replace("${from}", from)
        .replace("${truncatedBody}", truncatedBody);

      emailSummaries.push(formattedMessage);
    }
  }

  return emailSummaries.join("\n");
}

createDraft = ({ from, subject, body }) => {
  const draft = GmailApp.createDraft(from, subject, body);
  return { draftId: draft.getId() };
}

deleteEmail = ({ messageId }) => {
  const message = GmailApp.getMessageById(messageId);
  if (!message) {
    throw new Error(ERROR_MESSAGES.EMAIL_NOT_FOUND);
  }

  const subject = message.getSubject();
  const from = message.getFrom();
  const date = message.getDate();
  message.moveToTrash();

  return {
    message: ERROR_MESSAGES.EMAIL_DELETED,
    deletedEmailInfo: {
      messageId,
      subject,
      from,
      date: date.toString()
    }
  };
}