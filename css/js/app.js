// --- DOM ELEMENTS ---
const clockEl = document.getElementById('clock');
const dateEl = document.getElementById('date');
const greetingEl = document.getElementById('greeting');
const usernameEl = document.getElementById('username');
const themeToggleBtn = document.getElementById('theme-toggle');

// --- 1. CLOCK & LIVE GREETING (Challenge: Custom Name) ---
function updateClock() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString('id-ID');
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('en-US', options);

    const hours = now.getHours();
    let greetText = "Good Night";
    if (hours >= 5 && hours < 12) greetText = "Good Morning";
    else if (hours >= 12 && hours < 17) greetText = "Good Afternoon";
    else if (hours >= 17 && hours < 21) greetText = "Good Evening";

    // Tetap pertahankan nama kustom
    const savedName = localStorage.getItem('username') || 'Guest';
    usernameEl.textContent = savedName;
    greetingEl.firstChild.textContent = `${greetText}, `;
}
setInterval(updateClock, 1000);
updateClock();

// Simpan perubahan nama kustom ke LocalStorage
usernameEl.addEventListener('blur', () => {
    localStorage.setItem('username', usernameEl.textContent.trim() || 'Guest');
});

// --- 2. LIGHT / DARK MODE (Challenge) ---
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️ Light' : '🌙 Dark';

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggleBtn.textContent = newTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
});

// --- 3. FOCUS TIMER (POMODORO) ---
let timerInterval = null;
let timeRemaining = 25 * 60; // 25 menit

const timerDisplay = document.getElementById('timer-display');
const timerStartBtn = document.getElementById('timer-start');
const timerStopBtn = document.getElementById('timer-stop');
const timerResetBtn = document.getElementById('timer-reset');

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
    const seconds = (timeRemaining % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

timerStartBtn.addEventListener('click', () => {
    if (timerInterval !== null) return;
    timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Focus session finished!");
        }
    }, 1000);
});

timerStopBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

timerResetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timeRemaining = 25 * 60;
    updateTimerDisplay();
});

// --- 4. TO-DO LIST (Challenge: Prevent Duplicate Tasks) ---
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskInput = document.getElementById('task-input');
const taskAddBtn = document.getElementById('task-add');
const taskList = document.getElementById('task-list');

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.done ? 'checked' : ''}`;
        
        li.innerHTML = `
            <label style="display:flex; align-items:center; gap:10px;">
                <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask(${index})">
                <span contenteditable="true" onblur="editTask(${index}, this.innerText)">${task.text}</span>
            </label>
            <button class="btn-delete" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskAddBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    // Proteksi duplikasi teks tugas
    const isDuplicate = tasks.some(t => t.text.toLowerCase() === taskText.toLowerCase());
    if (isDuplicate) {
        alert("This task already exists!");
        return;
    }

    tasks.push({ text: taskText, done: false });
    taskInput.value = '';
    renderTasks();
});

window.toggleTask = (index) => {
    tasks[index].done = !tasks[index].done;
    renderTasks();
};

window.editTask = (index, newText) => {
    if(newText.trim() === "") {
        deleteTask(index);
    } else {
        tasks[index].text = newText.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
};

window.deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
};

renderTasks();

// --- 5. QUICK LINKS ---
let links = JSON.parse(localStorage.getItem('links')) || [
    { name: 'Google', url: 'https://google.com' },
    { name: 'Gmail', url: 'https://gmail.com' }
];
const linkNameInput = document.getElementById('link-name');
const linkUrlInput = document.getElementById('link-url');
const linkAddBtn = document.getElementById('link-add');
const linksContainer = document.getElementById('links-container');

function renderLinks() {
    linksContainer.innerHTML = '';
    links.forEach((link, index) => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.className = 'quick-link-btn';
        a.innerHTML = `
            ${link.name}
            <button class="remove-link" onclick="event.preventDefault(); deleteLink(${index});">×</button>
        `;
        linksContainer.appendChild(a);
    });
    localStorage.setItem('links', JSON.stringify(links));
}

linkAddBtn.addEventListener('click', () => {
    const name = linkNameInput.value.trim();
    let url = linkUrlInput.value.trim();
    if (!name || !url) return;

    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }

    links.push({ name, url });
    linkNameInput.value = '';
    linkUrlInput.value = '';
    renderLinks();
});

window.deleteLink = (index) => {
    links.splice(index, 1);
    renderLinks();
};

renderLinks();