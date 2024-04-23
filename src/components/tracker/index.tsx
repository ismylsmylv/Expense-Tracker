type Props = {
  balance: number;
  income: number;
  expenses: number;
};

function Tracker({ balance, income, expenses }: Props) {
  return (
    <>
      <div className="balance">
        <div className="heading">your balance</div>
        <div className="amount">${balance}</div>
      </div>
      <div className="summary">
        <div className="incomes summaryCard">
          <div className="heading">income</div>
          <div className="amount plus">${income}</div>
        </div>
        <div className="divider"></div>
        <div className="expenses summaryCard">
          <div className="heading">expense</div>
          <div className="amount minus">${expenses}</div>
        </div>
      </div>
    </>
  );
}

export default Tracker;
