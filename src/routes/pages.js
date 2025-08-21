const express = require('express');
const router = express.Router();

const { auth, authAdmin, authFaculty } = require('../middleware/auth');
const pages = require('../controllers/pages.controller');

router.get('/', auth, pages.renderIndex);
router.get('/home', auth, pages.renderIndex);
router.get('/faculty', authFaculty, pages.facultyPage);
router.get('/curriculum', auth, pages.curriculumPage);
router.get('/get-academics-sem-list', auth, pages.getAcademicsSemList);
router.get('/get-faculty-list', auth, pages.getFacultyList);
router.get('/get-schedule-list', auth, pages.getScheduleList);
router.get('/get-pyqs', auth, pages.getPyqs);
router.get('/get-subFiles', auth, pages.getSubFiles);
router.get('/semester', auth, pages.semesterPage);
router.get('/subject', auth, pages.subjectPage);
router.get('/dsa', auth, pages.dsaPage);
router.get('/os', auth, pages.osPage);
router.get('/oops', auth, pages.oopsPage);
router.get('/webd', auth, pages.webdPage);
router.get('/dbms', auth, pages.dbmsPage);
router.get('/cn', auth, pages.cnPage);
router.get('/placement', auth, pages.placementPage);
router.get('/support', auth, pages.supportGet);
router.post('/support', auth, pages.supportPost);
router.get('/team', auth, pages.teamPage);
router.get('/terms', pages.termsPage);
router.get('/privacy', pages.privacyPage);
router.get('*', pages.notFound);

module.exports = router;
