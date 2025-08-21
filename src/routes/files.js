const express = require('express');
const multer = require('multer');
const router = express.Router();

const { auth, authAdmin, authFaculty } = require('../middleware/auth');
const filesCtrl = require('../controllers/files.controller');

const upload = multer();
const fileManager = require('../services/fileManager').getInstance();

// Metadata listing
router.post('/get-files-metadata', auth, filesCtrl.getFilesMetadata);

// Ratings
router.post('/file/upvote', auth, filesCtrl.handleUpvote);

router.post('/file/downvote', auth, filesCtrl.handleDownvote);

router.post('/file/remove-upvote', auth, filesCtrl.removeUserUpvote);

router.post('/file/remove-downvote', auth, filesCtrl.removeUserDownvote);

// Faculty/Admin file management
router.post('/faculty/upload', authFaculty, upload.single('fileInput'), filesCtrl.facultyUpload);

router.delete('/faculty/delete-file', authFaculty, filesCtrl.facultyDeleteFile);

router.get('/downloadFile', auth, filesCtrl.downloadFile);

module.exports = router;


