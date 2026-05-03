import { useEffect, useState } from "react";

const STORAGE_KEY = "hyperos:notes";

const defaultNotes = [
  {
    id: "welcome-note",
    title: "Welcome Note",
    content:
      "Welcome to HyperOS Notepad.\n\nUse this app to write your crazy ideas.",
  },
];

export default function NotesApp() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return defaultNotes;

    try {
      return JSON.parse(saved);
    } catch {
      return defaultNotes;
    }
  });

  const [activeNoteId, setActiveNoteId] = useState(notes[0]?.id || "");
  const [searchText, setSearchText] = useState("");
  const [focusMode, setFocusMode] = useState(false);

  const activeNote = notes.find((note) => note.id === activeNoteId) || notes[0];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const updateNote = (field, value) => {
    setNotes((oldNotes) =>
      oldNotes.map((note) =>
        note.id === activeNote.id ? { ...note, [field]: value } : note
      )
    );
  };

  const createNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "",
    };

    setNotes((oldNotes) => [newNote, ...oldNotes]);
    setActiveNoteId(newNote.id);
  };

  const deleteNote = () => {
    if (notes.length === 1) {
      alert("At least one note is required.");
      return;
    }

    const remainingNotes = notes.filter((note) => note.id !== activeNote.id);

    setNotes(remainingNotes);
    setActiveNoteId(remainingNotes[0].id);
  };

  const insertText = (before, after = "") => {
    const textArea = document.querySelector(".note-editor");
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;

    const selectedText = activeNote.content.slice(start, end);
    const updatedText =
      activeNote.content.slice(0, start) +
      before +
      selectedText +
      after +
      activeNote.content.slice(end);

    updateNote("content", updatedText);
  };

  const exportNote = () => {
    const blob = new Blob([activeNote.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeNote.title || "note"}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const highlightedContent = activeNote.content
    .toLowerCase()
    .includes(searchText.toLowerCase());

  const wordCount = activeNote.content.trim()
    ? activeNote.content.trim().split(/\s+/).length
    : 0;

  return (
    <div className={focusMode ? "notes-app focus-notes" : "notes-app"}>
      {!focusMode && (
        <aside className="notes-sidebar">
          <div className="notes-sidebar-top">
            <h3>Notepad</h3>
            <button onClick={createNote}>+</button>
          </div>

          <div className="notes-list">
            {notes.map((note) => (
              <button
                key={note.id}
                className={note.id === activeNote.id ? "active-note" : ""}
                onClick={() => setActiveNoteId(note.id)}
              >
                <strong>{note.title || "Untitled"}</strong>
                <span>{note.content.slice(0, 35) || "Empty note"}</span>
              </button>
            ))}
          </div>
        </aside>
      )}

      <main className="notes-workspace">
        <div className="notes-toolbar">
          <input
            value={activeNote.title}
            onChange={(e) => updateNote("title", e.target.value)}
            placeholder="Note title"
          />

          <div className="note-tools">
            <button onClick={() => insertText("## ")}>H</button>
            <button onClick={() => insertText("**", "**")}>B</button>
            <button onClick={() => insertText("_", "_")}>I</button>
            <button onClick={exportNote}>Export</button>
            <button onClick={() => setFocusMode(!focusMode)}>
              {focusMode ? "Exit Focus" : "Focus"}
            </button>
            <button className="delete-note-btn" onClick={deleteNote}>
              Delete
            </button>
          </div>
        </div>

        <div className="note-search-row">
          <input
            value={searchText}
            placeholder="Search inside note..."
            onChange={(e) => setSearchText(e.target.value)}
          />

          {searchText && (
            <span>
              {highlightedContent ? "Found" : "Not found"}
            </span>
          )}
        </div>

        <textarea
          className="note-editor"
          value={activeNote.content}
          onChange={(e) => updateNote("content", e.target.value)}
          placeholder="Start writing your idea..."
        />

        <div className="note-statusbar">
          <span>Auto-saved</span>
          <span>{wordCount} words</span>
          <span>{activeNote.content.length} characters</span>
        </div>
      </main>
    </div>
  );
}