const User = require('./../model/user.schema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const passwordComplexity = require("joi-password-complexity");


const login = async (req, res, next) => {
    const user = await User.findOne({where: {email: req.body.email}});
    if (!user) {
        return res.status(401).json({error: "Email ou mot de passe incorrect"})
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({error: "Email ou mot de passe incorrect"})
    }
    res.status(200).json({
        id: user.id,
        email: user.email,
        token: jwt.sign({
            id: user.id,
            roles: user.roles
        }, process.env.JWT_KEY),
    });
}

const signIn = async (req,res,next) => {
    let member = await Role.findOne({ where: { name: "Member" } });
    if (!member) {
        return res.status(404).json({ message: "Le rôle Member n'as pas été trouvé" });
    }
    try {
        if (!passwordComplexity().validate(req.body.password).error){
            const user = await User.create({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                roles: [member.id]
            });
            return res.status(201).json(user);
        }
        return res.status(401).json({"Password not valid": "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"});
    } catch (e) {
        res.status(401).json({ error: e.message });
    }
}

module.exports = { login, signIn };
