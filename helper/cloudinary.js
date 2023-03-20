const cloudinary = require("cloudinary")
const dotenv = require("dotenv")

dotenv.config()
cloudinary.config({

    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const uploadImage = async (file) => {
    try {
        const uploads = await cloudinary.uploader.upload(
            file.tempFilePath,
            (res, result) => {
                const { url } = result;
                return url;
            }
        );
        return uploads;

    }
    catch (error) {
        return error;
    }
};

module.exports = uploadImage
