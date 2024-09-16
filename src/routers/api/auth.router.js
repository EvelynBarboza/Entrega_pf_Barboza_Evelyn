const { Router } = require('express')
const { generateToken } = require ('../../utils/jwt.js');

const router = Router();

router.post('/login', (req, res) => {
    const user = { id: 1, name: 'Ejemplo'};

    const token = generateToken(user);

    res.cookie('token', token, {httpOnly: true}).send('Login exitoso')
})

module.exports = router;