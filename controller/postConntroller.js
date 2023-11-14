import User from "../model/User.js"
import { v2 as cloudinary } from 'cloudinary';
import Post from "../model/Post.js";
import Comment from "../model/Comment.js";

cloudinary.config({
    cloud_name: 'dzhl7dmsp',
    api_key: '323466687184448',
    api_secret: 't8YR62TWigv3q2gTHL3mtIoTVzM'
});

export default class PostController {

    // fore the add post
    addPost = async (req, res) => {
        try {
            const user = await User.findById(req.body.user);
            if (user) {
                const postData = {
                    content: req.body.content,
                    user: req.body.user
                }

                if (req.files) {
                    const img = req.files.image;
                    const postUrl = await cloudinary.uploader.upload(img.tempFilePath);
                    postData.image = postUrl.url
                }

                const post = await Post.create(postData);
                return res.json({
                    postAdded: post
                })
            }
        } catch (err) {
            console.log("There is error ", err);
            return;
        }

    }

    // get All Post
    getAllPost = async (req, res) => {
        try {
            return res.json(await Post.find({}).sort('-createdAt')
                .populate('user')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user'
                    }
                }
                ).populate({
                    path: 'likes',
                    populate: {
                        path: 'user'
                    }
                }))

        } catch (err) {
            console.log("There is Error ", err);
            return;
        }
    }


    // getSimple Post
    getSimplePost = async (req, res) => {
        try {
            return res.json(await Post.find({}))
        } catch (err) {
            console.log("There is Error ", err);
            return;
        }
    }

    // for the delete Post
    deletePost = async (req, res) => {
        const postId = req.params.id;
        try {
            const post = await Post.findById(postId);
            if (post) {
                await Comment.deleteMany({ post: postId });
                post.deleteOne();
                return res.json(post)
            }
            return res.json(post);
        } catch (err) {
            console.log("there is Error ", err);
        }
    }

    // get Single User All Post
    singleUserPost = async (req, res) => {
        const userId = req.params.id;
        try {
            const Posts = await Post.find({ user: userId });
            return res.json(Posts)
        } catch (err) {
            console.log("there is Error with Single DAta ", err);
            return;
        }
    }


}                                                                                                                       