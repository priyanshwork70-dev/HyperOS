import { useEffect, useState } from "react";

export default function NotesApp() {
  const [text, setText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("nexos-note");
    if (saved) setText(saved);
  }, []);

  const saveNote = () => {
    localStorage.setItem("nexos-note", text);
    alert("Note saved!");
  };

  const clearNote = () => {
    setText("");
    localStorage.removeItem("nexos-note");
  };

  return (
    <div className="notes-app">
      <h3>Quick Notes</h3>

      <textarea
        placeholder="Write your notes here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="app-actions">
        <button onClick={saveNote}>Save</button>
        <button onClick={clearNote}>Clear</button>
      </div>
    </div>
  );
}