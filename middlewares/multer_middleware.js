// // middlewares/multer.middleware.js

// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('../utils/cloudinary'); // Adjust the path as needed

// // Configure Cloudinary storage for multer
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'users', // Cloudinary folder name
//     format: async (req, file) => {
//       const ext = file.mimetype.split('/')[1];
//       if (ext === 'jpeg') {
//         return 'jpg';
//       } else if (ext === 'png') {
//         return 'png';
//       }
//       // Default to png if format is not jpg or png
//       return 'png';
//     },
//     public_id: (req, file) => file.fieldname + '-' + Date.now(), // Generate unique filename
//   },
// });

// // Create an instance of multer with the Cloudinary storage configuration
// const upload = multer({ storage: storage });

// module.exports = upload;

// middlewares/multer.middleware.js

// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../utils/cloudinary"); // Adjust the path as needed

// // Configure Cloudinary storage for multer
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "users", // Cloudinary folder name
//     format: async (req, file) => {
//       const ext = file.mimetype.split("/")[1]; // Get the file extension
//       return ext === "jpeg" ? "jpg" : ext; // Return 'jpg' for .jpeg and keep others as is
//     },
//     public_id: (req, file) => file.fieldname + "-" + Date.now(), // Generate a unique filename
//   },
// });
// // Create an instance of multer with the Cloudinary storage configuration
// // console.log("Storage", storage)
// const upload = multer({ storage: storage });

// const uploadMiddleware = (req, res, next) => {
//   // Call the multer upload function
//   console.log("It get called");
//   upload.single("image")(req, res, (err) => {
//     if (err) {
//       // Handle any error that occurred during file upload
//       return res.status(500).json({ message: "File upload error", error: err });
//     }
//     if (!req.file) {
//       console.log("No file uploaded");
//     } else {
//       console.log("Image uploaded successfully:", req.file);
//     }

//     // Proceed to the next middleware or route handler
//     next();
//   });
// };

// module.exports = uploadMiddleware;
// // module.exports = upload;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary'); // Adjust the path as needed

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'users', // Cloudinary folder name
    format: async (req, file) => {
      const ext = file.mimetype.split('/')[1]; // Get the file extension
      return ext === 'jpeg' ? 'jpg' : ext; // Return 'jpg' for .jpeg and keep others as is
    },
    public_id: (req, file) => file.fieldname + '-' + Date.now(), // Generate a unique filename
  },
});

// Create an instance of multer with the Cloudinary storage configuration
const upload = multer({ storage: storage });

const uploadMiddleware = (req, res, next) => {
  console.log("Middleware is called");
  upload.single('image')(req, res, (err) => {
    if (err) {
      // Handle any error that occurred during file upload
      return res.status(500).json({ message: 'File upload error', error: err });
    }
    console.log("**********",req)
    console.log("&&&&&&&&",req.body)
    console.log("^^^^^^^^",req.file)

    if (!req.file) {
      console.log("No file uploaded");
    } else {
      req.file = {
        public_id: req.file.filename, // Cloudinary file identifier
        secure_url: req.file.path,    // Cloudinary file URL
      };
      console.log("Image uploaded successfully:", req.file);
    }

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = uploadMiddleware;
