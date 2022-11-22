import {Component} from 'react'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

export default class MoneyManager extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="money-manager-container">
          <div className="name-and-welcome-note-container">
            <h1 className="name">Hi, Richard</h1>
            <p className="welcome-note">
              Welcome back to your
              <span> Money Manager</span>
            </p>
          </div>
          <ul className="money-details-container">
            <MoneyDetails />
          </ul>
          <div className="add-transaction-and-history-container">
            <form className="form">
              <h1 className="add-transaction-heading">Add Transaction</h1>
              <div className="label-input-container">
                <label htmlFor="title">TITLE</label>
                <input placeholder="TITLE" id="title" type="text" />
              </div>
              <div className="label-input-container">
                <label htmlFor="amount">AMOUNT</label>
                <input placeholder="AMOUNT" id="amount" type="text" />
              </div>
              <div className="label-input-container">
                <label htmlFor="select">TYPE</label>
                <select id="select">
                  <option>Income</option>
                  <option>Expenses</option>
                </select>
              </div>
              <button type="button" className="add-button">
                Add
              </button>
            </form>
            <div className="history-container">
              <h1 className="history-heading">History</h1>
              <ul className="transactions-list-container">
                <li className="list-column-headings-container">
                  <p className="column-headings-title">Title</p>
                  <p className="column-headings-amount">Amount</p>
                  <p className="column-headings-type">Type</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
