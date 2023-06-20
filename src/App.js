import { useState } from "react";
import "./styles.css";

export default function App() {
  let styles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: "1.4rem"
  };
  // bill input state
  const [bill, setBill] = useState(0);
  function onSetBill(e) {
    setBill(Number(e.target.value));
  }
  // user Rate State
  const [userRate, setUserRate] = useState(0);
  function onSetUserRate(e) {
    setUserRate(Number(e.target.value));
  }
  const [friendRate, setFriendRate] = useState(0);
  function onSetFriendRate(e) {
    console.log(friendRate);
    setFriendRate(Number(e.target.value));
  }

  return (
    <div className="App" style={styles}>
      <BillInput bill={bill} onSetBill={onSetBill} />
      <SelectPercenatge userRate={userRate} onSetRate={setUserRate}>
        how did you enjoy the service?
      </SelectPercenatge>
      <SelectPercenatge userRate={friendRate} onSetRate={setFriendRate}>
        how did your friend like the service?
      </SelectPercenatge>

      {bill > 0 && (
        <>
          <Summary bill={bill} userRate={userRate} friendRate={friendRate} />
          <Reset
            setBill={setBill}
            setUserRate={setUserRate}
            setFriendRate={setFriendRate}
          />{" "}
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <label>how much is the bill?</label>
      <input type="text" value={bill} onChange={onSetBill} />
    </div>
  );
}

function SelectPercenatge({ userRate, onSetRate, children }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={userRate}
        onChange={(e) => onSetRate(Number(e.target.value))}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>it was okay (5%)</option>
        <option value={10}>it was good (10%)</option>
        <option value={20}>Absolutely Amazing (20%)</option>
      </select>
    </div>
  );
}

function Summary({ bill, userRate, friendRate }) {
  let average = (userRate + friendRate) / 2;
  let total = bill + average;

  return (
    <h4>
      you pay ${total} (${bill} + ${average} tip)
    </h4>
  );
}
function Reset({ setBill, setUserRate, setFriendRate }) {
  // reset
  function handleReset() {
    setBill("");
    setUserRate(0);
    setFriendRate(0);
  }
  return <button onClick={handleReset}>Reset</button>;
}
