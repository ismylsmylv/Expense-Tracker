import { useState } from "react";
import "./style.scss";
import { v4 as uuidv4 } from "uuid";
interface elem {
  name: string;
  price: string;
  type: string;
}
function App() {
  const [total, settotal] = useState([]);
  const [inputName, setinputName] = useState("");
  const [inputPrice, setinputPrice] = useState("");
  return (
    <div className="container">
      <div className="welcome">Expense Tracker</div>
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
        <div className="heading">History</div>
        <div className="line"></div>
        <div className="list">
          {total.length > 0 ? (
            total.map((elem: elem) => {
              return (
                <div
                  className={
                    elem.type == "expense" ? "card expense" : "card income"
                  }
                  key={uuidv4()}
                >
                  <div className="name">{elem.name}</div>
                  <div className="price">
                    {/* {elem.type == "expense" ? "-" : "+"} */}
                    {elem.type == "income" && "+"}
                    {elem.price}
                  </div>
                </div>
              );
            })
          ) : (
            <p>Nothing to show here</p>
          )}
        </div>
      </div>
      <form className="addNew">
        <div className="heading">Add new transaction</div>
        <div className="line"></div>
        <div className="nameInput">
          <label className="head" htmlFor="name">
            text
          </label>
          <br />

          <input
            value={inputName}
            type="text"
            placeholder="Enter text..."
            id="name"
            onChange={(e) => {
              setinputName(e.target.value);
            }}
          />
        </div>
        <div className="priceInput">
          <label className="head" htmlFor="amount">
            amount
          </label>
          <br />
          <label htmlFor="amount" className="explain">
            (negative - expense, positive - income)
          </label>
          <input
            value={inputPrice}
            type="number"
            placeholder="Enter amount..."
            id="amount"
            onChange={(e) => {
              setinputPrice(e.target.value);
            }}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (inputName == "") {
              alert("Please enter transaction name");
            } else if (inputPrice == "") {
              alert("Please enter transaction amount");
            } else {
              console.log(inputPrice);
              const inputType =
                inputPrice.charAt(0) == "-" ? "expense" : "income";
              const obj = {
                name: inputName,
                price: inputPrice,
                type: inputType,
              };
              console.log(obj);
              setinputName("");
              setinputPrice("");
              settotal([...total, obj]);
            }
          }}
        >
          Add transaction
        </button>
      </form>
    </div>
  );
}

export default App;
