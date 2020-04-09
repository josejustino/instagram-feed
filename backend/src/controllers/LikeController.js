const Post = require("../models/Post");

module.exports = {
  async index(req, res) {},

  async store(req, res) {
    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    // Emite uma informação através do socket.io para todos os usuários que estão
    // conectados na aplicação, que a recebem em tempo real quando um like acontece
    // Neste caso, estamos emitindo uma informação que será acessada pelo frontend
    req.io.emit("like", post);

    return res.json(post);
  }
};
