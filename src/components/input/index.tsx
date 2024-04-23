type Props = {
  inputName: string;
  setinputName: any;
  inputPrice: string;
  setinputPrice: any;
  addExp: any;
};

function Input({
  inputName,
  setinputName,
  inputPrice,
  setinputPrice,
  addExp,
}: Props) {
  return (
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
  );
}

export default Input;
