
import asyncHandler from "express-async-handler";
import Chat from '../models/chatModels.js'
import User from "../models/userModel.js";
const accessChat=asyncHandler(async(req,res)=>{
    const {userId}=req.body
    if(!userId){
      console.log("UserId param not send with request")
      return res.sendStatus(400)
    }
    var isChat=await Chat.find({isGroupChat:false,
    $and:[
        {users:{$elemMatch:{$eq:req.user._id}}},
        {users:{$elemMatch:{$eq:req.userId}}}

    ]}).populate('users',"-password").populate('latestMessage')
    isChat=await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email"
    })

    if(isChat.length>0)
    {
        res.send(isChat[0])
    }
    else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId]
        }
        try {
            const createdChat =await Chat.create(chatData)
            const Fullchat=await Chat.find({_id:createdChat._id}).populate('users',"-password")
res.status(200).send(Fullchat)
        } catch (error) {
            throw new Error(error.message)
        }
    }
})

export default accessChat