import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Balance from './Components/Balance';
import Header from './Components/Header';
import TransactionList from './Components/TransactionList';
import AddTransaction from './Components/AddTransaction';
import IncomeExp from './Components/IncomeExp';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/expenses/')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
      });
  }, []);

  function deleteTransaction(id) {
    axios.delete(`http://localhost:5000/expenses/${id}`)
      .then(() => {
        setTransactions(transactions.filter(transaction => transaction.id !== id));
      })
      .catch(error => {
        console.error('Error deleting transaction:', error);
      });
  }

  function addTransaction(text, amount) {
    const newTransaction = {
      text,
      amount
    };

    axios.post('http://localhost:5000/expenses/add', newTransaction)
      .then(response => {
        setTransactions([...transactions, response.data]);
      })
      .catch(error => {
        console.error('Error adding transaction:', error);
      });
  }

  return (
    <>
      <Header />
      <Balance transactions={transactions} />
      <IncomeExp transactions={transactions} />
      <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
      <AddTransaction addTransaction={addTransaction} />
    </>
  );
}

export default App;
