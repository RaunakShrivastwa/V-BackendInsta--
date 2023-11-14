import Post from '../model/Post.js';
import Comment from '../model/Comment.js';
import Like from '../model/Like.js';

export default class LikeController {
    // AddLike
    addLike = async (req, res) => {
        try {
            const type = req.query.type;
            let likeble;
            if (type == 'Post') {
                likeble = await Post.findById(req.query.id)
            } else {
                likeble = await Comment.findById(req.query.id)
            }
            const existLike = await Like.findOne({
                likeble: req.query.id,
                onModel: req.query.type,
                user: req.body.user
            })

            if (existLike) {
                await likeble.likes.pull(existLike._id);
                likeble.save();
                existLike.deleteOne();
                return res.json({
                    Message: 'User Already Like this post ,so that , Like deleted Successfully!!!!'
                })

            } else {
                const like = await Like.create({
                    user: req.body.user,
                    likeble: req.query.id,
                    onModel: req.query.type
                })
                likeble.likes.push(like)
                likeble.save();
                return res.json({
                    Message: 'Like Added',
                    LIke: Like
                })
            }
        } catch (err) {
            console.log("there is error ", err);
            return;
        }
    }


    // getAll LIke at Post
    getAllLikeAtPost = async (req, res) => {

    }



}