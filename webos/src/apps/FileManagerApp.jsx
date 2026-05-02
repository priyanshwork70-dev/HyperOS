import { useState } from "react";

const firstFolders = [
  {
    id: "documents",
    name: "Documents",
    files: [
      { id: "f1", name: "project-plan.txt", type: "text", content: "HyperOS project plan" },
      { id: "f2", name: "study-notes.txt", type: "text", content: "React notes" },
    ],
  },
  {
    id: "projects",
    name: "Projects",
    files: [
      { id: "f3", name: "demo-script.txt", type: "text", content: "Demo flow notes" },
    ],
  },
  {
    id: "media",
    name: "Media",
    files: [],
  },
];

export default function FileManagerApp() {
  const [folders, setFolders] = useState(firstFolders);
  const [activeFolderId, setActiveFolderId] = useState("documents");
  const [newFolderName, setNewFolderName] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [newFileText, setNewFileText] = useState("");

  const activeFolder = folders.find((folder) => folder.id === activeFolderId);

  const createFolder = () => {
    const cleanName = newFolderName.trim();

    if (!cleanName) {
      alert("Folder name required.");
      return;
    }

    const folderExists = folders.some(
      (folder) => folder.name.toLowerCase() === cleanName.toLowerCase()
    );

    if (folderExists) {
      alert("Folder already exists.");
      return;
    }

    const newFolder = {
      id: Date.now().toString(),
      name: cleanName,
      files: [],
    };

    setFolders([...folders, newFolder]);
    setActiveFolderId(newFolder.id);
    setNewFolderName("");
  };

  const createTextFile = () => {
    const cleanName = newFileName.trim();

    if (!cleanName) {
      alert("File name required.");
      return;
    }

    const finalName = cleanName.endsWith(".txt") ? cleanName : `${cleanName}.txt`;

    const fileExists = activeFolder.files.some(
      (file) => file.name.toLowerCase() === finalName.toLowerCase()
    );

    if (fileExists) {
      alert("File already exists in this folder.");
      return;
    }

    const updatedFolders = folders.map((folder) => {
      if (folder.id !== activeFolderId) return folder;

      return {
        ...folder,
        files: [
          ...folder.files,
          {
            id: Date.now().toString(),
            name: finalName,
            type: "text",
            content: newFileText || "Empty text file",
          },
        ],
      };
    });

    setFolders(updatedFolders);
    setNewFileName("");
    setNewFileText("");
  };

  const deleteFile = (fileId) => {
    const updatedFolders = folders.map((folder) => {
      if (folder.id !== activeFolderId) return folder;

      return {
        ...folder,
        files: folder.files.filter((file) => file.id !== fileId),
      };
    });

    setFolders(updatedFolders);
  };

  const deleteFolder = (folderId) => {
    if (folders.length === 1) {
      alert("At least one folder is required.");
      return;
    }

    const remainingFolders = folders.filter((folder) => folder.id !== folderId);
    setFolders(remainingFolders);

    if (activeFolderId === folderId) {
      setActiveFolderId(remainingFolders[0].id);
    }
  };

  return (
    <div className="file-manager-app simple-file-manager">
      <aside className="file-sidebar">
        <h3>Folders</h3>

        <div className="folder-create-box">
          <input
            placeholder="New folder"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") createFolder();
            }}
          />
          <button onClick={createFolder}>Create</button>
        </div>

        {folders.map((folder) => (
          <div
            key={folder.id}
            className={`folder-row ${activeFolderId === folder.id ? "active-folder" : ""}`}
          >
            <button onClick={() => setActiveFolderId(folder.id)}>
              📁 {folder.name}
            </button>

           
          </div>
        ))}
      </aside>

      <main className="file-main-area">
        <div className="file-toolbar">
          <div>
            <h3>{activeFolder.name}</h3>
            <p>{activeFolder.files.length} files</p>
          </div>
        </div>

        <div className="file-create-panel">
          <input
            placeholder="Text file name"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
          />

          <textarea
            placeholder="Write file content..."
            value={newFileText}
            onChange={(e) => setNewFileText(e.target.value)}
          />

          <button onClick={createTextFile}>Create Text File</button>
        </div>

        <div className="file-list-view">
          {activeFolder.files.length === 0 ? (
            <p className="empty-folder">No files yet. Create one.</p>
          ) : (
            activeFolder.files.map((file) => (
              <div key={file.id} className="file-row">
                <div>
                  <strong>📄 {file.name}</strong>
                  <small>{file.content}</small>
                </div>

                <button onClick={() => deleteFile(file.id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}