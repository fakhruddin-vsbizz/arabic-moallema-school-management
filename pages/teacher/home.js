// pages/index.js

import { useState } from "react";

function Home() {
  const [dragging, setDragging] = useState(false);
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text/plain", index);
    setDragging(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData("text/plain");
    const droppedItem = items[draggedIndex];
    setDroppedItems([...droppedItems, droppedItem]);
    const newItems = items.filter(
      (item, index) => index !== Number(draggedIndex)
    );
    setItems(newItems);
    setDragging(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Drag and Drop Example</h1>
      <div
        className={`border border-gray-300 p-2 h-40 ${
          droppedItems.length > 0 ? "bg-gray-100" : ""
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {droppedItems.length === 0 ? (
          <p className="text-center text-gray-400">Drag and drop items here</p>
        ) : (
          <ul>
            {droppedItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
      <ul className="border border-gray-300 p-2 mt-4">
        {items.map((item, index) => (
          <li
            key={index}
            className={`bg-white rounded-md shadow-sm mb-2 p-2 cursor-pointer ${
              dragging &&
              index === Number(event.dataTransfer.getData("text/plain"))
                ? "bg-gray-100"
                : ""
            }`}
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={handleDragOver}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
