const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
  name:{
    type:String,
    required:[true,'Please enter a name']
  },

  avatar:{
     public_id:String,
     url:String,
  },

  email:{
  	  type:String,
  	  required:[true,'Please enter a email'],
  	  unique:[true,"Email already exists"],
  },

 password:{
      type:String,
      required:[true,'Please enter a Password'],
      minlength:[3,"Password must be at least 3 characters"],
      select:false,
 },
  post:[
      {
          type:mongoose.Schema.Types.ObjectId,
          ref:'Post',
      }
  ],
  followers:[
       {
          type:mongoose.Schema.Types.ObjectId,
          ref:'User',
       }
  ],
  following:[
       {
          type:mongoose.Schema.Types.ObjectId,
          ref:'User',
       }
  ],
},
{timestamps:true}
);

const User = mongoose.model('User',userSchema);

module.exports = User;