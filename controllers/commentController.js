const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// Logic code

exports.createComment = async(req,res)=>{
    try{
        const{post,user,body} = req.body;

        // create a comment object
        const comment = new Comment({
            post,user,body
        });


        // save new Comment in Database
        const savedComment = await comment.save();

        // find the post by id and add the new comment in comments array
       const updatePost = await Post.findByIdAndUpdate(post,{$push:{comments:savedComment._id}},{new:true})
       .populate("comments")
       .exec();

       res.json({
        post:updatePost,
       });


    }
    catch(err){
        return res.status(500).json({
            err:"Error While Creating Comments"
        })
    }
}