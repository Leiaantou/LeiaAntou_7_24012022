const models = require("../models");

exports.createComment = (req, res, next) => {
  const commentObject = {
    User_id: req.auth.userId,
    content: req.body.content,
    image: req.file.filename,
  };

  models.Comment.create(commentObject)

    .then(() => res.status(201).json({ message: "Commentaire publié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyComment = (req, res, next) => {};

exports.deleteComment = (req, res, next) => {
  models.Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      if (comment.User_id !== req.auth.userId) {
        res.status(403).json({ error: "Unauthorized request" });
      } else if (comment.User_id == req.auth.userId) {
        fs.unlink(`images/posts/${post.image}`, () => {
          comment
            .destroy()
            .then(() =>
              res.status(200).json({ message: "Commentaire supprimé !" })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllComments = (req, res, next) => {};
