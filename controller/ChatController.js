export default class ChatController{
    chatNow = (req,res)=>{
        return res.render('chat',{
            name:req.params.name
        })
    }
}