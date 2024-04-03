import { useState } from "react";
import "./style.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <div className="welcome">Expence Tracker</div>
      <div className="balance">
        <div className="heading">your balance</div>
        <div className="amount">$260.00</div>
      </div>
      <div className="summary">
        <div className="incomes summaryCard">
          <div className="heading">income</div>
          <div className="amount plus">$500.00</div>
        </div>
        <div className="divider"></div>
        <div className="expenses summaryCard">
          <div className="heading">expense</div>
          <div className="amount minus">$240.00</div>
        </div>
      </div>
      <div className="history">
        <div className="heading">history</div>
        <div className="line"></div>
        <div className="list">
          <div className="card income">
            <div className="name">cash</div>
            <div className="price">+500</div>
          </div>
          <div className="card expense">
            <div className="name">book</div>
            <div className="price">-40</div>
          </div>
          <div className="card expense">
            <div className="name">camera</div>
            <div className="price">-200</div>
          </div>
        </div>
      </div>
      <form className="addNew">
        <div className="heading">add new transaction</div>
        <div className="line"></div>
        <div className="nameInput">
          <div className="head">text</div>
          <input type="text" placeholder="Enter text..." />
        </div>
        <div className="priceInput">
          <div className="head">amount</div>
          <div className="explain">(negative - expense, positive - income)</div>
          <input type="number" placeholder="Enter amount..." />
        </div>
        <button>add transaction</button>
      </form>
    </div>
  );
}

export default App;
