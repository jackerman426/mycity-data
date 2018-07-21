
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');

router.get('/', (req, res) => {
  res.render('index')
});

// routes.js
router.get('/poi', (req, res) => {
    res.render('poi',{
        data: {},
        errors: {}
    })
});

router.post('/poi', [
    check('title')
        .isLength({ min: 1 })
        .withMessage('Title is required'),
    check('location')
        .isLength({ min: 1 })
        .withMessage('Location is required'),
    check('description')
        .isLength({ min: 20 })
        .withMessage('Description is too short. It needs to be at least 20 characters long.')
    ],(req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.render('poi', {
              data: req.body,
              errors: errors.mapped()
          })
      }
      const data = matchedData(req);
      console.log('Sanitized: ', data);
      req.flash('success', 'Thanks for the submission! :)');
      res.redirect('/')
  });

module.exports = router;
