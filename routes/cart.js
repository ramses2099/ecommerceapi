const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Users !')
})

router.post('/', (req, res) => {
    res.send('Users !')
})


module.exports = router;