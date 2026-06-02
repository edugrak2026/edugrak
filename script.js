// Initial State & Static Data
const API_URL = "https://database-edugrak.vercel.app/api"; // Menggunakan IP agar cocok dengan 127.0.0.1:5500
let currentUser = null;
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"; 

const INDONESIA_REGIONS = {
    "Jawa Barat": ["Bandung", "Bekasi", "Depok", "Bogor", "Tasikmalaya", "Cimahi", "Sukabumi", "Cirebon", "Sumedang", "Garut", "Cianjur"],
    "Jawa Tengah": ["Semarang", "Surakarta", "Magelang", "Pekalongan", "Salatiga", "Tegal", "Banyumas", "Cilacap", "Kebumen"],
    "Jawa Timur": ["Surabaya", "Malang", "Batu", "Blitar", "Kediri", "Madiun", "Mojokerto", "Pasuruan", "Probolinggo", "Sidoarjo", "Gresik", "Banyuwangi"],
    "DKI Jakarta": ["Jakarta Pusat", "Jakarta Utara", "Jakarta Timur", "Jakarta Selatan", "Jakarta Barat"],
    "Banten": ["Tangerang", "Serang", "Cilegon", "Tangerang Selatan", "Lebak", "Pandeglang"],
    "DI Yogyakarta": ["Yogyakarta", "Sleman", "Bantul", "Gunungkidul", "Kulon Progo"],
    "Sumatera Utara": ["Medan", "Binjai", "Pematangsiantar", "Tanjungbalai", "Tebing Tinggi"],
    "Sumatera Barat": ["Padang", "Bukittinggi", "Payakumbuh", "Solok"],
    "Riau": ["Pekanbaru", "Dumai"],
    "Kepulauan Riau": ["Batam", "Tanjung Pinang"],
    "Jambi": ["Jambi"],
    "Sumatera Selatan": ["Palembang", "Lubuklinggau", "Prabumulih"],
    "Bengkulu": ["Bengkulu"],
    "Lampung": ["Bandar Lampung", "Metro"],
    "Bali": ["Denpasar", "Badung", "Gianyar", "Tabanan"],
    "Sulawesi Selatan": ["Makassar", "Parepare", "Palopo"],
    "Sulawesi Utara": ["Manado", "Bitung", "Tomohon"],
    "Kalimantan Timur": ["Samarinda", "Balikpapan", "Bontang"],
    "Kalimantan Selatan": ["Banjarmasin", "Banjarbaru"],
    "Kalimantan Barat": ["Pontianak", "Singkawang"]
};

const DEFAULT_DATA = {
    videos: [
        { id: 1, title: "Strategi Literasi Bahasa Indonesia - Memahami Ide Pokok", subject: "LBI", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: "12:45", description: "Pelajari cara cepat menemukan ide pokok dalam teks panjang untuk UTBK.", tags: ["#lbi", "#utbk"] },
        { id: 2, title: "Pengetahuan Kuantitatif: Trik Cepat Aljabar", subject: "PK", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: "15:20", description: "Kumpulan rumus praktis aljabar yang sering muncul di ujian.", tags: ["#pk", "#matematika"] }
    ],
    questionsBank: {
        'Bedah Materi': {
            'LBI': {
                'Ejaan': [
                    { q: "Manakah penulisan kata baku yang benar?", a: ["Apotik", "Apotek", "Analisa", "Praktek"], correct: 1, explain: "Kata baku yang benar menurut KBBI adalah Apotek, Analisis, dan Praktik." }
                ],
                'Kalimat Efektif': [
                    { q: "Kalimat manakah yang merupakan kalimat efektif?", a: ["Bagi semua siswa diharapkan hadir.", "Semua siswa diharapkan hadir.", "Untuk para siswa-siswa sekalian.", "Kehadiran daripada siswa sangat penting."], correct: 1, explain: "Kalimat efektif tidak menggunakan kata depan yang mubazir." }
                ]
            },
            'PK': {
                'Aljabar': [
                    { q: "Jika 2x + 5 = 15, maka nilai x adalah...", a: ["2", "5", "10", "7"], correct: 1, explain: "2x = 15 - 5 => 2x = 10 => x = 5." }
                ]
            }
        },
        'Soal Paket': {
            'all': {
                'Paket Tryout 1': [
                    { q: "[PAKET 1] Apa lawan kata dari 'Progresif'?", a: ["Statis", "Aktif", "Pasif", "Lambat"], correct: 0, explain: "Lawan kata progresif (maju) adalah statis (tetap/diam)." }
                ]
            }
        },
        'Kuis Kilat': {
            'all': {
                'Kuis Harian 1': [
                    { q: "[KUIS] Penulisan huruf kapital yang benar adalah...", a: ["Suku Jawa", "suku Jawa", "Suku jawa", "suku jawa"], correct: 1, explain: "Nama suku diawali kapital, namun kata 'suku' tidak." }
                ]
            }
        },
        'Arena TO': {
            'Tryout Nasional Akbar 2027': {
                'LBI': [
                    { q: "[ARENA TO] Manakah yang merupakan kelompok kata baku?", a: ["Izin, Ijasah, Aktif", "Ijin, Ijazah, Aktip", "Izin, Ijazah, Aktif", "Ijin, Ijasah, Aktif"], correct: 2, explain: "Kata baku yang benar adalah Izin (bukan Ijin), Ijazah (bukan Ijasah), dan Aktif (bukan Aktip)." }
                ],
                'PK': [
                    { q: "[ARENA TO] Hasil dari 0,75 + 1/4 adalah...", a: ["0,80", "1,00", "1,25", "1,50"], correct: 1, explain: "0,75 + 0,25 = 1,00." }
                ],
                'PPU': [
                    { q: "[ARENA TO] Sinonim dari kata 'Efisien' adalah...", a: ["Efektif", "Tepat Guna", "Hemat", "Cepat"], correct: 1, explain: "Efisien berarti tepat guna atau melakukan sesuatu dengan usaha minimum for hasil maksimum." }
                ]
            }
        }
    },
    latihanDetails: {
        'Bedah Materi': { 
            'LBI': [{ name: 'Ejaan', duration: 0 }, { name: 'Kalimat Efektif', duration: 0 }], 
            'PK': [{ name: 'Aljabar', duration: 0 }, { name: 'Aritmatika', duration: 0 }], 
            'default': [{ name: 'Topik 1', duration: 0 }, { name: 'Topik 2', duration: 0 }] 
        },
        'Soal Paket': { 'all': [{ name: 'Paket Tryout 1', duration: 0 }, { name: 'Paket Tryout 2', duration: 0 }] },
        'Kuis Kilat': { 'all': [{ name: 'Kuis Harian 1', duration: 60 }, { name: 'Kuis Tantangan', duration: 120 }] },
        'Arena TO': { 
            'all': [
                { 
                    name: 'Tryout Nasional Akbar 2027', 
                    duration: 1800, 
                    status: 'Published',
                    startDate: '2027-05-30',
                    endDate: '2027-06-05',
                    description: 'Sesuai standar terbaru BPPP dengan sistem penilaian IRT.'
                }
            ] 
        }
    },
    subtesData: [
        { id: 'PU', name: 'Penalaran Umum', icon: '🧠', color: 'indigo' },
        { id: 'PBM', name: 'Pemahaman Bacaan & Menulis', icon: '📝', color: 'emerald' },
        { id: 'PPU', name: 'Pengetahuan & Pemahaman Umum', icon: '📖', color: 'cyan' },
        { id: 'PK', name: 'Pengetahuan Kuantitatif', icon: '📊', color: 'amber' },
        { id: 'LBI', name: 'Literasi Bahasa Indonesia', icon: '🇮🇩', color: 'emerald' },
        { id: 'LBE', name: 'Literasi Bahasa Inggris', icon: '🇬🇧', color: 'rose' },
        { id: 'PM', name: 'Penalaran Matematika', icon: 'Σ', color: 'indigo' }
    ],
    leaderboards: {
        'Tryout Nasional Akbar 2027': {
            nasional: [
                { name: 'Achmad Yusuf', score: 845, region: 'Jawa Timur', rank: 1 },
                { name: 'Siti Aminah', score: 832, region: 'DKI Jakarta', rank: 2 },
                { name: 'Budi Santoso', score: 815, region: 'Jawa Barat', rank: 3 }
            ],
            provinsi: [
                { name: 'Achmad Yusuf', score: 845, region: 'Malang', rank: 1 },
                { name: 'Dewi Lestari', score: 790, region: 'Surabaya', rank: 2 }
            ],
            kota: [
                { name: 'Achmad Yusuf', score: 845, region: 'Kec. Lowokwaru', rank: 1 },
                { name: 'Gani Rahman', score: 730, region: 'Kec. Klojen', rank: 2 }
            ]
        }
    },
    users: [] // Store registered users here
};

// Initialize appData from Server or DEFAULT_DATA
let appData = DEFAULT_DATA;

async function initAppData() {
    try {
        const response = await fetch(`${API_URL}/appdata`);
        const data = await response.json();
        if (data && Object.keys(data).length > 5) { // Ensure it's not an empty object
            appData = data;
            console.log('AppData loaded from server');
        } else {
            // If server is empty, initialize it with DEFAULT_DATA
            await saveData();
        }
        refreshDerivedData();
        renderDynamicFilters();
    } catch (err) {
        console.error('Error loading AppData from server:', err);
        // Fallback to local storage or default data
        const localData = localStorage.getItem('edugrakAppData');
        if (localData) appData = JSON.parse(localData);
        refreshDerivedData();
        renderDynamicFilters();
    }
}

// Call init on load
initAppData();

// Save data helper
async function saveData() {
    // Save locally for backup
    localStorage.setItem('edugrakAppData', JSON.stringify(appData));
    
    // Save to Server
    try {
        await fetch(`${API_URL}/appdata`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appData)
        });
        console.log('AppData synced to server');
    } catch (err) {
        console.error('Error syncing AppData to server:', err);
    }
    
    // Update derived variables
    refreshDerivedData();
}

function refreshDerivedData() {
    videoData = appData.videos;
    questionsBank = appData.questionsBank;
    latihanDetails = appData.latihanDetails;
    subtesData = appData.subtesData;
    allLeaderboards = appData.leaderboards;
    
    // Update dynamic UI elements
    renderDynamicFilters();
}

function renderDynamicFilters() {
    // 1. Update Video Filters in Materi Tab
    const filterContainer = document.getElementById('filter-container');
    if (filterContainer) {
        let html = `
            <button class="filter-btn active w-full flex items-center justify-between p-4 rounded-2xl transition-all hover:bg-emerald-50 group" data-filter="all">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-[.active]:bg-emerald-600 group-[.active]:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25a2.25 2.25 0 01-2.25 2.25h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75A2.25 2.25 0 0121 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
                        </svg>
                    </div>
                    <span class="font-bold text-gray-700 group-[.active]:text-emerald-700">Semua</span>
                </div>
                <span class="text-xs font-bold text-gray-400 group-[.active]:text-emerald-500" id="count-all">${videoData.length}</span>
            </button>
        `;

        subtesData.forEach(s => {
            const count = videoData.filter(v => v.subject === s.id).length;
            html += `
                <button class="filter-btn w-full flex items-center justify-between p-4 rounded-2xl transition-all hover:bg-emerald-50 group" data-filter="${s.id}">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center group-[.active]:bg-emerald-600 group-[.active]:text-white transition-colors">
                            <span class="text-sm font-bold">${s.id}</span>
                        </div>
                        <span class="font-bold text-gray-500 group-[.active]:text-emerald-700">${s.name}</span>
                    </div>
                    <span class="text-xs font-bold text-gray-300 group-[.active]:text-emerald-500" id="count-${s.id.toLowerCase()}">${count}</span>
                </button>
            `;
        });
        filterContainer.innerHTML = html;

        // Re-attach event listeners
        filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.onclick = () => {
                filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderVideos(btn.getAttribute('data-filter'));
            };
        });
    }

    // 2. Update Arena TO Packages
    const arenaPackageList = document.getElementById('arena-package-list');
    if (arenaPackageList) {
        arenaPackageList.innerHTML = '';
        const toPackages = appData.latihanDetails['Arena TO']?.['all'] || [];
        const publishedTO = toPackages.filter(p => p.status === 'Published');

        if (publishedTO.length === 0) {
            arenaPackageList.innerHTML = '<div class="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 text-center text-gray-400 font-medium">Belum ada Tryout Nasional yang aktif.</div>';
        } else {
            publishedTO.forEach(p => {
                // Calculate status
                let statusLabel = "Sedang Berlangsung";
                let statusClass = "bg-emerald-100 text-emerald-700";
                let buttonClass = "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100";
                let buttonText = "Ikuti Sekarang";
                let isGray = false;

                const now = new Date();
                const start = new Date(p.startDate);
                const end = new Date(p.endDate);
                start.setHours(0, 0, 0, 0);
                end.setHours(23, 59, 59, 999);
                
                const storedUser = currentUser ? appData.users.find(u => u.email === currentUser.email) : null;
                const hasAttempted = storedUser?.toAttempts?.[p.name];

                if (now < start) {
                    statusLabel = "Akan Datang";
                    statusClass = "bg-gray-100 text-gray-500";
                    buttonClass = "bg-gray-200 text-gray-400 cursor-not-allowed";
                    buttonText = "Belum Dibuka";
                    isGray = true;
                } else if (now > end) {
                    statusLabel = "Sudah Berakhir";
                    statusClass = "bg-gray-100 text-gray-500";
                    buttonClass = "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100";
                    buttonText = "Lihat Hasil";
                    isGray = false;
                } else if (hasAttempted) {
                    statusLabel = "Selesai";
                    statusClass = "bg-emerald-100 text-emerald-700";
                    buttonClass = "bg-gray-200 text-gray-400 cursor-not-allowed";
                    buttonText = "Menunggu Pengumuman";
                    isGray = true;
                }

                const isEnded = now > end;
                const btnAction = isEnded ? `showResultOptions('${p.name}')` : `startArenaTO('${p.name}')`;

                const div = document.createElement('div');
                div.className = `bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 relative overflow-hidden group ${isGray ? 'opacity-60' : ''}`;
                div.innerHTML = `
                    <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        <div>
                            <div class="flex items-center space-x-3">
                                <span class="px-3 py-1 ${statusClass} rounded-lg text-[10px] font-black uppercase">${statusLabel}</span>
                                ${p.isPremium ? '<span class="px-3 py-1 bg-amber-100 text-amber-600 rounded-lg text-[10px] font-black uppercase shadow-sm">PRO</span>' : ''}
                            </div>
                            <h3 class="text-3xl font-black text-gray-900 mt-4">${p.name}</h3>
                            <p class="text-gray-500 mt-2 font-medium">${p.description || 'Sesuai standar terbaru BPPP dengan sistem penilaian IRT.'}</p>
                            <div class="flex flex-wrap gap-4 mt-6">
                                <div class="flex items-center text-sm text-gray-400 font-bold">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    ${p.startDate ? formatDateRange(p.startDate, p.endDate) : 'Tanggal belum ditentukan'}
                                </div>
                                <div class="flex items-center text-sm text-gray-400 font-bold">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    ${p.durationText || '3 Jam 5 Menit'}
                                </div>
                            </div>
                        </div>
                        <button ${isGray ? 'disabled' : `onclick="${btnAction}"`} class="px-8 py-4 ${buttonClass} rounded-2xl font-black transition-all shadow-xl whitespace-nowrap">
                            ${buttonText}
                        </button>
                    </div>
                `;
                arenaPackageList.appendChild(div);
            });
        }
    }
}

// Variables derived from appData for existing logic
let videoData, questionsBank, latihanDetails, subtesData, allLeaderboards;
refreshDerivedData();
renderDynamicFilters();

let score = 0;
let correctCountTotal = 0;
let wrongCountTotal = 0;
let targetCount = 100;

// DOM Elements
const scoreEl = document.getElementById('current-score');
const correctEl = document.getElementById('correct-count');
const wrongEl = document.getElementById('wrong-count');
const solvedEl = document.getElementById('solved-count');
const targetProgressEl = document.getElementById('target-progress');
const percentCorrectBar = document.getElementById('percent-correct-bar');
const percentWrongBar = document.getElementById('percent-wrong-bar');
const progressCircle = document.getElementById('progress-circle');

const dashboardContent = document.getElementById('dashboard-content');
const materiContent = document.getElementById('materi-content');
const latihanContent = document.getElementById('latihan-content');
const arenaContent = document.getElementById('arena-content');
const arenaLobbyContent = document.getElementById('arena-lobby-content');
const subtestCompletionScreen = document.getElementById('subtest-completion-screen');
const quizInterface = document.getElementById('quiz-interface');
const analysisContent = document.getElementById('analysis-content');

// Dynamic Exercise Type Rendering
function renderExerciseTypes() {
    const container = document.getElementById('latihan-type-container');
    if (!container) return;
    
    container.innerHTML = '';
    const types = Object.keys(questionsBank);
    
    const defaultIcons = { 'Bedah Materi': '📖', 'Soal Paket': '📝', 'Kuis Kilat': '⚡', 'Arena TO': '🏆' };
    const defaultColors = { 'Bedah Materi': 'emerald', 'Soal Paket': 'rose', 'Kuis Kilat': 'amber', 'Arena TO': 'indigo' };
    const defaultActions = { 'Bedah Materi': 'Mulai Latihan', 'Soal Paket': 'Buka Paket', 'Kuis Kilat': 'Main Sekarang', 'Arena TO': 'Ikuti TO' };

    types.forEach(type => {
        if (type === 'Arena TO') return; // Arena TO has its own section

        const config = appData.exerciseConfigs?.[type] || {};
        const icon = config.icon || defaultIcons[type] || '📚';
        const color = defaultColors[type] || 'emerald';
        const action = defaultActions[type] || 'Mulai Sekarang';
        const desc = config.desc || 'Latihan soal interaktif.';
        const isPremium = config.isPremium || false;

        const card = document.createElement('div');
        card.className = 'latihan-type-card group cursor-pointer';
        card.setAttribute('data-type', type);
        card.innerHTML = `
            <div class="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 h-full transition-all duration-500 hover:shadow-2xl hover:shadow-${color}-900/10 hover:-translate-y-2 relative overflow-hidden">
                <div class="absolute -right-4 -top-4 w-32 h-32 bg-${color}-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <div class="relative z-10">
                    <div class="w-16 h-16 bg-${color}-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-${color}-200 text-3xl">
                        ${icon.length > 2 ? icon : icon}
                    </div>
                    <div class="flex items-center space-x-3 mb-2">
                        <h3 class="text-2xl font-black text-gray-900">${type}</h3>
                        ${isPremium ? '<span class="px-2 py-0.5 bg-amber-100 text-amber-600 text-[8px] font-black rounded-md uppercase">PRO</span>' : ''}
                    </div>
                    <p class="text-gray-500 text-sm font-medium">${desc}</p>
                </div>
                <div class="mt-8 flex items-center text-${color}-600 font-bold text-sm">
                    <span>${action}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </div>
            </div>
        `;
        
        card.onclick = () => {
            // Premium Check
            if (isPremium && (!currentUser || !currentUser.isPremium)) {
                showNotification({
                    title: 'Kategori Premium',
                    message: `${type} adalah fitur eksklusif untuk member Premium. Upgrade sekarang!`,
                    type: 'confirm',
                    confirmText: 'Upgrade Premium',
                    cancelText: 'Nanti Saja',
                    onConfirm: openPremiumModal
                });
                return;
            }

            currentQuiz.type = type;
            document.getElementById('selected-latihan-type').innerText = `(${type})`;
            latihanTypeContainer.classList.add('hidden');
            subtesSelectionContainer.classList.remove('hidden');
            setTimeout(() => {
                subtesSelectionContainer.classList.remove('opacity-0', 'translate-y-10');
                subtesSelectionContainer.classList.add('opacity-100', 'translate-y-0');
            }, 10);
            renderSubtesGrid();
        };
        
        container.appendChild(card);
    });
}

// Navigation Elements
const navDashboard = document.getElementById('nav-dashboard');
const navMateri = document.getElementById('nav-materi');
const navLatihan = document.getElementById('nav-latihan');
const navArena = document.getElementById('nav-arena');

const quizTimerEl = document.getElementById('quiz-timer');
const timerContainer = document.getElementById('timer-container');
const questionTextEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const quizProgressText = document.getElementById('quiz-progress-text');
const quizNavGrid = document.getElementById('quiz-nav-grid');

const latihanTypeContainer = document.getElementById('latihan-type-container');
const subtesSelectionContainer = document.getElementById('subtes-selection-container');
const itemSelectionContainer = document.getElementById('item-selection-container');
const subtesGrid = document.getElementById('subtes-grid');
const itemGrid = document.getElementById('item-grid');

// Quiz State
let currentQuiz = {
    questions: [],
    currentIdx: 0,
    answers: [],
    timer: null,
    timeLeft: 0,
    startTime: 0,
    type: '',
    subtes: '',
    arenaProgress: {
        packageName: null,
        completedSubtests: [],
        allSubtests: [],
        totalDuration: 0,
        subtestResults: {} // To store results per subtest for IRT later
    }
};

const arenaDetailedResults = document.getElementById('arena-detailed-results');
const arenaSubtestDiscussionSelection = document.getElementById('arena-subtest-discussion-selection');

// Landing Page Logic
const landingContent = document.getElementById('landing-content');

function showLoginModal(targetTab = 'dashboard') {
    if (currentUser) {
        switchTab(targetTab);
        return;
    }
    authContent.classList.remove('hidden');
    // Store target tab to navigate after login if needed
    authContent.dataset.targetTab = targetTab;
}

function hideLoginModal() {
    authContent.classList.add('hidden');
}

// Global Navigation
function hideAllSections() {
    const registerModal = document.getElementById('register-modal');
    [landingContent, dashboardContent, materiContent, latihanContent, arenaContent, arenaLobbyContent, subtestCompletionScreen, quizInterface, analysisContent, arenaDetailedResults, arenaSubtestDiscussionSelection, registerModal].forEach(c => {
        if (c) {
            c.classList.add('hidden');
            c.classList.remove('flex');
        }
    });
}

function switchTab(tab) {
    // Refresh appData from localStorage whenever switching tabs to ensure synchronization
    appData = JSON.parse(localStorage.getItem('edugrakAppData')) || DEFAULT_DATA;
    refreshDerivedData();

    hideAllSections();
    
    // Reset nav buttons
    document.querySelectorAll('nav button').forEach(b => {
        b.className = 'text-gray-500 hover:text-gray-700 font-medium';
    });
    
    if (tab === 'landing') {
        if (landingContent) landingContent.classList.remove('hidden');
        return;
    }

    // Ensure landing is hidden when any other tab is shown
    if (landingContent) landingContent.classList.add('hidden');

    if (tab === 'dashboard') {
        dashboardContent.classList.remove('hidden');
        document.getElementById('nav-dashboard').className = 'text-emerald-600 font-bold border-b-2 border-emerald-600 pb-1';
        renderDashboardStats();
    } else if (tab === 'materi') {
        materiContent.classList.remove('hidden');
        document.getElementById('nav-materi').className = 'text-emerald-600 font-bold border-b-2 border-emerald-600 pb-1';
        renderVideos('all');
    } else if (tab === 'latihan') {
        latihanContent.classList.remove('hidden');
        document.getElementById('nav-latihan').className = 'text-emerald-600 font-bold border-b-2 border-emerald-600 pb-1';
        resetLatihanView();
    } else if (tab === 'arena') {
        arenaContent.classList.remove('hidden');
        document.getElementById('nav-arena').className = 'text-emerald-600 font-bold border-b-2 border-emerald-600 pb-1';
        renderLeaderboard('nasional');
    }
}

function renderDashboardStats() {
    // Update total solved questions and score on dashboard if they exist
    if (scoreEl) scoreEl.innerText = score;
    if (correctEl) correctEl.innerText = correctCountTotal;
    if (wrongEl) wrongEl.innerText = wrongCountTotal;
    if (solvedEl) solvedEl.innerText = correctCountTotal + wrongCountTotal;
}

navDashboard.onclick = () => switchTab('dashboard');
navMateri.onclick = () => switchTab('materi');
navLatihan.onclick = () => {
    switchTab('latihan');
    latihanTypeContainer.classList.remove('hidden');
    subtesSelectionContainer.classList.add('hidden');
    itemSelectionContainer.classList.add('hidden');
    renderExerciseTypes();
};
navArena.onclick = () => {
    switchTab('arena');
    renderLeaderboard('nasional');
};

// Remove or comment out the old hardcoded button listener
/*
document.getElementById('btn-start-arena-to').onclick = () => {
    currentQuiz.type = 'Arena TO';
    currentQuiz.subtes = 'all';
    showNotification({
        title: 'Mulai Tryout Nasional?',
        message: 'Kamu akan memasuki Arena TO. Waktu akan berjalan secara otomatis dan hasil akan masuk ke Leaderboard Nasional.',
        confirmText: 'Masuk Arena',
        cancelText: 'Kembali',
        type: 'confirm',
        onConfirm: () => startQuiz({ name: 'Tryout Nasional Akbar 2027', duration: 1800 }) // 30 Menit
    });
}
*/

let currentLeaderboardTO = 'Tryout Nasional Akbar 2027';

function renderLeaderboard(scope) {
    const list = document.getElementById('leaderboard-list');
    if (!list) return;
    list.innerHTML = '';
    
    document.getElementById('leaderboard-to-name').innerText = currentLeaderboardTO;
    const data = allLeaderboards[currentLeaderboardTO][scope];
    
    data.forEach(user => {
        const div = document.createElement('div');
        div.className = 'flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group';
        div.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-7 h-7 rounded-lg ${user.rank <= 3 ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-400'} flex items-center justify-center text-[10px] font-black">
                    ${user.rank}
                </div>
                <div>
                    <h5 class="text-xs font-black text-gray-900 leading-none">${user.name}</h5>
                    <p class="text-[8px] text-gray-400 font-bold mt-1 uppercase tracking-wider">${user.region}</p>
                </div>
            </div>
            <div class="text-right">
                <span class="text-xs font-black text-emerald-600">${user.score}</span>
            </div>
        `;
        list.appendChild(div);
    });
}

// Leaderboard Filter Logic
document.querySelectorAll('#leaderboard-filter button').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('#leaderboard-filter button').forEach(b => {
            b.className = 'px-3 py-1.5 text-[10px] font-black rounded-lg transition-all text-gray-400 hover:text-gray-600';
        });
        btn.className = 'px-3 py-1.5 text-[10px] font-black rounded-lg transition-all active bg-white shadow-sm text-emerald-600';
        renderLeaderboard(btn.getAttribute('data-scope'));
    };
});

// Latihan Logic
function resetLatihanView() {
    latihanTypeContainer.classList.remove('hidden');
    latihanTypeContainer.classList.add('grid');
    [subtesSelectionContainer, itemSelectionContainer].forEach(c => {
        c.classList.add('hidden');
        c.classList.remove('opacity-100', 'translate-y-0');
        c.classList.add('opacity-0', 'translate-y-10');
    });
}

document.querySelectorAll('.latihan-type-card').forEach(card => {
    card.addEventListener('click', () => {
        const type = card.getAttribute('data-type');
        
        // Premium Check for Exercise Type
        const config = appData.exerciseConfigs?.[type];
        if (config?.isPremium && (!currentUser || !currentUser.isPremium)) {
            showNotification({
                title: 'Kategori Premium',
                message: `${type} adalah fitur eksklusif untuk member Premium. Upgrade sekarang untuk mengaksesnya!`,
                type: 'confirm',
                confirmText: 'Upgrade Premium',
                cancelText: 'Nanti Saja',
                onConfirm: openPremiumModal
            });
            return;
        }

        currentQuiz.type = type;
        document.getElementById('selected-latihan-type').innerText = `(${type})`;
        latihanTypeContainer.classList.add('hidden');
        subtesSelectionContainer.classList.remove('hidden');
        setTimeout(() => {
            subtesSelectionContainer.classList.remove('opacity-0', 'translate-y-10');
            subtesSelectionContainer.classList.add('opacity-100', 'translate-y-0');
        }, 10);
        renderSubtesGrid();
    });
});

function renderSubtesGrid() {
    subtesGrid.innerHTML = '';
    // Always fetch latest appData to ensure sync with admin
    appData = JSON.parse(localStorage.getItem('edugrakAppData')) || DEFAULT_DATA;
    refreshDerivedData();
    
    appData.subtesData.forEach(subtes => {
        const div = document.createElement('div');
        div.className = 'group cursor-pointer bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 text-center';
        div.innerHTML = `
            <div class="w-14 h-14 rounded-2xl bg-${subtes.color}-50 text-${subtes.color}-600 flex items-center justify-center mx-auto mb-4 text-2xl group-hover:bg-${subtes.color}-600 group-hover:text-white transition-all">
                ${subtes.icon}
            </div>
            <h4 class="font-bold text-gray-900 text-sm">${subtes.name}</h4>
        `;
        div.onclick = () => {
            currentQuiz.subtes = subtes.id;
            subtesSelectionContainer.classList.add('hidden');
            itemSelectionContainer.classList.remove('hidden');
            setTimeout(() => {
                itemSelectionContainer.classList.remove('opacity-0', 'translate-y-10');
                itemSelectionContainer.classList.add('opacity-100', 'translate-y-0');
            }, 10);
            document.getElementById('display-item-type').innerText = currentQuiz.type;
            document.getElementById('display-subtes-name').innerText = subtes.name;
            renderItemsGrid(subtes.id);
        };
        subtesGrid.appendChild(div);
    });
}

function formatDuration(seconds) {
    if (seconds < 60) {
        return `${seconds} Detik`;
    } else {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        if (remainingSeconds === 0) {
            return `${minutes} Menit`;
        }
        return `${minutes} Menit ${remainingSeconds} Detik`;
    }
}

function formatDateRange(start, end) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const s = new Date(start);
    const e = new Date(end);
    
    if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
        return `${s.getDate()} - ${e.getDate()} ${months[s.getMonth()]} ${s.getFullYear()}`;
    } else if (s.getFullYear() === e.getFullYear()) {
        return `${s.getDate()} ${months[s.getMonth()]} - ${e.getDate()} ${months[e.getMonth()]} ${s.getFullYear()}`;
    } else {
        return `${s.getDate()} ${months[s.getMonth()]} ${s.getFullYear()} - ${e.getDate()} ${months[e.getMonth()]} ${e.getFullYear()}`;
    }
}

// Universal Notification Logic
const uniModal = document.getElementById('universal-modal');
const uniModalContent = document.getElementById('uni-modal-content');
const uniModalIcon = document.getElementById('uni-modal-icon');
const uniModalTitle = document.getElementById('uni-modal-title');
const uniModalMsg = document.getElementById('uni-modal-msg');
const uniModalButtons = document.getElementById('uni-modal-buttons');

let uniModalTimeout = null;

function showNotification({ title, message, type = 'info', confirmText = 'Oke', cancelText = '', onConfirm = null }) {
    if (uniModalTimeout) {
        clearTimeout(uniModalTimeout);
        uniModalTimeout = null;
    }

    uniModalTitle.innerText = title;
    uniModalMsg.innerText = message;
    uniModalButtons.innerHTML = '';

    let iconHTML = '';
    let iconBg = '';
    if (type === 'confirm') {
        iconHTML = '<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        iconBg = 'bg-amber-100 text-amber-600';
    } else if (type === 'success') {
        iconHTML = '<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
        iconBg = 'bg-emerald-100 text-emerald-600';
    } else {
        iconHTML = '<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        iconBg = 'bg-emerald-100 text-emerald-600';
    }
    
    uniModalIcon.innerHTML = iconHTML;
    uniModalIcon.className = `w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 ${iconBg}`;

    const btnConfirm = document.createElement('button');
    btnConfirm.className = 'w-full py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100';
    btnConfirm.innerText = confirmText;
    btnConfirm.onclick = () => {
        closeUniModal();
        if (onConfirm) onConfirm();
    };
    uniModalButtons.appendChild(btnConfirm);

    if (cancelText) {
        const btnCancel = document.createElement('button');
        btnCancel.className = 'w-full py-4 bg-white text-gray-400 rounded-2xl font-bold hover:bg-gray-50 transition-all';
        btnCancel.innerText = cancelText;
        btnCancel.onclick = closeUniModal;
        uniModalButtons.appendChild(btnCancel);
    }

    uniModal.classList.remove('hidden');
    uniModal.classList.add('flex');
    
    // Reset content state before showing
    uniModalContent.classList.remove('scale-100', 'opacity-100');
    uniModalContent.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
        uniModalContent.classList.remove('scale-95', 'opacity-0');
        uniModalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeUniModal() {
    uniModalContent.classList.remove('scale-100', 'opacity-100');
    uniModalContent.classList.add('scale-95', 'opacity-0');
    
    if (uniModalTimeout) clearTimeout(uniModalTimeout);
    
    uniModalTimeout = setTimeout(() => {
        uniModal.classList.add('hidden');
        uniModal.classList.remove('flex');
        uniModalTimeout = null;
    }, 300);
}

function renderItemsGrid(subtesId) {
    itemGrid.innerHTML = '';
    // Fetch latest appData
    appData = JSON.parse(localStorage.getItem('edugrakAppData')) || DEFAULT_DATA;
    refreshDerivedData();
    
    let packageNames = [];
    if (currentQuiz.type === 'Arena TO') {
        // Arena TO: questionsBank['Arena TO'][packageName][subtestId]
        packageNames = Object.keys(appData.questionsBank['Arena TO'] || {}).filter(pkgName => {
            return appData.questionsBank['Arena TO'][pkgName][subtesId] || subtesId === 'all';
        });
    } else {
        // Others: questionsBank[type][subtestId][packageName]
        const typeGroup = appData.questionsBank[currentQuiz.type]?.[subtesId] || appData.questionsBank[currentQuiz.type]?.['all'] || {};
        packageNames = Object.keys(typeGroup);
    }
    
    const packages = packageNames.map(name => {
        const detail = appData.latihanDetails[currentQuiz.type]?.[subtesId]?.find(p => p.name === name) || 
                       appData.latihanDetails[currentQuiz.type]?.['all']?.find(p => p.name === name);
        return {
            name,
            duration: detail?.duration || 0,
            status: detail?.status || 'Published',
            isPremium: detail?.isPremium || false
        };
    });

    const publishedPackages = packages.filter(p => p.status === 'Published');

    if (publishedPackages.length === 0) {
        itemGrid.innerHTML = '<div class="col-span-full p-10 text-center text-gray-400 font-medium bg-gray-50 rounded-3xl border border-dashed border-gray-200 w-full">Belum ada paket latihan yang dipublikasikan.</div>';
        return;
    }

    publishedPackages.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg flex items-center space-x-4 cursor-pointer group transition-all';
        div.innerHTML = `
            <div class="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center font-black group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0">${idx+1}</div>
            <div class="flex-1">
                <div class="font-bold text-gray-900 group-hover:text-emerald-700 flex items-center">
                    ${item.name}
                    ${item.isPremium ? '<span class="ml-2 bg-amber-100 text-amber-600 text-[8px] px-1.5 py-0.5 rounded-full font-black">PRO</span>' : ''}
                </div>
                ${item.duration > 0 ? `<div class="text-[10px] text-rose-500 font-bold mt-1">⏱️ ${formatDuration(item.duration)}</div>` : '<div class="text-[10px] text-gray-400 font-bold mt-1">Tanpa Waktu</div>'}
            </div>
        `;
        div.onclick = () => {
            // Individual Package Premium Check
            if (item.isPremium && (!currentUser || !currentUser.isPremium)) {
                showNotification({
                    title: 'Paket Premium',
                    message: `Paket "${item.name}" hanya tersedia untuk member Premium. Upgrade sekarang untuk mengaksesnya!`,
                    type: 'confirm',
                    confirmText: 'Upgrade Premium',
                    cancelText: 'Nanti Saja',
                    onConfirm: openPremiumModal
                });
                return;
            }

            showNotification({
                title: 'Siap Belajar?',
                message: `Kamu akan memulai ${currentQuiz.type}: ${item.name}. Pastikan koneksi stabil.`,
                confirmText: 'Mulai Sekarang',
                cancelText: 'Nanti Dulu',
                type: 'info',
                onConfirm: () => startQuiz(item)
            });
        };
        itemGrid.appendChild(div);
    });
}

async function startQuiz(item) {
    clearInterval(currentQuiz.timer);

    // Refresh user data from server to ensure correct premium status
    if (currentUser) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: currentUser.email })
            });
            const data = await response.json();
            if (data.user) {
                currentUser = data.user;
                localStorage.setItem('edugrakUser', JSON.stringify(currentUser));
            }
        } catch (err) {
            console.error('Gagal menyegarkan data user:', err);
        }
    }
    
    let subtesQuestions = [];
    if (currentQuiz.type === 'Arena TO') {
        // Arena TO structure: questionsBank['Arena TO'][item.name][subtestId]
        const packageData = questionsBank['Arena TO'][item.name] || {};
        
        if (currentQuiz.subtes === 'all') {
            // Use provided randomized subtests or generate new ones (fallback)
            const subtestOrder = item.randomizedSubtests || (function() {
                const tpsIds = ['PU', 'PBM', 'PPU', 'PK'];
                const literasiIds = ['LBI', 'LBE', 'PM'];
                const shuffle = (array) => {
                    const arr = [...array];
                    for (let i = arr.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                    }
                    return arr;
                };
                const availableTps = shuffle(tpsIds.filter(id => packageData[id] && packageData[id].length > 0));
                const availableLiterasi = shuffle(literasiIds.filter(id => packageData[id] && packageData[id].length > 0));
                return [...availableTps, ...availableLiterasi];
            })();
            
            subtestOrder.forEach(subId => {
                const questionsWithSubtest = packageData[subId].map(q => ({
                    ...q,
                    subtestName: subtesData.find(s => s.id === subId)?.name || subId
                }));
                subtesQuestions = subtesQuestions.concat(questionsWithSubtest);
            });
        } else {
            const questions = packageData[currentQuiz.subtes] || [];
            subtesQuestions = questions.map(q => ({
                ...q,
                subtestName: subtesData.find(s => s.id === currentQuiz.subtes)?.name || currentQuiz.subtes
            }));
        }
    } else {
        // Other types: questionsBank[type][subtestId][packageName]
        const typeData = questionsBank[currentQuiz.type] || {};
        const localSubtesData = typeData[currentQuiz.subtes] || typeData['all'] || {};
        const questions = localSubtesData[item.name] || [];
        subtesQuestions = questions.map(q => ({
            ...q,
            subtestName: subtesData.find(s => s.id === currentQuiz.subtes)?.name || currentQuiz.subtes
        }));
    }
    
    if (subtesQuestions.length === 0) {
        alert("Maaf, belum ada soal di paket ini.");
        return;
    }

    // Dynamic Premium Check (Layer 2)
    const config = appData.exerciseConfigs?.[currentQuiz.type];
    if ((config?.isPremium || item.isPremium) && (!currentUser || !currentUser.isPremium)) {
        showNotification({
            title: 'Konten Premium',
            message: 'Konten ini hanya tersedia untuk member Premium. Upgrade sekarang untuk mengaksesnya!',
            type: 'confirm',
            confirmText: 'Upgrade Premium',
            cancelText: 'Nanti Saja',
            onConfirm: openPremiumModal
        });
        return;
    }

    currentQuiz.questions = [...subtesQuestions];
    currentQuiz.currentIdx = 0;
    currentQuiz.answers = new Array(subtesQuestions.length).fill(null);
    currentQuiz.startTime = Date.now();
    currentQuiz.packageName = item.name; // Store package name
    
    // Find end date for Arena TO
    if (currentQuiz.type === 'Arena TO') {
        const detail = appData.latihanDetails['Arena TO']?.['all']?.find(d => d.name === item.name);
        currentQuiz.endDate = detail?.endDate || null;
    }
    
    if ((currentQuiz.type === 'Kuis Kilat' || currentQuiz.type === 'Arena TO') && item.duration > 0) {
        currentQuiz.timeLeft = item.duration; 
        const m = Math.floor(currentQuiz.timeLeft / 60);
        const s = currentQuiz.timeLeft % 60;
        quizTimerEl.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        timerContainer.style.display = 'block';
        startTimer();
    } else {
        timerContainer.style.display = 'none';
    }
    
    document.getElementById('quiz-title').innerText = `${currentQuiz.type}: ${item.name}`;
    hideAllSections();
    quizInterface.classList.remove('hidden');
    
    showQuestion();
    renderQuizNav();
}

function startTimer() {
    clearInterval(currentQuiz.timer);
    currentQuiz.timer = setInterval(() => {
        currentQuiz.timeLeft--;
        const m = Math.floor(currentQuiz.timeLeft / 60);
        const s = currentQuiz.timeLeft % 60;
        quizTimerEl.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        if (currentQuiz.timeLeft <= 0) finishQuiz();
    }, 1000);
}

function showQuestion() {
    const q = currentQuiz.questions[currentQuiz.currentIdx];
    
    // Display Subtest Name above the progress if available
    const subtestInfo = q.subtestName ? `<span class="block text-emerald-600 mb-1">${q.subtestName}</span>` : '';
    quizProgressText.innerHTML = `${subtestInfo}Soal ${currentQuiz.currentIdx + 1} dari ${currentQuiz.questions.length}`;
    
    // Clear previous question text and image
    questionTextEl.innerHTML = '';
    
    // Image Support
    if (q.image) {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'mb-8 rounded-[32px] overflow-hidden border border-gray-100 shadow-sm max-w-2xl mx-auto bg-white p-2';
        imgDiv.innerHTML = `<img src="${q.image}" class="w-full h-auto object-contain max-h-[400px] rounded-[24px]" onerror="this.parentElement.style.display='none'">`;
        questionTextEl.appendChild(imgDiv);
    }

    const qText = document.createElement('h2');
    qText.className = 'text-2xl font-bold text-gray-800 leading-relaxed mb-10';
    qText.innerText = q.q;
    questionTextEl.appendChild(qText);
    
    let optionsHtml = '';
    if (q.type === 'essay') {
        const currentAnswer = currentQuiz.answers[currentQuiz.currentIdx] || '';
        optionsHtml = `
            <div class="space-y-4">
                <label class="block text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Jawaban Singkat</label>
                <input type="text" 
                       id="essay-answer" 
                       value="${currentAnswer}"
                       oninput="saveEssayAnswer(this.value)"
                       placeholder="Ketik jawabanmu di sini..." 
                       class="w-full px-8 py-6 bg-white border-2 border-gray-100 rounded-[32px] focus:border-emerald-500 outline-none font-bold text-lg transition-all shadow-sm">
            </div>
        `;
    } else {
        optionsHtml = `<div class="grid grid-cols-1 gap-4">`;
        (q.a || []).forEach((opt, i) => {
            const isSelected = currentQuiz.answers[currentQuiz.currentIdx] === i;
            optionsHtml += `
                <button onclick="selectOption(${i})" class="w-full p-6 rounded-[32px] border-2 text-left font-bold transition-all flex items-center group ${isSelected ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-lg shadow-emerald-100' : 'border-gray-100 bg-white hover:border-emerald-200'}">
                    <span class="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mr-4 font-black transition-all ${isSelected ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-emerald-100 group-hover:text-emerald-600'}">${String.fromCharCode(65+i)}</span>
                    <span class="text-lg">${opt}</span>
                </button>
            `;
        });
        optionsHtml += `</div>`;
    }
    
    optionsContainer.innerHTML = optionsHtml;

    // Auto-focus essay input
    if (q.type === 'essay') {
        setTimeout(() => {
            const input = document.getElementById('essay-answer');
            if (input) input.focus();
        }, 100);
    }
}

function selectOption(idx) {
    currentQuiz.answers[currentQuiz.currentIdx] = idx;
    showQuestion();
    renderQuizNav();
}

function saveEssayAnswer(val) {
    currentQuiz.answers[currentQuiz.currentIdx] = val.trim();
    renderQuizNav();
}

function renderQuizNav() {
    quizNavGrid.innerHTML = '';
    currentQuiz.questions.forEach((_, i) => {
        const btn = document.createElement('button');
        const isCurrent = currentQuiz.currentIdx === i;
        const isAnswered = currentQuiz.answers[i] !== null;
        btn.className = `w-10 h-10 rounded-xl font-bold transition-all ${isCurrent ? 'ring-2 ring-emerald-500 bg-emerald-600 text-white' : isAnswered ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`;
        btn.innerText = i + 1;
        btn.onclick = () => { currentQuiz.currentIdx = i; showQuestion(); renderQuizNav(); };
        quizNavGrid.appendChild(btn);
    });
}

document.getElementById('btn-next-question').onclick = () => {
    if (currentQuiz.currentIdx < currentQuiz.questions.length - 1) {
        currentQuiz.currentIdx++;
        showQuestion();
        renderQuizNav();
    }
};
document.getElementById('btn-prev-question').onclick = () => {
    if (currentQuiz.currentIdx > 0) {
        currentQuiz.currentIdx--;
        showQuestion();
        renderQuizNav();
    }
};
document.getElementById('btn-finish-quiz').onclick = () => {
    showNotification({
        title: 'Selesaikan Kuis?',
        message: 'Apakah kamu yakin ingin mengakhiri sesi latihan ini? Jawaban yang belum terisi tidak akan terhitung.',
        type: 'confirm',
        confirmText: 'Ya, Selesai',
        cancelText: 'Kembali',
        onConfirm: finishQuiz
    });
};

function finishQuiz() {
    clearInterval(currentQuiz.timer);
    const timeSpent = Math.floor((Date.now() - currentQuiz.startTime) / 1000);
    let correct = 0;
    currentQuiz.questions.forEach((q, i) => {
        if (currentQuiz.answers[i] === q.correct) correct++;
    });

    const totalScore = correct * 3;
    const accuracy = Math.round((correct / currentQuiz.questions.length) * 100);
    
    // Handle Arena TO per subtest
    if (currentQuiz.type === 'Arena TO') {
        const subtestId = currentQuiz.subtes;
        const currentPackageName = currentQuiz.packageName;

        currentQuiz.arenaProgress.completedSubtests.push(subtestId);
        currentQuiz.arenaProgress.subtestResults[subtestId] = {
            correct,
            total: currentQuiz.questions.length,
            timeSpent,
            answers: [...currentQuiz.answers],
            questions: [...currentQuiz.questions]
        };
        saveArenaProgress();
        
        // Hide quiz interface immediately and show completion screen
        hideAllSections();
        timerContainer.style.display = 'none';
        
        const sInfo = subtesData.find(s => s.id === subtestId);
        document.getElementById('completed-subtest-name').innerText = sInfo?.name || subtestId;
        subtestCompletionScreen.classList.remove('hidden');
        subtestCompletionScreen.classList.add('flex');
        
        return;
    }

    score += totalScore;
    correctCountTotal += correct;
    wrongCountTotal += (currentQuiz.questions.length - correct);
    updateUI();

    hideAllSections();
    analysisContent.classList.remove('hidden');
    
    const btnBack = document.getElementById('btn-back-to-latihan-home');
    if (currentQuiz.type === 'Arena TO') {
        btnBack.innerText = 'Kembali ke Arena TO';
        btnBack.onclick = () => switchTab('arena');
    } else {
        btnBack.innerText = 'Kembali ke Pusat Latihan';
        btnBack.onclick = () => switchTab('latihan');
    }

    document.getElementById('result-score').innerText = totalScore;
    document.getElementById('result-accuracy').innerText = `${accuracy}%`;
    document.getElementById('result-time').innerText = `${Math.round(timeSpent / currentQuiz.questions.length)}s`;
    
    renderAnalysisReview();
}

async function calculateGlobalIRTWeights(packageName) {
    try {
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();
        
        const weights = {};
        const participants = users.filter(u => u.toAttempts && u.toAttempts[packageName]);
        const totalParticipants = participants.length;
        
        if (totalParticipants === 0) return null;

        const packageData = questionsBank['Arena TO'][packageName] || {};
        
        Object.keys(packageData).forEach(subId => {
            const questions = packageData[subId];
            weights[subId] = questions.map((q, qIdx) => {
                let correctCount = 0;
                
                participants.forEach(user => {
                    const attempt = user.toAttempts[packageName];
                    if (attempt && attempt.results && attempt.results[subId]) {
                        const userAns = attempt.results[subId].answers[qIdx];
                        let isCorrect = false;
                        if (q.type === 'essay') {
                            isCorrect = String(userAns).toLowerCase().trim() === String(q.correct).toLowerCase().trim();
                        } else {
                            isCorrect = userAns === q.correct;
                        }
                        if (isCorrect) correctCount++;
                    }
                });

                const difficultyRatio = correctCount / totalParticipants;
                return 1 + (1 - difficultyRatio) * 2;
            });
        });

        return weights;
    } catch (err) {
        console.error('Error calculating global weights:', err);
        return null;
    }
}

function calculateIRTScore(questions, answers, subtestId, weights = null) {
    let rawScore = 0;
    let maxRawScore = 0;
    
    const config = appData.irtConfigs?.[subtestId] || { min: 200, max: 1000 };
    const baseScore = config.min;
    const scoreRange = config.max - config.min;
    
    questions.forEach((q, i) => {
        // Use provided global weights or fallback to simulation
        const difficulty = weights ? (weights[i] || 1.0) : (1 + ((q.q.length % 15) / 10)); 
        maxRawScore += difficulty;
        
        const userAns = answers[i];
        let isCorrect = false;
        if (q.type === 'essay') {
            isCorrect = String(userAns).toLowerCase().trim() === String(q.correct).toLowerCase().trim();
        } else {
            isCorrect = userAns === q.correct;
        }
        
        if (isCorrect) rawScore += difficulty;
    });
    
    if (maxRawScore === 0) return baseScore;
    const scaledScore = Math.round((rawScore / maxRawScore) * scoreRange) + baseScore;
    return scaledScore;
}

async function finishArenaTOTotally() {
    const { packageName, subtestResults } = currentQuiz.arenaProgress;
    
    let totalIRTScore = 0;
    let subtestCount = 0;
    let allQuestions = [];
    let allAnswers = [];
    const detailedResults = {};

    Object.entries(subtestResults).forEach(([subId, res]) => {
        const subtestScore = calculateIRTScore(res.questions, res.answers, subId);
        totalIRTScore += subtestScore;
        subtestCount++;
        
        detailedResults[subId] = {
            ...res,
            irtScore: subtestScore,
            correct: res.correct,
            wrong: res.total - res.correct,
            unanswered: res.answers.filter(a => a === null || a === '').length
        };
        
        allQuestions = allQuestions.concat(res.questions);
        allAnswers = allAnswers.concat(res.answers);
    });

    const averageScore = subtestCount > 0 ? Math.round(totalIRTScore / subtestCount) : 0;
    
    // Update global stats
    score += averageScore;
    updateUI();

    const attemptData = {
        date: new Date().toISOString(),
        totalScore: averageScore,
        averageScore: averageScore,
        subtestScores: detailedResults,
        results: subtestResults
    };

    // Record Arena TO attempt to server
    if (currentUser) {
        try {
            const response = await fetch(`${API_URL}/users/${currentUser.email}/attempts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ packageName, attemptData })
            });
            const updatedUser = await response.json();
            currentUser = updatedUser;
            localStorage.setItem('edugrakUser', JSON.stringify(currentUser));
        } catch (err) {
            console.error('Error saving attempt to server:', err);
        }
    }

    clearArenaProgress(packageName);
    
    // Check if TO period has ended
    const detail = appData.latihanDetails['Arena TO']?.['all']?.find(d => d.name === packageName);
    let isEnded = false;
    if (detail) {
        const now = new Date();
        const end = new Date(detail.endDate);
        end.setHours(23, 59, 59, 999);
        if (now > end) isEnded = true;
    }

    if (isEnded) {
        renderArenaDetailedResults(packageName, detailedResults, averageScore);
    } else {
        hideAllSections();
        showNotification({
            title: 'Tryout Selesai!',
            message: 'Jawaban kamu telah tersimpan. Skor IRT dan Kunci Jawaban akan muncul secara otomatis setelah masa Tryout berakhir.',
            type: 'success',
            confirmText: 'Ke Dashboard',
            onConfirm: () => switchTab('dashboard')
        });
    }
}

function renderArenaDetailedResults(packageName, detailedResults, averageScore) {
    hideAllSections();
    arenaDetailedResults.classList.remove('hidden');
    
    document.getElementById('detail-to-name').innerText = packageName;
    document.getElementById('detail-average-score').innerText = averageScore;
    
    const container = document.getElementById('detail-subtests-container');
    container.innerHTML = '';
    
    // Wire up the button to switch to discussion
    document.getElementById('btn-switch-to-discussion').onclick = () => showArenaSubtestSelection(packageName);

    Object.entries(detailedResults).forEach(([subId, data]) => {
        const sInfo = subtesData.find(s => s.id === subId);
        const accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
        const wrong = data.total - data.correct - data.unanswered;
        
        const card = document.createElement('div');
        card.className = 'bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group';
        
        card.innerHTML = `
            <div class="flex flex-col h-full">
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 rounded-2xl bg-${sInfo?.color || 'emerald'}-50 text-${sInfo?.color || 'emerald'}-600 flex items-center justify-center text-xl">
                            ${sInfo?.icon || '📚'}
                        </div>
                        <div>
                            <h4 class="font-black text-gray-900 leading-none">${sInfo?.name || subId}</h4>
                            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">${subId} • ${data.total} Soal</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Skor IRT</p>
                        <div class="px-4 py-1.5 bg-emerald-600 text-white rounded-xl font-black text-lg shadow-lg shadow-emerald-100">${data.irtScore}</div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-8 items-center flex-1">
                    <div class="relative w-32 h-32 mx-auto">
                        <svg class="w-full h-full transform -rotate-90">
                            <circle cx="64" cy="64" r="56" stroke="#f8fafc" stroke-width="12" fill="transparent" />
                            <circle cx="64" cy="64" r="56" stroke="currentColor" stroke-width="12" stroke-dasharray="351.8" stroke-dashoffset="${351.8 - (accuracy/100)*351.8}" stroke-linecap="round" fill="transparent" class="text-emerald-500 transition-all duration-1000" />
                        </svg>
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                            <span class="text-2xl font-black text-gray-900">${accuracy}%</span>
                            <span class="text-[8px] text-gray-400 font-black uppercase tracking-tighter">Akurasi</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100/50">
                            <div class="flex items-center">
                                <div class="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                                <span class="text-[10px] font-bold text-gray-500 uppercase">Benar</span>
                            </div>
                            <span class="text-sm font-black text-emerald-700">${data.correct}</span>
                        </div>
                        <div class="flex items-center justify-between p-3 rounded-2xl bg-rose-50/50 border border-rose-100/50">
                            <div class="flex items-center">
                                <div class="w-2 h-2 rounded-full bg-rose-500 mr-2"></div>
                                <span class="text-[10px] font-bold text-gray-500 uppercase">Salah</span>
                            </div>
                            <span class="text-sm font-black text-rose-700">${wrong}</span>
                        </div>
                        <div class="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
                            <div class="flex items-center">
                                <div class="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                                <span class="text-[10px] font-bold text-gray-500 uppercase">Kosong</span>
                            </div>
                            <span class="text-sm font-black text-gray-600">${data.unanswered}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function viewArenaAnalysis() {
    hideAllSections();
    analysisContent.classList.remove('hidden');
    renderAnalysisReview();
}

function renderAnalysisReview(filterSubtest = null) {
    const reviewContainer = document.getElementById('analysis-review-container');
    reviewContainer.innerHTML = '';
    
    // Check if TO period has ended
    let showExplanation = true;
    if (currentQuiz.type === 'Arena TO' && currentQuiz.endDate) {
        const now = new Date();
        const end = new Date(currentQuiz.endDate);
        end.setHours(23, 59, 59, 999);
        if (now < end) {
            reviewContainer.innerHTML = `
                <div class="p-8 bg-amber-50 rounded-[32px] border border-amber-100 text-center">
                    <div class="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">🔒</div>
                    <h4 class="text-xl font-black text-amber-900 mb-2">Kunci Jawaban Terkunci</h4>
                    <p class="text-amber-700 font-medium">Kunci jawaban dan pembahasan akan muncul secara otomatis setelah periode Tryout ini berakhir pada <span class="font-black">${new Date(currentQuiz.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>.</p>
                </div>
            `;
            return;
        }
    }

    // Premium Check for Answer Keys
    if (currentQuiz.type === 'Arena TO' && (!currentUser || !currentUser.isPremium)) {
        reviewContainer.innerHTML = `
            <div class="p-10 bg-emerald-900 rounded-[40px] text-white text-center relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div class="relative z-10">
                    <div class="w-20 h-20 bg-amber-400 text-emerald-900 rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl shadow-2xl">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"></path></svg>
                    </div>
                    <h3 class="text-3xl font-black mb-4">Fitur Premium</h3>
                    <p class="text-emerald-100 font-medium mb-10 max-w-sm mx-auto">Kunci jawaban dan pembahasan detail hanya dapat diakses oleh member Premium.</p>
                    <button onclick="openPremiumModal()" class="px-10 py-5 bg-amber-400 text-emerald-900 rounded-2xl font-black hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/20">Upgrade Premium Sekarang</button>
                </div>
            </div>
        `;
        return;
    }

    // Header for subtest
    if (filterSubtest) {
        const sInfo = subtesData.find(s => s.id === filterSubtest);
        const header = document.createElement('div');
        header.className = 'mb-10 p-8 bg-emerald-900 rounded-[32px] text-white flex items-center justify-between overflow-hidden relative';
        header.innerHTML = `
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div class="relative z-10">
                <p class="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">Subtes Terpilih</p>
                <h3 class="text-3xl font-black">${sInfo?.name || filterSubtest}</h3>
            </div>
            <div class="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-3xl relative z-10">
                ${sInfo?.icon || '📚'}
            </div>
        `;
        reviewContainer.appendChild(header);
    }

    // Get global weights if it's Arena TO and ended
    let globalWeights = null;
    if (currentQuiz.type === 'Arena TO' && currentQuiz.packageName) {
        const detail = appData.latihanDetails['Arena TO']?.['all']?.find(d => d.name === currentQuiz.packageName);
        if (detail) {
            const now = new Date();
            const end = new Date(detail.endDate);
            end.setHours(23, 59, 59, 999);
            if (now > end) {
                globalWeights = calculateGlobalIRTWeights(currentQuiz.packageName);
            }
        }
    }

    currentQuiz.questions.forEach((q, i) => {
        const userAns = currentQuiz.answers[i];
        let isCorrect = false;
        
        if (q.type === 'essay') {
            isCorrect = String(userAns).toLowerCase().trim() === String(q.correct).toLowerCase().trim();
        } else {
            isCorrect = userAns === q.correct;
        }

        // Use global weights if available, otherwise fallback to simulation
        let difficulty = 1 + ((q.q.length % 15) / 10);
        if (globalWeights && filterSubtest && globalWeights[filterSubtest]) {
            difficulty = globalWeights[filterSubtest][i] || difficulty;
        } else if (globalWeights && q.subtestId && globalWeights[q.subtestId]) {
            // If we have subtestId on question (though current logic concatenates questions)
            // In viewArenaResults, questions are from specificSubtest if filtered
            difficulty = globalWeights[filterSubtest][i] || difficulty;
        }

        const div = document.createElement('div');
        div.className = `p-8 rounded-[32px] border-2 mb-6 transition-all ${isCorrect ? 'border-emerald-100 bg-emerald-50/20' : userAns === null ? 'border-gray-100 bg-gray-50/20' : 'border-rose-100 bg-rose-50/20'}`;
        
        let optionsHtml = '';
        if (q.type === 'essay') {
            optionsHtml = `
                <div class="mt-4 space-y-2">
                    <div class="p-4 rounded-2xl bg-white border border-gray-100">
                        <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Jawaban Kamu</p>
                        <p class="font-bold ${isCorrect ? 'text-emerald-600' : 'text-rose-500'}">${userAns || 'Tidak Diisi'}</p>
                    </div>
                    <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                        <p class="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Kunci Jawaban</p>
                        <p class="font-black text-emerald-700">${q.correct}</p>
                    </div>
                </div>
            `;
        } else {
            optionsHtml = `<div class="mt-6 grid grid-cols-1 gap-3">`;
            q.a.forEach((opt, idx) => {
                const isCorrectOpt = idx === q.correct;
                const isUserChoice = idx === userAns;
                
                let stateClass = 'bg-white border-gray-100 text-gray-500';
                let icon = '';
                
                if (isCorrectOpt) {
                    stateClass = 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/20';
                    icon = '✓';
                } else if (isUserChoice && !isCorrectOpt) {
                    stateClass = 'bg-rose-50 border-rose-500 text-rose-700';
                    icon = '✕';
                }

                optionsHtml += `
                    <div class="flex items-center p-4 rounded-2xl border-2 font-bold text-sm ${stateClass} transition-all">
                        <span class="w-8 h-8 rounded-lg flex items-center justify-center mr-4 font-black ${isCorrectOpt ? 'bg-emerald-500 text-white' : isUserChoice ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-400'}">${icon || String.fromCharCode(65+idx)}</span>
                        <span class="flex-1">${opt}</span>
                    </div>
                `;
            });
            optionsHtml += `</div>`;
        }

        div.innerHTML = `
            <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div class="flex items-start flex-1">
                    <span class="w-10 h-10 rounded-xl flex items-center justify-center font-black mr-4 shrink-0 ${isCorrect ? 'bg-emerald-600 text-white' : userAns === null ? 'bg-gray-300 text-white' : 'bg-rose-500 text-white'}">${i+1}</span>
                    <p class="font-bold text-gray-900 text-lg leading-relaxed">${q.q}</p>
                </div>
                <div class="flex flex-col items-end shrink-0">
                    <div class="px-4 py-2 bg-white text-emerald-600 text-[10px] font-black rounded-xl border-2 border-emerald-100 shadow-sm whitespace-nowrap mb-2">
                        BOBOT IRT: ${difficulty.toFixed(1)}
                    </div>
                    ${isCorrect ? 
                        '<span class="px-3 py-1 bg-emerald-500 text-white text-[8px] font-black rounded-full uppercase tracking-widest">Benar</span>' : 
                        userAns === null ? 
                        '<span class="px-3 py-1 bg-gray-400 text-white text-[8px] font-black rounded-full uppercase tracking-widest">Kosong</span>' : 
                        '<span class="px-3 py-1 bg-rose-500 text-white text-[8px] font-black rounded-full uppercase tracking-widest">Salah</span>'
                    }
                </div>
            </div>
            ${optionsHtml}
            <div class="mt-6 p-5 bg-white/80 rounded-[24px] border-2 border-dashed border-emerald-100">
                <div class="flex items-center text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Pembahasan Detail
                </div>
                <p class="text-xs text-gray-600 font-medium leading-relaxed">${q.explain}</p>
            </div>
        `;
        reviewContainer.appendChild(div);
    });
}

function backToArenaLobbyFromCompletion() {
    console.log("Back to lobby triggered");
    
    // 1. Try from current state
    let pkgName = currentQuiz?.arenaProgress?.packageName;
    
    // 2. If missing (e.g. refresh), try to find from localStorage
    if (!pkgName) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(`arena_progress_${currentUser?.email}_`)) {
                pkgName = key.replace(`arena_progress_${currentUser?.email}_`, '');
                break;
            }
        }
    }

    if (pkgName) {
        showArenaLobby(pkgName);
    } else {
        // 3. Fallback to arena tab
        switchTab('arena');
    }
}

function updateUI() {
    scoreEl.innerText = score;
    correctEl.innerText = correctCountTotal;
    wrongEl.innerText = wrongCountTotal;
    const total = correctCountTotal + wrongCountTotal;
    solvedEl.innerText = total;
    targetProgressEl.style.width = `${Math.min((total / targetCount) * 100, 100)}%`;
    if (total > 0) {
        const pCorrect = Math.round((correctCountTotal / total) * 100);
        percentCorrectBar.style.width = `${pCorrect}%`;
        percentWrongBar.style.width = `${100 - pCorrect}%`;
    }
    const offset = 364.4 - (Math.min(score / 300, 1) * 364.4);
    progressCircle.style.strokeDashoffset = offset;
}

async function startArenaTO(packageName) {
    // Check if user is logged in
    if (!currentUser) {
        showNotification({ title: 'Akses Ditolak', message: 'Silakan login terlebih dahulu untuk mengikuti Tryout.', type: 'info' });
        return;
    }

    // Refresh user data from server to ensure correct premium status
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: currentUser.email })
        });
        const data = await response.json();
        if (data.user) {
            currentUser = data.user;
            localStorage.setItem('edugrakUser', JSON.stringify(currentUser));
        }
    } catch (err) {
        console.error('Gagal menyegarkan data user:', err);
    }

    // Premium Check for Arena TO
    const detail = appData.latihanDetails['Arena TO']?.['all']?.find(d => d.name === packageName);
    if (detail?.isPremium && (!currentUser || !currentUser.isPremium)) {
        showNotification({
            title: 'Tryout Premium',
            message: `"${packageName}" adalah Tryout eksklusif untuk member Premium. Upgrade sekarang untuk mengaksesnya!`,
            type: 'confirm',
            confirmText: 'Upgrade Premium',
            cancelText: 'Nanti Saja',
            onConfirm: openPremiumModal
        });
        return;
    }

    // Check if user has already taken this TO
    // Always check against latest data from appData.users (synced from server)
    const storedUser = currentUser; // Use refreshed currentUser
    const attempt = storedUser?.toAttempts?.[packageName];

    if (attempt) {
        showNotification({ 
            title: 'Sudah Mengerjakan', 
            message: `Kamu sudah mengerjakan ${packageName} pada ${new Date(attempt.date || attempt).toLocaleString('id-ID')}. Tryout ini hanya dapat diikuti sekali.`, 
            type: 'confirm',
            confirmText: 'Lihat Hasil',
            cancelText: 'Kembali',
            onConfirm: () => showResultOptions(packageName)
        });
        return;
    }

    showArenaLobby(packageName);
}

function showResultOptions(packageName) {
    const detail = appData.latihanDetails['Arena TO']?.['all']?.find(d => d.name === packageName);
    if (detail) {
        const now = new Date();
        const end = new Date(detail.endDate);
        end.setHours(23, 59, 59, 999);
        
        if (now <= end) {
            showNotification({
                title: 'Hasil Belum Tersedia',
                message: 'Skor IRT dan Kunci Jawaban baru akan tersedia setelah periode Tryout ini berakhir agar penilaian tetap akurat.',
                type: 'info'
            });
            return;
        }
    }

    showNotification({
        title: 'Pilih Tampilan Hasil',
        message: `Silakan pilih informasi yang ingin kamu lihat untuk ${packageName}.`,
        type: 'confirm',
        confirmText: 'Detail Nilai IRT',
        cancelText: 'Kunci Jawaban',
        onConfirm: () => {
            viewArenaResults(packageName, 'scores');
        }
    });
    
    // Custom handling for the "Cancel" button to act as "Kunci Jawaban"
    const cancelBtn = uniModalButtons.querySelector('button:not(.bg-emerald-600)');
    if (cancelBtn) {
        cancelBtn.onclick = () => {
            closeUniModal();
            showArenaSubtestSelection(packageName);
        };
        cancelBtn.className = 'w-full py-4 bg-white text-emerald-600 border-2 border-emerald-100 rounded-2xl font-black hover:bg-emerald-50 transition-all';
    }
}

function showArenaSubtestSelection(packageName) {
    const storedUser = currentUser ? appData.users.find(u => u.email === currentUser.email) : null;
    const attempt = storedUser?.toAttempts?.[packageName];
    
    // Determine subtests available
    let availableSubtests = [];
    const packageData = questionsBank['Arena TO'][packageName] || {};
    
    if (attempt && attempt.results) {
        // If they took it, use the subtests they actually completed
        availableSubtests = Object.keys(attempt.results);
    } else {
        // If they didn't take it, show all subtests in the package
        // Default UTBK order
        const subtestIds = ['PU', 'PBM', 'PPU', 'PK', 'LBI', 'LBE', 'PM'];
        availableSubtests = subtestIds.filter(id => packageData[id] && Array.isArray(packageData[id]));
    }

    if (availableSubtests.length === 0) {
        showNotification({ title: 'Data Tidak Ditemukan', message: 'Maaf, paket Tryout ini tidak memiliki data soal.', type: 'error' });
        return;
    }

    hideAllSections();
    arenaSubtestDiscussionSelection.classList.remove('hidden');
    document.getElementById('discussion-selection-to-name').innerText = packageName;

    const grid = document.getElementById('discussion-subtest-grid');
    grid.innerHTML = '';

    availableSubtests.forEach((subId, idx) => {
        const sInfo = subtesData.find(s => s.id === subId);
        const card = document.createElement('div');
        card.className = 'bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex items-center justify-between';
        card.innerHTML = `
            <div class="flex items-center space-x-4">
                <div class="w-12 h-12 rounded-2xl bg-${sInfo?.color || 'emerald'}-50 text-${sInfo?.color || 'emerald'}-600 flex items-center justify-center text-xl font-black group-hover:bg-${sInfo?.color || 'emerald'}-600 group-hover:text-white transition-all">
                    ${idx + 1}
                </div>
                <div>
                    <h4 class="font-black text-gray-900 group-hover:text-emerald-700 transition-colors">${sInfo?.name || subId}</h4>
                    <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Kunci Jawaban & Pembahasan</p>
                </div>
            </div>
            <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
        `;
        card.onclick = () => viewArenaResults(packageName, 'discussion', subId);
        grid.appendChild(card);
    });

    document.getElementById('btn-switch-to-scores').onclick = () => viewArenaResults(packageName, 'scores');
    document.getElementById('btn-switch-to-discussion').onclick = () => showArenaSubtestSelection(packageName);
}

async function viewArenaResults(packageName, mode = 'scores', specificSubtest = null) {
    // Refresh user data from server to get latest attempts
    if (currentUser) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: currentUser.email })
            });
            const data = await response.json();
            if (data.user) {
                currentUser = data.user;
                localStorage.setItem('edugrakUser', JSON.stringify(currentUser));
            }
        } catch (err) {
            console.error('Error refreshing user data:', err);
        }
    }

    const attempt = currentUser?.toAttempts?.[packageName];
    
    if (!attempt && mode === 'scores') {
        showNotification({
            title: 'Belum Ada Nilai',
            message: 'Kamu tidak mengikuti Tryout ini sehingga tidak memiliki skor IRT. Kamu tetap bisa melihat kunci jawaban.',
            type: 'info',
            confirmText: 'Lihat Kunci Jawaban',
            onConfirm: () => showArenaSubtestSelection(packageName)
        });
        return;
    }

    // Set state for current quiz to filter in renderAnalysisReview
    currentQuiz.type = 'Arena TO';
    currentQuiz.packageName = packageName;
    
    const detail = appData.latihanDetails['Arena TO']?.['all']?.find(d => d.name === packageName);
    currentQuiz.endDate = detail?.endDate || null;

    // Recalculate IRT if TO has ended
    const now = new Date();
    const end = new Date(detail?.endDate);
    end.setHours(23, 59, 59, 999);
    
    if (now > end && attempt && attempt.results) {
        const globalWeights = await calculateGlobalIRTWeights(packageName);
        if (globalWeights) {
            let totalIRTScore = 0;
            let subtestCount = 0;
            const updatedSubtestScores = {};

            Object.entries(attempt.results).forEach(([subId, res]) => {
                const subtestWeights = globalWeights[subId];
                const subtestScore = calculateIRTScore(res.questions, res.answers, subId, subtestWeights);
                
                totalIRTScore += subtestScore;
                subtestCount++;
                
                updatedSubtestScores[subId] = {
                    ...attempt.subtestScores[subId],
                    irtScore: subtestScore
                };
            });

            const averageScore = subtestCount > 0 ? Math.round(totalIRTScore / subtestCount) : 0;
            
            // Update attempt with new IRT scores on server
            attempt.totalScore = averageScore;
            attempt.averageScore = averageScore;
            attempt.subtestScores = updatedSubtestScores;
            
            try {
                await fetch(`${API_URL}/users/${currentUser.email}/attempts`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ packageName, attemptData: attempt })
                });
            } catch (err) {
                console.error('Error updating IRT scores on server:', err);
            }
        }
    }

    if (mode === 'scores') {
        if (attempt && attempt.subtestScores) {
            renderArenaDetailedResults(packageName, attempt.subtestScores, attempt.averageScore || attempt.totalScore);
        } else {
            showNotification({ title: 'Data Terbatas', message: 'Maaf, data skor detail tidak tersedia.', type: 'info' });
        }
    } else {
        // Discussion path
        let questionsToShow = [];
        let answersToShow = [];

        if (attempt && attempt.results) {
            // User has taken the TO
            if (specificSubtest) {
                questionsToShow = attempt.results[specificSubtest].questions;
                answersToShow = attempt.results[specificSubtest].answers;
            } else {
                // Should not happen with subtest selection, but as fallback:
                Object.values(attempt.results).forEach(res => {
                    questionsToShow = questionsToShow.concat(res.questions);
                    answersToShow = answersToShow.concat(res.answers);
                });
            }
        } else {
            // User hasn't taken the TO
            const packageData = questionsBank['Arena TO'][packageName] || {};
            if (specificSubtest) {
                questionsToShow = packageData[specificSubtest].map(q => ({
                    ...q,
                    subtestName: subtesData.find(s => s.id === specificSubtest)?.name || specificSubtest
                }));
                answersToShow = new Array(questionsToShow.length).fill(null);
            } else {
                // Fallback
                Object.keys(packageData).forEach(subId => {
                    const qs = packageData[subId].map(q => ({
                        ...q,
                        subtestName: subtesData.find(s => s.id === subId)?.name || subId
                    }));
                    questionsToShow = questionsToShow.concat(qs);
                });
                answersToShow = new Array(questionsToShow.length).fill(null);
            }
        }

        currentQuiz.questions = questionsToShow;
        currentQuiz.answers = answersToShow;

        hideAllSections();
        analysisContent.classList.remove('hidden');
        
        // Header info
        document.getElementById('result-score').innerText = (attempt && attempt.subtestScores?.[specificSubtest]) ? attempt.subtestScores[specificSubtest].irtScore : '-';
        document.getElementById('result-accuracy').innerText = (attempt && attempt.results?.[specificSubtest]) ? (Math.round((attempt.results[specificSubtest].correct / attempt.results[specificSubtest].total) * 100) + '%') : '-';
        document.getElementById('result-time').innerText = (attempt && attempt.results?.[specificSubtest]) ? (Math.round(attempt.results[specificSubtest].timeSpent / attempt.results[specificSubtest].total) + 's') : '-';

        const btnBack = document.getElementById('btn-back-to-latihan-home');
        btnBack.innerText = 'Kembali ke Daftar Subtes';
        btnBack.onclick = () => showArenaSubtestSelection(packageName);
        
        renderAnalysisReview(specificSubtest);
    }
}

function showArenaLobby(packageName) {
    console.log("Showing Arena Lobby for:", packageName);
    const detail = appData.latihanDetails['Arena TO']?.['all']?.find(d => d.name === packageName);
    const packageData = questionsBank['Arena TO'][packageName] || {};
    
    // UTBK Style: TPS first, then Literasi
    const tpsIds = ['PU', 'PBM', 'PPU', 'PK'];
    const literasiIds = ['LBI', 'LBE', 'PM'];
    
    const shuffle = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    // Initialize or get existing progress
    if (currentQuiz.arenaProgress.packageName !== packageName) {
        // Check if there's saved progress in localStorage
        const savedProgress = JSON.parse(localStorage.getItem(`arena_progress_${currentUser?.email}_${packageName}`));
        
        if (savedProgress) {
            currentQuiz.arenaProgress = savedProgress;
        } else {
            const availableTps = shuffle(tpsIds.filter(id => packageData[id] && packageData[id].length > 0));
            const availableLiterasi = shuffle(literasiIds.filter(id => packageData[id] && packageData[id].length > 0));
            
            currentQuiz.arenaProgress = {
                packageName: packageName,
                completedSubtests: [],
                allSubtests: [...availableTps, ...availableLiterasi],
                totalDurationText: detail?.durationText || '3 Jam 5 Menit',
                subtestDurations: detail?.subtestDurations || {},
                subtestResults: {}
            };
            saveArenaProgress();
        }
    }

    const { allSubtests, completedSubtests, totalDurationText, subtestDurations } = currentQuiz.arenaProgress;

    // Update Lobby UI
    document.getElementById('lobby-to-title').innerText = packageName;
    document.getElementById('lobby-to-date').innerText = detail?.startDate ? formatDateRange(detail.startDate, detail.endDate) : 'Tanggal belum ditentukan';
    document.getElementById('lobby-to-duration').innerText = totalDurationText;
    document.getElementById('lobby-subtest-count').innerText = allSubtests.length;

    const subtestListEl = document.getElementById('lobby-subtest-list');
    subtestListEl.innerHTML = '';
    
    allSubtests.forEach((subId, idx) => {
        const sInfo = subtesData.find(s => s.id === subId);
        const qCount = packageData[subId].length;
        const isCompleted = completedSubtests.includes(subId);
        const isNext = completedSubtests.length === idx;
        const isLocked = idx > completedSubtests.length;

        // Use specific duration from detail or fallback
        const subtestMinutes = subtestDurations[subId] || 20;

        const div = document.createElement('div');
        div.className = `flex items-center justify-between p-6 rounded-3xl border transition-all ${isCompleted ? 'bg-emerald-50 border-emerald-100 opacity-80' : isNext ? 'bg-white border-emerald-500 shadow-lg shadow-emerald-100 scale-[1.02]' : 'bg-gray-50 border-gray-100 opacity-60'}`;
        div.innerHTML = `
            <div class="flex items-center space-x-5">
                <div class="w-12 h-12 rounded-2xl ${isCompleted ? 'bg-emerald-600 text-white' : isNext ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'} flex items-center justify-center font-black text-sm transition-all">
                    ${isCompleted ? '✓' : idx + 1}
                </div>
                <div>
                    <h4 class="font-black text-gray-900">${sInfo?.name || subId}</h4>
                    <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">${subId} • ${qCount} Soal • ${subtestMinutes} Menit</p>
                </div>
            </div>
            <div class="flex items-center">
                ${isCompleted ? 
                    '<span class="text-xs font-black text-emerald-600 uppercase tracking-widest">Selesai</span>' : 
                    isNext ? 
                    '<span class="text-xs font-black text-emerald-500 animate-pulse uppercase tracking-widest">Siap Dikerjakan</span>' : 
                    '<span class="text-xs font-black text-gray-300 uppercase tracking-widest">Terkunci</span>'
                }
            </div>
        `;
        subtestListEl.appendChild(div);
    });

    // Update main action button based on progress
    const btnStart = document.getElementById('btn-start-to-from-lobby');
    if (completedSubtests.length === allSubtests.length) {
        btnStart.innerText = 'Lihat Hasil Akhir';
        btnStart.onclick = () => finishArenaTOTotally();
    } else {
        btnStart.innerText = completedSubtests.length === 0 ? 'Mulai Pengerjaan' : 'Lanjutkan Subtes Selanjutnya';
        btnStart.onclick = () => {
            const nextSubtest = allSubtests[completedSubtests.length];
            startQuizSubtest(packageName, nextSubtest);
        };
    }

    // Show Lobby
    hideAllSections();
    arenaLobbyContent.classList.remove('hidden');
}

function saveArenaProgress() {
    if (currentUser && currentQuiz.arenaProgress.packageName) {
        localStorage.setItem(`arena_progress_${currentUser.email}_${currentQuiz.arenaProgress.packageName}`, JSON.stringify(currentQuiz.arenaProgress));
    }
}

function clearArenaProgress(packageName) {
    if (currentUser) {
        localStorage.removeItem(`arena_progress_${currentUser.email}_${packageName}`);
    }
}

async function startQuizSubtest(packageName, subtestId) {
    // Refresh user data from server to ensure correct premium status
    if (currentUser) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: currentUser.email })
            });
            const data = await response.json();
            if (data.user) {
                currentUser = data.user;
                localStorage.setItem('edugrakUser', JSON.stringify(currentUser));
            }
        } catch (err) {
            console.error('Gagal menyegarkan data user:', err);
        }
    }

    // Premium Check for Arena TO (Final Check)
    const detail = appData.latihanDetails['Arena TO']?.['all']?.find(d => d.name === packageName);
    if (detail?.isPremium && (!currentUser || !currentUser.isPremium)) {
        showNotification({
            title: 'Tryout Premium',
            message: `"${packageName}" adalah Tryout eksklusif untuk member Premium. Upgrade sekarang untuk mengaksesnya!`,
            type: 'confirm',
            confirmText: 'Upgrade Premium',
            cancelText: 'Nanti Saja',
            onConfirm: openPremiumModal
        });
        return;
    }

    const packageData = questionsBank['Arena TO'][packageName] || {};
    const questions = packageData[subtestId] || [];
    const sInfo = subtesData.find(s => s.id === subtestId);

    if (questions.length === 0) {
        alert("Maaf, belum ada soal di subtes ini.");
        return;
    }

    currentQuiz.type = 'Arena TO';
    currentQuiz.subtes = subtestId;
    currentQuiz.packageName = packageName;
    currentQuiz.questions = questions.map(q => ({
        ...q,
        subtestName: sInfo?.name || subtestId
    }));
    currentQuiz.currentIdx = 0;
    currentQuiz.answers = new Array(questions.length).fill(null);
    currentQuiz.startTime = Date.now();
    
    // Duration per subtest from arenaProgress
    const subtestMinutes = currentQuiz.arenaProgress.subtestDurations[subtestId] || 20;
    currentQuiz.timeLeft = subtestMinutes * 60;

    const m = Math.floor(currentQuiz.timeLeft / 60);
    const s = currentQuiz.timeLeft % 60;
    quizTimerEl.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    timerContainer.style.display = 'block';
    startTimer();

    document.getElementById('quiz-title').innerText = `Arena TO: ${sInfo?.name || subtestId}`;
    hideAllSections();
    quizInterface.classList.remove('hidden');
    
    showQuestion();
    renderQuizNav();
}

// Lobby Event Listeners
document.getElementById('btn-cancel-lobby').onclick = () => switchTab('arena');
document.getElementById('btn-start-to-from-lobby').onclick = () => {
    currentQuiz.type = 'Arena TO';
    currentQuiz.subtes = 'all';
    // Use the pre-randomized subtests from lobby
    startQuiz({ 
        name: currentQuiz.tempPackageName, 
        duration: currentQuiz.tempDuration,
        randomizedSubtests: currentQuiz.tempRandomizedSubtests
    });
};

function renderVideos(filter) {
    const videoGrid = document.getElementById('video-grid');
    videoGrid.innerHTML = '';
    const filtered = filter === 'all' ? videoData : videoData.filter(v => v.subject === filter);
    
    document.getElementById('count-all').innerText = videoData.length;
    document.getElementById('count-lbi').innerText = videoData.filter(v => v.subject === 'LBI').length;
    document.getElementById('count-pk').innerText = videoData.filter(v => v.subject === 'PK').length;
    document.getElementById('count-pm').innerText = videoData.filter(v => v.subject === 'PM').length;
    document.getElementById('count-ppu').innerText = videoData.filter(v => v.subject === 'PPU').length;

    filtered.forEach(v => {
        const videoId = v.url.split('v=')[1];
        const card = document.createElement('div');
        card.className = 'bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500 flex flex-col md:flex-row';
        card.innerHTML = `
            <div class="md:w-72 relative aspect-video md:aspect-auto overflow-hidden">
                <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" alt="${v.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                <div class="absolute inset-0 bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div class="w-14 h-14 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-emerald-600 shadow-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6 ml-1"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                </div>
                ${v.isPremium ? '<div class="absolute top-4 right-4 bg-amber-500 text-white text-[8px] font-black px-2 py-1 rounded-lg shadow-lg">PREMIUM</div>' : ''}
                <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-emerald-600 shadow-sm uppercase tracking-wider">${v.subject}</div>
                <div class="absolute bottom-4 right-4 bg-black/70 text-white text-[10px] font-bold px-3 py-1 rounded-lg">${v.duration}</div>
            </div>
            <div class="flex-1 p-8 flex flex-col justify-center">
                <h4 class="text-xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors">${v.title}</h4>
                <p class="text-gray-500 text-sm mt-2 line-clamp-2">${v.description}</p>
            </div>
        `;
        card.onclick = () => {
            if (v.isPremium && (!currentUser || !currentUser.isPremium)) {
                showNotification({
                    title: 'Konten Premium',
                    message: 'Video materi ini hanya tersedia untuk member Premium. Upgrade sekarang untuk menonton!',
                    type: 'confirm',
                    confirmText: 'Upgrade Premium',
                    cancelText: 'Nanti Saja',
                    onConfirm: openPremiumModal
                });
                return;
            }
            openModal(v.url);
        };
        videoGrid.appendChild(card);
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-emerald-50'));
        btn.classList.add('active', 'bg-emerald-50');
        renderVideos(btn.getAttribute('data-filter'));
    });
});

function openModal(url) {
    const modal = document.getElementById('youtube-modal');
    const content = document.getElementById('modal-content');
    const confirmBtn = document.getElementById('modal-confirm');
    const cancelBtn = document.getElementById('modal-cancel');
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);

    confirmBtn.onclick = () => {
        window.open(url, '_blank');
        closeModal();
    };
    cancelBtn.onclick = closeModal;
}

function closeModal() {
    const modal = document.getElementById('youtube-modal');
    const content = document.getElementById('modal-content');
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300);
}

// Auth Logic
const authContent = document.getElementById('auth-content');
const mainNav = document.getElementById('main-nav');
const loginForm = document.getElementById('login-form');
const btnLogout = document.getElementById('btn-logout');

// Profile Modal Elements
const profileModal = document.getElementById('profile-modal');
const profileModalContent = document.getElementById('profile-modal-content');
const btnOpenProfile = document.getElementById('btn-open-profile');
const btnCloseProfile = document.getElementById('btn-close-profile');
const profileForm = document.getElementById('profile-form');
const profileAvatarImg = document.getElementById('profile-modal-avatar');
const avatarGrid = document.getElementById('avatar-selection-grid');

let selectedAvatarUrl = '';
const AVATARS = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Buddy',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Casper',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Cookie',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Lilly',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Oscar',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Peanut',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Princess',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Scooter',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Tigger',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Sassy',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Mittens'
];

function setupRegionDropdowns(provinceId, cityId, initialProvince = '', initialCity = '') {
    const provinceSelect = document.getElementById(provinceId);
    const citySelect = document.getElementById(cityId);

    if (!provinceSelect || !citySelect) return;

    // Clear and Populate Provinces
    provinceSelect.innerHTML = '<option value="" disabled selected>Pilih Provinsi</option>';
    Object.keys(INDONESIA_REGIONS).sort().forEach(prov => {
        const opt = document.createElement('option');
        opt.value = prov;
        opt.textContent = prov;
        provinceSelect.appendChild(opt);
    });

    // Function to populate cities
    const populateCities = (province, selectedCity = '') => {
        citySelect.innerHTML = '<option value="" disabled selected>Pilih Kota</option>';
        if (province && INDONESIA_REGIONS[province]) {
            INDONESIA_REGIONS[province].sort().forEach(city => {
                const opt = document.createElement('option');
                opt.value = city;
                opt.textContent = city;
                citySelect.appendChild(opt);
            });
            if (selectedCity) citySelect.value = selectedCity;
        }
    };

    provinceSelect.onchange = (e) => populateCities(e.target.value);

    // Initial value
    if (initialProvince) {
        provinceSelect.value = initialProvince;
        populateCities(initialProvince, initialCity);
    }
}

function initProfileModal() {
    // Render Avatar Grid
    avatarGrid.innerHTML = '';
    AVATARS.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.className = 'avatar-option';
        img.onclick = () => selectAvatar(url);
        avatarGrid.appendChild(img);
    });

    btnOpenProfile.onclick = openProfileModal;
    btnCloseProfile.onclick = closeProfileModal;
    
    profileForm.onsubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            name: document.getElementById('profile-name').value,
            email: document.getElementById('profile-email').value,
            phone: document.getElementById('profile-phone').value,
            province: document.getElementById('profile-province').value,
            city: document.getElementById('profile-city').value,
            picture: selectedAvatarUrl
        };
        
        try {
            const response = await fetch(`${API_URL}/users/${currentUser.email}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });
            const data = await response.json();
            
            if (response.ok) {
                currentUser = { ...currentUser, ...data };
                localStorage.setItem('edugrakUser', JSON.stringify(currentUser));
                login(currentUser); // Refresh UI
                closeProfileModal();
                showNotification({ title: 'Profil Diperbarui!', message: 'Data kamu telah berhasil disimpan.', type: 'success' });
            } else {
                throw new Error(data.message || 'Gagal memperbarui profil');
            }
        } catch (err) {
            console.error('Update Profile Error:', err);
            showNotification({ title: 'Gagal', message: 'Terjadi kesalahan saat menyimpan profil.', type: 'error' });
        }
    };
}

function selectAvatar(url) {
    selectedAvatarUrl = url;
    profileAvatarImg.src = url;
    document.querySelectorAll('.avatar-option').forEach(img => {
        img.classList.toggle('selected', img.src === url);
    });
}

function openProfileModal() {
    if (!currentUser) return;
    
    document.getElementById('profile-name').value = currentUser.name;
    document.getElementById('profile-email').value = currentUser.email;
    document.getElementById('profile-phone').value = currentUser.phone || '';
    
    // Setup region dropdowns with user's current data
    setupRegionDropdowns('profile-province', 'profile-city', currentUser.province || '', currentUser.city || '');
    
    selectedAvatarUrl = currentUser.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(currentUser.name)}`;
    profileAvatarImg.src = selectedAvatarUrl;
    
    selectAvatar(selectedAvatarUrl);
    
    profileModal.classList.remove('hidden');
    profileModal.classList.add('flex');
    setTimeout(() => {
        profileModalContent.classList.remove('scale-95', 'opacity-0');
        profileModalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeProfileModal() {
    profileModalContent.classList.remove('scale-100', 'opacity-100');
    profileModalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        profileModal.classList.add('hidden');
        profileModal.classList.remove('flex');
    }, 300);
}

window.onload = function () {
    initProfileModal();
};

function decodeJwtResponse(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function login(userData) {
    // Current user is the one returned from server
    currentUser = userData;
    
    // Save to localStorage for persistence across sessions
    localStorage.setItem('edugrakUser', JSON.stringify(currentUser));
    
    authContent.classList.add('hidden');
    if (landingContent) landingContent.classList.add('hidden');
    mainNav.classList.remove('hidden');

    document.getElementById('user-name').innerText = currentUser.name;
    document.getElementById('dropdown-user-name').innerText = currentUser.name;
    document.getElementById('dropdown-user-email').innerText = currentUser.email;
    
    const avatarUrl = currentUser.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(currentUser.name)}`;
    document.getElementById('user-avatar').src = avatarUrl;
    const dropdownAvatar = document.getElementById('dropdown-user-avatar');
    if (dropdownAvatar) dropdownAvatar.src = avatarUrl;
    
    showNotification({
        title: 'Selamat Datang!',
        message: `Halo ${currentUser.name}, kamu telah berhasil masuk.`,
        type: 'success'
    });
    
    const target = authContent.dataset.targetTab || 'dashboard';
    switchTab(target);
    delete authContent.dataset.targetTab;

    // Update Premium UI
    updatePremiumUI();
}

let currentSelectedPackage = null;
let currentAppliedCoupon = null;

function updatePremiumUI() {
    const label = document.getElementById('premium-status-label');
    const btnUpgrade = document.getElementById('btn-upgrade-premium');
    const badgeDropdown = document.getElementById('premium-badge-dropdown');
    
    if (currentUser && currentUser.isPremium) {
        label.innerText = 'Akun Aktif';
        label.className = 'text-[8px] uppercase tracking-widest text-emerald-500';
        if (badgeDropdown) badgeDropdown.classList.remove('hidden');
        
        btnUpgrade.onclick = () => {
            showNotification({
                title: 'Premium Aktif',
                message: 'Kamu sudah berlangganan EduGrak Premium. Selamat belajar!',
                type: 'success'
            });
        };
    } else {
        label.innerText = 'Upgrade Sekarang';
        label.className = 'text-[8px] uppercase tracking-widest text-amber-500';
        if (badgeDropdown) badgeDropdown.classList.add('hidden');
        btnUpgrade.onclick = openPremiumModal;
    }
}

function openPremiumModal() {
    if (!currentUser) {
        showLoginModal();
        return;
    }
    const modal = document.getElementById('premium-modal');
    const content = document.getElementById('premium-modal-content');
    
    // Render Packages
    const container = document.getElementById('premium-packages-container');
    const packages = appData.premiumPackages || [];
    
    if (packages.length > 0) {
        container.innerHTML = packages.map(pkg => `
            <div class="p-4 rounded-2xl border-2 transition-all cursor-pointer package-card ${currentSelectedPackage?.id === pkg.id ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-100'}" 
                 onclick="selectPremiumPackage('${pkg.id}')">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-black text-gray-900">${pkg.name}</p>
                        <p class="text-[10px] text-amber-600 font-bold uppercase">${pkg.duration} Hari Akses</p>
                    </div>
                    <p class="font-black text-gray-900 text-sm">Rp ${pkg.price.toLocaleString('id-ID')}</p>
                </div>
                ${currentSelectedPackage?.id === pkg.id && pkg.description ? `
                    <p class="mt-3 text-[10px] text-gray-500 font-medium leading-relaxed border-t border-amber-100 pt-3">${pkg.description}</p>
                ` : ''}
            </div>
        `).join('');
        if (!currentSelectedPackage) selectPremiumPackage(packages[0].id);
    } else {
        currentSelectedPackage = { id: 'default', name: 'Paket Juara', price: 49000, description: 'Akses penuh selama 30 hari.', features: ['all_soal', 'answer_keys'] };
    }

    // Update Features List based on selected package
    updatePremiumFeaturesList();
    updatePremiumPriceDisplay();

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);

    document.getElementById('btn-pay-premium').onclick = handlePremiumPayment;
    document.getElementById('btn-apply-coupon').onclick = applyCoupon;
}

function updatePremiumFeaturesList() {
    const featureContainer = document.querySelector('#premium-modal .space-y-3.mb-6');
    if (!featureContainer || !currentSelectedPackage) return;

    const featureLabels = {
        'all_soal': 'Akses Semua Bank Soal',
        'answer_keys': 'Lihat Kunci Jawaban & Pembahasan',
        'irt_analysis': 'Analisis IRT Real-time',
        'certificates': 'Sertifikat Tryout Nasional',
        'premium_videos': 'Video Materi Eksklusif'
    };

    const features = currentSelectedPackage.features || ['all_soal', 'answer_keys'];
    featureContainer.innerHTML = features.map(f => `
        <div class="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <div class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-[10px]">✓</div>
            <span class="text-[11px] font-bold text-gray-600">${featureLabels[f] || f}</span>
        </div>
    `).join('');
}

function selectPremiumPackage(id) {
    const pkg = appData.premiumPackages.find(p => p.id === id);
    if (pkg) {
        currentSelectedPackage = pkg;
        openPremiumModal(); // Re-render to show description and features
    }
}

function updatePremiumPriceDisplay() {
    if (!currentSelectedPackage) return;
    
    let price = currentSelectedPackage.price;
    if (currentAppliedCoupon) {
        if (currentAppliedCoupon.type === 'percentage') {
            price = price - (price * (currentAppliedCoupon.value / 100));
        } else {
            price = Math.max(0, price - currentAppliedCoupon.value);
        }
    }
    
    document.getElementById('premium-final-price').innerText = `Rp ${price.toLocaleString('id-ID')}`;
}

function applyCoupon() {
    const code = document.getElementById('coupon-input').value.trim().toUpperCase();
    const msg = document.getElementById('coupon-msg');
    
    if (!code) return;

    const coupon = (appData.coupons || []).find(c => c.code === code && c.isActive);
    
    msg.classList.remove('hidden');
    if (coupon) {
        currentAppliedCoupon = coupon;
        msg.innerText = `Kupon "${code}" berhasil dipasang!`;
        msg.className = 'text-[9px] font-bold mt-2 ml-3 text-emerald-600';
        updatePremiumPriceDisplay();
    } else {
        currentAppliedCoupon = null;
        msg.innerText = 'Kode kupon tidak valid atau sudah tidak aktif.';
        msg.className = 'text-[9px] font-bold mt-2 ml-3 text-rose-500';
        updatePremiumPriceDisplay();
    }
}

function closePremiumModal() {
    const modal = document.getElementById('premium-modal');
    const content = document.getElementById('premium-modal-content');
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300);
}

async function handlePremiumPayment() {
    if (!currentSelectedPackage) {
        showNotification({ title: 'Pilih Paket', message: 'Silakan pilih paket premium terlebih dahulu.', type: 'info' });
        return;
    }

    const btn = document.getElementById('btn-pay-premium');
    btn.disabled = true;
    btn.innerText = 'Memproses...';

    try {
        const response = await fetch(`${API_URL}/payment/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: currentUser.email,
                packageId: currentSelectedPackage.id,
                couponCode: currentAppliedCoupon?.code
            })
        });

        const transaction = await response.json();

        if (transaction.token) {
            window.snap.pay(transaction.token, {
                onSuccess: function(result) {
                    showNotification({ title: 'Pembayaran Berhasil!', message: 'Terima kasih! Akun kamu akan segera diaktifkan.', type: 'success' });
                    closePremiumModal();
                    // Update current user locally before reload
                    if (currentUser) {
                        currentUser.isPremium = true;
                        localStorage.setItem('edugrakUser', JSON.stringify(currentUser));
                    }
                    setTimeout(() => location.reload(), 2000);
                },
                onPending: function(result) {
                    showNotification({ title: 'Pembayaran Tertunda', message: 'Silakan selesaikan pembayaran kamu.', type: 'info' });
                },
                onError: function(result) {
                    showNotification({ title: 'Pembayaran Gagal', message: 'Maaf, terjadi kesalahan saat memproses pembayaran.', type: 'error' });
                    btn.disabled = false;
                    btn.innerText = 'Bayar Sekarang';
                },
                onClose: function() {
                    btn.disabled = false;
                    btn.innerText = 'Bayar Sekarang';
                }
            });
        } else {
            throw new Error(transaction.message || 'Gagal membuat transaksi');
        }
    } catch (err) {
        console.error('Payment Error:', err);
        btn.disabled = false;
        btn.innerText = 'Bayar Sekarang';
        showNotification({ 
            title: 'Koneksi Gagal', 
            message: 'Gagal terhubung ke server pembayaran. Pastikan backend sudah berjalan dan API Key Midtrans benar.', 
            type: 'error' 
        });
    }
}

function logout() {
    if (typeof google !== 'undefined') {
        google.accounts.id.disableAutoSelect();
    }
    currentUser = null;
    localStorage.removeItem('edugrakUser');
    authContent.classList.add('hidden');
    if (landingContent) landingContent.classList.remove('hidden');
    mainNav.classList.add('hidden');
    if (loginForm) loginForm.reset();
    switchTab('landing');
}

loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.status === 404) {
            showNotification({
                title: 'Akun Tidak Ditemukan',
                message: 'Email ini belum terdaftar. Silakan klik "Daftar Gratis" untuk membuat akun baru.',
                type: 'info'
            });
            return;
        }

        if (response.status === 401) {
            showNotification({
                title: 'Kata Sandi Salah',
                message: 'Kata sandi yang Anda masukkan tidak sesuai. Silakan coba lagi.',
                type: 'error'
            });
            return;
        }

        if (data.user) {
            login(data.user);
        }
    } catch (err) {
        console.error('Login Error:', err);
        showNotification({ title: 'Koneksi Gagal', message: 'Tidak dapat terhubung ke server. Pastikan backend sudah berjalan.', type: 'error' });
    }
};

function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('svg');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        `;
    } else {
        input.type = 'password';
        icon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        `;
    }
}

btnLogout.onclick = logout;

// --- REGISTRATION LOGIC ---
let generatedRegisterOTP = null;
let selectedRegisterAvatarUrl = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix';
let isEmailVerified = false;

// Initialize EmailJS with a public key (User needs to replace this)
(function() {
    // Note: EmailJS requires a Public Key to initialize. 
    // You can get one for free at https://www.emailjs.com/
    if (typeof emailjs !== 'undefined') {
        emailjs.init("tcKYlS5byGfAALU-u"); 
    }
})();

function showRegisterModal() {
    authContent.classList.add('hidden');
    const registerModal = document.getElementById('register-modal');
    const registerModalContent = document.getElementById('register-modal-content');
    const registerAvatarGrid = document.getElementById('register-avatar-grid');

    // Render Avatar Grid for Register
    registerAvatarGrid.innerHTML = '';
    AVATARS.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.className = 'w-10 h-10 rounded-full cursor-pointer border-2 border-transparent hover:border-emerald-500 transition-all';
        img.onclick = () => {
            selectedRegisterAvatarUrl = url;
            document.getElementById('register-avatar-preview').src = url;
            registerAvatarGrid.querySelectorAll('img').forEach(i => i.classList.remove('border-emerald-500'));
            img.classList.add('border-emerald-500');
        };
        registerAvatarGrid.appendChild(img);
    });

    registerModal.classList.remove('hidden');
    registerModal.classList.add('flex');
    
    // Setup region dropdowns for registration
    setupRegionDropdowns('register-province', 'register-city');

    setTimeout(() => {
        registerModalContent.classList.remove('scale-95', 'opacity-0');
        registerModalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeRegisterModal() {
    const registerModal = document.getElementById('register-modal');
    const registerModalContent = document.getElementById('register-modal-content');
    registerModalContent.classList.remove('scale-100', 'opacity-100');
    registerModalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        registerModal.classList.add('hidden');
        registerModal.classList.remove('flex');
    }, 300);
}

const btnRegSendOtp = document.getElementById('btn-register-send-otp');
if (btnRegSendOtp) {
    btnRegSendOtp.onclick = async () => {
        const email = document.getElementById('register-email').value;
        const username = document.getElementById('register-username').value;
        
        if (!email || !email.includes('@')) {
            showNotification({ title: 'Oops!', message: 'Masukkan email yang valid.', type: 'info' });
            return;
        }

        btnRegSendOtp.innerText = 'Mengirim...';
        btnRegSendOtp.disabled = true;

        // Generate 6-digit OTP
        generatedRegisterOTP = Math.floor(100000 + Math.random() * 900000).toString();

        // EmailJS template parameters
        const templateParams = {
            to_email: email,
            otp_code: generatedRegisterOTP,
            to_name: username || 'Calon Siswa'
        };

        try {
            await emailjs.send('service_0aja6p8', 'template_2ij5b7r', templateParams);
            
            showNotification({ 
                title: 'OTP Terkirim!', 
                message: 'Silakan cek email kamu di ' + email + ' (cek juga folder spam).', 
                type: 'success' 
            });
            document.getElementById('register-otp-container').classList.remove('hidden');
            btnRegSendOtp.innerText = 'Kirim Ulang';
            btnRegSendOtp.disabled = false;
        } catch (error) {
            console.error('EmailJS Error:', error);
            // Show the actual error message from EmailJS
            const errorMsg = error?.text || error?.message || 'Terjadi kesalahan teknis. Pastikan Service ID dan Template ID sudah benar di dashboard EmailJS.';
            showNotification({ 
                title: 'Gagal Mengirim Email', 
                message: errorMsg + '\n\n(OTP Tetap Muncul Untuk Testing: ' + generatedRegisterOTP + ')', 
                type: 'info' 
            });
            document.getElementById('register-otp-container').classList.remove('hidden');
            btnRegSendOtp.innerText = 'Kirim Ulang';
            btnRegSendOtp.disabled = false;
        }
    };
}

const btnRegVerifyOtp = document.getElementById('btn-register-verify-otp');
if (btnRegVerifyOtp) {
    btnRegVerifyOtp.onclick = () => {
        const inputOTP = document.getElementById('register-otp-input').value;
        if (inputOTP === generatedRegisterOTP && generatedRegisterOTP !== null) {
            isEmailVerified = true;
            showNotification({ title: 'Berhasil!', message: 'Email kamu telah terverifikasi.', type: 'success' });
            document.getElementById('register-otp-container').classList.add('hidden');
            
            const btnSend = document.getElementById('btn-register-send-otp');
            btnSend.innerText = 'Terverifikasi ✓';
            btnSend.className = 'px-6 py-4 bg-emerald-500 text-white rounded-2xl font-black cursor-default whitespace-nowrap';
            btnSend.disabled = true;
            document.getElementById('register-email').disabled = true;
            
            const btnComplete = document.getElementById('btn-complete-register');
            btnComplete.disabled = false;
            btnComplete.className = 'w-full py-5 bg-emerald-600 text-white rounded-[24px] font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 mt-8';
        } else {
            showNotification({ title: 'Gagal!', message: 'Kode OTP salah. Coba lagi.', type: 'error' });
        }
    };
}

const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.onsubmit = async (e) => {
        e.preventDefault();
        if (!isEmailVerified) {
            showNotification({ title: 'Verifikasi Diperlukan', message: 'Silakan verifikasi email kamu terlebih dahulu.', type: 'info' });
            return;
        }

        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const phone = document.getElementById('register-phone').value;
        const province = document.getElementById('register-province').value;
        const city = document.getElementById('register-city').value;
        const password = document.getElementById('register-password').value;

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: username,
                    email: email,
                    phone: phone,
                    province: province,
                    city: city,
                    password: password,
                    picture: selectedRegisterAvatarUrl
                })
            });

            const data = await response.json();

            if (response.status === 400) {
                showNotification({ title: 'Email Terdaftar', message: 'Email ini sudah digunakan. Silakan gunakan email lain.', type: 'error' });
                return;
            }

            if (response.status === 201) {
                showNotification({ title: 'Akun Berhasil Dibuat!', message: 'Selamat datang di EduGrak, ' + username + '!', type: 'success' });
                closeRegisterModal();
                login(data);
            }
        } catch (err) {
            console.error('Registration Error:', err);
            showNotification({ title: 'Koneksi Gagal', message: 'Tidak dapat terhubung ke server.', type: 'error' });
        }
    };
}

// --- END REGISTRATION LOGIC ---

// Initial UI
hideAllSections();
updateUI();
renderLeaderboard('nasional');

// Check for existing session
const savedUser = localStorage.getItem('edugrakUser');
if (savedUser) {
    currentUser = JSON.parse(savedUser);
    login(currentUser);
} else {
    if (landingContent) landingContent.classList.remove('hidden');
    authContent.classList.add('hidden');
    mainNav.classList.add('hidden');
}

// Handle Reset Password Token from URL
const urlParams = new URLSearchParams(window.location.search);
const resetToken = urlParams.get('resetToken');
if (resetToken) {
    showResetPasswordModal(resetToken);
}

// Forgot Password Logic
function showForgotPasswordModal() {
    hideLoginModal();
    const modal = document.getElementById('forgot-password-modal');
    const content = document.getElementById('forgot-password-content');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeForgotPasswordModal() {
    const modal = document.getElementById('forgot-password-modal');
    const content = document.getElementById('forgot-password-content');
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        showLoginModal();
    }, 300);
}

const forgotPasswordForm = document.getElementById('forgot-password-form');
if (forgotPasswordForm) {
    forgotPasswordForm.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;
        const btn = forgotPasswordForm.querySelector('button');
        btn.disabled = true;
        btn.innerText = 'Mengirim...';

        try {
            const response = await fetch(`${API_URL}/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (response.ok) {
                showNotification({ title: 'Email Terkirim', message: 'Silakan cek email kamu untuk link reset password.', type: 'success' });
                closeForgotPasswordModal();
            } else {
                showNotification({ title: 'Gagal', message: data.message || 'Terjadi kesalahan.', type: 'error' });
            }
        } catch (err) {
            console.error(err);
            showNotification({ title: 'Error', message: 'Gagal menghubungi server.', type: 'error' });
        } finally {
            btn.disabled = false;
            btn.innerText = 'Kirim Link Reset';
        }
    };
}

// Reset Password Logic
function showResetPasswordModal(token) {
    const modal = document.getElementById('reset-password-modal');
    const content = document.getElementById('reset-password-content');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);

    const form = document.getElementById('reset-password-form');
    form.onsubmit = async (e) => {
        e.preventDefault();
        const newPassword = document.getElementById('new-password').value;
        const btn = form.querySelector('button');
        btn.disabled = true;
        btn.innerText = 'Menyimpan...';

        try {
            const response = await fetch(`${API_URL}/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword })
            });
            const data = await response.json();
            if (response.ok) {
                showNotification({ title: 'Berhasil', message: 'Password kamu telah diperbarui. Silakan login.', type: 'success' });
                // Clean URL
                window.history.replaceState({}, document.title, "/index.html");
                location.reload();
            } else {
                showNotification({ title: 'Gagal', message: data.message || 'Terjadi kesalahan.', type: 'error' });
            }
        } catch (err) {
            console.error(err);
            showNotification({ title: 'Error', message: 'Gagal menghubungi server.', type: 'error' });
        } finally {
            btn.disabled = false;
            btn.innerText = 'Simpan Password';
        }
    };
}
