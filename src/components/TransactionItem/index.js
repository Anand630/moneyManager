import './index.css'

const TransactionItem = props => {
  const {transactionDetails} = props
  const {title, amount, type} = transactionDetails
  return (
    <li className="transaction-column-data-container">
      <p className="title-data">{title}</p>
      <p className="amount-data">{amount}</p>
      <p className="type-data">{type}</p>
      <button type="button" className="delete-button">
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
