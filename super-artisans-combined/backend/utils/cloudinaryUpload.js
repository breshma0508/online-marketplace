const cloudinary = require('../config/cloudinary');

async function uploadFile(filePath, folder = 'super-artisans') {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, { folder }, (err, result) => {
      if (err) return reject(err);
      resolve(result.secure_url);
    });
  });
}

module.exports = { uploadFile };
