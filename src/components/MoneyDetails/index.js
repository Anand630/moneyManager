import './index.css'

const MoneyDetails = props => {
  const {moneyDetails} = props
  const {income, expenses} = moneyDetails
  return (
    <>
      <li className="each-money-details-container your-balance-styling">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png "
          className="money-detail-logo"
          alt="balance"
        />
        <div className="heading-amount-type-amount-container">
          <p className="amount-type">Your Balance</p>
          <p className="amount">Rs {income - expenses}</p>
        </div>
      </li>
      <li className="each-money-details-container your-income-styling">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
          className="money-detail-logo"
          alt="income"
        />
        <div className="heading-amount-type-amount-container">
          <p className="amount-type">Your Income</p>
          <p className="amount">Rs {income}</p>
        </div>
      </li>
      <li className="each-money-details-container your-expenses-styling">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png "
          className="money-detail-logo"
          alt="expenses"
        />
        <div className="heading-amount-type-amount-container">
          <p className="amount-type">Your Expenses</p>
          <p className="amount">Rs {expenses}</p>
        </div>
      </li>
    </>
  )
}

export default MoneyDetails
