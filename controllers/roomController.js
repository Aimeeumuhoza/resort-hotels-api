const Hotel=require("../models/Hotel")
const Room=require("../models/Room")


class roomController {

  static async createRoom(req, res) {
      try {

          const { hotelId, roomNumber, Price, maxPeople } = req.body;


          const hotel = await Hotel.findById(hotelId);
          if (!hotel) {
              return res.status(404).json({ error: 'Hotel not found' });
          }

          const newRoom = new Room({
              hotel: hotel._id,
              roomNumber,
              Price,
              maxPeople,
          });

          const room = await newRoom.save();

          hotel.Rooms.push({
              roomNumber: room.roomNumber,
              Price: room.Price,
              maxPeople: room.maxPeople,
             // _id: room._id
          });

          await hotel.save();

          return res.status(200).json({
              message: "Room created successfully",
              room
          });
      } catch (error) {
          return res.status(500).json({
              error: error.message
          });
      }
  }
 static async getAllRoom(req,res){
    // try {
    //     const rooms =   await Room.find()
    //     return res.status(200).json(rooms)
    // } catch (error) {

    //     return res.status(500).json({error:error.message})
    // }
    const  {hotelId}  = req.params;

    try {
      const hotel = await Hotel.findById(hotelId);
     
      if (!hotel) {
        return res.status(404).json({ error: "Hotel not found" });
      }

      const rooms = await Room.find( );
    
      return res.status(200).json({
        message: "Rooms fetched successfully",
        rooms,
      });
      
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

 }
 static async getRoom (req,res){
    try{
        const id=req.params._id
        const room =await Room.findById(id)
   
    return res.status(200).json({message:"user found",room })
} catch (error) {
    return res.status(500).json({error:error.message})
}
}
static async delete(req,res){
    try{
        const id=req.params._id
        const room=await Room.findByIdAndDelete(id)
        return res.status(200).json({message:"user deleted",room })
    }
    catch (error) {
        return res.status(500).json({error:error.message})
    }
}
static async updateRoom(req,res){
    try{
        const id=req.params._id
        const roomupdate=await Room.findByIdAndUpdate(id,req.body)
        res.status(200).json({messsage:"Room  updated",roomupdate})
     }
     catch(error){
        console.log(error)
     }
}
 
}

module.exports = roomController;
