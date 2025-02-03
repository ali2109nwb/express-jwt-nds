const AuthService = require('../services/auth.service');
const jwtConfig = require('../config/jwt.config');
const bcryptUtil = require('../utils/bcrypt.util');
const jwtUtil = require('../utils/jwt.util');
const { password } = require('../config/database.config');

exports.register = async (req, res) => {
    const isExist = await AuthService.findUserByEmail(req.body.email);
    if(isExist) {
        return res.status(400).json({
            msg: 'Email already exist'
        });
    }
    const hashedPassword = await bcryptUtil.createHash(req.body.password);
    const  userData = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }
    const user = await AuthService.createUser(userData);
    return res.json({
        data: user,
        msg: 'User registered successfully'
    });
}

exports.login = async (req, res) => {
    const user = await AuthService.findUserByEmail(req.body.email);
    if(user) {
        const isMatched = await bcryptUtil.compareHash(req.body.password, user.password);
        if(isMatched) {
            const token = await jwtUtil.createToken({ id: user.id});
            return res.json({
                access_token: token,
                token_type: 'Bearer',
                expires_in: jwtConfig.ttl
            });
        }
    }
    return res.status(400).json({msg: 'Unauthorized'});
}

exports.getUser = async (req, rs) => {
    const user = await AuthService.findUserById(req.user.id);
    return rs.json({
        data: user,
        msg: 'Success...'
    });
}

exports.logout = async (req, res) => {
    await AuthService.logoutUser(req.token, req.user.exp);
    return res.json({msg: 'Logged out successfully'});
}