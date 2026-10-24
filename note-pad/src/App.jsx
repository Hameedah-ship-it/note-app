
import { useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !text.trim()) {
      alert("Fill in both fields");
      return;
    }

    if (editId !== null) {
      setNotes(notes.map((note) =>
        note.id === editId
          ? { ...note, title, text, date: new Date().toLocaleString() }
          : note
      ));
      setEditId(null);
    } else {
      setNotes([...notes, {
        id: Date.now(),
        title,
        text,
        date: new Date().toLocaleString()
      }]);
    }

    setTitle("");
    setText("");
  }

  function handleEdit(note) {
    setTitle(note.title);
    setText(note.text);
    setEditId(note.id);
  }

  function handleDelete(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  return (
    <div className="app">
      <h1>My Notes</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button type="submit">
          {editId !== null ? "Update Note" : "Submit Note"}
        </Button>
      </form>

      <h2>Saved Notes</h2>

      {notes.map((note) => (
        <div className="note" key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.text}</p>
          <small>{note.date}</small>

          <div className="actions">
            <Button
              variant="warning"
              type="button"
              onClick={() => handleEdit(note)}
            >
              Edit
            </Button>

            <Button
              variant="danger"
              type="button"
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
