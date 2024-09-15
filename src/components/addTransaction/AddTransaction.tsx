import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  StyledAddTransactionButton,
  StyledAddTransactionInput,
  StyledAddTransactionLabel,
  StyledAddTransactionTitle,
  StyledErrorText,
} from "./AddTransaction.styled";
import { GlobalContext } from "../../context/GlobalState";

const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (error) setError("");
  };

  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text || !amount) {
      setError("Please fill in both text and amount fields");
      return;
    }

    const numberAmount = parseInt(amount);
    if (isNaN(numberAmount)) {
      setError("Please enter a valid amount");
      return;
    }
    const newTransaction = {
      id: uuidv4(),
      text,
      amount: numberAmount,
    };

    addTransaction(newTransaction);
    setText("");
    setAmount("");
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
            aria-invalid={!!error}
          />
        </div>
        <div>
          <StyledAddTransactionLabel htmlFor="amount">
            Amount <br />
            <small>(negative - expense, positive - income)</small>
          </StyledAddTransactionLabel>
          <StyledAddTransactionInput
            type="number"
            id="amount"
            value={amount}
            placeholder="Enter amount..."
            onChange={handleAmount}
            aria-invalid={!!error}
          />
        </div>
        {error && <StyledErrorText>{error}</StyledErrorText>}
        <StyledAddTransactionButton
          type="submit"
          disabled={!text || !amount || !!error}>
          Add Transaction
        </StyledAddTransactionButton>
      </form>
    </>
  );
};

export default AddTransaction;
