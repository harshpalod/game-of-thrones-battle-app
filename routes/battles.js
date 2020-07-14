const router = require('express').Router();
let Battle = require('../models/battle.model');

//endpoint: /list/count
router.route('/count').get((req, res) => {
    Battle.countDocuments({})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//endpoint: /list -> returns unqiue locations of battle
router.route('/').get((req, res) => {
    Battle.distinct('location')
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/search').get((req, res) => {
    var query = req.query;
    if(query){
        console.log("Passed query parameters \n" + JSON.stringify(query))
        // query = decodeURI(query);
        query = JSON.parse(JSON.stringify(query));
    }
    Battle.find(query)
    .then(results => res.json(results))
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;