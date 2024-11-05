const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    username: { type: String, required: false },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String },
    status: { type: String, default: 'pending' },
    invitationToken: { type: String },
    contactPerson: { type: String },
    phone: { type: String },
    address: { type: String },
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: [
            'admin',
            'supplier',
            'warehouse_staff',
            'sales_staff',
            'purchasing_agent',
            'accountant',
            'customer',
            'auditor',
            'report_viewer',
            'manager'
        ],
    },
    permissions: [String],
    profile_pic : {} ,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    tokenExpiry: { type: Date },
    lastLogin: Date
});

userSchema.methods.generateJWT = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
    });
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
