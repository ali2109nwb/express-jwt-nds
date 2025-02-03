const Keyv = require('keyv'); 
const keyv = new Keyv();

exports.set = (key, value, ttl = undefined) => keyv.set(key,value, ttl);

exports.get = (key) => keyv.get(key);

exports.delete = (key) => keyv.delete(key);

exports.clear = () => keyv.clear();