import ErrorHandler from "../middlewares/error.js";
import { Post } from "../models/post.js";


export const AddNewPost = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await Post.create({
            title,
            description,
            user: req.user
        })

        res.status(201).json({
            success: true,
            message: "Post Added Succussfully",
        })
    } catch (error) {
        next(error)
    }
}


export const GetPosts = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const userPosts = await Post.find({ user: userId })
        res.status(200).json({
            success: true,
            userPosts,
        })
    } catch (error) {
        next(error)
    }
}


export const UpdatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        let post = await Post.findById(id);

        if (!post) return next(new ErrorHandler("Post Not Found", 404));
        post = await Post.findByIdAndUpdate({_id:id},{$set:{title:req.body.title,description:req.body.description}});


        res.status(200).json({
            success: true,
            message: "Post Got Updated Succussfully"
        })
    } catch (error) {
        next(error)

    }
}


export const DeletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) return next(new ErrorHandler("Post Not Found", 404))

        await post.deleteOne();
        res.status(200).json({
            success: true,
            message: "Post Got Deleted"
        })

    } catch (error) {
        console.log('error:', error)
        next(error);
    }
}

export const SinglePost=async(req,res,next)=>{
try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) return next(new ErrorHandler("Post Not Found", 404))
    res.status(200).json({
        success: true,
        post,
    })
} catch (error) {
    next(new ErrorHandler("Post Not Found",404));
}
}
