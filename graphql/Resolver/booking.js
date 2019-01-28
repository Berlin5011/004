const Booking = require('../../models/booking');
const Event = require('../../models/event');
const User = require('../../models/user');


module.exports = {
    bookings:async ()=>{
      try{
        const bookings = await Booking.find();
        return bookings.map(booking =>{
          return {
            ...booking._doc,
             _id: booking.id,
            createdAt: new Date(booking._doc.createdAt).toISOString(),
            updatedAt: new Date(booking._doc.updatedAt).toISOString()
          };
        })
      } catch(err){
        throw err;
      }
    },
    bookEvent: async args=>{
      const fetchedevent = await Event.findById(args.eventId);
      const booking = new Booking({
        event: fetchedevent,
        user:'5c39f62b8283481fc4b17040'
      });
      const result = await booking.save();
      return{
        ...result._doc,
        _id: result.id,
        createdAt: new Date(result._doc.createdAt).toISOString(),
        updatedAt: new Date(result._doc.updatedAt).toISOString()
      }
    }
  }
