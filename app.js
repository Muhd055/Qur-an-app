document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SETUP & SELECTIONS ---
    const app = {
        main: document.getElementById('main-content'),
        nav: document.getElementById('bottom-nav'),
        screens: document.querySelectorAll('.screen'),
        navItems: document.querySelectorAll('.nav-item'),
        sliders: document.querySelectorAll('.slider'),
        tabContainers: document.querySelectorAll('.tabs'),
        surahListItems: document.querySelectorAll('.surah-list li'),
        quranContentDisplay: document.querySelector('.quran-reading-screen .quran-content'), // Renamed for clarity
        quranReadingTitle: document.querySelector('.quran-reading-screen .screen-title'),
        quranReadingAyahCount: document.querySelector('.quran-reading-screen .reading-footer p'),
        hasanatCounter: document.querySelector('.quran-reading-screen .hasanat-counter p'), // Specific to reading screen
        reactionBtns: document.querySelectorAll('.reaction-btn'),
        heatmap: document.querySelector('.heatmap'),
        forms: document.querySelectorAll('form'),
        prayerCard: document.querySelector('.prayer-card'),
        prayerDetails: document.getElementById('prayer-details'),
        quizOptions: document.querySelectorAll('.quiz-question .quiz-option'),
        quizContinueBtn: document.querySelector('.quiz-screen .btn-primary'),
        surahSelect: document.getElementById('surah-select'), // Focus mode surah selector
        focusActiveAyahDisplay: document.querySelector('.focus-active-screen .arabic-text') // Display for focused ayah
    };
    let focusTimerInterval;
    let selectedQuizOption = null;
    let selectedFocusSurahName = 'Al-Fatihah'; // Stores the selected Surah name for Focus mode
    let currentHasanat = 0; // Global hasanat for the quran reading screen

    // --- MOCK DATA ---
    const surahData = {
        'Al-Fatihah': {
            arabicName: 'الفاتحة',
            ayahs: [
                'بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ',
                'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾',
                'الرَّحْمَـٰنِ الرَّحِيمِ ﴿٣﴾',
                'مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾',
                'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾',
                'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾',
                'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾'
            ],
            ayahCount: 7
        },
        'Al-Baqarah': {
            arabicName: 'البقرة',
            ayahs: [
                'بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ',
                'الٓمٓ ﴿١﴾',
                'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِّلْمُتَّقِينَ ﴿٢﴾',
                'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ ﴿٣﴾'
            ],
            ayahCount: 286 // Full count for display
        }
    };
    
    // --- 2. CORE FUNCTIONS ---
    
    /**
     * The main function for switching between screens.
     * @param {string} screenClass - The class name of the screen to show.
     * @param {string} surahName - Optional: Name of the surah to display in quran-reading-screen.
     */
    const showScreen = (screenClass, surahName = 'Al-Fatihah') => {
        clearInterval(focusTimerInterval);

        const targetScreen = document.querySelector(`.${screenClass}`);
        if (!targetScreen) return;

        app.screens.forEach(s => s.classList.remove('active'));
        targetScreen.classList.add('active');

        const isNavVisible = targetScreen.dataset.nav === 'true';
        app.nav.style.display = isNavVisible ? 'flex' : 'none';
        app.main.style.padding = isNavVisible ? '20px' : '0';

        const page = screenClass.replace('-screen', '');
        app.navItems.forEach(n => n.classList.remove('active'));
        const activeNavItem = app.nav.querySelector(`.nav-item[data-page="${page}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        // Screen-specific initialization
        if (screenClass === 'focus-active-screen') {
            startFocusTimer();
            if (app.focusActiveAyahDisplay) {
                app.focusActiveAyahDisplay.textContent = surahData[selectedFocusSurahName].ayahs[0]; // Display first ayah of selected surah
            }
        }
        if (screenClass === 'progress-screen') generateHeatmap();
        if (screenClass === 'quran-reading-screen') updateQuranReadingScreen(surahName);
    };

    /**
     * Updates the content of the quran-reading-screen based on the selected surah.
     * @param {string} surahName The name of the surah to display.
     */
    const updateQuranReadingScreen = (surahName) => {
        const surah = surahData[surahName];
        if (!surah) {
            app.quranReadingTitle.textContent = 'Error';
            app.quranContentDisplay.innerHTML = '<p class="arabic-text">Surah not found.</p>';
            app.quranReadingAyahCount.textContent = 'Ayah 0 / 0';
            currentHasanat = 0;
            app.hasanatCounter.textContent = `+${currentHasanat} Hasanat 📿`;
            return;
        }

        app.quranReadingTitle.textContent = surahName;
        app.quranContentDisplay.innerHTML = surah.ayahs.map(ayah => `<p class="arabic-text">${ayah}</p>`).join('');
        app.quranReadingAyahCount.textContent = `Ayah ${surah.ayahs.length} / ${surah.ayahCount}`;
        currentHasanat = 0; // Reset hasanat for new surah
        app.hasanatCounter.textContent = `+${currentHasanat} Hasanat 📿`;

        // Reset scroll position
        if (app.quranContentDisplay) {
            app.quranContentDisplay.scrollTop = 0;
        }
    };

    /**
     * Starts the countdown timer for the focus session.
     */
    const startFocusTimer = () => {
        const timerDisplay = document.querySelector('.focus-timer p');
        const slider = document.querySelector('.focus-setup-screen #time .slider');
        let time = (slider ? parseInt(slider.value, 10) : 15) * 60;

        focusTimerInterval = setInterval(() => {
            time--;
            const minutes = Math.floor(time / 60).toString().padStart(2, '0');
            const seconds = (time % 60).toString().padStart(2, '0');
            
            if (timerDisplay) timerDisplay.textContent = `${minutes}:${seconds}`;

            if (time <= 0) {
                clearInterval(focusTimerInterval);
                showScreen('focus-complete-screen');
            }
        }, 1000);
    };

    /**
     * Generates a random heatmap for the progress screen.
     */
    const generateHeatmap = () => {
        if (app.heatmap) {
            app.heatmap.innerHTML = '';
            for (let i = 0; i < 84; i++) {
                const cell = document.createElement('div');
                cell.classList.add('heatmap-cell');
                if (Math.random() > 0.6) {
                    cell.style.backgroundColor = `rgba(13, 115, 119, ${Math.random() * 0.7 + 0.3})`;
                }
                app.heatmap.appendChild(cell);
            }
        }
    };


    // --- 3. BIND EVENT LISTENERS ---

    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('[data-target]');
        if (target) {
            e.preventDefault();
            // Special handling for quiz continue button
            if (target === app.quizContinueBtn && !selectedQuizOption) {
                alert('Please select an option to continue.');
                return;
            }
            showScreen(target.dataset.target);
        }
    });

    app.nav.addEventListener('click', (e) => {
        const navItem = e.target.closest('.nav-item');
        if (navItem?.dataset.page) {
            e.preventDefault();
            showScreen(`${navItem.dataset.page}-screen`);
        }
    });

app.forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nextScreen = form.dataset.next || 'home-screen';
        showScreen(nextScreen);
    });
});

    app.tabContainers.forEach(container => {
        container.addEventListener('click', (e) => {
            const link = e.target.closest('.tab-link');
            if (link?.dataset.tab) {
                const parent = link.closest('.screen') || link.closest('.focus-section');
                container.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                parent.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.toggle('active', content.id === link.dataset.tab);
                });
            }
        });
    });
    
    app.sliders.forEach(slider => {
        const valueDisplay = slider.nextElementSibling;
        const unit = valueDisplay.textContent.includes('min') ? ' min' : ' pages';
        valueDisplay.textContent = slider.value + unit;
        slider.addEventListener('input', (e) => {
            valueDisplay.textContent = e.target.value + unit;
        });
    });

    app.reactionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const icon = btn.querySelector('ion-icon');
            const name = icon.getAttribute('name');
            if (name.includes('outline')) {
                icon.setAttribute('name', name.replace('-outline', ''));
                btn.style.color = 'var(--accent-color)';
            } else {
                icon.setAttribute('name', name + '-outline');
                btn.style.color = '#888';
            }
        });
    });
    
    if (app.quranContentDisplay && app.hasanatCounter) { // Changed selector here
        app.quranContentDisplay.addEventListener('scroll', () => {
            if (app.quranContentDisplay.scrollTop > 0) {
                currentHasanat += 10;
                app.hasanatCounter.textContent = `+${currentHasanat} Hasanat 📿`;
            }
        });
    }

    // Prayer Card interactivity
    if (app.prayerCard) {
        app.prayerCard.addEventListener('click', () => {
            app.prayerCard.classList.toggle('expanded');
            app.prayerDetails.classList.toggle('hidden');
        });
    }

    // Quiz options interactivity
    if (app.quizOptions.length > 0) {
        app.quizOptions.forEach(option => {
            option.addEventListener('click', () => {
                app.quizOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                selectedQuizOption = option.dataset.value;
            });
        });
    }

    // Surah selection for Focus Mode
    if (app.surahSelect) {
        app.surahSelect.addEventListener('change', (e) => {
            selectedFocusSurahName = e.target.options[e.target.selectedIndex].textContent;
        });
    }

    // Surah list item click in quran-index-screen
    app.surahListItems.forEach(item => {
        item.addEventListener('click', () => {
            const surahName = item.querySelector('.surah-name p').textContent;
            showScreen('quran-reading-screen', surahName);
        });
    });


    // --- 4. INITIALIZE APP ---
    setTimeout(() => {
        showScreen('welcome-screen');
    }, 1500);
});
