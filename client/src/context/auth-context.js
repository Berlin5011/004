import React from 'react';

export default React.createContext({
  token:null,
  userId: null,
  login:(userId,token,expire,name)=>{},
  logout:()=>{}
})
