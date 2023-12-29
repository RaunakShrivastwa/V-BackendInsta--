import Comment from "../model/Comment.js";
import Post from '../model/Post.js';
import User from '../model/User.js';

export default class commentController {

    // for the Add Comment
    addComment = async (req, res) => {
        console.log("this is ")
        try {
            const post = await Post.findById(req.body.post);
            if (post) {
                const user = await User.findById(req.body.user);
                if(!user){
                    return res.json({Message:`Invalide User so That Comment will not added at !!!!! ${post.content}`})
                }
                const comment = await Comment.create(req.body);
                post.comments.push(comment);
                post.save();
                user.comments.push(comment);
                user.save();
                return res.json(comment);
            }
        } catch (err) {
            console.log("There is error ", err);
            return;
        }
    }


    // for the getAll
    getAllComment = async (req, res) => {
        try {
            return res.json(await Comment.find({}).populate('user').populate({
                path: 'post',
                populate: {
                    path: 'user'
                }
            }))
        } catch (err) {
            console.log("There is problem with GetAll ", err);
            return;
        }
    }

    //    for the simple GetAll
    getComments = async (req, res) => {
        try {
            return res.json(await Comment.find({}));
        } catch (err) {
            console.log("There is Error ", err);
            return;
        }
    }

    // getSingleComment of specific USer
    getSingleComment = async (req, res) => {
        try {
            const userId = req.params.id;
            const comment = await Comment.find({ user: userId });
            return res.json(comment);
        } catch (err) {
            console.log("there is error ", err);
            return;
        }
    }

    // delete Comment
    deleteComment = async (req, res) => {
        const commentId = req.params.id;
        try {
            const comment = await Comment.findById(commentId);
            comment.deleteOne();
            if (comment) {
                const postId = comment.post;
                await Post.findByIdAndRemove(postId, { $pull: { comments: commentId } })
                return res.json({Deleted:true,comment})
            }
        } catch (err) {
            console.log("There is Error ", err);
            return;
        }
    }
}