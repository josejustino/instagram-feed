const Post = require("../models/Post");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort("-createdAt");

    return res.json(posts);
  },

  async store(req, res) {
    const { author, place, description, hashtags, comments } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split(".");
    const fileName = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, "resized", fileName));

    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      comments,
      image: fileName
    });

    // Emite uma informação através do socket.io para todos os usuários que estão
    // conectados na aplicação, que a recebem em tempo real quando um post é criado
    // Neste caso, estamos emitindo uma informação que será acessada pelo frontend
    req.io.emit("post", post);

    return res.json(post);
  }
};
