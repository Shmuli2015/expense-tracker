import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  StyledAddTransactionButton,
  StyledAddTransactionInput,
  StyledAddTransactionLabel,
  StyledAddTransactionTitle,
} from "./AddTransaction.styled";
import { GlobalContext } from "../../context/GlobalState";

const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("0");

  const handleText = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleAmount = (e: ChangeEvent<HTMLInputElement>) =>
    setAmount(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text || !amount) {
      alert("Please fill all fields");
      return;
    }

    const numberAmount = parseInt(amount);
    if (isNaN(numberAmount)) {
      alert("Please enter a valid amount");
      return;
    }
    const newTransaction = {
      id: uuidv4(),
      text,
      amount: numberAmount,
    };

    addTransaction(newTransaction);
    setText("");
    setAmount("0");
  };

  return (
    <>
      <StyledAddTransactionTitle>Add new transaction</StyledAddTransactionTitle>
      <form onSubmit={handleSubmit}>
        <div>
          <StyledAddTransactionLabel htmlFor="text">
            Text
          </StyledAddTransactionLabel>
          <StyledAddTransactionInput
            type="text"
            id="text"
            value={text}
            placeholder="Enter text..."
            onChange={handleText}
          />
        </div>
        <div>
          <StyledAddTransactionLabel htmlFor="amount">
            Amount <br /> (negative - expense, positive - income)
          </StyledAddTransactionLabel>
          <StyledAddTransactionInput
            type="number"
            id="amount"
            value={amount}
            placeholder="Enter amount..."
            onChange={handleAmount}
          />
        </div>
        <StyledAddTransactionButton>Add transaction</StyledAddTransactionButton>
      </form>
    </>
  );
};

export default AddTransaction;
