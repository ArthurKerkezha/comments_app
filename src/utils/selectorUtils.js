export const getUniqComments = (commentA, commentB) =>
  commentA.id === commentB.id &&
  commentA.user.fullName === commentB.user.fullName &&
  commentA.body === commentB.body;
