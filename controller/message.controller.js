const Message = require('../model/message.schema.schema.js');
const User = require('../model/user.schema.js');


const getAll = (req, res, next) => {
    let result = Role.findAll();
    res.status(200).json(result);
}


const getById = async (req, res, next) => {
    let result = await Message.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(result);
}

const create = async (req, res, next) => {
    try {
        let result = await Message.create({
            name: req.body.name
        });
        res.status(201).json(result);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const update = async (req, res, next) => {
    verifyIfOwnMessage(req, res, next);
    let result = Message.updateOne(req.body, { id: req.params.id });
    res.status(201).json(result);
}

const remove = (req, res, next) => {
    verifyIfOwnMessage(req, res, next);
    let result = Message.remove(req.params.id);
    res.status(200).json(result);
}

const verifyIfOwnMessage = async (req, res, next) => {
    const message = await Message.findOne({
        where: {
            id: req.params.id
        },
        include: [User]
    });
    if (!message) {
        return res.status(404).json({ error: "Message not found" });
    }
    if (message.userId !== req.user.id) {
        return res.status(403).json({ error: "You are not the owner of this message" });
    }
    next();
}

module.exports = { getAll, create, getById, update, remove };
