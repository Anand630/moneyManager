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
    typeId: 'INCOME',
    income: 0,
    expenses: 0,
    isError: false,
    areFieldsEmpty: false,
    transactionsList: [],
  }

  onTitleInput = e => this.setState({titleInput: e.target.value})

  onAmountInput = e => this.setState({amountInput: parseInt(e.target.value)})

  onOptionSelect = e => this.setState({typeId: e.target.value})

  addTransactionItem = e => {
    e.preventDefault()
    const {titleInput, amountInput, typeId, income, expenses} = this.state

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: amountInput,
      type: typeId,
    }
    console.log(`Income: ${income}`)
    console.log(`Expenses: ${expenses}`)
    console.log(`Difference/Balance: ${income - expenses}`)

    if (
      typeId === 'INCOME' &&
      amountInput > 0 &&
      amountInput !== '' &&
      titleInput !== ''
    ) {
      this.setState(prevState => ({
        transactionsList: [...prevState.transactionsList, newTransaction],
        income: prevState.income + amountInput,
        titleInput: '',
        amountInput: '',
        isError: false,
        areFieldsEmpty: false,
        // balance: prevState.income + amountInput - expenses,
      }))
    } else if (
      typeId === 'EXPENSES' &&
      income - expenses >= amountInput &&
      amountInput !== '' &&
      titleInput !== ''
    ) {
      this.setState(prevState => ({
        transactionsList: [...prevState.transactionsList, newTransaction],
        expenses: prevState.expenses + amountInput,
        titleInput: '',
        amountInput: '',
        isError: false,
        areFieldsEmpty: false,
        // balance: income - prevState.expenses - amountInput,
      }))
    } else if (amountInput !== '' && titleInput !== '') {
      this.setState(prevState => ({isError: !prevState.isError}))
    } else if (amountInput === '' || titleInput === '') {
      this.setState(prevState => ({areFieldsEmpty: !prevState.areFieldsEmpty}))
    }
  }

  deleteTransaction = (id, type, refund) => {
    if (type === 'EXPENSES') {
      this.setState(prevState => ({
        transactionsList: prevState.transactionsList.filter(
          eachTransaction => eachTransaction.id !== id,
        ),
        expenses: prevState.expenses - refund,
      }))
    } else if (type === 'INCOME') {
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
      isError,
      areFieldsEmpty,
      transactionsList,
    } = this.state
    console.log(this.state)
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
                  <option value={transactionTypeOptions[1].optionId}>
                    {transactionTypeOptions[1].displayText}
                  </option>
                </select>
              </div>
              <div className="add-button-and-warning-container">
                <button type="submit" className="add-button">
                  Add
                </button>
                {areFieldsEmpty ? (
                  <p className="insufficient-funds-warning">
                    *Empty Title/Amount Input
                  </p>
                ) : null}
                {amountInput === 0 ? (
                  <p className="insufficient-funds-warning">
                    *Invalid Salary Input
                  </p>
                ) : null}
                {isError ? (
                  <p className="insufficient-funds-warning">
                    *Insufficient funds
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
