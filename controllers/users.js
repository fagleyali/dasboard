const User = require('../models/user');
const jwt =  require('jsonwebtoken');

const SECRET = process.env.SECRET;


async function signup(req, res){
    const user = new User(req.user);
    try{
        await user.save();
        const token =  createJWT(user);
        res.json({token});
    }catch(err){
        res.status(400).json(err);
    }
}


/*------Helper Functions---*/

function createJWT(){
    return jwt.sign({user},SECRET,{expiresIn:'24h'})
};
