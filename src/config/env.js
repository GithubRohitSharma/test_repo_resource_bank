require('dotenv').config();

module.exports = {
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.SECRET,
  supportMail: process.env.SUPPORT_MAIL || 'resourcebank.it@nitj.ac.in',
  forgotPass: process.env.FORGOTPASS,
  gmail: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLEINT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    refreshToken: process.env.REFRESH_TOKEN,
  },
  drive: {
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY,
    parent: process.env.PARENT,
    schedule: process.env.SCHEDULE,
    academics: process.env.ACADEMICS,
    faculty: process.env.FACULTY,
  },
  port: process.env.PORT || 8000,
};


