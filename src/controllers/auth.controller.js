const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const register = require('../models/register');
const logger = require('../utils/logger');

const SUPPORT_MAIL = process.env.SUPPORT_MAIL || 'resourcebank.it@nitj.ac.in';

async function getLogin(req, res) {
  try {
    res.clearCookie('itrbauth');
    return res.render('login');
  } catch (error) {
    logger.error(error.message);
    return res.status(500).render('500');
  }
}

async function getChangePassword(req, res) {
  try {
    let token = jwt.verify(req.cookies.itrbauth, process.env.SECRET);
    let email = token.username;
    Users.findOne({ username: email }).then(async function (val, err) {
      if (val == null) {
        return res.status(201).render('login', { problem: 'UserDNE', username: email });
      } else {
        const otpGen = (Math.floor(100000 + Math.random() * (1000000 - 100000))).toString();
        const otpGenSafe = await bcrypt.hash(otpGen, 10);
        await register
          .sendMail(
            email,
            SUPPORT_MAIL,
            'OTP for IT portal',
            'Your OTP to register at IT Portal is: ' + otpGen + '\n\nHave a great time studying!!'
          )
          .then(() => {
            return res
              .status(201)
              .render('forgot', { username: email, password: process.env.FORGOTPASS, otp: otpGenSafe, registered: '' });
          })
          .catch((err) => {
            logger.error('Failed to send email: ' + err);
            throw new Error('Failed to send email: ' + err);
          });
      }
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(401).render('login');
  }
}

async function getSignup(req, res) {
  try {
    return res.render('signup');
  } catch (error) {
    logger.error(error.message);
    return res.status(500).render('500');
  }
}

async function postLogin(req, res) {
  try {
    let email = req.body.mail.toLowerCase();
    let password = req.body.pass;
    if (!(await register.isMailValid(email))) {
      return res.status(201).render('login', { problem: 'InvalidMail', username: '' });
    } else if (!(await register.isPassStrong(password))) {
      return res.status(201).render('login', { problem: 'WeakPassword', username: email });
    } else {
      password = await bcrypt.hash(password, 10);
      Users.findOne({ username: email }).then(async function (val, err) {
        if (val == null) {
          const otpGen = (Math.floor(100000 + Math.random() * (1000000 - 100000))).toString();
          const otpGenSafe = await bcrypt.hash(otpGen, 10);
          const userEncrypted = await bcrypt.hash(email, 10);
          await register
            .sendMail(
              email,
              SUPPORT_MAIL,
              'OTP for IT portal',
              'Your OTP to register at IT Portal is: ' + otpGen + '\n\nHave a great time studying!!'
            )
            .then(() => {
              return res
                .status(201)
                .render('verifyOTP', {
                  username: email,
                  usernameEnc: userEncrypted,
                  password: password,
                  otp: otpGenSafe,
                  registered: 'No',
                });
            })
            .catch((err) => {
              logger.error('Failed to send email: ' + err);
              return res.status(201).render('login');
            });
        } else {
          const match = await bcrypt.compare(req.body.pass, val.password);
          const userEncrypted = await bcrypt.hash(email, 10);
          if (match) {
            return res
              .status(201)
              .render('verifyOTP', {
                username: email,
                usernameEnc: userEncrypted,
                password: val.password,
                otp: '',
                registered: 'Yes',
              });
          } else {
            return res.status(201).render('login', { problem: 'InvalidPassword', username: email });
          }
        }
      });
    }
  } catch (error) {
    logger.error(error.message);
    return res.status(500).render('500');
  }
}

async function postChangePassword(req, res) {
  try {
    let email = req.body.mail.toLowerCase();
    if (!(await register.isMailValid(email))) {
      return res.status(201).render('login', { problem: 'InvalidMail', username: '' });
    } else {
      Users.findOne({ username: email }).then(async function (val, err) {
        if (val == null) {
          return res.status(201).render('login', { problem: 'UserDNE', username: email });
        } else {
          const otpGen = (Math.floor(100000 + Math.random() * (1000000 - 100000))).toString();
          const otpGenSafe = await bcrypt.hash(otpGen, 10);
          const userEncrypted = await bcrypt.hash(email, 10);
          await register
            .sendMail(
              email,
              SUPPORT_MAIL,
              'OTP for IT portal',
              'Your OTP to register at IT Portal is: ' + otpGen + '\n\nHave a great time studying!!'
            )
            .then(() => {
              return res
                .status(201)
                .render('forgot', { username: email, usernameEnc: userEncrypted, password: process.env.FORGOTPASS, otp: otpGenSafe });
            })
            .catch((err) => {
              logger.error('Failed to send email: ' + err);
            });
        }
      });
    }
  } catch (error) {
    logger.error(error.message);
    return res.status(500).render('500');
  }
}

async function postSignup(req, res) {
  try {
    let email = req.body.mail.toLowerCase();
    let password = req.body.newPass;
    if (!(await register.isMailValid(email))) {
      return res.status(201).render('signup', { problem: 'InvalidMail', username: '' });
    } else if (!(await register.isPassStrong(password))) {
      return res.status(201).render('signup', { problem: 'WeakPassword', username: email });
    } else {
      const existingUser = await Users.findOne({ username: email });
      if (existingUser) {
        return res.status(201).render('signup', { problem: 'UserExists', username: email });
      }
      password = await bcrypt.hash(password, 10);
      const otpGen = (Math.floor(100000 + Math.random() * (1000000 - 100000))).toString();
      const otpGenSafe = await bcrypt.hash(otpGen, 10);
      const userEncrypted = await bcrypt.hash(email, 10);
      await register
        .sendMail(
          email,
          SUPPORT_MAIL,
          'OTP for IT portal',
          'Your OTP to register at IT Portal is: ' + otpGen + '\n\nHave a great time studying!!'
        )
        .then(() => {
          return res
            .status(201)
            .render('verifyOTP', { username: email, usernameEnc: userEncrypted, password: password, otp: otpGenSafe, registered: 'No' });
        })
        .catch((err) => {
          logger.error('Failed to send email: ' + err);
          return res.status(201).render('signup', { problem: 'EmailError', username: email });
        });
    }
  } catch (error) {
    logger.error(error.message);
    return res.status(201).render('signup', { problem: 'ServerError', username: '' });
  }
}

async function postHome(req, res) {
  try {
    let userOTP = req.body.otp,
      otpGen = req.body.otpGen,
      pass = req.body.password,
      user = req.body.username,
      userEnc = req.body.usernameEnc;
    let isAdmin = await register.isAdmin(user);
    if (!(await bcrypt.compare(user, userEnc))) {
      return res.status(201).render('login', { problem: 'Invalid User', username: user });
    }
    if (pass == process.env.FORGOTPASS) {
      const newPassPlain = req.body.pass;
      if (!(await register.isPassStrong(newPassPlain))) {
        return res.status(201).render('forgot', { problem: 'WeakPassword', username: user, usernameEnc: userEnc, password: pass, otp: otpGen });
      } else if (!(await bcrypt.compare(userOTP, otpGen))) {
        return res.status(201).render('forgot', { problem: 'InvalidOTP', username: user, usernameEnc: userEnc, password: pass, otp: otpGen });
      } else {
        const newPass = await bcrypt.hash(newPassPlain, 10);
        await Users.updateOne({ username: user }, { $set: { password: newPass } }, {});
        const registerUser = await Users.findOne({ username: user });
        const token = await registerUser.generateAuthToken();
        res.cookie('itrbauth', token, { expires: new Date(Date.now() + 1300000000), httpOnly: true });
        return res.status(201).render('index');
      }
    } else {
      if (userOTP == 'Account exists') {
        const registerUser = await Users.findOne({ username: user });
        const token = await registerUser.generateAuthToken();
        res.cookie('itrbauth', token, { expires: new Date(Date.now() + 1300000000), httpOnly: true });
        return res.status(201).render('index');
      } else if (!(await bcrypt.compare(userOTP, otpGen))) {
        return res.status(201).render('verifyOTP', { problem: 'InvalidOTP' });
      } else {
        const registerUser = new Users({ username: user, password: pass, admin: isAdmin, faculty: false });
        const token = await registerUser.generateAuthToken();
        res.cookie('itrbauth', token, { expires: new Date(Date.now() + 1300000000), httpOnly: true });
        await registerUser.save();
        return res.status(201).render('index');
      }
    }
  } catch (error) {
    logger.error(error.message);
    return res.status(500).render('500');
  }
}

module.exports = {
  getLogin,
  getChangePassword,
  getSignup,
  postLogin,
  postChangePassword,
  postSignup,
  postHome,
};


