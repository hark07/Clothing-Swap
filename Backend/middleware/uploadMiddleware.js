import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary.js";


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,

  params: {
    folder: "clothing-swap",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],
  },
});


const fileFilter = (req, file, cb) => {

  const allowedTypes = /jpg|jpeg|png|webp/;


  const extName = allowedTypes.test(
    file.originalname
      .toLowerCase()
      .split(".")
      .pop()
  );


  const mimeType = allowedTypes.test(
    file.mimetype
  );


  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed"
      )
    );
  }

};


const upload = multer({

  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

});


export default upload;