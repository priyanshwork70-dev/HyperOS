import { useState } from "react";

const folders = [
  {
    id: "documents",
    name: "Documents",
    files: [
      {
        name: "project-plan.txt",
        type: "Text File",
        content:
          "HyperOS Project Plan\n\n1. Build adaptive modes\n2. Add useful apps\n3. Polish UI\n4. Deploy live demo",
      },
      {
        name: "class-notes.txt",
        type: "Text File",
        content:
          "Today's notes:\n- React components\n- useState for UI state\n- localStorage for saving data",
      },
    ],
  },
  {
    id: "projects",
    name: "Projects",
    files: [
      {
        name: "hyperos-readme.txt",
        type: "Text File",
        content:
          "HyperOS is a browser-based operating system with adaptive user modes.",
      },
      {
        name: "demo-script.txt",
        type: "Text File",
        content:
          "Demo flow:\nBoot screen → Login → Switch modes → Open apps → Drag windows → File manager preview.",
      },
    ],
  },
  {
    id: "music",
    name: "Music",
    files: [
      {
        name: "song1.mp3",
        type: "Audio File",
        content: "This is an audio file stored in the music folder.",
      },
      {
        name: "song2.mp3",
        type: "Audio File",
        content: "This is another demo music file.",
      },
    ],
  },
];

export default function FileManagerApp() {
  const [selectedFolderId, setSelectedFolderId] = useState("documents");
  const [selectedFile, setSelectedFile] = useState(folders[0].files[0]);

  const selectedFolder = folders.find((folder) => folder.id === selectedFolderId);

  const openFolder = (folderId) => {
    const folder = folders.find((item) => item.id === folderId);
    setSelectedFolderId(folderId);
    setSelectedFile(folder.files[0]);
  };

  return (
    <div className="file-manager-app">
      <aside className="file-sidebar">
        <h3>Files</h3>

        {folders.map((folder) => (
          <button
            key={folder.id}
            className={selectedFolderId === folder.id ? "active-folder" : ""}
            onClick={() => openFolder(folder.id)}
          >
            📁 {folder.name}
          </button>
        ))}
      </aside>

      <section className="file-list">
        <h3>{selectedFolder.name}</h3>

        {selectedFolder.files.map((file) => (
          <button
            key={file.name}
            className={selectedFile?.name === file.name ? "active-file" : ""}
            onClick={() => setSelectedFile(file)}
          >
            <span>{file.name.endsWith(".mp3") ? "🎵" : "📄"}</span>
            <div>
              <strong>{file.name}</strong>
              <small>{file.type}</small>
            </div>
          </button>
        ))}
      </section>

      <section className="file-preview">
        <h3>Preview</h3>

        {selectedFile ? (
          <>
            <p className="file-name">{selectedFile.name}</p>
            <pre>{selectedFile.content}</pre>
          </>
        ) : (
          <p>Select a file to preview.</p>
        )}
      </section>
    </div>
  );
}