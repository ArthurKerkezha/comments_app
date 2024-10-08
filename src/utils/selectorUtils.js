import { isEmpty, uniqWith } from "lodash";

export const getUniqComments = (commentA, commentB) =>
  commentA.id === commentB.id &&
  commentA.user.fullName === commentB.user.fullName &&
  commentA.body === commentB.body;

export const filteredWithAddedComments = (comments, addedComments) => {
  if (isEmpty(addedComments) || isEmpty(comments)) {
    return comments;
  }

  // TODO this is just for demonstration purposes only, it's not good to do this.
  return uniqWith([...addedComments, ...comments], getUniqComments);
};

export const filteredWithRemovedComments = (comments, removedComments) => {
  if (isEmpty(removedComments)) {
    return comments;
  }

  // TODO this is just for demonstration purposes only, it's not good to do this.
  return comments.filter((comment) =>
    removedComments.every(
      (removedComment) => !getUniqComments(comment, removedComment),
    ),
  );
};
