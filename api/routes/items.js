const express = require('express');
const JSONStream = require('JSONStream');
const router = express.Router();

/* GET items */
router.get('/', async function(req, res, next) {
    try {
        let client = req.db;
        let result = await client.query("SELECT * FROM items");
        res.json(JSON.stringify({
            items : result.rows
        }));
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
