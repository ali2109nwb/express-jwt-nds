const cacheUtil = require('../utils/cache.util');
const jwtUtil = require('../utils/jwt.util');

module.exports = async (req, res, next) => {
    let token = req.headers.authorization;    
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        try {
            token = token.trim();
            
            // const isBlacklisted = await cacheUtil.get(token);
            
            // if (isBlacklisted) {
            //     return res.status(401).json({msg: 'Unauthorized'});
            // }

            const decoded = await jwtUtil.verifyToken(token);
            req.user = decoded;
            req.token = token;
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({msg: 'Unauthorized'});
        }
    } else {
        return res.status(400).json({msg: 'Authorization header is missing'})
    }
}