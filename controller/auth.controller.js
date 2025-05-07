const User = require('./../model/user.schema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
            email: user.email,
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
        let result = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 4),
            roles: [member.id]
        });
        res.status(201).json(result);
    } catch (e) {
        res.status(401).json({ error: e.message });
    }
}

module.exports = { login, signIn };
