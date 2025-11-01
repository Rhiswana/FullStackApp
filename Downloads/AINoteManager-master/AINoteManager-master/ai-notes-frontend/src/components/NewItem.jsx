import React from "react";

function NewItem({ note, onDelete }) {
  return (
    <div className="item">
      <p>{note.text}</p>
      <button onClick={() => onDelete(note._id)}>❌</button>
    </div>
  );
}

export default NewItem;
