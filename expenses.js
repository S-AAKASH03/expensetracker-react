const router = require('express').Router();
let Expense = require('../models/expense');

// Get all expenses
router.route('/').get((req, res) => {
  Expense.find({})
    .then(expenses => res.json(expenses))
    .catch(err => res.status(310).json('Error: '));
});
router.route('/expenses').get((req, res) => {
  Expense.find()
    .then(expenses => res.json(expenses))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new expense
router.route('/add').post((req, res) => {
  const text = req.body.text;
  const amount = Number(req.body.amount);

  const newExpense = new Expense({
    text,
    amount,
  });

  newExpense.save()
    .then(() => res.json('Expense added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete an expense
router.route('/:id').delete((req, res) => {
  Expense.findByIdAndDelete(req.params.id)
    .then(() => res.json('Expense deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
