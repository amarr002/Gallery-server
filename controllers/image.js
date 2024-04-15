const Image = require("../models/image");

async function createImage(userId, imageUrl, description) {
  const image = new Image({
    userId,
    imageUrl,
    description,
  });

  try {
    await image.save();
    return image;
  } catch (error) {
    throw error;
  }
}
async function getImagesByUser(userId) {
  try {
    const images = await Image.find({ userId });
    return images;
  } catch (error) {
    throw error;
  }
}
async function deleteImage(imageId, userId) {
  try {
    // const result = await Image.findByIdAndDelete(imageId);
    // return result;
    console.log("controller 1");
    const image = await Image.findOne({ _id: imageId, userId: userId });
    console.log("controller 2");
    if (!image) {
      console.log("controller 6");
      //   return res.status(404).send({message: "image is not found"});
      return { success: false, message: "Image not found or access denied" };
    }
    console.log("controller 3");
    // await  Image.findByIdAndDelete(imageId);
    await Image.deleteOne({ _id: imageId, userId: userId });

    console.log("controller 4");
    return { success: true, message: "Image deleted successfully" };
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createImage,
  getImagesByUser,
  deleteImage,
};
