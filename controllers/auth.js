const Auth = require('../models/auth.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = async(req,res) => {
    try {
        const {username, email, password} = req.body    
        const user = await Auth.findOne({email})

        if(user){
            return res.status(500).json({message: "This email address is already in use"})
        }

        if(password.length < 8){
            return res.status(500).json({message: "Password can't be shorter than 8 characters"})
        }

        const passwordHash = await bcrypt.hash(password,12)

        const newUser = await Auth.create({username, email, password: passwordHash})

        const userToken = jwt.sign({id: newUser.id}, process.env.SECRET_TOKEN, {expiresIn:'1h'});

        return res.redirect('/login')

        //Buraya yönlendirme yapılacak ana sayfaya ve middleware ile kontrol sağlanacak kontrol şu olacak
        //eğer kullanıcı giriş yapmışsa bir daha login sayfasına yönlenmeyecek /login e gitse bile otomatik anasayfaya
        //yönlenecek

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const login = async(req,res) => {

    try {
        const {email, password} = req.body;
        const user = await Auth.findOne({email});
        if(!user){
            return res.status(500).json({message: "Wrong email or password"})
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(500).json({message: "Wrong email or password"})
        }

    const token = jwt.sign({id: user.id}, process.env.SECRET_TOKEN, {expiresIn:'1h'})

    return res.redirect('/homepage')
}
    catch(error){
        return res.status(500).json({message: error.message})
}
}

module.exports = {register, login}