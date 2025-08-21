const jwt = require('jsonwebtoken');
const FileManager = require('../services/fileManager');
const { upvoteFile, downvoteFile, removeUpvote, removeDownvote } = require('../models/rating');
const logger = require('../utils/logger');

const fileManager = FileManager.getInstance();

async function getFilesMetadata(req, res) {
  try {
    const files = await fileManager.getListFilesMetadata(req.body);
    return res.status(200).json(files);
  } catch (err) {
    logger.error(err.message);
    return res.status(500).render('500');
  }
}

async function handleUpvote(req, res) {
  try {
    const { fileId } = req.body;
    const token = req.cookies.itrbauth;
    const verifyUser = jwt.verify(token, process.env.SECRET);
    const userId = verifyUser.username;
    await upvoteFile(fileId, userId);
    return res.status(200).send('Upvoted successfully');
  } catch (err) {
    logger.error(err.message);
    return res.status(500).send(err.message);
  }
}

async function handleDownvote(req, res) {
  try {
    const { fileId } = req.body;
    const token = req.cookies.itrbauth;
    const verifyUser = jwt.verify(token, process.env.SECRET);
    const userId = verifyUser.username;
    await downvoteFile(fileId, userId);
    return res.status(200).send('Downvoted successfully');
  } catch (err) {
    logger.error(err.message);
    return res.status(500).send(err.message);
  }
}

async function removeUserUpvote(req, res) {
  try {
    const { fileId } = req.body;
    const token = req.cookies.itrbauth;
    const verifyUser = jwt.verify(token, process.env.SECRET);
    const userId = verifyUser.username;
    await removeUpvote(fileId, userId);
    return res.status(200).send('Upvote removed successfully');
  } catch (err) {
    logger.error(err.message);
    return res.status(500).send(err.message);
  }
}

async function removeUserDownvote(req, res) {
  try {
    const { fileId } = req.body;
    const token = req.cookies.itrbauth;
    const verifyUser = jwt.verify(token, process.env.SECRET);
    const userId = verifyUser.username;
    await removeDownvote(fileId, userId);
    return res.status(200).send('Downvote removed successfully');
  } catch (err) {
    logger.error(err.message);
    return res.status(500).send(err.message);
  }
}

async function facultyUpload(req, res) {
  try {
    const { body, file } = req;
    const fileId = await fileManager.uploadToDrive(body, file);
    const token = req.cookies.itrbauth;
    const verifyUser = jwt.verify(token, process.env.SECRET);
    const userId = verifyUser.username;
    logger.info(`File '${req.body.fileName}' added by '${userId}' with ID = '${fileId}'`);
    return res.sendStatus(200);
  } catch (err) {
    logger.error(err.message);
    return res.sendStatus(504);
  }
}

async function facultyDeleteFile(req, res) {
  try {
    const fileId = req.body.fileToBeDeleted;
    await fileManager.deleteFile(fileId);
    const token = req.cookies.itrbauth;
    const verifyUser = jwt.verify(token, process.env.SECRET);
    const userId = verifyUser.username;
    logger.info(`File deleted by '${userId}' having ID = '${fileId}'`);
    return res.sendStatus(200);
  } catch (err) {
    logger.error(err.message);
    return res.sendStatus(504);
  }
}

async function downloadFile(req, res) {
  try {
    const fileId = req.query.fileId;
    await fileManager.downloadFileStream(fileId, res);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).send('Error downloading file');
  }
}

module.exports = {
  getFilesMetadata,
  handleUpvote,
  handleDownvote,
  removeUserUpvote,
  removeUserDownvote,
  facultyUpload,
  facultyDeleteFile,
  downloadFile,
};


