const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
   
    lastName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    phone:{
        type:String,

    },
    password:{
        type:String,
        required:true,
        minlenght:6
    },
    role:{
        type:String,
        enum: ['couple', 'vendor', 'admin'],
        default:'couple'
    },
    profilePicture:{
        type:String,
        default:''
    },
    isActive:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
}, { timestamps: true });

// Hash the password before saving the user

userSchema.statics.signup = async function(userData)  {
    let { firstName, lastName, email, password, phone, role } = userData;

    // Validation
 

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    }


    // Check if email already exists
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email already in use');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create the user
    const user = await this.create({ 
        firstName,
        lastName,
        email, 
        password: hash ,
        phone: phone || '',
        role: role || 'couple'
    });

    
   return user;
}

//static login method
userSchema.statics.login = async function(email, password){
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw Error('Incorrect password');
    }

    return user;
}

userSchema.methods.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};





/*userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};*/

module.exports = mongoose.model('User', userSchema);