import Post from '../model/Post.js';
import Comment from '../model/Comment.js';
import Like from '../model/Like.js';
import User from '../model/User.js'

export default class LikeController {
    // AddLike
    addLike = async (req, res) => {
        try {
            const user = await User.findById(req.body.user);
            console.log(user);
            if(!user){
                return res.json({Message:'Invalide User , Like can not be Added !!!!!'})
            }
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
                user.likes.push(like);
                user.save();
                return res.json({
                    Message: `Like added By ${user.name}`,
                    LIke: Like
                })
            }
        } catch (err) {
           
            return res.json({Message:err.trace()})
        }
    }


    // getAll LIke at Post
    getAllLikeAtPost = async (req, res) => {

    }



}