const fs = require('fs');
const FileManager = require('../services/fileManager');
const { getUsersWithNoPrivileges, getUsersWithPrivileges, removeUserById, updateUserModeById } = require('../models/manageUserAccess');
const logger = require('../utils/logger');

const fileManager = FileManager.getInstance();

async function getAdminPage(req, res) {
  try {
    const allUsers = await getUsersWithNoPrivileges();
    const privilegedUsers = await getUsersWithPrivileges();
    return res.status(201).render('admin', { allUsersList: JSON.stringify(allUsers), privilegedUsersList: JSON.stringify(privilegedUsers) });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).render('500');
  }
}

async function getAcademicSchema(req, res) {
  try {
    const acadmicsSchema = await fileManager.listFolders();
    return res.json(acadmicsSchema);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).render('500');
  }
}

async function fetchSchedule(req, res) {
  try {
    const schedule = await fileManager.listSchedule();
    return res.json(schedule);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).render('500');
  }
}

async function fetchFaculty(req, res) {
  try {
    const faculty = await fileManager.listFaculty();
    return res.json(faculty);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).render('500');
  }
}

async function downloadLog(req, res) {
  try {
    const logFilePath = './logs/app.log';
    if (!fs.existsSync(logFilePath)) {
      return res.status(404).send('File not found.');
    }
    res.setHeader('Content-Type', 'text/plain');
    const stats = fs.statSync(logFilePath);
    res.setHeader('Content-Length', stats.size);
    const readStream = fs.createReadStream(logFilePath);
    readStream.pipe(res);
    readStream.on('error', () => {
      res.status(500).send('Error occurred while reading the file.');
    });
  } catch (error) {
    logger.error(error.message);
  }
}

async function addSubjects(req, res) {
  try {
    const fileId = req.body.directoryToBeModified;
    const newName = req.body.newName;
    await fileManager.addSubject(fileId, newName);
    return res.sendStatus(200);
  } catch (err) {
    logger.error(err.message);
    return res.sendStatus(504);
  }
}

async function removePrivilegedAccess(req, res) {
  try {
    const userId = req.body.userToRemoveAccess;
    await updateUserModeById(userId, false);
    return res.redirect('/admin');
  } catch (err) {
    logger.error(err.message);
    return res.status(500).render('500');
  }
}

async function providePrivilegedAccess(req, res) {
  try {
    const userId = req.body.userToProvideAccess;
    await updateUserModeById(userId, true);
    return res.redirect('/admin');
  } catch (err) {
    logger.error(err.message);
    return res.status(500).render('500');
  }
}

async function renameDirectory(req, res) {
  try {
    const fileId = req.body.directoryToBeModified;
    const newName = req.body.newName;
    await fileManager.renameFile(fileId, newName);
    return res.sendStatus(200);
  } catch (err) {
    logger.error(err.message);
    return res.sendStatus(504);
  }
}

async function deleteDirectory(req, res) {
  try {
    const fileId = req.body.directoryToBeDeleted;
    await fileManager.deleteFile(fileId);
    return res.sendStatus(200);
  } catch (err) {
    logger.error(err.message);
    return res.sendStatus(504);
  }
}

async function uploadTimetable(req, res) {
  try {
    const { body, file } = req;
    await fileManager.uploadTimetable(body, file);
    return res.sendStatus(200);
  } catch (error) {
    logger.error(error.message);
    return res.sendStatus(504);
  }
}

async function uploadFaculty(req, res) {
  try {
    const { body, file } = req;
    await fileManager.uploadFaculty(body, file);
    return res.sendStatus(200);
  } catch (error) {
    logger.error(error.message);
    return res.sendStatus(504);
  }
}

async function updateFaculty(req, res) {
  try {
    const fileId = req.params.fileId;
    const body = req.body;
    const file = req.file;
    if (!body.facultyName || !body.facultyEmail || !body.facultyRole || !body.facultyContact) {
      return res.status(400).json({ error: 'Missing required fields. Please provide name, email, role and contact.' });
    }
    if (file && !file.mimetype.startsWith('image/')) {
      return res.status(400).json({ error: 'Only image files are allowed.' });
    }
    const updatedFile = await fileManager.updateFaculty(fileId, body, file);
    return res.status(200).json({ message: 'Faculty updated successfully.', updatedFile });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
}

module.exports = {
  getAdminPage,
  getAcademicSchema,
  fetchSchedule,
  fetchFaculty,
  downloadLog,
  addSubjects,
  removePrivilegedAccess,
  providePrivilegedAccess,
  renameDirectory,
  deleteDirectory,
  uploadTimetable,
  uploadFaculty,
  updateFaculty,
};


