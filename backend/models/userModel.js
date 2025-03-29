const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:false
    },
    middleName:{
        type:String,
        required:false
    },
    lastName:{
        type:String,
        required:false
    },
    gender:{
        type:String,
        required:false
    },
    dob:{
        type:Date,
        required:false
    },
    phoneNumber:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minlenght:6
    },
    role:{
        type:String,
        enum: [, 'couple', 'vendor', 'admin'],
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

userSchema.statics.signup = async function(email, password)  {
    // Validation
    if (!email || !password) {
        throw Error('All fields must be filled');
    }
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
    const user = await this.create({ email, password: hash });
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





/*userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};*/

module.exports = mongoose.model('User', userSchema);