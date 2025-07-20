import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  return (
    <div className="app">
      <Logo />
      <Form setItems={setItems} />
      <PackingList items={items} setItems={setItems} />
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

function Form({ setItems }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    handleAddItems(newItem);

    // reset states once submitted
    setDescription("");
    setQuantity(1);
  }

  function handleAddItems(newItem) {
    setItems((originalItems) => [...originalItems, newItem]);
  }

  return (
    <form action="post" className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for you trip?</h3>

      <select
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
          return (
            <option value={num} key={num}>
              {num}
            </option>
          );
        })}
      </select>

      <input
        type="text"
        placeholder="description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>ADD</button>
    </form>
  );
}

function PackingList({ items, setItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} setItems={setItems} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, setItems }) {
  function handleDelete(id) {
    setItems((originalItems) => originalItems.filter((item) => item.id !== id));
  }

  return (
    <li>
      <span style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDelete(item.id)}>❌</button>
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
