HyperOS — Web-Based Operating System
HyperOS is a browser-based desktop environment built with React. The goal of this project was to create something that feels like a real operating system, but runs entirely inside the browser.
Instead of navigating pages like a normal website, users interact with a desktop, open apps, move windows, and customize the environment.

Idea Behind It
People use their systems differently depending on what they are doing. Sometimes they need focus, sometimes flexibility, and sometimes a relaxed environment.
HyperOS adapts to that by providing three modes:
Student Mode for focused work
Developer Mode for technical tasks
Casual Mode for general use
When the mode changes:
The wallpaper changes
The accent color changes
The available apps change
This makes the system feel dynamic instead of static.

Core Features
Desktop-style interface inside the browser
Window system with drag, minimize, maximize
Taskbar showing running apps
Start menu for launching apps
Mode switching system
Focus mode to reduce distractions
Theme customization (wallpaper and accent color)
Support for custom wallpapers, including GIFs

Applications
File Manager
Allows users to create folders and text files, delete them, and navigate a simple file structure. It is a lightweight simulation of a real file system.
Calculator
Handles basic arithmetic operations with a clean and simple interface. Designed for quick usage without unnecessary complexity.
Music Player
Supports play, pause, next and previous controls, along with loop and shuffle options. Includes a progress bar and volume control.
Notes
Users can create multiple notes, edit them, and everything is saved automatically. It also includes search, export as text file, and word/character count.
To-Do
A simple task manager where users can add tasks, assign priority, mark them as completed, and clear finished tasks.
Clock
Displays the current time and date, and also includes a stopwatch and timer.
Terminal
A basic command interface where users can run simple commands and even open apps through commands.
Settings
Allows users to change wallpapers, upload custom backgrounds, adjust accent colors, and preview changes in real time.

Highlights
The interface adapts based on user intent
The system behaves like a real desktop environment
Multiple apps work together inside one interface
Data is stored locally, so changes persist
Consistent and clean UI across the system

Tech Stack
React (Vite)
CSS for styling
LocalStorage for persistence

Folder Structure
src/
 ├── apps/
 ├── components/
 ├── assets/
 ├── data/
 ├── App.jsx
 ├── main.jsx




Summary
HyperOS is an attempt to bring a full desktop-like experience into the browser, where the interface adapts based on how the user wants to use it.

Author
Priyanshu Kumar

