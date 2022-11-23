import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
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
  state = {
    titleInput: '',
    amountInput: '',
    typeId: 'Income',
    income: 0,
    expenses: 0,
    balance: 0,
    transactionsList: [],
  }

  onTitleInput = e => this.setState({titleInput: e.target.value})

  onAmountInput = e => this.setState({amountInput: parseInt(e.target.value)})

  onOptionSelect = e => this.setState({typeId: e.target.value})

  addTransactionItem = e => {
    e.preventDefault()
    const {
      titleInput,
      amountInput,
      typeId,
      income,
      expenses,
      balance,
    } = this.state

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: amountInput,
      type: typeId,
    }
    console.log(`Income: ${income}`)
    console.log(`Expenses: ${expenses}`)
    console.log(`Difference: ${income - expenses}`)

    if (typeId === 'INCOME' && amountInput > 0) {
      this.setState(prevState => ({
        transactionsList: [...prevState.transactionsList, newTransaction],
        income: prevState.income + amountInput,
        titleInput: '',
        amountInput: '',
        balance: prevState.income + amountInput - expenses,
      }))
    } else if (typeId === 'EXPENSES' && balance >= amountInput) {
      this.setState(prevState => ({
        transactionsList: [...prevState.transactionsList, newTransaction],
        expenses: prevState.expenses + amountInput,
        titleInput: '',
        amountInput: '',
        balance: income - prevState.expenses - amountInput,
      }))
    } else {
      this.setState({balance: balance - amountInput})
    }
  }

  deleteTransaction = (id, type, refund) => {
    if (type === 'Expenses') {
      this.setState(prevState => ({
        transactionsList: prevState.transactionsList.filter(
          eachTransaction => eachTransaction.id !== id,
        ),
        expenses: prevState.expenses - refund,
      }))
    } else if (type === 'Income') {
      this.setState(prevState => ({
        transactionsList: prevState.transactionsList.filter(
          eachTransaction => eachTransaction.id !== id,
        ),
        income: prevState.income - refund,
      }))
    }
  }

  render() {
    const {
      titleInput,
      amountInput,
      income,
      expenses,
      transactionsList,
      balance,
    } = this.state
    console.log(balance)
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
            <MoneyDetails moneyDetails={{income, expenses}} />
          </ul>
          <div className="add-transaction-and-history-container">
            <form onSubmit={this.addTransactionItem} className="form">
              <h1 className="add-transaction-heading">Add Transaction</h1>
              <div className="label-input-container">
                <label htmlFor="title">TITLE</label>
                <input
                  value={titleInput}
                  onChange={this.onTitleInput}
                  placeholder="TITLE"
                  id="title"
                  type="text"
                />
              </div>
              <div className="label-input-container">
                <label htmlFor="amount">AMOUNT</label>
                <input
                  value={amountInput}
                  onChange={this.onAmountInput}
                  placeholder="AMOUNT"
                  id="amount"
                  type="number"
                />
              </div>
              <div className="label-input-container">
                <label htmlFor="select">TYPE</label>
                <select onChange={this.onOptionSelect} id="select">
                  <option
                    defaultChecked
                    value={transactionTypeOptions[0].optionId}
                  >
                    {transactionTypeOptions[0].displayText}
                  </option>
                  <option value={transactionTypeOptions[0].optionId}>
                    {transactionTypeOptions[1].displayText}
                  </option>
                </select>
              </div>
              <div className="add-button-and-warning-container">
                <button type="submit" className="add-button">
                  Add
                </button>
                {balance < 0 || amountInput === 0 ? (
                  <p className="insufficient-funds-warning">
                    *Insufficient funds/Invalid Salary Input
                  </p>
                ) : null}
              </div>
            </form>
            <div className="history-container">
              <h1 className="history-heading">History</h1>
              <ul className="transactions-list-container">
                <li className="list-column-headings-container">
                  <p className="column-headings-title">Title</p>
                  <p className="column-headings-amount">Amount</p>
                  <p className="column-headings-type">Type</p>
                </li>
                {transactionsList.length > 0
                  ? transactionsList.map(eachTransaction => (
                      <TransactionItem
                        deleteTransaction={this.deleteTransaction}
                        transactionDetails={eachTransaction}
                        key={eachTransaction.id}
                      />
                    ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
