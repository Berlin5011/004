const Event=require('../../models/event');
const User=require('../../models/user');

const events = eventIds =>{
  return Event.find({_id:{$in:eventIds}})
  .then(events=>{
    return events.map(event =>{
      return transEvent(event);
    });
  })
  .catch(err =>{
    throw err;
  });
};
//--------------------------------------------
const userFinder = userId =>{
  return User.findById(userId)
  .then(user =>{
    return {
      ...user._doc,
      _id:user.id,
      password:null,
      createdEvents:events.bind(this,user._doc.createdEvents)};
  })
  .catch(err=>{
    throw err;
  })
};
//-------------------------------------------
const transEvent= event =>{
  return{
    ...event._doc,
    _id: event.id,
    date:new Date(event._doc.date).toISOString(),
    creator: userFinder.bind(this, event._doc.creator)
  };
}
//----------------------------------------

exports.transEvent = transEvent;
exports.events= events;
