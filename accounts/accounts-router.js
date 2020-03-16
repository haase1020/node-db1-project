const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();

router.get('/', (req,res) => {
    db.select('*')
    .from('accounts')
    .then(rows => {
        res.status(200).json({ data:rows });
    })
    .catch(error => {
        res.status(500).json({ message: 'messed up!', error: error })
    })
});

router.get('/:id', (req,res) =>{
    db('accounts')
    .where({ id:req.params.id })
    .first()
    .then(account => {
        if(account) {
            res.status(200).json({ data: account })
        } else {
            res.status(404).json({ message: 'post not found'})
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'sorry!' })
    });
});

router.post('/', (req,res) => {
    db('accounts')
    .insert(req.body, 'id')
    .then(ids=> {
        res.status(201).json({ results: ids });
    })
    .catch(error => {
        res.status(500).json({ message: "sorry charlie" })
    });
});

router.put('/:id', (req,res) => {
    const changes = req.body;
    db('accounts')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
        if(count > 0) {
            res.status(200).json({ message: 'successful' });
        } else {
            res.status(404).json({ message: 'not found' });
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "you have problems" })
    });
});

router.delete('/:id', (req,res) => {
    db('posts')
    .where({ id:req.params.id })
    .del()
    .then(count => {
        if(count>0) {
            res.status(200).json({ message: 'record deleted'})
        } else {
            res.status(404).json({ message: 'problems' })
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'problems' })
    })
});

module.exports = router;
