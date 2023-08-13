const Auth = require('../models/auth.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = async(req,res) => {
    try {
        const {username, email, password} = req.body    
        const user = await Auth.findOne({email})

        if(user){
            return res.render('register', {message: 'This email is already in use', success: false})
        } else{

            if(password.length < 8){
                return res.render('register', {message: 'Password must be at least 8 characters long', success: false})
            }
        }
        const passwordHash = await bcrypt.hash(password,12)

        const newUser = await Auth.create({username, email, password: passwordHash})

        const userToken = jwt.sign({id: newUser._id}, process.env.SECRET_TOKEN, {expiresIn:'1h'});

        return res.render('register', {message: 'You are successfully registered', success: true})

        //Buraya yönlendirme yapılacak ana sayfaya ve middleware ile kontrol sağlanacak kontrol şu olacak
        //eğer kullanıcı giriş yapmışsa bir daha login sayfasına yönlenmeyecek /login e gitse bile otomatik anasayfaya
        //yönlenecek

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const login = async(req,res) => {

    try {
        const { email, password } = req.body;
        const user = await Auth.findOne({ email });

        if (!user) {
            return res.render('login', {message: 'Invalid email or password'})
        } else {
            const comparePassword = await bcrypt.compare(password, user.password);

            if (!comparePassword) {
                return res.render('login', {message: 'Invalid email or password'})
            }

            const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, { expiresIn: '1h' });
            console.log(token);

            return res.render('homepage', { token });

        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updatePassword = async(req,res) => {
    try {
        const {email, password, newpassword} = req.body;
        const user = await Auth.findOne({email})

        if (!user) {
            return res.render('updatePassword', {message: 'User not found', success: false});
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return res.render('updatePassword', {message: 'Incorrect password', success: false});
        }
        if(newpassword.length < 8){
            return res.render('updatePassword', {message: 'New password cannot be less than 8 characters', success: false});
        }
        await Auth.findByIdAndUpdate(user._id, {password: await bcrypt.hash(newpassword,12)});
        return res.render('updatePassword', {message: 'Password updated successfully', success: true});


     } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
;

module.exports = {register, login, updatePassword}