const Post = require("../models/Post");

module.exports = {
  async index(req, res) {},

  async store(req, res) {
    const post = await Post.findById(req.params.id);

    const comment = [...post.comments, req.body.comment[0]];

    post.comments = comment;

    await post.save();

    // Emite uma informação através do socket.io para todos os usuários que estão
    // conectados na aplicação, que a recebem em tempo real quando um comentário é criado
    // Neste caso, estamos emitindo uma informação que será acessada pelo frontend
    req.io.emit("comment", post);

    return res.json(post);
  }
};
