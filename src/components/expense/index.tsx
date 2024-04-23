import React from "react";
import { FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
type Props = {};

function Expense({ elem, editName, deleteExp }: Props) {
  return (
    <div
      // onClick={() => {
      //   seteditObj(elem);
      // }}
      className={elem.type == "expense" ? "card expense" : "card income"}
      key={uuidv4()}
    >
      <div
        className="name"
        onClick={() => {
          editName(elem);
        }}
      >
        {elem.name}
      </div>
      <div className="right">
        <FaTrash
          className="trashIcon"
          style={{ color: "white" }}
          onClick={() => {
            deleteExp(elem);
          }}
        />

        <div
          className="price"
          // onClick={() => {
          //   const newPrice = prompt("Enter new price");
          //   console.log(newPrice, "newPrice");
          //   const updatedTotal = total.filter((element: elem) => {
          //     if (element.name == elem.name) {
          //       return (elem.price = newPrice);
          //     } else {
          //       return element;
          //     }
          //   });
          //   console.log(updatedTotal, "updatedTotal");
          //   if (elem.type == "income") {
          //     const updatedIncome =
          //       income - Number(elem.price) + Number(newPrice);
          //     setincome(updatedIncome);
          //   } else {
          //     const updatedExpense =
          //       expenses + Number(elem.price) - Number(newPrice);
          //     setexpenses(updatedExpense);
          //   }
          //   settotal(updatedTotal);
          // }}
        >
          {/* {elem.type == "expense" ? "-" : "+"} */}
          {elem.type == "income" && "+"}
          {elem.price}
        </div>
      </div>
    </div>
  );
}

export default Expense;
