const express= require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql')
const mongoose=require('mongoose');
const isAuth = require('./middleware/is-auth');
const request = require ('request');

const graphQLSchema = require('./graphql/Schema/index');
const graphQLResolver = require('./graphql/Resolver/index');

const app = express();

var options1={
  url:"http://178.128.54.187:4455/v1/access_token",
  method:"POST",
  headers:{
    "Content-Type":"application/x-www-form-urlencoded"
  },
  form:{
    "code":"",
    "grant_type":"authorization_code",
    "redirect_uri":"http://127.0.0.1:3002/callback",
    "client_id":"idp-provider",
    "client_secret":"vietan@123",
    "token_endpoint_auth_method":"client_secret_post"
  }
}
var options2={
  url:"http://178.128.54.187:4455/v1/me",
  method:"POST",
  headers:{
    Authorization:""
  }
}

app.use(bodyParser.json())

app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  if (req.method==='OPTIONS'){
    return res.sendStatus(200);
  }
  next();
});
app.use(isAuth);

app.use('/graphql', graphqlHttp({
  schema: graphQLSchema,
  rootValue:graphQLResolver,
  graphiql: true
}));

app.get('/callback',(req,res,next)=>{
  if (req.query.code){
    options1.form.code=req.query.code;
    return new Promise(resolve=>{
      request(options1, (err,res,body)=>{
        if (err){throw new Error(err)}
        options2.headers.Authorization=`bearer ${JSON.parse(body).access_token}`;
        return new Promise(rev=>{
          request(options2,(err,res,body)=>{
            if (err){throw new Error(err)}
            resolve(body);
          });
        }).then(value=>
          {
            resolve(value)
          })
      });
    }).then(value =>
      {
        res.redirect(`http://127.0.0.1:3000/oauth/code=${encodeURIComponent(value)}`);
      })
  }
}
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-qvurb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
  )
  .then(()=>{
    app.listen(3002);
    console.log('server running');
  })
  .catch(err=>{
    console.log(err);
  });
