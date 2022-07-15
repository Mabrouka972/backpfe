const express = require("express");

const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require("../models/user.Model")

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'token secret', {
        expiresIn: maxAge
    })
}

router.post('/signup', async (req, res) => {
    console.log(req.body)
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    const check = await User.find({ email: req.body.email })
    if (check.length == 0) {
        await user.save((err, data) => {
            if (err) {
                res.status(406).json({
                    status: 406,
                    message: "error create user" + err,
                    data: null,
                });
            } else {
                const token = createToken(data._id)
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
                res.status(201).json({ status: 201, message: "create condidat", data: data, userId: data._id });
            }
        })
    } else {
        console.log(user)
        res.status(406).json({
            status: 406,
            message: "user existe",
            data: null,
        });
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                const token = createToken(user._id)
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
                res.status(200).json({ user: user._id, data: user, role: user.__t })
            } else {
                res.status(406).json({ message: 'password incorrect' })
            }

        } else {
            res.status(406).json({ message: 'email incorrect' })
        }
    }
    catch (err) {
        res.status(400).json({ message: err })
    }
})

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 })

    res.send({
        message: 'success'
    })
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id })
        const time =  user.created.getTime()
        res.status(200).json({ data: user  , time : time})

    } catch (err) {
        res.status(406).json({ message: err.message })
    }
})



module.exports = router;