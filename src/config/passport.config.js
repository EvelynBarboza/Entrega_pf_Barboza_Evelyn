const passport =require ('passport');
const {Strategy, ExtractJwt } = require ('passport-jwt');
const { PRIVATE_KEY } = require ('../utils/jwt');

const JWTStrategy = Strategy
const JWTExtract = ExtractJwt

const cookieExtractor = req => {
    let token = null
    if (req && req.cookies) token = req.cookies['token']
    return token
}
exports.initializePassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: JWTExtract.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) =>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))
}
