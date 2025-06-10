const sendJwt = (user, res, statusCode) => {
    const token = user.getJwtToken()
    res.status(statusCode).json({ user, token })
}

export default sendJwt