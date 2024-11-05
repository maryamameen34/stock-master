const crypto = require("crypto");
const User = require("../models/user.js");
const userMail = require("../utils/sendEmail");
const ErrorHandler = require("../utils/ErrorHandler");
const { io } = require("../index");
const Notification = require("../models/notification")


exports.inviteUser = async (req, res) => {
    try {
        const { first_name, last_name, email, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }

        const invitationToken = crypto.randomBytes(32).toString('hex');
        const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000;

        const newUser = await User.create({
            first_name,
            last_name,
            email,
            role,
            invitationToken,
            tokenExpiry,
            status: 'pending',
        });
        console.log('New User ID:', newUser._id);


        const invitationUrl = `${process.env.FRONTEND_URL}/complete-registration/${invitationToken}`;

        const emailOptions = {
            email,
            subject: 'Complete Your Registration',
            text: `You have been invited to complete your registration. Please click on the link below to complete your registration:\n${invitationUrl}\nThis link will expire in 24 hours.`,
            html: `<p>You have been invited to complete your registration. Please click on the link below to complete your registration:</p><a href="${invitationUrl}">Complete Registration</a><p>This link will expire in 24 hours.</p>`,
        };
        await userMail(emailOptions);
        const notification = await Notification.create({
            admin_message: `${first_name} ${last_name} is  invited to  complete his/her registeration as ${role}`,
            read: false,
        });

        res.status(201).json({ message: 'Invitation sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        if (users.length == 0) {
            res.status(404).json({
                message: "no user record found"
            })
        }
        res.status(200).json({
            message: "Users Fetched Successfully!",
            users
        })
    } catch (error) {
        res.status(500).json({
            error: "error fetching users" + error.message
        })
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, role, status } = req.body;

    try {
        const updatedSupplier = await User.findByIdAndUpdate(
            id,
            { first_name, last_name, email, role, status },
            { new: true }
        );
        if (!updatedSupplier) return res.status(404).json({ message: 'Supplier not found' });

        res.json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ message: 'Error updating supplier', error });
    }
};
exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await User.find({ role: 'supplier' }).select('-password');
        res.status(200).json({ users: suppliers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: 'customer' }).select('-password');
        res.status(200).json({ users: customers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.filterUsers = async (req, res) => {
    const { query } = req.query;

    try {
        const regex = new RegExp(query, "i");

        const users = await User.find({
            $or: [
                { first_name: { $regex: regex } },
                { email: { $regex: regex } },
                { role: { $regex: regex } },
                { tags: { $regex: regex } },
            ],
        })

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.deletedUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};