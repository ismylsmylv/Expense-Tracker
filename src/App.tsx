import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./style.scss";
interface elem {
  name: string;
  price: string;
  type: string;
}
interface total {
  length: number;
  map(
    arg0: (elem: elem) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  name: string;
  price: string;
  type: string;
  obj: object;
}

function App() {
  const [total, settotal] = useState([] as unknown as total);
  const [inputName, setinputName] = useState("");
  const [inputPrice, setinputPrice] = useState("");
  const [balance, setbalance] = useState(0);
  const [expenses, setexpenses] = useState(0);
  const [income, setincome] = useState(0);
  const [balanceUpdater, setbalanceUpdater] = useState(false);
  useEffect(() => {
    // total.map((elem: elem) => {
    //   elem.type == "expense"
    //     ? setexpenses(expenses + Number(elem.price))
    //     : setincome(income + Number(elem.price));
    // });
  }, [balanceUpdater]);
  return (
    <div className="container">
      <div className="welcome">Expense Tracker</div>
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
            if (inputName.trim() == "") {
              alert("Please enter transaction name");
            } else if (inputPrice.trim() == "") {
              alert("Please enter transaction amount");
            } else {
              console.log(inputPrice);
              const inputType =
                inputPrice.charAt(0) == "-" ? "expense" : "income";
              const obj = {
                name: inputName.trim(),
                price: inputPrice.trim(),
                type: inputType,
              };
              console.log(obj);
              // inputType == "expense"
              //   ? setbalance(balance - Number(obj.price))
              // :
              setbalance(balance + Number(obj.price));
              inputType == "expense"
                ? setexpenses(expenses + Number(obj.price))
                : setincome(income + Number(obj.price));
              setinputName("");
              setinputPrice("");
              settotal([...total, obj]);
              setbalanceUpdater(!balanceUpdater);
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
