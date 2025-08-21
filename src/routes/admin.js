const express = require('express');
const multer = require('multer');
const router = express.Router();

const { authAdmin, authFaculty } = require('../middleware/auth');
const adminCtrl = require('../controllers/admin.controller');

const upload = multer();
router.get('/admin', authAdmin, adminCtrl.getAdminPage);

router.get('/admin/academic_schema', authAdmin, adminCtrl.getAcademicSchema);

router.get('/admin/fetch-schedule', authAdmin, adminCtrl.fetchSchedule);

router.get('/admin/fetch-faculty', authAdmin, adminCtrl.fetchFaculty);

router.get('/admin/download-log', authAdmin, adminCtrl.downloadLog);

router.post('/admin/add-subjects', authAdmin, adminCtrl.addSubjects);

router.put('/admin/remove-privileged-access', authAdmin, adminCtrl.removePrivilegedAccess);

router.put('/admin/provide-privileged-access', authAdmin, adminCtrl.providePrivilegedAccess);

router.put('/admin/rename-directory', authAdmin, adminCtrl.renameDirectory);

router.delete('/admin/delete-directory', authAdmin, adminCtrl.deleteDirectory);

// Faculty admin hybrid actions
router.post('/admin/upload-timetable', authFaculty, upload.single('fileInput'), adminCtrl.uploadTimetable);

router.post('/admin/upload-faculty', authFaculty, upload.single('photoInput'), adminCtrl.uploadFaculty);

router.post('/admin/update-faculty/:fileId', authAdmin, upload.single('file'), adminCtrl.updateFaculty);

module.exports = router;


