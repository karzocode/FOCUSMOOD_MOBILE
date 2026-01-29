// Focus Mode Pro - 50+ Features - Engineer Kariem Tamer

// ===== GLOBAL VARIABLES =====
let timerInterval = null;
let seconds = 25 * 60;
let isRunning = false;
let currentMode = 'pomodoro';
let sessionsCompleted = 0;
let currentSession = 1;
let totalSessions = 4;
let isBreakTime = false;
let totalFocusTime = 0;
let todayFocusTime = 0;
let dayStreak = 0;
let lastActiveDate = null;
let soundsEnabled = true;
let notificationsEnabled = false;
let autoStartNext = false;
let autoBreakEnabled = true;
let darkMode = true;
let backgroundMusicEnabled = false;
let tasks = [];
let currentTaskId = 1;
let isFullscreen = false;
let focusLevel = 0;

// ===== DOM ELEMENTS =====
const elements = {
    // Timer
    min: document.querySelector('.min'),
    sec: document.querySelector('.sec'),
    progress: document.querySelector('.progress'),
    
    // Buttons
    start: document.getElementById('start'),
    pause: document.getElementById('pause'),
    reset: document.getElementById('reset'),
    skip: document.getElementById('skip'),
    
    // Mode
    modeBtns: document.querySelectorAll('.mode'),
    modeLabelEn: document.getElementById('mode-label-en'),
    modeLabelAr: document.getElementById('mode-label-ar'),
    timeRemainingEn: document.getElementById('time-remaining-en'),
    timeRemainingAr: document.getElementById('time-remaining-ar'),
    
    // Language
    langBtns: document.querySelectorAll('.lang'),
    
    // Messages
    msgEn: document.getElementById('msg-en'),
    msgAr: document.getElementById('msg-ar'),
    nextMsg: document.getElementById('next-msg'),
    prevMsg: document.getElementById('prev-msg'),
    
    // Modals
    welcome: document.getElementById('welcome'),
    settings: document.getElementById('settings'),
    stats: document.getElementById('stats'),
    
    // Modal Buttons
    enter: document.getElementById('enter'),
    cancel: document.getElementById('cancel'),
    settingsBtn: document.getElementById('settings-btn'),
    statsBtn: document.getElementById('stats-btn'),
    saveSettings: document.getElementById('save-settings'),
    closeSettings: document.getElementById('close-settings'),
    closeStats: document.getElementById('close-stats'),
    resetStats: document.getElementById('reset-stats'),
    
    // Presets
    presets: document.querySelectorAll('.preset'),
    
    // Stats
    sessionCounter: document.getElementById('session-counter'),
    currentSession: document.getElementById('current-session'),
    currentSessionAr: document.getElementById('current-session-ar'),
    totalSessionsCount: document.getElementById('total-sessions-count'),
    totalSessionsCountAr: document.getElementById('total-sessions-count-ar'),
    todayTime: document.getElementById('today-time'),
    streakDisplay: document.getElementById('streak-display'),
    focusLevel: document.getElementById('focus-level'),
    
    // Tasks
    tasksList: document.getElementById('tasks-list'),
    addTask: document.getElementById('add-task'),
    
    // Audio
    startSound: document.getElementById('start-sound'),
    pauseSound: document.getElementById('pause-sound'),
    completeSound: document.getElementById('complete-sound'),
    clickSound: document.getElementById('click-sound'),
    breakSound: document.getElementById('break-sound'),
    focusMusic: document.getElementById('focus-music'),
    
    // Settings Inputs
    pomodoroDuration: document.getElementById('pomodoro-duration'),
    breakDuration: document.getElementById('break-duration'),
    longBreakInterval: document.getElementById('long-break-interval'),
    autoStart: document.getElementById('auto-start'),
    soundsToggle: document.getElementById('sounds-toggle'),
    darkMode: document.getElementById('dark-mode'),
    notificationsToggle: document.getElementById('notifications-toggle'),
    autoBreak: document.getElementById('auto-break'),
    
    // Stats Modal
    totalSessionsStat: document.getElementById('total-sessions'),
    totalFocusTimeStat: document.getElementById('total-focus-time'),
    todayFocusStat: document.getElementById('today-focus'),
    streakStat: document.getElementById('streak'),
    
    // Footer Buttons
    shareBtn: document.getElementById('share-btn'),
    fullscreenBtn: document.getElementById('fullscreen-btn'),
    musicBtn: document.getElementById('music-btn')
};

// ===== MESSAGES DATABASE =====
const messages = {
    en: [
        "Neural pathways activating...",
        "Entering deep focus zone...",
        "Your brain is getting sharper...",
        "Stay locked in – greatness awaits",
        "One more focused minute = one step closer",
        "Flow state activated",
        "Distractions fading away...",
        "Productivity level: MAXIMUM",
        "Time distortion engaged",
        "Focus level: Quantum",
        "Mind like a laser beam",
        "No distractions, only progress",
        "Entering the productivity matrix",
        "Brain waves synchronized",
        "Concentration at peak levels",
        "Thoughts flowing like electricity",
        "Mental clarity achieved",
        "Focus fortress activated",
        "Distraction shield: 100%",
        "Cognitive performance: Optimal"
    ],
    ar: [
        "المسارات العصبية بتتفعل...",
        "داخل منطقة التركيز العميق...",
        "مخك بيتقوى دلوقتي...",
        "خليك مركز – العظمة جاية",
        "دقيقة تركيز زيادة = خطوة أقرب",
        "حالة التدفق مُفعَّلة",
        "المشتتات بتختفي...",
        "مستوى الإنتاجية: أقصى درجة",
        "تشويه الزمن مُفعَّل",
        "مستوى التركيز: كمي",
        "العقل مثل شعاع الليزر",
        "لا مشتتات، فقط تقدم",
        "داخل مصفوفة الإنتاجية",
        "موجات الدماغ متزامنة",
        "التركيز في أعلى المستويات",
        "الأفكار تتدفق مثل الكهرباء",
        "الوضوح العقلي مُحقق",
        "قلعة التركيز مُفعَّلة",
        "درع التشتيت: 100%",
        "الأداء المعرفي: مثالي"
    ]
};

let currentMessageIndex = 0;

// ===== LOCAL STORAGE FUNCTIONS =====
function saveToLocalStorage() {
    const data = {
        sessionsCompleted,
        currentSession,
        totalFocusTime,
        todayFocusTime,
        dayStreak,
        lastActiveDate,
        soundsEnabled,
        notificationsEnabled,
        autoStartNext,
        autoBreakEnabled,
        darkMode,
        backgroundMusicEnabled,
        tasks,
        currentTaskId,
        pomodoroDuration: parseInt(elements.pomodoroDuration.value),
        breakDuration: parseInt(elements.breakDuration.value),
        longBreakInterval: parseInt(elements.longBreakInterval.value)
    };
    localStorage.setItem('focusModeData', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('focusModeData');
    if (saved) {
        const data = JSON.parse(saved);
        
        sessionsCompleted = data.sessionsCompleted || 0;
        currentSession = data.currentSession || 1;
        totalFocusTime = data.totalFocusTime || 0;
        todayFocusTime = data.todayFocusTime || 0;
        dayStreak = data.dayStreak || 0;
        lastActiveDate = data.lastActiveDate;
        soundsEnabled = data.soundsEnabled !== undefined ? data.soundsEnabled : true;
        notificationsEnabled = data.notificationsEnabled || false;
        autoStartNext = data.autoStartNext || false;
        autoBreakEnabled = data.autoBreakEnabled !== undefined ? data.autoBreakEnabled : true;
        darkMode = data.darkMode !== undefined ? data.darkMode : true;
        backgroundMusicEnabled = data.backgroundMusicEnabled || false;
        tasks = data.tasks || [];
        currentTaskId = data.currentTaskId || 1;
        
        // Update settings inputs
        elements.pomodoroDuration.value = data.pomodoroDuration || 25;
        elements.breakDuration.value = data.breakDuration || 5;
        elements.longBreakInterval.value = data.longBreakInterval || 4;
        elements.autoStart.checked = autoStartNext;
        elements.soundsToggle.checked = soundsEnabled;
        elements.darkMode.checked = darkMode;
        elements.notificationsToggle.checked = notificationsEnabled;
        elements.autoBreak.checked = autoBreakEnabled;
        
        // Update streak
        updateStreak();
        
        // Update displays
        updateStatsDisplay();
        updateTodayTime();
        updateFocusLevel();
        renderTasks();
    }
}

// ===== TIMER FUNCTIONS =====
function updateDisplay() {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    
    elements.min.textContent = minutes.toString().padStart(2, '0');
    elements.sec.textContent = secs.toString().padStart(2, '0');
    
    // Update progress circle
    const totalSeconds = getTotalSecondsForMode();
    if (totalSeconds > 0) {
        const progress = ((totalSeconds - seconds) / totalSeconds) * 565.48;
        elements.progress.style.strokeDashoffset = 565.48 - progress;
    }
    
    // Update time remaining text
    updateTimeRemainingText();
    
    // Update session counter
    elements.currentSession.textContent = currentSession;
    elements.currentSessionAr.textContent = currentSession;
    elements.totalSessionsCount.textContent = totalSessions;
    elements.totalSessionsCountAr.textContent = totalSessions;
    
    // Update focus level based on time elapsed
    if (currentMode === 'pomodoro' && !isBreakTime) {
        const elapsed = totalSeconds - seconds;
        focusLevel = Math.min(100, Math.floor((elapsed / totalSeconds) * 100));
        updateFocusLevel();
    }
}

function getTotalSecondsForMode() {
    switch(currentMode) {
        case 'pomodoro':
            return isBreakTime ? 
                (currentSession % parseInt(elements.longBreakInterval.value) === 0 ? 
                    parseInt(elements.breakDuration.value) * 60 * 4 : 
                    parseInt(elements.breakDuration.value) * 60) :
                parseInt(elements.pomodoroDuration.value) * 60;
        case 'custom':
            return parseInt(elements.pomodoroDuration.value) * 60;
        default:
            return 0;
    }
}

function updateTimeRemainingText() {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const timeStr = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    if (document.body.classList.contains('language-ar')) {
        elements.timeRemainingAr.textContent = `${timeStr} متبقي`;
    } else {
        elements.timeRemainingEn.textContent = `${timeStr} remaining`;
    }
}

function startTimer() {
    if (isRunning) return;
    
    playSound('start');
    isRunning = true;
    
    // Update UI
    elements.start.disabled = true;
    elements.pause.disabled = false;
    elements.start.innerHTML = '<i class="fas fa-play"></i> <span class="en">RUNNING</span><span class="ar">شغال</span>';
    elements.start.classList.add('pulsing');
    
    // Start background music if enabled
    if (backgroundMusicEnabled) {
        elements.focusMusic.play().catch(e => console.log("Music play failed:", e));
    }
    
    // Start interval
    timerInterval = setInterval(() => {
        if (currentMode === 'pomodoro' || currentMode === 'custom') {
            seconds--;
            totalFocusTime++;
            todayFocusTime++;
            
            // Update focus level
            focusLevel = Math.min(100, focusLevel + 0.1);
            updateFocusLevel();
            
            // Check for warnings
            checkTimeWarnings();
            
            if (seconds <= 0) {
                timerComplete();
            }
        } else if (currentMode === 'stopwatch') {
            seconds++;
            totalFocusTime++;
            todayFocusTime++;
        } else if (currentMode === 'break') {
            seconds--;
            if (seconds <= 0) {
                breakComplete();
            }
        }
        
        updateDisplay();
        saveToLocalStorage();
        updateTodayTime();
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    
    playSound('pause');
    clearInterval(timerInterval);
    isRunning = false;
    
    // Update UI
    elements.start.disabled = false;
    elements.pause.disabled = true;
    elements.start.innerHTML = '<i class="fas fa-play"></i> <span class="en">START</span><span class="ar">ابدأ</span>';
    elements.start.classList.remove('pulsing');
    
    // Pause background music
    elements.focusMusic.pause();
}

function resetTimer() {
    pauseTimer();
    seconds = getTotalSecondsForMode();
    updateDisplay();
    
    // Reset focus level if not in pomodoro
    if (currentMode !== 'pomodoro') {
        focusLevel = 0;
        updateFocusLevel();
    }
}

function skipTimer() {
    playSound('click');
    if (currentMode === 'pomodoro' && !isBreakTime) {
        // Skip to break
        isBreakTime = true;
        seconds = (currentSession % parseInt(elements.longBreakInterval.value) === 0 ? 
            parseInt(elements.breakDuration.value) * 60 * 4 : 
            parseInt(elements.breakDuration.value) * 60);
        
        updateModeLabels();
        showNotification(
            "⏰ وقت الراحة!",
            "Break time! Take a rest"
        );
    } else if (currentMode === 'pomodoro' && isBreakTime) {
        // Skip to next session
        breakComplete();
    } else {
        resetTimer();
    }
}

function timerComplete() {
    clearInterval(timerInterval);
    playSound('complete');
    
    if (currentMode === 'pomodoro' && !isBreakTime) {
        sessionsCompleted++;
        currentSession++;
        
        if (currentSession > totalSessions) {
            currentSession = 1;
        }
        
        // Auto-start break if enabled
        if (autoBreakEnabled) {
            isBreakTime = true;
            seconds = (currentSession % parseInt(elements.longBreakInterval.value) === 0 ? 
                parseInt(elements.breakDuration.value) * 60 * 4 : 
                parseInt(elements.breakDuration.value) * 60);
            
            showNotification(
                "🎉 جلسة التركيز اكتملت! وقت الراحة",
                "🎉 Focus session completed! Break time"
            );
            
            if (autoStartNext) {
                setTimeout(startTimer, 1000);
            }
        } else {
            showNotification(
                "🎉 جلسة التركيز اكتملت!",
                "🎉 Focus session completed!"
            );
        }
    } else if (currentMode === 'custom') {
        showNotification(
            "⏰ الوقت المخصص انتهى!",
            "⏰ Custom time completed!"
        );
    }
    
    updateModeLabels();
    updateStatsDisplay();
    updateDisplay();
    saveToLocalStorage();
}

function breakComplete() {
    clearInterval(timerInterval);
    playSound('break');
    isBreakTime = false;
    seconds = parseInt(elements.pomodoroDuration.value) * 60;
    
    showNotification(
        "🚀 وقت الراحة انتهى! استعد للتركيز",
        "🚀 Break time over! Get ready to focus"
    );
    
    if (autoStartNext) {
        setTimeout(startTimer, 1000);
    }
    
    updateModeLabels();
    updateDisplay();
}

function checkTimeWarnings() {
    if (currentMode === 'pomodoro' && !isBreakTime) {
        // 5 minute warning
        if (seconds === 5 * 60) {
            showNotification(
                "⏳ 5 دقائق متبقية",
                "⏳ 5 minutes remaining"
            );
        }
        // 1 minute warning
        else if (seconds === 60) {
            showNotification(
                "⏳ دقيقة واحدة متبقية",
                "⏳ 1 minute remaining"
            );
        }
    }
}

// ===== MODE FUNCTIONS =====
function changeMode(newMode) {
    playSound('click');
    
    // Reset break state if changing from pomodoro
    if (currentMode === 'pomodoro') {
        isBreakTime = false;
    }
    
    currentMode = newMode;
    
    // Update active button
    elements.modeBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === newMode) {
            btn.classList.add('active');
        }
    });
    
    // Reset timer with new mode
    resetTimer();
    
    // Update labels
    updateModeLabels();
}

function updateModeLabels() {
    const isArabic = document.body.classList.contains('language-ar');
    
    if (currentMode === 'pomodoro') {
        if (isBreakTime) {
            const isLongBreak = currentSession % parseInt(elements.longBreakInterval.value) === 0;
            elements.modeLabelEn.textContent = isLongBreak ? 'LONG BREAK' : 'SHORT BREAK';
            elements.modeLabelAr.textContent = isLongBreak ? 'راحة طويلة' : 'راحة قصيرة';
        } else {
            elements.modeLabelEn.textContent = 'FOCUS SESSION';
            elements.modeLabelAr.textContent = 'جلسة تركيز';
        }
    } else if (currentMode === 'stopwatch') {
        elements.modeLabelEn.textContent = 'STOPWATCH';
        elements.modeLabelAr.textContent = 'ساعة توقيت';
    } else if (currentMode === 'custom') {
        elements.modeLabelEn.textContent = 'CUSTOM TIME';
        elements.modeLabelAr.textContent = 'وقت مخصص';
    } else if (currentMode === 'break') {
        elements.modeLabelEn.textContent = 'BREAK TIME';
        elements.modeLabelAr.textContent = 'وقت راحة';
    }
}

// ===== MESSAGE FUNCTIONS =====
function showNextMessage() {
    playSound('click');
    currentMessageIndex = (currentMessageIndex + 1) % messages.en.length;
    updateMessage();
}

function showPrevMessage() {
    playSound('click');
    currentMessageIndex = (currentMessageIndex - 1 + messages.en.length) % messages.en.length;
    updateMessage();
}

function updateMessage() {
    elements.msgEn.textContent = messages.en[currentMessageIndex];
    elements.msgAr.textContent = messages.ar[currentMessageIndex];
    
    // Add fade effect
    elements.msgEn.style.opacity = '0';
    elements.msgAr.style.opacity = '0';
    setTimeout(() => {
        elements.msgEn.style.opacity = '1';
        elements.msgAr.style.opacity = '1';
    }, 300);
}

// ===== LANGUAGE FUNCTIONS =====
function changeLanguage(lang) {
    playSound('click');
    
    // Update body classes
    document.body.className = `language-${lang}`;
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update active button
    elements.langBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update all text elements
    updateModeLabels();
    updateTimeRemainingText();
    updateMessage();
    updateStatsDisplay();
    updateTodayTime();
    updateFocusLevel();
    
    saveToLocalStorage();
}

// ===== SOUND FUNCTIONS =====
function playSound(soundName) {
    if (!soundsEnabled) return;
    
    try {
        const sound = elements[`${soundName}Sound`];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log("Sound play failed:", e));
        }
    } catch (error) {
        console.log("Sound error:", error);
    }
}

// ===== NOTIFICATION FUNCTIONS =====
function showNotification(title, message) {
    if (!notificationsEnabled) return;
    
    // Check browser support
    if (!("Notification" in window)) {
        console.log("This browser does not support notifications");
        return;
    }
    
    // Check permission
    if (Notification.permission === "granted") {
        createNotification(title, message);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                createNotification(title, message);
            }
        });
    }
}

function createNotification(title, message) {
    const notification = new Notification(title, {
        body: message,
        icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        badge: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    });
    
    // Close notification after 5 seconds
    setTimeout(() => {
        notification.close();
    }, 5000);
}

// ===== STATS FUNCTIONS =====
function updateStatsDisplay() {
    // Calculate hours and minutes
    const totalHours = Math.floor(totalFocusTime / 3600);
    const totalMinutes = Math.floor((totalFocusTime % 3600) / 60);
    
    // Update stats modal
    elements.totalSessionsStat.textContent = sessionsCompleted;
    elements.totalFocusTimeStat.textContent = `${totalHours}h ${totalMinutes}m`;
    elements.todayFocusStat.textContent = `${Math.floor(todayFocusTime / 60)}m`;
    elements.streakStat.textContent = dayStreak;
    
    // Update stats bar
    elements.streakDisplay.textContent = dayStreak;
}

function updateTodayTime() {
    const minutes = Math.floor(todayFocusTime / 60);
    elements.todayTime.textContent = `${minutes}m`;
}

function updateFocusLevel() {
    elements.focusLevel.textContent = `${Math.round(focusLevel)}%`;
    
    // Update color based on level
    if (focusLevel >= 80) {
        elements.focusLevel.style.color = '#00ff9d';
    } else if (focusLevel >= 50) {
        elements.focusLevel.style.color = '#4facfe';
    } else {
        elements.focusLevel.style.color = '#ff8a00';
    }
}

function updateStreak() {
    const today = new Date().toDateString();
    
    if (!lastActiveDate) {
        lastActiveDate = today;
        dayStreak = 1;
    } else if (lastActiveDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastActiveDate === yesterday.toDateString()) {
            dayStreak++;
        } else {
            dayStreak = 1;
        }
        
        lastActiveDate = today;
        todayFocusTime = 0;
    }
    
    saveToLocalStorage();
}

function resetStats() {
    if (confirm(document.body.classList.contains('language-ar') ? 
        "هل تريد مسح جميع الإحصائيات؟" : 
        "Are you sure you want to reset all statistics?")) {
        
        sessionsCompleted = 0;
        currentSession = 1;
        totalFocusTime = 0;
        todayFocusTime = 0;
        dayStreak = 0;
        lastActiveDate = null;
        tasks = [];
        currentTaskId = 1;
        
        updateStatsDisplay();
        updateTodayTime();
        updateFocusLevel();
        renderTasks();
        saveToLocalStorage();
        
        showNotification(
            "🔄 تم مسح الإحصائيات",
            "🔄 Statistics cleared"
        );
    }
}

// ===== TASK FUNCTIONS =====
function addTask() {
    playSound('click');
    
    const text = prompt(
        document.body.classList.contains('language-ar') ? 
        "أدخل مهمة جديدة:" : 
        "Enter a new task:"
    );
    
    if (text && text.trim()) {
        const task = {
            id: currentTaskId++,
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        tasks.push(task);
        renderTasks();
        saveToLocalStorage();
    }
}

function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        saveToLocalStorage();
        playSound('click');
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks();
    saveToLocalStorage();
    playSound('click');
}

function renderTasks() {
    elements.tasksList.innerHTML = '';
    
    if (tasks.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'empty-tasks';
        emptyMsg.innerHTML = document.body.classList.contains('language-ar') ? 
            '<p>لا توجد مهام. اضف مهمة جديدة!</p>' :
            '<p>No tasks. Add a new one!</p>';
        elements.tasksList.appendChild(emptyMsg);
        return;
    }
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskElement.innerHTML = `
            <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                 onclick="toggleTask(${task.id})"></div>
            <div class="task-text">${task.text}</div>
            <button class="task-delete" onclick="deleteTask(${task.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        elements.tasksList.appendChild(taskElement);
    });
}

// ===== SETTINGS FUNCTIONS =====
function saveSettings() {
    playSound('click');
    
    // Get values from inputs
    autoStartNext = elements.autoStart.checked;
    soundsEnabled = elements.soundsToggle.checked;
    darkMode = elements.darkMode.checked;
    notificationsEnabled = elements.notificationsToggle.checked;
    autoBreakEnabled = elements.autoBreak.checked;
    
    // Apply dark mode
    if (darkMode) {
        document.documentElement.style.setProperty('--bg', '#000000');
        document.documentElement.style.setProperty('--card', '#0f0f0f');
    } else {
        document.documentElement.style.setProperty('--bg', '#f5f5f5');
        document.documentElement.style.setProperty('--card', '#ffffff');
    }
    
    // Request notification permission if enabled
    if (notificationsEnabled && Notification.permission === "default") {
        Notification.requestPermission();
    }
    
    // Reset timer with new durations
    resetTimer();
    
    // Save and close
    saveToLocalStorage();
    elements.settings.classList.remove('active');
    
    showNotification(
        "✅ تم حفظ الإعدادات",
        "✅ Settings saved"
    );
}

function toggleBackgroundMusic() {
    playSound('click');
    backgroundMusicEnabled = !backgroundMusicEnabled;
    
    if (backgroundMusicEnabled && isRunning) {
        elements.focusMusic.play().catch(e => console.log("Music play failed:", e));
    } else {
        elements.focusMusic.pause();
    }
    
    // Update button icon
    elements.musicBtn.innerHTML = backgroundMusicEnabled ? 
        '<i class="fas fa-volume-up"></i>' : 
        '<i class="fas fa-volume-mute"></i>';
    
    saveToLocalStorage();
}

// ===== PRESET FUNCTIONS =====
function setPresetTime(minutes) {
    playSound('click');
    
    if (currentMode === 'custom') {
        seconds = minutes * 60;
        updateDisplay();
        
        // Highlight active preset
        elements.presets.forEach(preset => {
            preset.classList.remove('active');
            if (parseInt(preset.dataset.minutes) === minutes) {
                preset.classList.add('active');
            }
        });
        
        showNotification(
            `⏰ تم تعيين الوقت إلى ${minutes} دقيقة`,
            `⏰ Time set to ${minutes} minutes`
        );
    }
}

// ===== FULLSCREEN FUNCTIONS =====
function toggleFullscreen() {
    playSound('click');
    
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
        elements.fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        isFullscreen = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            elements.fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            isFullscreen = false;
        }
    }
}

// ===== SHARE FUNCTION =====
function shareApp() {
    playSound('click');
    
    if (navigator.share) {
        navigator.share({
            title: 'Focus Mode Pro',
            text: 'Check out this awesome focus timer app!',
            url: window.location.href
        });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification(
                "📋 تم نسخ الرابط",
                "📋 Link copied to clipboard"
            );
        });
    }
}

// ===== PARTICLES SYSTEM =====
function createParticles() {
    const container = document.getElementById('particles');
    container.innerHTML = '';
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 15) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        
        // Random color from gradient
        const colors = ['#00f2fe', '#4facfe', '#ff00ff', '#00ff9d'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
    }
}

// ===== KEYBOARD SHORTCUTS =====
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Prevent shortcuts in input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Space: Start/Pause
        if (e.code === 'Space') {
            e.preventDefault();
            if (isRunning) {
                pauseTimer();
            } else {
                startTimer();
            }
        }
        
        // R: Reset
        if (e.code === 'KeyR' && !e.ctrlKey) {
            e.preventDefault();
            resetTimer();
        }
        
        // S: Skip
        if (e.code === 'KeyS' && !e.ctrlKey) {
            e.preventDefault();
            skipTimer();
        }
        
        // N: Next message
        if (e.code === 'KeyN' && !e.ctrlKey) {
            e.preventDefault();
            showNextMessage();
        }
        
        // P: Previous message
        if (e.code === 'KeyP' && !e.ctrlKey) {
            e.preventDefault();
            showPrevMessage();
        }
        
        // 1-4: Modes
        if (e.code === 'Digit1') changeMode('pomodoro');
        if (e.code === 'Digit2') changeMode('stopwatch');
        if (e.code === 'Digit3') changeMode('custom');
        if (e.code === 'Digit4') changeMode('break');
        
        // L: Toggle language
        if (e.code === 'KeyL' && !e.ctrlKey) {
            e.preventDefault();
            const currentLang = document.body.classList.contains('language-ar') ? 'ar' : 'en';
            changeLanguage(currentLang === 'ar' ? 'en' : 'ar');
        }
        
        // M: Toggle music
        if (e.code === 'KeyM' && !e.ctrlKey) {
            e.preventDefault();
            toggleBackgroundMusic();
        }
        
        // F: Fullscreen
        if (e.code === 'KeyF' && !e.ctrlKey) {
            e.preventDefault();
            toggleFullscreen();
        }
        
        // Esc: Close modals
        if (e.code === 'Escape') {
            closeAllModals();
        }
    });
}

function closeAllModals() {
    elements.welcome.classList.remove('active');
    elements.settings.classList.remove('active');
    elements.stats.classList.remove('active');
}

// ===== INITIALIZATION =====
function init() {
    // Load saved data
    loadFromLocalStorage();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Create particles
    createParticles();
    
    // Initialize displays
    updateDisplay();
    updateMessage();
    updateStatsDisplay();
    updateTodayTime();
    updateFocusLevel();
    updateModeLabels();
    
    // Update music button icon
    elements.musicBtn.innerHTML = backgroundMusicEnabled ? 
        '<i class="fas fa-volume-up"></i>' : 
        '<i class="fas fa-volume-mute"></i>';
    
    // Update fullscreen button icon
    elements.fullscreenBtn.innerHTML = isFullscreen ? 
        '<i class="fas fa-compress"></i>' : 
        '<i class="fas fa-expand"></i>';
    
    // Set audio volumes
    Object.keys(elements).forEach(key => {
        if (key.includes('Sound') || key.includes('Music')) {
            elements[key].volume = 0.3;
        }
    });
    
    // Request notification permission on first load
    if (Notification.permission === "default" && notificationsEnabled) {
        setTimeout(() => {
            Notification.requestPermission();
        }, 2000);
    }
    
    // Auto-refresh particles every minute
    setInterval(createParticles, 60000);
    
    // Auto-save every 30 seconds
    setInterval(saveToLocalStorage, 30000);
    
    console.log("🚀 Focus Mode Pro Initialized with 50+ Features!");
    console.log("👨‍💻 Engineer: Kariem Tamer");
    console.log("🎯 Version: 3.0.0");
}

function setupEventListeners() {
    // Timer controls
    elements.start.addEventListener('click', startTimer);
    elements.pause.addEventListener('click', pauseTimer);
    elements.reset.addEventListener('click', resetTimer);
    elements.skip.addEventListener('click', skipTimer);
    
    // Mode buttons
    elements.modeBtns.forEach(btn => {
        btn.addEventListener('click', () => changeMode(btn.dataset.mode));
    });
    
    // Language buttons
    elements.langBtns.forEach(btn => {
        btn.addEventListener('click', () => changeLanguage(btn.dataset.lang));
    });
    
    // Message controls
    elements.nextMsg.addEventListener('click', showNextMessage);
    elements.prevMsg.addEventListener('click', showPrevMessage);
    
    // Modal controls
    elements.enter.addEventListener('click', () => {
        elements.welcome.classList.remove('active');
        playSound('click');
    });
    
    elements.cancel.addEventListener('click', () => {
        elements.welcome.classList.remove('active');
        playSound('click');
    });
    
    elements.settingsBtn.addEventListener('click', () => {
        elements.settings.classList.add('active');
        playSound('click');
    });
    
    elements.statsBtn.addEventListener('click', () => {
        elements.stats.classList.add('active');
        playSound('click');
    });
    
    elements.saveSettings.addEventListener('click', saveSettings);
    elements.closeSettings.addEventListener('click', () => {
        elements.settings.classList.remove('active');
        playSound('click');
    });
    
    elements.closeStats.addEventListener('click', () => {
        elements.stats.classList.remove('active');
        playSound('click');
    });
    
    elements.resetStats.addEventListener('click', resetStats);
    
    // Preset buttons
    elements.presets.forEach(preset => {
        preset.addEventListener('click', () => setPresetTime(parseInt(preset.dataset.minutes)));
    });
    
    // Task controls
    elements.addTask.addEventListener('click', addTask);
    
    // Footer buttons
    elements.shareBtn.addEventListener('click', shareApp);
    elements.fullscreenBtn.addEventListener('click', toggleFullscreen);
    elements.musicBtn.addEventListener('click', toggleBackgroundMusic);
    
    // Fullscreen change event
    document.addEventListener('fullscreenchange', () => {
        isFullscreen = !!document.fullscreenElement;
        elements.fullscreenBtn.innerHTML = isFullscreen ? 
            '<i class="fas fa-compress"></i>' : 
            '<i class="fas fa-expand"></i>';
    });
    
    // Click sound for all buttons
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.id !== 'start' && btn.id !== 'pause' && btn.id !== 'reset' && btn.id !== 'skip') {
                playSound('click');
            }
        });
    });
}

// ===== START APPLICATION =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== MAKE FUNCTIONS GLOBALLY AVAILABLE =====
window.toggleTask = toggleTask;
window.deleteTask = deleteTask;
