import React, { useState } from "react";
import { summarizeNote } from "../services/api";

function ListNewNotes({ notes, onDelete }) {
  const [summaries, setSummaries] = useState({});

  const handleSummarize = async (note) => {
    try {
      const res = await summarizeNote(note.text);
      setSummaries((prev) => ({ ...prev, [note.id]: res.data.summary }));
    } catch (err) {
      console.error("AI summarize error:", err);
      alert("AI summarization failed: " + JSON.stringify(err.response?.data));
    }
  };

  return (
    <div className="list">
      <h2>All Notes</h2>
      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="noteItem">
            <p>{note.text}</p>
            {summaries[note.id] && (
              <p className="summary">Summary: {summaries[note.id]}</p>
            )}
            <button onClick={() => handleSummarize(note)}>✨ Summarize</button>
            <button onClick={() => onDelete(note.id)}>❌ Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ListNewNotes;
