export default function Item({ item, setItems }) {
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
