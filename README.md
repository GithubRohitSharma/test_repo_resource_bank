# 📚 NITJ IT Resource Bank

A comprehensive web application for the IT department of NIT Jalandhar, providing centralized access to academic resources, course materials, and administrative tools.

🔗 **Live Project**: [Click here to view](https://resource-bank-nitj-it.onrender.com/)  
📦 **GitHub Repo**: [GithubRohitSharma/resourceBankNITJ](https://github.com/GithubRohitSharma/resourceBankNITJ)

---

## 🚀 Features

### 📚 Academic Resources
- **Previous Year Question Papers** - Search and download PYQs by semester
- **Course Materials** - Access syllabus PDFs, presentations, and textbooks
- **Subject-wise Organization** - Browse resources by specific subjects (DSA, DBMS, OS, CN, Web Development)
- **Semester-wise Breakdown** - Organized content by academic semesters

### 👥 User Management
- **Student Registration & Login** - Secure authentication with JWT tokens
- **Faculty Access** - Special privileges for faculty members
- **Admin Dashboard** - Complete content and user management system
- **Role-based Access Control** - Different permissions for students, faculty, and admins

### 📊 Content Management
- **File Upload System** - Support for various document formats
- **Google Drive Integration** - Cloud storage for resources
- **Rating System** - Upvote/downvote functionality for resources
- **Search & Filter** - Advanced search capabilities

### 🎨 User Experience
- **Responsive Design** - Mobile and desktop optimized
- **Modern UI** - Bootstrap-based interface with animations
- **Email Notifications** - OTP verification and password reset
- **Error Handling** - Comprehensive error pages and logging

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Backend** | Node.js, Express.js |
| **Template Engine** | Handlebars (HBS) |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JWT, bcryptjs |
| **File Management** | Multer, Google Drive API |
| **Email** | Nodemailer |
| **Styling** | Bootstrap, CSS3 |
| **Logging** | Winston |
| **Development** | Nodemon |

---

## 📁 Project Structure

```
resourceBankNITJ/
├── src/
│   ├── app.js                # Express app (mounts routes, views, middleware)
│   ├── config/
│   │   ├── db.js             # Mongoose connection
│   │   └── env.js            # Centralized env access
│   ├── controllers/          # Route handlers
│   │   ├── auth.controller.js
│   │   ├── pages.controller.js
│   │   ├── admin.controller.js
│   │   └── files.controller.js
│   ├── middleware/
│   │   ├── auth.js           # Auth/role guards
│   │   └── errorHandler.js   # 404 + error handler
│   ├── models/
│   │   ├── user.js
│   │   ├── file.js
│   │   ├── rating.js
│   │   └── register.js
│   ├── routes/               # Express routers
│   │   ├── auth.js
│   │   ├── pages.js
│   │   ├── admin.js
│   │   └── files.js
│   ├── services/
│   │   └── fileManager.js    # Google Drive integration & file ops
│   ├── utils/
│   │   └── logger.js         # Winston logger
│   └── views/                # Handlebars templates
│       ├── partials/
│       │   ├── header.hbs
│       │   └── footer.hbs
│       └── *.hbs
├── public/                   # Static assets (css/js/img)
├── env-template.txt          # Example env variables
├── README.md
└── package.json
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Google Drive API credentials

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/GithubRohitSharma/resourceBankNITJ.git
   cd resourceBankNITJ
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory (see `env-template.txt`):
   ```env
   # Server
   PORT=8000
   SECRET=your_jwt_secret
   MONGODB_URI=your_mongodb_connection_string

   # Support / roles
   SUPPORT_MAIL=resourcebank.it@nitj.ac.in
   FORGOTPASS=your_forgot_password_token

   # Gmail OAuth2 (for Nodemailer)
   CLIENT_ID=your_gmail_client_id
   CLEINT_SECRET=your_gmail_client_secret   # (intentional key name used in code)
   REDIRECT_URI=https://developers.google.com/oauthplayground
   REFRESH_TOKEN=your_gmail_refresh_token

   # Google Drive Service Account + Folders
   CLIENT_EMAIL=service_account_email@project.iam.gserviceaccount.com
   PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"  # escape newlines
   PARENT=drive_folder_id_root
   SCHEDULE=drive_folder_id_schedule
   ACADEMICS=drive_folder_id_academics
   FACULTY=drive_folder_id_faculty
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:8000`

---

## 👨‍💻 Developer

**Rohit Sharma** - Full Stack Developer
- **Email**: rohitsharma2003r@gmail.com
- **GitHub**: [GithubRohitSharma](https://github.com/GithubRohitSharma)
- **LinkedIn**: [Rohit Sharma](https://www.linkedin.com/in/rohit-sharma-1ba50a24b/)

---

## 🔧 Key Features Implementation

### Authentication System
- JWT-based session management
- bcrypt password hashing
- Role-based access control (Student/Faculty/Admin)

### File Management
- Google Drive API integration for cloud storage
- Support for multiple file formats
- Organized file structure by subjects and semesters

### Admin Dashboard
- User management (view, add, remove users)
- Content moderation and approval
- Analytics and reporting features

### Rating System
- Upvote/downvote functionality for resources
- User feedback collection
- Quality assessment of uploaded content

---

## 📝 License

This project is licensed under the ISC License.

---

## 🤝 Contributing

This is a project for the IT department of NIT Jalandhar. For contributions or questions, please contact the developer directly.

---

*Built with ❤️ for the IT Department, NIT Jalandhar* 
