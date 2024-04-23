import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaTrash } from "react-icons/fa";

import "./style.scss";
import axios from "axios";
import Tracker from "./components/tracker";
import Expense from "./components/expense";
interface elem {
  name: string;
  price: string;
  type: string;
}
interface total {
  filter: any;
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

  useEffect(() => {
    axios("http://localhost:3000/datas/")
      .then((res) => {
        settotal(res.data);
        console.log(res.data, "total"); // Log the received data
        let totalIncome = 0;
        let totalExpenses = 0;
        res.data.forEach((element) => {
          if (element.type === "income") {
            totalIncome += Number(element.price);
          } else {
            totalExpenses += Number(element.price);
          }
        });
        setincome(totalIncome);
        setexpenses(totalExpenses);
        setbalance(totalIncome + totalExpenses);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function editName(elem) {
    const newName = prompt("Enter new name");
    if (newName) {
      console.log(newName, "newName");
      const updatedTotal = total.filter((element: elem) => {
        if (element.name == elem.name) {
          return (elem.name = newName);
        } else {
          return element;
        }
      });
      console.log(updatedTotal, "updatedTotal");
      settotal(updatedTotal);
      axios.patch("http://localhost:3000/datas/" + elem.id, {
        name: newName,
      });
    }
  }
  function addExp() {
    if (inputName.trim() == "") {
      alert("Please enter transaction name");
    } else if (inputPrice.trim() == "" || Number(inputPrice) == 0) {
      alert("Please enter transaction amount");
    } else {
      console.log(inputPrice);
      const inputType = inputPrice.charAt(0) == "-" ? "expense" : "income";
      const obj = {
        name: inputName.trim(),
        price: inputPrice.trim(),
        type: inputType,
      };
      axios.post("http://localhost:3000/datas", obj);
      console.log(obj);
      setbalance(balance + Number(obj.price));
      inputType == "expense"
        ? setexpenses(expenses + Number(obj.price))
        : setincome(income + Number(obj.price));
      setinputName("");
      setinputPrice("");
      settotal([...total, obj] as unknown as total);
    }
  }
  function deleteExp(elem) {
    if (confirm("Are you sure to delete?")) {
      axios.delete("http://localhost:3000/datas/" + elem.id);
      const removedTotal = total.filter((element: elem) => {
        return element.name != elem.name;
      });
      console.log(removedTotal);
      settotal(removedTotal);
      setbalance(balance - Number(elem.price));
      if (elem.type == "income") {
        setincome(income - Number(elem.price));
      } else {
        setexpenses(expenses - Number(elem.price));
      }
    } else {
      console.log(total);
    }
  }
  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Expense Tracker</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="welcome">Expense Tracker</div>
      <Tracker expenses={expenses} income={income} balance={balance} />
      <div className="history">
        <div className="heading">History</div>
        <div className="line"></div>
        <div className="list">
          {total.length > 0 ? (
            total.map((elem: elem) => {
              return (
                <Expense
                  elem={elem}
                  editName={editName}
                  deleteExp={deleteExp}
                />
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
            addExp();
          }}
        >
          Add transaction
        </button>
      </form>
    </div>
  );
}

export default App;
