import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Laptop", quantity: 1, packed: true },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}
function Logo() {
  return (
    <header>
      <h1>🏝️ Far Away 🧳</h1>
    </header>
  );
}

function Form() {
  const [quantity, setQuantity] = useState(1);
  const [item, setitem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log("Item:", item);
    console.log("Quantity:", quantity);
  }

  return (
    <form action="post" className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for you trip?</h3>

      <select
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((quantity) => {
          return (
            <option value={quantity} key={quantity}>
              {quantity}
            </option>
          );
        })}
      </select>

      <input
        type="text"
        placeholder="item..."
        value={item}
        onChange={(e) => setitem(e.target.value)}
      />

      <button>ADD</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have 1 items on your list, and you already packed 0 (0%)</em>
    </footer>
  );
}

export default App;
