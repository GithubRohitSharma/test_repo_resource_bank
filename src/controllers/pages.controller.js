const jwt = require('jsonwebtoken');
const FileManager = require('../services/fileManager');
const register = require('../models/register');
const logger = require('../utils/logger');

const fileManager = FileManager.getInstance();
const SUPPORT_MAIL = process.env.SUPPORT_MAIL || 'resourcebank.it@nitj.ac.in';

async function renderIndex(req, res) {
    try {
        return res.status(201).render('index');
    } catch (error) {
        logger.error(error.message);
        return res.status(500).render('500');
    }
}

async function facultyPage(req, res) {
    try {
        return res.status(201).render('faculty');
    } catch (error) {
        logger.error(error.message);
        return res.status(500).render('500');
    }
}

async function curriculumPage(req, res) {
    try {
        return res.render('curriculum');
    } catch (error) {
        logger.error(error.message);
        return res.status(500).render('500');
    }
}

async function getAcademicsSemList(req, res) {
    try {
        const acadmicsSemList = await fileManager.getSemList();
        return res.json(acadmicsSemList);
    } catch (error) {
        logger.error(error.message);
        return res.status(500).render('500');
    }
}

async function getFacultyList(req, res) {
    try {
        const facultyList = await fileManager.getScheduleOrFaculty('faculty');
        return res.json(facultyList);
    } catch (error) {
        logger.error(error.message);
        return res.status(500).render('500');
    }
}

async function getScheduleList(req, res) {
    try {
        const scheduleList = await fileManager.getScheduleOrFaculty('schedule');
        return res.json(scheduleList);
    } catch (error) {
        logger.error(error.message);
        return res.status(500).render('500');
    }
}

async function getPyqs(req, res) {
    try {
        const token = req.cookies.itrbauth;
        const verifyUser = jwt.verify(token, process.env.SECRET);
        const userId = verifyUser.username;
        const PYQs = await fileManager.getPYQs(req.query.sem, userId);
        return res.status(201).json(PYQs);
    } catch (error) {
        logger.error(error.message);
        return res.status(500).render('500');
    }
}

async function getSubFiles(req, res) {
    try {
        const token = req.cookies.itrbauth;
        const verifyUser = jwt.verify(token, process.env.SECRET);
        const userId = verifyUser.username;
        const Files = await fileManager.getSubjectFiles(req.query.subject, req.query.type, userId);
        return res.status(201).json(Files);
    } catch (error) {
        logger.error(error.message);
        return res.status(500).render('500');
    }
}

async function semesterPage(req, res) {
    try {
        const subjects = await fileManager.getSubList(req.query.sem);
        await fileManager.getPYQs(req.query.sem);
        return res.status(201).render('semester', { subjects: JSON.stringify(subjects), semName: req.query.sem });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).render('500');
    }
}

async function subjectPage(req, res) {
    try {
        return res.status(201).render('subject', { subName: req.query.subjectName, subID: req.query.subjectID });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).render('500');
    }
}

async function dsaPage(req, res) { try { return res.render('dsa'); } catch (e) { logger.error(e.message); return res.status(500).render('500'); } }
async function osPage(req, res) { try { return res.render('os'); } catch (e) { logger.error(e.message); return res.status(500).render('500'); } }
async function oopsPage(req, res) { try { return res.render('oops'); } catch (e) { logger.error(e.message); return res.status(500).render('500'); } }
async function webdPage(req, res) { try { return res.render('webd'); } catch (e) { logger.error(e.message); return res.status(500).render('500'); } }
async function dbmsPage(req, res) { try { return res.render('dbms'); } catch (e) { logger.error(e.message); return res.status(500).render('500'); } }
async function cnPage(req, res) { try { return res.render('cn'); } catch (e) { logger.error(e.message); return res.status(500).render('500'); } }
async function placementPage(req, res) { try { return res.render('placement'); } catch (e) { logger.error(e.message); return res.status(500).render('500'); } }
async function teamPage(req, res) { try { return res.render('team'); } catch (e) { logger.error(e.message); return res.status(500).render('500'); } }

async function supportGet(req, res) { try { return res.render('feedback'); } catch (e) { logger.error(e.message); return res.status(500).render('500'); } }

async function supportPost(req, res) {
    try {
        await register.sendMail(
            SUPPORT_MAIL,
            SUPPORT_MAIL,
            req.body.subject,
            req.body.name + ' says,\n' + req.body.message + '\n\nSender Mail: ' + req.body.email
        );
        return res.status(201).render('feedback');
    } catch (error) {
        logger.error(error.message);
        return res.status(500).render('500');
    }
}

async function termsPage(req, res) { try { return res.render('terms'); } catch (e) { logger.error(e.message); return res.status(500).render('500'); } }
async function privacyPage(req, res) { try { return res.render('privacy'); } catch (e) { logger.error(e.message); return res.status(500).render('500'); } }
async function notFound(req, res) { try { return res.render('404.hbs'); } catch (e) { logger.error(e.message); return res.status(500).render('500'); } }

module.exports = {
    renderIndex,
    facultyPage,
    curriculumPage,
    getAcademicsSemList,
    getFacultyList,
    getScheduleList,
    getPyqs,
    getSubFiles,
    semesterPage,
    subjectPage,
    dsaPage,
    osPage,
    oopsPage,
    webdPage,
    dbmsPage,
    cnPage,
    placementPage,
    teamPage,
    supportGet,
    supportPost,
    termsPage,
    privacyPage,
    notFound,
};


