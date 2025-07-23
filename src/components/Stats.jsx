export default function Stats({ items }) {
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
