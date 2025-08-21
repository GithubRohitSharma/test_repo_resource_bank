const File = require('./file');

async function createFileInfo(fileId) {
  const existingFile = await File.findOne({ fileId });
  if (!existingFile) {
    const newFile = new File({ fileId });
    await newFile.save();
  }
}

async function deleteFileInfo(fileId) {
  const result = await File.deleteOne({ fileId });
}

async function upvoteFile(fileId, userId) {
  // Ensure document exists and add upvote while removing any downvote
  await File.updateOne(
    { fileId },
    { $pull: { downvotes: userId }, $addToSet: { upvotes: userId } },
    { upsert: true }
  );
}

async function downvoteFile(fileId, userId) {
  // Ensure document exists and add downvote while removing any upvote
  await File.updateOne(
    { fileId },
    { $pull: { upvotes: userId }, $addToSet: { downvotes: userId } },
    { upsert: true }
  );
}

async function removeUpvote(fileId, userId) {
  await File.updateOne(
    { fileId },
    { $pull: { upvotes: userId } }
  );
}

async function removeDownvote(fileId, userId) {
  await File.updateOne(
    { fileId },
    { $pull: { downvotes: userId } }
  );
}

async function getFileVotesStatus(fileId, userId) {
  const file = await File.findOne({ fileId });
  if (!file) {
    return { upvotesCount: 0, downvotesCount: 0, userStatus: 'none' };
  }
  const upvotesCount = file.upvotes.length;
  const downvotesCount = file.downvotes.length;
  const userStatus = file.upvotes.includes(userId)
    ? 'upvoted'
    : (file.downvotes.includes(userId) ? 'downvoted' : 'none');

  return {
    upvotesCount,
    downvotesCount,
    userStatus
  };
}

module.exports = {createFileInfo, deleteFileInfo, upvoteFile, downvoteFile, removeUpvote, removeDownvote, getFileVotesStatus}