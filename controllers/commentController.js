const Comment =require( "../models/Comment")
const  Hotel =require ("../models/Hotel")

class commentController{
static async createcomment(req, res) {
    try {

        const hotelId = req.params.hotelid
        const comment  = new Comment(req.body)
        const savedcomment = await comment.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId,{
                $push:{comment: savedcomment}
            })
        } catch (error) {
            console.log(error);
        }
        return res.status(200).json(savedcomment)
    } catch (error) {
        console.log(error);
    }
}

static async getAllcomment(req,res){
    try {
        const comments = await Comment.find({})
        return res.status(200).json({comments})
    } catch (error) {
        console.log(error);
    }
 }

 static async getHotelComment(req,res){
    try {
        const hotelId = req.params.hotelid
        const hotel=await Hotel.findById(hotelId)

        const comment=await Promise.all(
            hotel.comment.map((comm)=>{
                return comm
            })
        )
    return res.status(200).json(comment)
    } catch (error) {
        console.log(error);
    }
 }
 

}
module.exports= commentController