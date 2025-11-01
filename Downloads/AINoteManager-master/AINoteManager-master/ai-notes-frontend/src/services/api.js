import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const getNotes = () => axios.get(`${BASE_URL}/notes`);
export const addNote = (note) => axios.post(`${BASE_URL}/notes`, note);
export const deleteNote = (id) => axios.delete(`${BASE_URL}/notes/${id}`);

// ✨ AI Summarize API
export const summarizeNote = (text) =>
  axios.post(`${BASE_URL}/summarize`, { text });
