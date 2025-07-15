const sendJwt = (user, res, statusCode) => {
    const token = user.getJwtToken()

    const isProd = process.env.NODE_ENV === 'production'
    //Setting cookies
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'None' : 'Lax'
    }

    res.status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, user, token })
}

export default sendJwt