# PWA
# Map Notes PWA

A Progressive Web Application for managing notes with map locations. This application allows users to create notes and associate them with specific locations on a map.

## Features

- Create notes with titles and content
- Associate notes with specific map locations
- View notes on an interactive map
- Filter notes based on the current map view
- Offline functionality through PWA
- Local storage for data persistence
- Responsive design for mobile and desktop

## Setup

1. Clone the repository
2. Serve the application using a local web server. You can use any of these methods:
   - Python: `python -m http.server 8000`
   - Node.js: `npx serve`
   - VS Code: Use the "Live Server" extension

3. Open the application in your browser at `http://localhost:8000` (or the port provided by your server)

## Usage

1. **Viewing Notes**
   - The map shows all notes as markers
   - Click on a marker to view the note details
   - The right panel shows notes visible in the current map view

2. **Creating a Note**
   - Click the "Add Note" button
   - Fill in the note title and content
   - Click on the map to select a location
   - Click "Save Note" to create the note

3. **Installing as PWA**
   - Open the application in Chrome/Edge
   - Click the install icon in the address bar
   - Follow the prompts to install the application

## Technical Details

- Built with vanilla JavaScript
- Uses Leaflet.js for map functionality
- Implements PWA features:
  - Service Worker for offline functionality
  - Web App Manifest for installation
  - Local Storage for data persistence

## Browser Support

- Chrome (recommended)
- Edge
- Firefox
- Safari

## License

MIT License 