const sendToken = (user, statusCode, res) => {
    const token = user.generateJWT(); 
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'Strict', 
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        user,
    });
};

module.exports = sendToken;