 function auth(req, res, next){
    if (req.session?.user.email === 'evelyna@gmail.com' && req.session?.user?.admin) {
        return next()
    }
    return res.status(401).send('Error de autorizacion')
}

module.exports = auth;