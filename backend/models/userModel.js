const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { estimatedDocumentCount } = require('./Vendors');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    middleName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlenght:6
    },
    role:{
        type:String,
        enum: ['guest', 'couple', 'vendor', 'admin'],
        default: 'guest'
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
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);