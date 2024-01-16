const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

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

 userSchema.pre("save",async function (next) {
 	if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password,10);
 	}
 	next();
 });

const User = mongoose.model('User',userSchema);

module.exports = User;