// Initialize map
let map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Store for notes
let notes = [];
let markers = [];
let selectedLocation = null;

// DOM Elements
const addNoteBtn = document.getElementById('addNoteBtn');
const noteModal = document.getElementById('noteModal');
const noteForm = document.getElementById('noteForm');
const cancelBtn = document.getElementById('cancelBtn');
const notesList = document.getElementById('notesList');
const selectedLocationDiv = document.getElementById('selectedLocation');

// Load notes from localStorage
function loadNotes() {
    const savedNotes = localStorage.getItem('mapNotes');
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
        updateMap();
        updateNotesList();
    }
}

// Save notes to localStorage
function saveNotes() {
    localStorage.setItem('mapNotes', JSON.stringify(notes));
}

// Add a new note
function addNote(title, content, location) {
    const note = {
        id: Date.now(),
        title,
        content,
        location,
        createdAt: new Date().toISOString()
    };
    notes.push(note);
    saveNotes();
    updateMap();
    updateNotesList();
}

// Update map markers
function updateMap() {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Add markers for each note
    notes.forEach(note => {
        if (note.location) {
            const marker = L.marker(note.location)
                .bindPopup(`
                    <h3>${note.title}</h3>
                    <p>${note.content}</p>
                `);
            markers.push(marker);
            marker.addTo(map);
        }
    });
}

// Update notes list
function updateNotesList() {
    const bounds = map.getBounds();
    const visibleNotes = notes.filter(note => {
        if (!note.location) return false;
        return bounds.contains(note.location);
    });

    notesList.innerHTML = visibleNotes.map(note => `
        <div class="note-item">
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <small>Created: ${new Date(note.createdAt).toLocaleString()}</small>
        </div>
    `).join('');
}

// Event Listeners
addNoteBtn.addEventListener('click', () => {
    noteModal.style.display = 'flex';
    document.body.classList.add('modal-open');
    selectedLocation = null;
    selectedLocationDiv.textContent = 'Click on the map to select a location';
});

cancelBtn.addEventListener('click', () => {
    noteModal.style.display = 'none';
    document.body.classList.remove('modal-open');
    noteForm.reset();
});

map.on('click', (e) => {
    if (noteModal.style.display !== 'none') {
        console.log('Map clicked at:', e.latlng);
        selectedLocation = [e.latlng.lat, e.latlng.lng];
        selectedLocationDiv.textContent = `Selected location: ${selectedLocation[0].toFixed(4)}, ${selectedLocation[1].toFixed(4)}`;
    }
});

noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;

    if (!selectedLocation) {
        alert('Please select a location on the map');
        return;
    }

    addNote(title, content, selectedLocation);
    noteModal.style.display = 'none';
    document.body.classList.remove('modal-open');
    noteForm.reset();
});

// Map events
map.on('moveend', updateNotesList);

// Initialize
loadNotes(); 