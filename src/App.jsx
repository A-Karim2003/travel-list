import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  return (
    <div className="app">
      <Logo />
      <Form setItems={setItems} />
      <PackingList items={items} setItems={setItems} />
      <Stats items={items} />
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
    <form className="add-form" onSubmit={handleSubmit}>
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
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") {
    sortedItems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  }

  if (sortBy === "status")
    sortedItems = [...items].sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );

  function clearList() {
    const confirmed = confirm("Are you sure you want to delete all items");
    if (confirmed) setItems([]);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item={item} setItems={setItems} key={item.id} />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="status">Sort by packed status</option>
        </select>
        <button onClick={clearList}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, setItems }) {
  function handleDelete(id) {
    setItems((originalItems) => originalItems.filter((item) => item.id !== id));
  }

  function handlePacked(id) {
    setItems((pevItems) =>
      pevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <li>
      <input
        checked={item.packed}
        type="checkbox"
        onChange={() => handlePacked(item.id)}
      />

      <span style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDelete(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  function handlePackedAmount() {
    return items.filter((item) => item.packed).length;
  }

  function handlePackedPercentage() {
    const total = items.length;
    const packed = handlePackedAmount();
    return Math.round((packed / total) * 100);
  }

  function DisplayMessage() {
    if (items.length === 0) return "Start adding some items...";

    if (handlePackedAmount() === items.length) return "You are ready to go";

    return `
        💼 You have ${items.length} items on your list, and you already packed
        ${handlePackedAmount()} (${handlePackedPercentage()}%)
      `;
  }

  return (
    <footer className="stats">
      <em>{DisplayMessage()}</em>
    </footer>
  );
}

export default App;
