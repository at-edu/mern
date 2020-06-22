const {Router} = require('express')
// const {check, validationResult} = require('express-validator')
// const bcrypt = require('bcryptjs')
const config = require('config')
const shortid = require('shortid')
// const jwt = require('jsonwebtoken')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({code: req.params.code})
        if(link){
            link.clicks++
            await link.save()
            return res.redirect(link.from)
        }
        res.status(404).json('Ссылка не найдена')
    } catch (e) {
        res.status(500).json({message: 'Упс... Что пошло не так.'})
    }
})

module.exports = router