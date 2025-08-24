# File Upload Service

A robust Node.js backend service for handling file uploads to local storage and Cloudinary with integrated email notifications and database storage.

## Features

- 📁 **Multiple Upload Types**: Support for images, videos, and general files
- ☁️ **Cloud Integration**: Seamless integration with Cloudinary for cloud storage
- 📧 **Email Notifications**: Automatic email alerts upon successful uploads
- 🗄️ **Database Storage**: MongoDB integration for storing file metadata
- 🖼️ **Image Optimization**: Built-in image size reduction capabilities
- 🔒 **Type Validation**: File type validation for supported formats
- 📊 **Quality Control**: Configurable quality settings for uploads

## Prerequisites

Before installing this project, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- Cloudinary account
- Email service provider (Gmail, Outlook, etc.)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/file-upload-service.git
   cd file-upload-service
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGODB_URL=your_mongodb_connection_string
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   MAIL_HOST=your_email_smtp_host
   MAIL_USER=your_email_address
   MAIL_PASS=your_email_password
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Usage

### API Endpoints

#### 1. Local File Upload
```javascript
// POST /api/v1/upload/localFileUpload
// Content-Type: multipart/form-data

const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('/api/v1/upload/localFileUpload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

#### 2. Image Upload to Cloudinary
```javascript
// POST /api/v1/upload/imageUpload
// Content-Type: multipart/form-data

const formData = new FormData();
formData.append('imageFile', imageInput.files[0]);
formData.append('name', 'Profile Image');
formData.append('tags', 'profile,user');
formData.append('email', 'user@example.com');

fetch('/api/v1/upload/imageUpload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

#### 3. Video Upload to Cloudinary
```javascript
// POST /api/v1/upload/videoUpload
// Content-Type: multipart/form-data

const formData = new FormData();
formData.append('videoFile', videoInput.files[0]);
formData.append('name', 'Demo Video');
formData.append('tags', 'demo,tutorial');
formData.append('email', 'user@example.com');

fetch('/api/v1/upload/videoUpload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

#### 4. Image Upload with Size Reduction
```javascript
// POST /api/v1/upload/imageSizeReducer
// Content-Type: multipart/form-data

const formData = new FormData();
formData.append('imageFile', imageInput.files[0]);
formData.append('name', 'Optimized Image');
formData.append('tags', 'optimized,compressed');
formData.append('email', 'user@example.com');

fetch('/api/v1/upload/imageSizeReducer', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

### Supported File Types

- **Images**: jpg, jpeg, png
- **Videos**: mp4, mov

## Project Structure

```
file-upload-service/
├── config/
│   ├── database.js          # MongoDB connection configuration
│   └── cloudinary.js        # Cloudinary configuration
├── controllers/
│   └── fileUpload.js        # Upload logic and handlers
├── models/
│   └── File.js              # MongoDB schema and email middleware
├── routes/
│   └── FileUpload.js        # API route definitions
├── .env                     # Environment variables (create this)
├── index.js                 # Main application entry point
└── package.json             # Dependencies and scripts
```

## Configuration Details

### Cloudinary Setup
1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Get your `CLOUD_NAME`, `API_KEY`, and `API_SECRET` from the dashboard
3. Add these to your `.env` file

### Email Service Setup
The project uses Nodemailer for email notifications. Configure your email provider:

**For Gmail:**
- Enable 2-factor authentication
- Generate an app-specific password
- Use these credentials in your `.env` file

```env
MAIL_HOST=smtp.gmail.com
MAIL_USER=your.email@gmail.com
MAIL_PASS=your_app_specific_password
```

## Contributing

We welcome contributions to improve this project! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Add comments for complex logic
- Update documentation for new features
- Test your changes thoroughly

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help with this project:

- 📧 Email: your-email@example.com
- 🐛 Create an [Issue](https://github.com/your-username/file-upload-service/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/file-upload-service/discussions)

## Acknowledgments

- [Express.js](https://expressjs.com/) - Web framework for Node.js
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [Cloudinary](https://cloudinary.com/) - Cloud-based image and video management
- [Nodemailer](https://nodemailer.com/) - Email sending library for Node.js

---

**Note**: This project is for educational and development purposes. Ensure you comply with all terms of service for integrated platforms (Cloudinary, email providers, etc.) when deploying to production.