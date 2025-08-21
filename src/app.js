const express = require("express");
const fs = require("fs")
const app = express()
const methodOverride = require('method-override');
const path = require("path")
const hbs = require("hbs")
const cookieParser = require("cookie-parser")
const logger = require('./utils/logger');
require('dotenv').config();
app.use(cookieParser())
app.use(methodOverride('_method'));

// Setting up path
const staticPath = path.join(__dirname, "../public")
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', "hbs");
app.set('views', path.join(__dirname, 'views'));

// Routers
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const filesRoutes = require('./routes/files');
const pagesRoutes = require('./routes/pages');

// Setting up partials in views
const partialPath = path.join(__dirname, "views/partials")
try { hbs.registerPartials(partialPath); } catch (_) {}

// Connecting to database
require("./config/db")
const Users = require("./models/user")
// express.urlencoded already applied above; keep single instance

// Mount routers (modularized)
try {
    const authRoutes = require('./routes/auth');
    const adminRoutes = require('./routes/admin');
    const filesRoutes = require('./routes/files');
    const pagesRoutes = require('./routes/pages');
    app.use(authRoutes);
    app.use(adminRoutes);
    app.use(filesRoutes);
    app.use(pagesRoutes);
} catch (e) {
    // Routers may not be present during partial refactor; ignore
}

const PORT = process.env.PORT || 8000;
const SUPPORT_MAIL = process.env.SUPPORT_MAIL || "resourcebank.it@nitj.ac.in"

// Mount routers
app.use(authRoutes);
app.use(adminRoutes);
app.use(filesRoutes);
app.use(pagesRoutes);
const { notFound, errorHandler } = require('./middleware/errorHandler');
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Listening to port " + PORT);
})