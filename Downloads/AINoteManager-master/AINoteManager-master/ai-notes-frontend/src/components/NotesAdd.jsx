import React, { useState } from "react";

function NotesAdd({ onAddNote }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddNote({ text });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="noteAdd">
      <input
        type="text"
        placeholder="Write your note here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default NotesAdd;
