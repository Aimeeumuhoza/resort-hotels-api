const Hotel=require("../models/Hotel")
const Room=require("../models/Room")


class roomController {

  static async createRoom(req, res) {
      try {

          const { hotelId, roomNumber, price, maxPeople } = req.body;

          const hotel = await Hotel.findById(hotelId);
          if (!hotel) {
              return res.status(404).json({ error: 'Hotel not found' });
          }

          const newRoom = new Room({
              hotel: hotel._id,
              roomNumber,
              price,
              maxPeople,
          });

          const room = await newRoom.save();

          hotel.Rooms.push({
              roomNumber: room.roomNumber,
              price: room.price,
              maxPeople: room.maxPeople,
              _id: room._id
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

}

module.exports = roomController;
