const Post = require("../models/postModel");
const Like = require("../models/likeModel");

// Like a Post

exports.likePost = async(req,res)=>{
    try{
        const {post,user} = req.body;
        const like = new Like({
            post,user
        });
        const savedLike = await like.save();

        // Update the Post collection
        const updatePost = await Post.findByIdAndUpdate(post, {$push: {likes:savedLike._id}},{returnDocument:"after"}).populate("likes").exec();
        res.json({
            post:updatePost,
        })
    }

    catch(err){
        return res.status(400).json({
            err:"Error While fetching post"
        });
    }
}


// Unlike a Post

exports.unlikePost = async(req,res)=>{
   try{
         
     const {post,like} = req.body;

    // find and delete the like Collection
    const deletedLike = await Like.findOneAndDelete({post:post,_id:like});

    // update the Post collection
    const updatePost = await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}},{returnDocument:"after"})

    res.json({
        post:updatePost,
    })

   } 
   catch(err){

    return res.status(400).json({
        err:"Error While Unliking the Post"

    })

   }
}