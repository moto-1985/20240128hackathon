// use in get method
const JAPAN_TIME = Utilities.formatDate(new Date(new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })), "GMT+9", "yyyy/MM/dd");

// use in post method
const CREATE = "CREATE";
const DELETE = "DELETE";
const DATE_FORMAT = "yyyy/MM/dd";
const DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
const MAX_BODY_LENGTH = 500;
const QUERY_PREFIX = "after:";
const QUERY_SUFFIX = " is:unread category:primary";
const MESSAGE_TEMPLATE = "メッセージID: ${messageId} 受信日時: ${receivedDate}, 件名: ${subject}, 送信者: ${from}, 本文: ${truncatedBody}";
const SECONDS_IN_A_DAY = 86400;
const START_UNIX_TIME_CONSTANT = (dateString) => Math.floor(new Date(dateString).getTime() / 1000);

// error message
const ERROR_MESSAGES =
{
  DATE_FORMAT: "Invalid date format. Please use YYYY/MM/DD.",
  NO_POST_DATA: "No post data received",
  INVALID_PATH: "Invalid path",
  EMAIL_NOT_FOUND: "Email not found",
  EMAIL_DELETED: "Email deleted"
}