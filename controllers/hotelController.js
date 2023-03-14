const Hotel =require("../models/Hotel")
const Room=require("../models/Room")
//const cloudinary= require ("../helper/cloudinary")

class hotelController{
    
    static async createHotel(req,res){
        try {

            //const result = await cloudinary.uploader.upload(req.file.path)
            const newHotel = new Hotel({
                Name: req.body.Name,
                Type:req.body.Type,
                City:req.body.City,
                Address:req.body.Address,
                //Image:result.secure_url,
                Image:req.body.Image,
                Rating:req.body.Rating,
                Rooms:req.body.Rooms,
                price:req.body.price,
                Desc: req.body.Desc
            })
            const hotel = await newHotel.save()
          return res.status(200).json({message:"Hotel created successfully",hotel})  
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
       
    }

    // static async updateHotel(req,res){
    //     try {
    //         const updateHotel = await Hotel.findByIdAndUpdate(
    //         req.params._id,
    //         {
    //             $set: req.body,
    //         },
    //         { new:true}
    //         )
    //         return res.status(200).json({message:"hotel updated", updateHotel})
    //     } catch (error) {
    //         return res.status(500).json({error:error.message})
    //     }
    // }
    static async updateHotel(req,res){
        try{
            const id=req.params._id
            const hotelupdate=await Hotel.findByIdAndUpdate(id,req.body)
            res.status(200).json({messsage:"hotel  updated",hotelupdate})
         }
         catch(error){
            console.log(error)
         }
    }
    static async getAllHotels(req,res){
        const query = req.query.new
        try {
            const hotels =   await Hotel.find()
            return res.status(200).json(hotels)
        } catch (error) {

            return res.status(500).json({error:error.message})
        }
    }

    // static async gethotelcity(req,res){
    //     const qNew = req.query.new
    //     const qCategory = req.query.category
    //     try {
    //        let hotels;
    //        if(qNew){
    //         hotels = await Hotel.find().sort({createdAt: -1 }).limit(5)

    //        }else if(qCategory){ 
    //          hotels = await Hotel.find({categories:{
    //             $in:[qCategory], 
    //          }});

    //        }else{
    //         hotels = await Hotel.find( )
    //        }
    //        return res.status(200).json(hotels)
    //     } catch (error) {
            
    //         return res.status(500).json({error:error.message})
    //     }
    // }
    static async gethotel(req,res){
        try {
            const id = req.params._id
            const hotel = await Hotel.findById(id)
            return res.status(200).json({message:"user found",hotel })
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }

    // static async gethotelcity(req,res){
    //     try {
    //         const city = req.params._city
    //         const hotel = await Hotel.findById(city)
    //         return res.status(200).json({message:"user found",hotel })
    //     } catch (error) {
    //         return res.status(500).json({error:error.message})
    //     }
    // }

    static async delete(req,res){
        try {
            const id = req.params._id
            const hotel = await Hotel.findByIdAndDelete(id)
            return res.status(200).json({message:"product deleted successfully", hotel})
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }
static async countHotelByCity(req,res){
    try {
        const city = req.params.city;
        const count = await Hotel.countDocuments({ City: city });
        const hotels = await Hotel.find({ City: city });
        res.status(200).json({ count ,hotels});
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    
}

static async countByType(req,res){
    try {
        const type = req.params.type;
        const count = await Hotel.countDocuments({ Type: type });
        const hotels = await Hotel.find({ Type: type });
        res.status(200).json({ count ,hotels});
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    
}
static async getHotelRooms  (req, res)  {
    try {
      const hotelId = req.params.id;
      const hotel = await Hotel.findById(hotelId);
      const Rooms=hotel.Rooms
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      res.json({ Rooms});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
    
}

module.exports = hotelController