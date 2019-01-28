const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {events}= require('./merge');
const User=require('../../models/user');

//--------------------------------------------------
module.exports = {
    users: async (args,req) =>{
      try{
        const fetchedUser = await User.find();
        return fetchedUser.map(user=>{
          return{
            ...user._doc,
            _id: user.id,
            password:null,
            createdEvents: events.bind(this, user._doc.createdEvents)
          };
        })
        } catch(err){
          throw err;
        }
    },
    userinfo: async(args,req)=>{
      try{
        if (!req.isAuth){
            throw new Error('Unauthed')
          }
        const fetchedUser = await User.findById(req.userId);
          return{
            ...fetchedUser._doc,
            _id: fetchedUser.id,
            password:null,
            createdEvents: events.bind(this, fetchedUser._doc.createdEvents)
          };
        } catch(err){
          throw err;
        }
    },
    createUser: (args)=>{
      return User.findOne({username:args.userInput.username})
      .then(user=>{
        if (user){
          throw new Error('User exists already.');
        }
        return bcrypt.hash(args.userInput.password,12);
      })
      .then(hashedPassword=>{
        const user = new User({
          username: args.userInput.username,
          email: args.userInput.email,
          name:args.userInput.name,
          password:hashedPassword
        });
        return user.save();
      })
      .then(result=>{
        console.log(result);
        return {...result._doc, password:null, _id:result.id};
      })
      .catch(err=>{
        throw err;
      });
    },
    login: async ({username, password}) =>{
      const user = await User.findOne({username: username});
      if (!user){
        throw new Error ('Username not found !');
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual){
        throw new Error('Password is incorrect !');
      }
      const token = jwt.sign({userId: user.id, username: user.username}, 'Berlin5011supersecret!!',{
        expiresIn: '1h'
      });
      return {userId: user.id, token: token, TokenExpiration:1, userName:user.name};

    }
}
