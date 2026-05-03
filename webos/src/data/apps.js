import notesIcon from "../assets/icons/notes.png";
import calcIcon from "../assets/icons/calc.png";
import todoIcon from "../assets/icons/todo.png";
import settingsIcon from "../assets/icons/settings.png";
import terminalIcon from "../assets/icons/terminal.png";
import musicIcon from "../assets/icons/music.png";
import fileIcon from "../assets/icons/filemanager.png";

import clockIcon from "../assets/icons/clock.png";



export const hyperApps = [
  {
    id: "notes",
    title: "Notes",
    icon: notesIcon,
    modes: ["student", "developer", "casual"],
  },
  {
  id: "clock",
  title: "Clock",
  icon: clockIcon,
  modes: ["student", "developer", "casual"]
},
  {
    id: "todo",
    title: "Tasks",
    icon: todoIcon,
    modes: ["student"],
  },
  {
    id: "calculator",
    title: "Calculator",
    icon: calcIcon,
    modes: ["student", "developer"],
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: terminalIcon,
    modes: ["developer"],
  },
  {
    id: "music",
    title: "Music",
    icon: musicIcon,
    modes: ["casual"],
  },
  {
    id: "files",
    title: "Files",
    icon: fileIcon,
    modes: ["student", "developer", "casual"],
  },
  {
    id: "settings",
    title: "Settings",
    icon: settingsIcon,
    modes: ["student", "developer", "casual"],
  },
];

export const modeInfo = {
  student: {
    label: "Student",
    emoji: "🎓",
    tagline: "Focus. Learn. Organize.",
  },
  developer: {
    label: "Developer",
    emoji: "💻",
    tagline: "Build. Debug. Deploy.",
  },
  casual: {
    label: "Casual",
    emoji: "🎧",
    tagline: "Relax. Listen. Explore.",
  },
};