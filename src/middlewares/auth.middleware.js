const { ExtractJwt, Strategy } = require('passport-jwt')
const passport = require('passport')

const { findUserById } = require('../users/users.controllers')

const passportConfigs = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'academlo'
}

passport.use(new Strategy(passportConfigs, (tokenDecoded, done) => {
    findUserById(tokenDecoded.id)
        .then(data => {
            if (data) {
                done(null, tokenDecoded)  
            } else {
                done(null, false, {message: 'Incorrect Token'})
            }
        })
        .catch(err => {
            done(err, false)
        })
}))

module.exports = passwordJwt.authenticate('jwt', {session:false})