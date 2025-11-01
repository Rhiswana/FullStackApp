import React, { useEffect, useState } from "react";
import NotesAdd from "./components/NotesAdd";
import ListNewNotes from "./components/ListNewNotes";
import { getNotes, addNote, deleteNote } from "./services/api";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);


  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add note
  const handleAddNote = async (note) => {
    try {
      await addNote(note);
      fetchNotes();
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  // Delete note
  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div className="container">
      <h1>📝 AI Powered Notes</h1>
      <NotesAdd onAddNote={handleAddNote} />
      <ListNewNotes notes={notes} onDelete={handleDeleteNote} />
    </div>
  );
}

export default App;
