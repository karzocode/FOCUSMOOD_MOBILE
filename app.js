// ===== STUDY MODE MOBILE EDITION - FIXED VERSION =====
// تم إصلاح جميع التفاعلات وتحسين الـ Responsiveness

'use strict';

// ===== MOBILE STATE =====
const MobileState = {
    isFocusMode: false,
    isTimerRunning: false,
    timerMode: 'focus',
    focusDuration: 25 * 60,
    breakDuration: 5 * 60,
    currentTime: 25 * 60,
    timerInterval: null,
    currentActivity: 'study',
    language: 'ar',
    darkMode: true,
    notifications: true,
    
    psychology: {
        commitment: true,
        flow: true,
        ego: true,
        reward: true,
        antiBinge: false,
        visualization: false
    },
    
    stats: {
        streak: 7,
        totalSessions: 42,
        totalMinutes: 1050,
        productivity: 87,
        level: 3,
        todaySessions: 2,
        todayMinutes: 50
    },
    
    messages: {
        ar: [
            "يلا بطل! ركّز وانت قفلان!",
            "مفيش رجوع دلوقتي! استمر!",
            "خليك جامد، الوقت بتاعك!",
            "كل دقيقة بتقربك من الهدف!",
            "انت اسطورة تركيز! حطمها!",
            "محدش يقدر يوقفك دلوقتي!",
            "عقلك شغال بأقصى طاقة!",
            "الضغط بيعمل الماس! استمر!",
            "انت بتبني مستقبل جامد!",
            "نفسك في المستقبل بتهنيك!"
        ],
        en: [
            "Let's go champ! Stay focused!",
            "No turning back now! Keep going!",
            "Stay strong, this is your time!",
            "Every minute brings you closer!",
            "You're a focus legend! Crush it!",
            "No one can stop you now!",
            "Your brain is at peak performance!",
            "Pressure makes diamonds! Keep going!",
            "You're building an epic future!",
            "Your future self thanks you!"
        ]
    }
};

// ===== DOM ELEMENTS =====
const mobileDOM = {
    welcomeScreen: document.getElementById('welcomeScreen'),
    appContainer: document.getElementById('appContainer'),
    focusOverlay: document.getElementById('focusOverlay'),
    
    startAppBtn: document.getElementById('startAppBtn'),
    menuBtn: document.getElementById('menuBtn'),
    closeMenuBtn: document.getElementById('closeMenuBtn'),
    moreMenuBtn: document.getElementById('moreMenuBtn'),
    closeMoreBtn: document.getElementById('closeMoreBtn'),
    closeStatsBtn: document.getElementById('closeStatsBtn'),
    
    mobileStartBtn: document.getElementById('mobileStartBtn'),
    mobilePauseBtn: document.getElementById('mobilePauseBtn'),
    mobileResetBtn: document.getElementById('mobileResetBtn'),
    mobileTimer: document.getElementById('mobileTimer'),
    timeRemaining: document.getElementById('timeRemaining'),
    progressFill: document.getElementById('progressFill'),
    
    endFocusBtn: document.getElementById('endFocusBtn'),
    pauseFocusBtn: document.getElementById('pauseFocusBtn'),
    focusTimer: document.getElementById('focusTimer'),
    focusMessage: document.getElementById('focusMessage'),
    circleProgress: document.getElementById('circleProgress'),
    
    activities: document.querySelectorAll('.activity'),
    addActivityBtn: document.getElementById('addActivityBtn'),
    
    boosters: document.querySelectorAll('.booster'),
    boosterToggles: document.querySelectorAll('.booster-toggle input'),
    activeBoosters: document.getElementById('activeBoosters'),
    
    currentMessage: document.getElementById('currentMessage'),
    refreshMessage: document.getElementById('refreshMessage'),
    
    deepFocusBtn: document.getElementById('deepFocusBtn'),
    shortBreakBtn: document.getElementById('shortBreakBtn'),
    focusMusicBtn: document.getElementById('focusMusicBtn'),
    statsBtn: document.getElementById('statsBtn'),
    
    quickTimers: document.querySelectorAll('.quick-timer'),
    
    mobileStreak: document.getElementById('mobileStreak'),
    mobileSessions: document.getElementById('mobileSessions'),
    mobileFocus: document.getElementById('mobileFocus'),
    focusStreak: document.getElementById('focusStreak'),
    focusLevel: document.getElementById('focusLevel'),
    
    sideMenu: document.getElementById('sideMenu'),
    moreMenu: document.getElementById('moreMenu'),
    statsModal: document.getElementById('statsModal'),
    
    totalTimeStat: document.getElementById('totalTimeStat'),
    streakStat: document.getElementById('streakStat'),
    productivityStat: document.getElementById('productivityStat'),
    levelStat: document.getElementById('levelStat'),
    
    langOptions: document.querySelectorAll('.lang-option'),
    timerHelp: document.getElementById('timerHelp'),
    timerMode: document.getElementById('timerMode'),
    userLevel: document.getElementById('userLevel'),
    userBtn: document.getElementById('userBtn')
};

// ===== INITIALIZATION =====
function initMobileApp() {
    console.log('📱 تطبيق مود التركيز يعمل الآن...');
    
    // منع التمرير الأفقي
    preventHorizontalScroll();
    
    // تحميل الحالة
    loadMobileState();
    
    // إعداد الأحداث
    setupMobileEvents();
    
    // تهيئة الواجهة
    initMobileUI();
    
    // إعداد الإيماءات
    setupMobileGestures();
    
    // بدء الخدمات
    startMobileServices();
    
    console.log('✅ التطبيق جاهز للاستخدام');
}

// ===== منع التمرير الأفقي =====
function preventHorizontalScroll() {
    // منع التمرير الأفقي للصفحة كاملة
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    // السماح بالتمرير الأفقي فقط في العناصر المحددة
    const scrollableElements = document.querySelectorAll('.activities-scroll, .tips-scroll');
    scrollableElements.forEach(el => {
        el.style.overflowX = 'auto';
        el.style.WebkitOverflowScrolling = 'touch';
    });
    
    // إضافة مستمع حدث لمنع التمرير الأفقي
    document.addEventListener('wheel', function(e) {
        if (e.deltaX !== 0) {
            const target = e.target;
            const isScrollable = target.closest('.activities-scroll, .tips-scroll');
            if (!isScrollable) {
                e.preventDefault();
            }
        }
    }, { passive: false });
    
    // منع التمرير الأفقي باللمس
    document.addEventListener('touchmove', function(e) {
        const target = e.target;
        const isScrollable = target.closest('.activities-scroll, .tips-scroll');
        if (!isScrollable && e.touches.length === 1) {
            e.preventDefault();
        }
    }, { passive: false });
}

// ===== STATE MANAGEMENT =====
function loadMobileState() {
    const saved = localStorage.getItem('studyMode_mobile_v2');
    if (saved) {
        try {
            const state = JSON.parse(saved);
            Object.assign(MobileState, state);
            console.log('📱 تم تحميل الحالة بنجاح');
        } catch (error) {
            console.error('❌ خطأ في تحميل الحالة:', error);
            resetToDefaults();
        }
    } else {
        resetToDefaults();
    }
    MobileState.currentTime = MobileState.focusDuration;
}

function resetToDefaults() {
    MobileState.stats = {
        streak: 0,
        totalSessions: 0,
        totalMinutes: 0,
        productivity: 87,
        level: 1,
        todaySessions: 0,
        todayMinutes: 0
    };
}

function saveMobileState() {
    try {
        const state = {
            language: MobileState.language,
            darkMode: MobileState.darkMode,
            notifications: MobileState.notifications,
            psychology: MobileState.psychology,
            stats: MobileState.stats,
            focusDuration: MobileState.focusDuration,
            breakDuration: MobileState.breakDuration,
            currentActivity: MobileState.currentActivity
        };
        
        localStorage.setItem('studyMode_mobile_v2', JSON.stringify(state));
        console.log('💾 تم حفظ الحالة');
    } catch (error) {
        console.error('❌ فشل في حفظ الحالة:', error);
    }
}

// ===== MOBILE UI =====
function initMobileUI() {
    updateMobileLanguage();
    updateMobileTimer();
    updateMobileStats();
    updateMobileBoosters();
    updateMobileMessage();
    setupTimerCircle();
    updateActiveActivity();
    updateTimerModeLabel();
    setupProgressRing();
}

function updateMobileLanguage() {
    mobileDOM.langOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.lang === MobileState.language);
    });
    
    document.documentElement.dir = MobileState.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = MobileState.language;
    
    // تحديث النصوص حسب اللغة
    updateUITexts();
}

function updateUITexts() {
    const isArabic = MobileState.language === 'ar';
    
    // تحديث نصوص الأزرار
    const startBtnText = mobileDOM.mobileStartBtn.querySelector('span');
    const pauseBtnText = mobileDOM.mobilePauseBtn.querySelector('span');
    const resetBtnText = mobileDOM.mobileResetBtn.querySelector('span');
    
    if (startBtnText) startBtnText.textContent = isArabic ? 'ابدأ' : 'Start';
    if (pauseBtnText) pauseBtnText.textContent = isArabic ? 'إيقاف' : 'Pause';
    if (resetBtnText) resetBtnText.textContent = isArabic ? 'إعادة' : 'Reset';
    
    // تحديث وضع التايمر
    if (mobileDOM.timerMode) {
        mobileDOM.timerMode.textContent = isArabic ? 'تركيز' : 'Focus';
    }
}

function updateMobileTimer() {
    const minutes = Math.floor(MobileState.currentTime / 60);
    const seconds = MobileState.currentTime % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (mobileDOM.mobileTimer) mobileDOM.mobileTimer.textContent = timeString;
    if (mobileDOM.timeRemaining) mobileDOM.timeRemaining.textContent = timeString;
    if (mobileDOM.focusTimer) mobileDOM.focusTimer.textContent = timeString;
    
    // تحديث شريط التقدم
    const percentage = (MobileState.currentTime / MobileState.focusDuration) * 100;
    if (mobileDOM.progressFill) {
        mobileDOM.progressFill.style.width = `${100 - percentage}%`;
    }
    
    // تحديث دائرة التقدم
    updateCircleProgress(percentage);
    updateProgressRing(percentage);
}

function setupTimerCircle() {
    const circle = document.querySelector('.progress-ring-fill');
    if (circle) {
        const radius = circle.getAttribute('r');
        const circumference = 2 * Math.PI * radius;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
    }
}

function setupProgressRing() {
    const circles = document.querySelectorAll('.progress-ring-fill');
    circles.forEach(circle => {
        const radius = circle.getAttribute('r') || 130;
        const circumference = 2 * Math.PI * radius;
        circle.style.strokeDasharray = `${circumference}`;
        circle.style.strokeDashoffset = circumference;
    });
}

function updateProgressRing(percentage) {
    const circles = document.querySelectorAll('.progress-ring-fill');
    circles.forEach(circle => {
        const radius = circle.getAttribute('r') || 130;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    });
}

function updateCircleProgress(percentage) {
    if (mobileDOM.circleProgress) {
        const degrees = (percentage / 100) * 360;
        mobileDOM.circleProgress.style.transform = `rotate(${-45 + degrees}deg)`;
    }
}

function updateMobileStats() {
    // تحديث الإحصائيات في الهيدر
    if (mobileDOM.mobileStreak) mobileDOM.mobileStreak.textContent = MobileState.stats.streak;
    if (mobileDOM.mobileSessions) mobileDOM.mobileSessions.textContent = MobileState.stats.totalSessions;
    if (mobileDOM.mobileFocus) mobileDOM.mobileFocus.textContent = `${MobileState.stats.productivity}%`;
    
    // تحديث الإحصائيات في وضع التركيز
    if (mobileDOM.focusStreak) mobileDOM.focusStreak.textContent = `${MobileState.stats.streak} ${MobileState.language === 'ar' ? 'يوم' : 'days'}`;
    if (mobileDOM.focusLevel) mobileDOM.focusLevel.textContent = getLevelName(MobileState.stats.level);
    
    // تحديث الإحصائيات في المودال
    if (mobileDOM.totalTimeStat) mobileDOM.totalTimeStat.textContent = MobileState.stats.totalMinutes;
    if (mobileDOM.streakStat) mobileDOM.streakStat.textContent = MobileState.stats.streak;
    if (mobileDOM.productivityStat) mobileDOM.productivityStat.textContent = `${MobileState.stats.productivity}%`;
    if (mobileDOM.levelStat) mobileDOM.levelStat.textContent = MobileState.stats.level;
    if (mobileDOM.userLevel) mobileDOM.userLevel.textContent = MobileState.stats.level;
}

function getLevelName(level) {
    const levelsAr = ['مبتدئ', 'متوسط', 'متقدم', 'محترف', 'خبير', 'ماستر', 'أسطورة'];
    const levelsEn = ['Beginner', 'Intermediate', 'Advanced', 'Pro', 'Expert', 'Master', 'Legend'];
    
    const levels = MobileState.language === 'ar' ? levelsAr : levelsEn;
    return levels[level - 1] || (MobileState.language === 'ar' ? `مستوى ${level}` : `Level ${level}`);
}

function updateMobileBoosters() {
    let activeCount = 0;
    
    mobileDOM.boosters.forEach((booster, index) => {
        const boosterName = booster.dataset.booster;
        const isActive = MobileState.psychology[boosterName];
        const toggle = booster.querySelector('input');
        
        if (isActive) {
            booster.classList.add('active');
            if (toggle) toggle.checked = true;
            activeCount++;
        } else {
            booster.classList.remove('active');
            if (toggle) toggle.checked = false;
        }
    });
    
    if (mobileDOM.activeBoosters) {
        mobileDOM.activeBoosters.textContent = activeCount;
    }
}

function updateMobileMessage() {
    const messages = MobileState.messages[MobileState.language];
    if (messages && messages.length > 0) {
        const randomIndex = Math.floor(Math.random() * messages.length);
        if (mobileDOM.currentMessage) {
            mobileDOM.currentMessage.textContent = messages[randomIndex];
        }
    }
}

function updateActiveActivity() {
    mobileDOM.activities.forEach(activity => {
        if (activity.dataset.activity === MobileState.currentActivity) {
            activity.classList.add('selected');
        } else {
            activity.classList.remove('selected');
        }
    });
}

function updateTimerModeLabel() {
    const activities = {
        study: { ar: 'مذاكرة', en: 'Study' },
        work: { ar: 'عمل', en: 'Work' },
        code: { ar: 'برمجة', en: 'Coding' },
        read: { ar: 'قراءة', en: 'Reading' },
        gym: { ar: 'تمرين', en: 'Workout' },
        meditate: { ar: 'تأمل', en: 'Meditation' }
    };
    
    const activity = activities[MobileState.currentActivity];
    if (activity && mobileDOM.timerMode) {
        mobileDOM.timerMode.textContent = MobileState.language === 'ar' ? activity.ar : activity.en;
    }
}

// ===== TIMER FUNCTIONS =====
function startMobileTimer() {
    if (MobileState.isTimerRunning) return;
    
    console.log('⏱️ بدأ التايمر');
    
    MobileState.isTimerRunning = true;
    MobileState.isFocusMode = true;
    
    // تحديث واجهة المستخدم
    if (mobileDOM.mobileStartBtn) {
        mobileDOM.mobileStartBtn.disabled = true;
        const span = mobileDOM.mobileStartBtn.querySelector('span');
        const icon = mobileDOM.mobileStartBtn.querySelector('i');
        if (span) span.textContent = MobileState.language === 'ar' ? 'جاري' : 'Running';
        if (icon) icon.className = 'fas fa-spinner fa-spin';
    }
    
    if (mobileDOM.mobilePauseBtn) {
        mobileDOM.mobilePauseBtn.disabled = false;
    }
    
    // إظهار وضع التركيز
    if (mobileDOM.focusOverlay) {
        mobileDOM.focusOverlay.classList.add('active');
        document.body.classList.add('focus-mode-active');
    }
    
    // بدأ العد التنازلي
    MobileState.timerInterval = setInterval(() => {
        if (MobileState.currentTime > 0) {
            MobileState.currentTime--;
            updateMobileTimer();
            
            // تحديث رسالة التحفيز كل دقيقة
            if (MobileState.currentTime % 60 === 0 && mobileDOM.focusMessage) {
                updateFocusMessage();
            }
            
            // تفعيل الميزات النفسية كل دقيقتين
            if (MobileState.currentTime % 120 === 0) {
                triggerPsychologyEvent();
            }
        } else {
            completeMobileSession();
        }
    }, 1000);
    
    // بدأ تتبع الجلسة
    MobileState.sessionStartTime = Date.now();
    
    // عرض أول رسالة تحفيزية
    updateFocusMessage();
    
    // تفعيل الميزات النفسية
    activateMobilePsychology();
    
    // منع قفل الشاشة
    preventScreenLock();
    
    // اهتزاز
    vibrateMobile([100]);
    
    // تحديث حالة المؤشر
    updateStatusIndicator('active');
}

function pauseMobileTimer() {
    if (!MobileState.isTimerRunning) return;
    
    console.log('⏸️ توقف التايمر');
    
    MobileState.isTimerRunning = false;
    if (MobileState.timerInterval) {
        clearInterval(MobileState.timerInterval);
        MobileState.timerInterval = null;
    }
    
    // تحديث واجهة المستخدم
    if (mobileDOM.mobileStartBtn) {
        mobileDOM.mobileStartBtn.disabled = false;
        const span = mobileDOM.mobileStartBtn.querySelector('span');
        const icon = mobileDOM.mobileStartBtn.querySelector('i');
        if (span) span.textContent = MobileState.language === 'ar' ? 'ابدأ' : 'Start';
        if (icon) icon.className = 'fas fa-play';
    }
    
    if (mobileDOM.mobilePauseBtn) {
        mobileDOM.mobilePauseBtn.disabled = true;
    }
    
    // إخفاء وضع التركيز
    if (mobileDOM.focusOverlay) {
        mobileDOM.focusOverlay.classList.remove('active');
        document.body.classList.remove('focus-mode-active');
    }
    
    // رسالة تجنب الخسارة
    const minutesInvested = Math.floor((MobileState.focusDuration - MobileState.currentTime) / 60);
    if (minutesInvested > 0 && MobileState.psychology.commitment) {
        const message = MobileState.language === 'ar' 
            ? `خسرت ${minutesInvested} دقيقة تركيز! رجّع شغلك!`
            : `You lost ${minutesInvested} minutes of focus! Get back to work!`;
        
        showToast(message);
    }
    
    // السماح بقفل الشاشة
    allowScreenLock();
    
    // اهتزاز
    vibrateMobile([100, 50, 100]);
    
    // تحديث حالة المؤشر
    updateStatusIndicator('paused');
}

function resetMobileTimer() {
    console.log('🔄 إعادة تعيين التايمر');
    
    // إيقاف العد التنازلي
    if (MobileState.timerInterval) {
        clearInterval(MobileState.timerInterval);
        MobileState.timerInterval = null;
    }
    
    // إعادة تعيين الحالة
    MobileState.isTimerRunning = false;
    MobileState.isFocusMode = false;
    MobileState.currentTime = MobileState.focusDuration;
    
    // تحديث واجهة المستخدم
    if (mobileDOM.mobileStartBtn) {
        mobileDOM.mobileStartBtn.disabled = false;
        const span = mobileDOM.mobileStartBtn.querySelector('span');
        const icon = mobileDOM.mobileStartBtn.querySelector('i');
        if (span) span.textContent = MobileState.language === 'ar' ? 'ابدأ' : 'Start';
        if (icon) icon.className = 'fas fa-play';
    }
    
    if (mobileDOM.mobilePauseBtn) {
        mobileDOM.mobilePauseBtn.disabled = true;
    }
    
    // إخفاء وضع التركيز
    if (mobileDOM.focusOverlay) {
        mobileDOM.focusOverlay.classList.remove('active');
        document.body.classList.remove('focus-mode-active');
    }
    
    // تحديث العرض
    updateMobileTimer();
    
    // رسالة إعادة التعيين
    const message = MobileState.language === 'ar'
        ? 'التايمر اتعاد! جهز نفسك للجولة الجديدة!'
        : 'Timer reset! Prepare for the next round!';
    
    showToast(message);
    
    // السماح بقفل الشاشة
    allowScreenLock();
    
    // تحديث حالة المؤشر
    updateStatusIndicator('ready');
}

function completeMobileSession() {
    console.log('🎯 اكتملت الجلسة');
    
    // إيقاف العد التنازلي
    if (MobileState.timerInterval) {
        clearInterval(MobileState.timerInterval);
        MobileState.timerInterval = null;
    }
    
    MobileState.isTimerRunning = false;
    
    // حساب مدة الجلسة
    const sessionDuration = MobileState.focusDuration - MobileState.currentTime;
    const sessionMinutes = Math.floor(sessionDuration / 60);
    
    // تحديث الإحصائيات
    MobileState.stats.totalSessions++;
    MobileState.stats.totalMinutes += sessionMinutes;
    MobileState.stats.todaySessions++;
    MobileState.stats.todayMinutes += sessionMinutes;
    
    // تحديث السلسلة
    updateMobileStreak();
    
    // حساب درجة الإنتاجية
    calculateProductivityScore(sessionMinutes);
    
    // التحقق من الترقية
    checkLevelUp();
    
    // حفظ الحالة
    saveMobileState();
    
    // تحديث واجهة المستخدم
    updateMobileStats();
    
    // إخفاء وضع التركيز
    if (mobileDOM.focusOverlay) {
        mobileDOM.focusOverlay.classList.remove('active');
        document.body.classList.remove('focus-mode-active');
    }
    
    // إعادة تعيين التايمر
    MobileState.currentTime = MobileState.focusDuration;
    updateMobileTimer();
    
    // عرض رسالة الإكمال
    showCompletionMessage(sessionMinutes);
    
    // المكافأة المؤجلة
    if (MobileState.psychology.reward) {
        setTimeout(() => showRewardMessage(), 1000);
    }
    
    // الاحتفال
    triggerMobileCelebration();
    
    // السماح بقفل الشاشة
    allowScreenLock();
    
    // اهتزاز الاحتفال
    vibrateMobile([100, 50, 100, 50, 100]);
    
    // تحديث حالة المؤشر
    updateStatusIndicator('completed');
}

function updateMobileStreak() {
    const today = new Date().toDateString();
    const lastSession = localStorage.getItem('lastMobileSessionDate');
    
    if (lastSession === today) return; // تم العد اليوم
    
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastSession === yesterday) {
        MobileState.stats.streak++;
    } else {
        MobileState.stats.streak = 1;
    }
    
    localStorage.setItem('lastMobileSessionDate', today);
}

function calculateProductivityScore(sessionMinutes) {
    let score = 100;
    
    // خصم للجلسات القصيرة
    if (sessionMinutes < 10) {
        score -= 20;
    }
    
    // خصم للمقاطعات
    if (MobileState.interruptions && MobileState.interruptions > 0) {
        score -= MobileState.interruptions * 5;
    }
    
    // تحديث متوسط الإنتاجية
    MobileState.stats.productivity = Math.round(
        (MobileState.stats.productivity * 0.7) + (score * 0.3)
    );
}

function checkLevelUp() {
    const sessionsNeeded = MobileState.stats.level * 10;
    if (MobileState.stats.totalSessions >= sessionsNeeded) {
        MobileState.stats.level++;
        showLevelUpMessage();
    }
}

function updateStatusIndicator(status) {
    const indicator = document.querySelector('.status-indicator');
    if (!indicator) return;
    
    const dot = indicator.querySelector('.status-dot');
    const text = indicator.querySelector('span');
    
    if (!dot || !text) return;
    
    const statuses = {
        ready: { color: '#00ff00', text: MobileState.language === 'ar' ? 'جاهز' : 'Ready' },
        active: { color: '#ffa500', text: MobileState.language === 'ar' ? 'نشط' : 'Active' },
        paused: { color: '#ff4757', text: MobileState.language === 'ar' ? 'متوقف' : 'Paused' },
        completed: { color: '#00ffcc', text: MobileState.language === 'ar' ? 'مكتمل' : 'Completed' }
    };
    
    const current = statuses[status] || statuses.ready;
    dot.style.backgroundColor = current.color;
    text.textContent = current.text;
}

// ===== PSYCHOLOGY FUNCTIONS =====
function activateMobilePsychology() {
    console.log('🧠 تفعيل الميزات النفسية');
    
    // حماية التدفق
    if (MobileState.psychology.flow) {
        activateFlowProtection();
    }
    
    // انحياز الالتزام
    if (MobileState.psychology.commitment) {
        activateCommitmentBias();
    }
}

function activateFlowProtection() {
    let hasShownWarning = false;
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && MobileState.isTimerRunning && !hasShownWarning) {
            hasShownWarning = true;
            
            const warning = MobileState.language === 'ar'
                ? 'رجّع للتطبيق! كسرت التدفق!'
                : 'Return to app! You broke the flow!';
            
            showToast(warning);
            
            // تتبع المقاطعات
            MobileState.interruptions = (MobileState.interruptions || 0) + 1;
            
            // إعادة تعيين العلم بعد 5 ثواني
            setTimeout(() => {
                hasShownWarning = false;
            }, 5000);
        }
    });
}

function activateCommitmentBias() {
    // عرض رسائل الالتزام بشكل دوري
    const commitmentInterval = setInterval(() => {
        if (!MobileState.isTimerRunning) {
            clearInterval(commitmentInterval);
            return;
        }
        
        const messages = MobileState.language === 'ar'
            ? ['انت متعهد! مينفعش توقف!', 'وعدت نفسك! خلّص اللي بدأت فيه!']
            : ['You committed! Can\'t stop now!', 'You promised yourself! Finish what you started!'];
        
        if (mobileDOM.focusMessage) {
            const message = messages[Math.floor(Math.random() * messages.length)];
            mobileDOM.focusMessage.textContent = message;
        }
    }, 120000); // كل دقيقتين
}

function triggerPsychologyEvent() {
    if (!MobileState.isTimerRunning) return;
    
    const events = [];
    
    if (MobileState.psychology.ego) {
        events.push('ego');
    }
    
    if (events.length > 0 && mobileDOM.focusMessage) {
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        
        if (randomEvent === 'ego') {
            const messages = MobileState.language === 'ar'
                ? ['انت اسطورة! محدش في مستواك!', 'عقلك جامد فشخ! استمر!']
                : ['You\'re a legend! No one is on your level!', 'Your mind is epic! Keep going!'];
            
            const message = messages[Math.floor(Math.random() * messages.length)];
            mobileDOM.focusMessage.textContent = message;
        }
    }
}

function updateFocusMessage() {
    const messages = MobileState.messages[MobileState.language];
    if (messages && messages.length > 0 && mobileDOM.focusMessage) {
        const randomIndex = Math.floor(Math.random() * messages.length);
        mobileDOM.focusMessage.textContent = messages[randomIndex];
    }
}

// ===== MOBILE EVENTS =====
function setupMobileEvents() {
    console.log('🔧 إعداد الأحداث...');
    
    // شاشة الترحيب
    if (mobileDOM.startAppBtn) {
        mobileDOM.startAppBtn.addEventListener('click', () => {
            if (mobileDOM.welcomeScreen) mobileDOM.welcomeScreen.classList.remove('active');
            if (mobileDOM.appContainer) mobileDOM.appContainer.classList.add('active');
            vibrateMobile([100]);
        });
    }
    
    // تغيير اللغة
    if (mobileDOM.langOptions) {
        mobileDOM.langOptions.forEach(option => {
            option.addEventListener('click', () => {
                MobileState.language = option.dataset.lang;
                updateMobileLanguage();
                updateMobileMessage();
                updateTimerModeLabel();
                saveMobileState();
                
                mobileDOM.langOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                vibrateMobile([50]);
            });
        });
    }
    
    // القوائم
    if (mobileDOM.menuBtn) {
        mobileDOM.menuBtn.addEventListener('click', () => {
            if (mobileDOM.sideMenu) mobileDOM.sideMenu.classList.add('active');
            vibrateMobile([50]);
        });
    }
    
    if (mobileDOM.closeMenuBtn) {
        mobileDOM.closeMenuBtn.addEventListener('click', () => {
            if (mobileDOM.sideMenu) mobileDOM.sideMenu.classList.remove('active');
            vibrateMobile([50]);
        });
    }
    
    if (mobileDOM.moreMenuBtn) {
        mobileDOM.moreMenuBtn.addEventListener('click', () => {
            if (mobileDOM.moreMenu) mobileDOM.moreMenu.classList.add('active');
            vibrateMobile([50]);
        });
    }
    
    if (mobileDOM.closeMoreBtn) {
        mobileDOM.closeMoreBtn.addEventListener('click', () => {
            if (mobileDOM.moreMenu) mobileDOM.moreMenu.classList.remove('active');
            vibrateMobile([50]);
        });
    }
    
    // تحكمات التايمر
    if (mobileDOM.mobileStartBtn) {
        mobileDOM.mobileStartBtn.addEventListener('click', startMobileTimer);
    }
    
    if (mobileDOM.mobilePauseBtn) {
        mobileDOM.mobilePauseBtn.addEventListener('click', pauseMobileTimer);
    }
    
    if (mobileDOM.mobileResetBtn) {
        mobileDOM.mobileResetBtn.addEventListener('click', resetMobileTimer);
    }
    
    // تحكمات وضع التركيز
    if (mobileDOM.endFocusBtn) {
        mobileDOM.endFocusBtn.addEventListener('click', () => {
            const message = MobileState.language === 'ar' 
                ? 'انت متأكد انك عايز توقف الجلسة؟'
                : 'Are you sure you want to end the session?';
            
            if (confirm(message)) {
                resetMobileTimer();
            }
        });
    }
    
    if (mobileDOM.pauseFocusBtn) {
        mobileDOM.pauseFocusBtn.addEventListener('click', pauseMobileTimer);
    }
    
    // اختيار النشاط
    if (mobileDOM.activities) {
        mobileDOM.activities.forEach(activity => {
            activity.addEventListener('click', () => {
                MobileState.currentActivity = activity.dataset.activity;
                updateActiveActivity();
                updateTimerModeLabel();
                saveMobileState();
                vibrateMobile([50]);
            });
        });
    }
    
    // معززات التركيز
    if (mobileDOM.boosterToggles) {
        mobileDOM.boosterToggles.forEach(toggle => {
            toggle.addEventListener('change', () => {
                const booster = toggle.closest('.booster').dataset.booster;
                MobileState.psychology[booster] = toggle.checked;
                
                const boosterElement = toggle.closest('.booster');
                if (toggle.checked) {
                    boosterElement.classList.add('active');
                } else {
                    boosterElement.classList.remove('active');
                }
                
                const activeCount = Object.values(MobileState.psychology).filter(v => v).length;
                if (mobileDOM.activeBoosters) {
                    mobileDOM.activeBoosters.textContent = activeCount;
                }
                
                saveMobileState();
                vibrateMobile([50]);
            });
        });
    }
    
    // التايمرات السريعة
    if (mobileDOM.quickTimers) {
        mobileDOM.quickTimers.forEach(timer => {
            timer.addEventListener('click', () => {
                mobileDOM.quickTimers.forEach(t => t.classList.remove('active'));
                timer.classList.add('active');
                
                const minutes = parseInt(timer.dataset.time);
                MobileState.focusDuration = minutes * 60;
                MobileState.currentTime = minutes * 60;
                
                updateMobileTimer();
                saveMobileState();
                vibrateMobile([50]);
            });
        });
    }
    
    // تحديث الرسائل
    if (mobileDOM.refreshMessage) {
        mobileDOM.refreshMessage.addEventListener('click', () => {
            updateMobileMessage();
            vibrateMobile([50]);
        });
    }
    
    // الإجراءات السريعة
    if (mobileDOM.deepFocusBtn) {
        mobileDOM.deepFocusBtn.addEventListener('click', () => {
            Object.keys(MobileState.psychology).forEach(key => {
                MobileState.psychology[key] = true;
            });
            
            updateMobileBoosters();
            
            if (!MobileState.isTimerRunning) {
                startMobileTimer();
            }
            
            showToast(MobileState.language === 'ar' 
                ? 'تركيز عميق مفعل!'
                : 'Deep focus activated!');
            
            vibrateMobile([100, 50, 100]);
        });
    }
    
    if (mobileDOM.shortBreakBtn) {
        mobileDOM.shortBreakBtn.addEventListener('click', () => {
            MobileState.focusDuration = 5 * 60;
            MobileState.currentTime = 5 * 60;
            MobileState.timerMode = 'break';
            
            updateMobileTimer();
            
            showToast(MobileState.language === 'ar'
                ? 'راحة 5 دقائق'
                : '5 minute break');
            
            vibrateMobile([50]);
        });
    }
    
    if (mobileDOM.focusMusicBtn) {
        mobileDOM.focusMusicBtn.addEventListener('click', () => {
            showToast(MobileState.language === 'ar'
                ? 'موسيقى التركيز جاهزة'
                : 'Focus music ready');
            
            vibrateMobile([50]);
        });
    }
    
    if (mobileDOM.statsBtn) {
        mobileDOM.statsBtn.addEventListener('click', () => {
            if (mobileDOM.statsModal) {
                mobileDOM.statsModal.classList.add('active');
                vibrateMobile([50]);
            }
        });
    }
    
    // زر المساعدة
    if (mobileDOM.timerHelp) {
        mobileDOM.timerHelp.addEventListener('click', () => {
            showToast(MobileState.language === 'ar'
                ? 'اختر الوقت المناسب ثم اضغط ابدأ للتركيز'
                : 'Choose a time then press Start to focus');
            
            vibrateMobile([50]);
        });
    }
    
    // زر المستخدم
    if (mobileDOM.userBtn) {
        mobileDOM.userBtn.addEventListener('click', () => {
            if (mobileDOM.sideMenu) {
                mobileDOM.sideMenu.classList.add('active');
                vibrateMobile([50]);
            }
        });
    }
    
    // إغلاق المودالات عند الضغط خارجها
    document.addEventListener('click', (e) => {
        // إغلاق القائمة الجانبية
        if (mobileDOM.sideMenu && mobileDOM.sideMenu.classList.contains('active') &&
            !mobileDOM.sideMenu.contains(e.target) && 
            !mobileDOM.menuBtn.contains(e.target) &&
            !mobileDOM.userBtn.contains(e.target)) {
            mobileDOM.sideMenu.classList.remove('active');
        }
        
        // إغلاق قائمة المزيد
        if (mobileDOM.moreMenu && mobileDOM.moreMenu.classList.contains('active') &&
            !mobileDOM.moreMenu.contains(e.target) && 
            !mobileDOM.moreMenuBtn.contains(e.target)) {
            mobileDOM.moreMenu.classList.remove('active');
        }
        
        // إغلاق مودال الإحصائيات
        if (mobileDOM.statsModal && mobileDOM.statsModal.classList.contains('active')) {
            const modalContent = mobileDOM.statsModal.querySelector('.modal-content');
            if (modalContent && !modalContent.contains(e.target) &&
                !mobileDOM.statsBtn.contains(e.target)) {
                mobileDOM.statsModal.classList.remove('active');
            }
        }
    });
    
    // إغلاق المودالات بمفتاح Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (mobileDOM.sideMenu) mobileDOM.sideMenu.classList.remove('active');
            if (mobileDOM.moreMenu) mobileDOM.moreMenu.classList.remove('active');
            if (mobileDOM.statsModal) mobileDOM.statsModal.classList.remove('active');
        }
    });
    
    console.log('✅ تم إعداد جميع الأحداث');
}

// ===== MOBILE GESTURES =====
function setupMobileGestures() {
    // سحب لإغلاق القائمة الجانبية
    let startX = 0;
    
    document.addEventListener('touchstart', (e) => {
        if (mobileDOM.sideMenu && mobileDOM.sideMenu.classList.contains('active')) {
            startX = e.touches[0].clientX;
        }
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!mobileDOM.sideMenu || !mobileDOM.sideMenu.classList.contains('active')) return;
        
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        
        // إذا كان السحب لليمين (إغلاق القائمة)
        if (diff > 50) {
            mobileDOM.sideMenu.classList.remove('active');
        }
    });
    
    // سحب لأسفل لتحديث الرسائل
    let startY = 0;
    const messageSection = document.querySelector('.mobile-messages');
    
    if (messageSection) {
        messageSection.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });
        
        messageSection.addEventListener('touchend', (e) => {
            const endY = e.changedTouches[0].clientY;
            const diff = startY - endY;
            
            // إذا كان السحب لأسفل بما يكفي
            if (diff > 50) {
                updateMobileMessage();
                showToast(MobileState.language === 'ar'
                    ? 'تم تحديث الرسائل'
                    : 'Messages refreshed');
            }
        });
    }
}

// ===== MOBILE SERVICES =====
function startMobileServices() {
    // الحفظ التلقائي كل دقيقة
    setInterval(() => {
        saveMobileState();
    }, 60000);
    
    // تحديث الوقت الحالي
    setInterval(() => {
        updateCurrentTime();
    }, 60000);
    
    // محفزات الخلفية النفسية
    setInterval(() => {
        if (!MobileState.isTimerRunning && Math.random() < 0.1) {
            showMotivationNotification();
        }
    }, 300000); // كل 5 دقائق
    
    // تحديث مؤشر البطارية (محاكاة)
    setInterval(() => {
        updateBatteryIndicator();
    }, 30000);
}

function updateCurrentTime() {
    const timeElement = document.querySelector('.status-time');
    if (timeElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ar-EG', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
        timeElement.textContent = timeString;
    }
}

function updateBatteryIndicator() {
    const batteryIcon = document.querySelector('.fa-battery-full');
    if (batteryIcon) {
        // محاكاة تغيير حالة البطارية
        const levels = ['battery-empty', 'battery-quarter', 'battery-half', 'battery-three-quarters', 'battery-full'];
        const currentLevel = batteryIcon.classList[1];
        const currentIndex = levels.indexOf(currentLevel);
        const nextIndex = (currentIndex + 1) % levels.length;
        
        batteryIcon.classList.remove(currentLevel);
        batteryIcon.classList.add(levels[nextIndex]);
    }
}

// ===== MOBILE FEEDBACK =====
function showToast(message) {
    // إزالة أي toast موجود مسبقاً
    const existingToast = document.querySelector('.mobile-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // إنشاء toast جديد
    const toast = document.createElement('div');
    toast.className = 'mobile-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: rgba(0, 0, 0, 0.85);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10000;
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        max-width: 80%;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(toast);
    
    // التحريك للداخل
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // الإزالة بعد التأخير
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

function vibrateMobile(pattern) {
    if (navigator.vibrate) {
        try {
            navigator.vibrate(pattern);
        } catch (error) {
            console.log('Vibration not supported or blocked');
        }
    }
}

function showMotivationNotification() {
    if (!MobileState.notifications) return;
    
    const messages = MobileState.messages[MobileState.language];
    if (!messages || messages.length === 0) return;
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    // عرض كـ toast
    showToast(message);
    
    // طلب إذن الإشعارات
    if ('Notification' in window && Notification.permission === 'granted') {
        try {
            new Notification('مود التركيز', {
                body: message,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🧠</text></svg>'
            });
        } catch (error) {
            console.log('Notifications not supported');
        }
    }
}

function showCompletionMessage(minutes) {
    const messages = MobileState.language === 'ar'
        ? [`مبروك! خلصت ${minutes} دقيقة تركيز!`, `إنجاز رائع! ${minutes} دقيقة إنتاجية!`]
        : [`Congratulations! ${minutes} minutes of focus completed!`, `Amazing work! ${minutes} productive minutes!`];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    showToast(message);
}

function showRewardMessage() {
    const messages = MobileState.language === 'ar'
        ? ['المكافأة: عقلك بقى أقوى!', 'جائزة التركيز: انت بتبقى أفضل!']
        : ['Reward: Your mind is stronger!', 'Focus prize: You\'re becoming better!'];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    showToast(message);
}

function showLevelUpMessage() {
    const messages = MobileState.language === 'ar'
        ? [`مبروك! وصلت للمستوى ${MobileState.stats.level}!`, `تطور! مستوى ${MobileState.stats.level} جديد!`]
        : [`Congratulations! Reached Level ${MobileState.stats.level}!`, `Evolution! New Level ${MobileState.stats.level}!`];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    showToast(message);
    
    // اهتزاز الاحتفال
    vibrateMobile([100, 50, 100, 50, 100, 50, 100]);
}

function triggerMobileCelebration() {
    // إضافة فئة الاحتفال
    document.body.classList.add('celebration');
    
    // إزالة الفئة بعد الانتهاء من التحريك
    setTimeout(() => {
        document.body.classList.remove('celebration');
    }, 2000);
}

// ===== SCREEN LOCK PREVENTION =====
let wakeLock = null;

async function preventScreenLock() {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('🔒 منع قفل الشاشة مفعل');
        } catch (err) {
            console.log('❌ تعذر منع قفل الشاشة');
        }
    }
}

function allowScreenLock() {
    if (wakeLock !== null) {
        wakeLock.release().then(() => {
            wakeLock = null;
            console.log('🔓 السماح بقفل الشاشة');
        });
    }
}

// ===== RESPONSIVE IMPROVEMENTS =====
function setupResponsiveBehavior() {
    // تحديث حجم الخطوط بناءً على حجم الشاشة
    function updateFontSizes() {
        const width = window.innerWidth;
        const baseSize = 16;
        let scale = 1;
        
        if (width < 320) scale = 0.85;  // شاشات صغيرة جداً
        if (width >= 320 && width < 375) scale = 0.9;  // iPhone SE
        if (width >= 375 && width < 414) scale = 1;    // iPhone X/11/12
        if (width >= 414 && width < 768) scale = 1.1;  // iPhone Pro Max
        
        document.documentElement.style.fontSize = `${baseSize * scale}px`;
    }
    
    // تحديث حجم التايمر بناءً على حجم الشاشة
    function updateTimerSize() {
        const timerCircle = document.querySelector('.timer-circle');
        if (!timerCircle) return;
        
        const width = window.innerWidth;
        let size = 280; // الحجم الافتراضي
        
        if (width < 320) size = 220;
        if (width >= 320 && width < 375) size = 240;
        if (width >= 375 && width < 414) size = 260;
        if (width >= 414 && width < 768) size = 280;
        
        timerCircle.style.width = `${size}px`;
        timerCircle.style.height = `${size}px`;
        
        // تحديث SVG أيضًا
        const svg = timerCircle.querySelector('svg');
        if (svg) {
            svg.setAttribute('width', size);
            svg.setAttribute('height', size);
            svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
            
            // تحديد دائرة نصف قطرها
            const radius = size / 2 - 10;
            const circles = svg.querySelectorAll('circle');
            circles.forEach(circle => {
                circle.setAttribute('r', radius);
                circle.setAttribute('cx', size / 2);
                circle.setAttribute('cy', size / 2);
            });
        }
    }
    
    // تحديث تخطيط الشبكة بناءً على حجم الشاشة
    function updateGridLayout() {
        const boostersGrid = document.querySelector('.boosters-grid');
        if (!boostersGrid) return;
        
        const width = window.innerWidth;
        
        if (width < 375) {
            boostersGrid.style.gridTemplateColumns = '1fr';
        } else {
            boostersGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        }
    }
    
    // استدعاء جميع الدوال عند التحميل وعند تغيير الحجم
    updateFontSizes();
    updateTimerSize();
    updateGridLayout();
    
    window.addEventListener('resize', () => {
        updateFontSizes();
        updateTimerSize();
        updateGridLayout();
    });
}

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 بدء تحميل التطبيق...');
    
    // تهيئة السلوك المتجاوب
    setupResponsiveBehavior();
    
    // إعداد تدرج SVG للتايمر
    setupSVGGradient();
    
    // تهيئة التطبيق مع تأخير بسيط
    setTimeout(() => {
        initMobileApp();
        console.log('🎉 التطبيق يعمل الآن!');
        
        // إضافة CSS إضافي للتحسينات
        addResponsiveCSS();
    }, 500);
});

function setupSVGGradient() {
    const svg = document.querySelector('svg');
    if (svg) {
        // التحقق من وجود التدرج بالفعل
        let defs = svg.querySelector('defs');
        if (!defs) {
            defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            svg.insertBefore(defs, svg.firstChild);
        }
        
        let gradient = defs.querySelector('#timer-gradient');
        if (!gradient) {
            gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.id = 'timer-gradient';
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '100%');
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', '#00ffcc');
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', '#0099ff');
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
        }
        
        // تطبيق التدرج على دوائر التقدم
        const progressCircles = document.querySelectorAll('.progress-ring-fill');
        progressCircles.forEach(circle => {
            circle.setAttribute('stroke', 'url(#timer-gradient)');
        });
    }
}

function addResponsiveCSS() {
    const style = document.createElement('style');
    style.textContent = `
        /* تحسينات الـ Responsiveness */
        @media (max-width: 320px) {
            .timer-circle {
                width: 220px !important;
                height: 220px !important;
            }
            
            .time-display {
                font-size: 2.5rem !important;
            }
            
            .activity {
                min-width: 100px !important;
            }
            
            .control-btn {
                padding: 0.5rem !important;
                font-size: 0.75rem !important;
            }
        }
        
        @media (max-width: 375px) {
            .timer-circle {
                width: 240px !important;
                height: 240px !important;
            }
            
            .time-display {
                font-size: 2.75rem !important;
            }
            
            .boosters-grid {
                grid-template-columns: 1fr !important;
            }
        }
        
        @media (min-width: 768px) {
            .app-container {
                max-width: 768px !important;
                margin: 0 auto !important;
                border-left: 1px solid rgba(255, 255, 255, 0.1) !important;
                border-right: 1px solid rgba(255, 255, 255, 0.1) !important;
            }
        }
        
        /* منع التمرير الأفقي للصفحة */
        html, body {
            overflow-x: hidden !important;
            max-width: 100% !important;
        }
        
        /* السماح بالتمرير الأفقي فقط للعناصر المحددة */
        .activities-scroll,
        .tips-scroll {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
        }
        
        /* إخفاء شريط التمرير في العناصر */
        .activities-scroll::-webkit-scrollbar,
        .tips-scroll::-webkit-scrollbar {
            height: 4px !important;
        }
        
        .activities-scroll::-webkit-scrollbar-track,
        .tips-scroll::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1) !important;
            border-radius: 2px !important;
        }
        
        .activities-scroll::-webkit-scrollbar-thumb,
        .tips-scroll::-webkit-scrollbar-thumb {
            background: rgba(0, 255, 204, 0.3) !important;
            border-radius: 2px !important;
        }
        
        /* تحسينات للمس */
        button, .activity, .booster, .nav-item {
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
        }
        
        /* تحسين التحميل */
        .app-container {
            opacity: 0;
            animation: fadeIn 0.5s ease forwards !important;
        }
        
        @keyframes fadeIn {
            to {
                opacity: 1;
            }
        }
        
        /* تحسينات وضع التركيز */
        .focus-mode-active {
            overflow: hidden !important;
        }
        
        .focus-overlay.active {
            animation: fadeIn 0.3s ease !important;
        }
        
        /* تحسينات الصوت والاهتزاز */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// معالجة أخطاء التطبيق
window.addEventListener('error', (e) => {
    console.error('📱 خطأ في التطبيق:', e.error);
    
    // عرض رسالة خطأ ودية
    showToast(MobileState.language === 'ar'
        ? 'حصل خطأ بسيط. جاري إعادة التحميل...'
        : 'Minor error. Reloading...');
    
    // محاولة الاسترداد
    setTimeout(() => {
        try {
            location.reload();
        } catch (reloadError) {
            console.error('فشل إعادة التحميل:', reloadError);
        }
    }, 3000);
});

// معالجة زر الرجوع في Android
window.addEventListener('popstate', (e) => {
    if (mobileDOM.focusOverlay && mobileDOM.focusOverlay.classList.contains('active')) {
        e.preventDefault();
        showToast(MobileState.language === 'ar'
            ? 'مينفعش تخرج من مود التركيز!'
            : 'Can\'t exit focus mode!');
    }
});

// إيقاف المؤقت عند خروج التطبيق للخلفية
document.addEventListener('visibilitychange', () => {
    if (document.hidden && MobileState.isTimerRunning) {
        // الإيقاف التلقائي بعد 30 ثانية في الخلفية
        const pauseTimeout = setTimeout(() => {
            if (document.hidden && MobileState.isTimerRunning) {
                pauseMobileTimer();
                showToast(MobileState.language === 'ar'
                    ? 'التايمر اتوقف عشان التطبيق كان في الخلفية'
                    : 'Timer paused because app was in background');
            }
        }, 30000);
        
        // تنظيف المؤقت عندما يعود التطبيق للواجهة
        document.addEventListener('visibilitychange', function cleanup() {
            if (!document.hidden) {
                clearTimeout(pauseTimeout);
                document.removeEventListener('visibilitychange', cleanup);
            }
        }, { once: true });
    }
});

// إضافة حدث لتحميل الصفحة بالكامل
window.addEventListener('load', () => {
    console.log('📱 تم تحميل الصفحة بالكامل');
    
    // تحديث الوقت الحالي فوراً
    updateCurrentTime();
    
    // تحديث مؤشر البطارية
    updateBatteryIndicator();
});