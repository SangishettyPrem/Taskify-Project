const ensureAuthenticated = require('../Middlewares/Auth');
const router = require('express').Router();


router.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json([{
        "name": "Tv",
        "description": "Television"
    }, {
        "name": "Mobile",
        "description": "Smartphone"
    }])
})

module.exports = router;