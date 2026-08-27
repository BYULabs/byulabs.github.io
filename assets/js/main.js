// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
html.classList.remove('light', 'dark');
html.classList.add(savedTheme);

themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.remove('light');
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});

// GitHub language colors
const langColors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C': '#555555',
    'C#': '#178600',
    'Shell': '#89e051',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'SCSS': '#c6538c',
    'Jupyter Notebook': '#DA5B0B',
    'Dart': '#00B4AB',
    'Swift': '#F05138',
    'Kotlin': '#A97BFF',
    'Lua': '#000080',
    'Vim script': '#199f4b',
    'Dockerfile': '#384d54',
    'Makefile': '#427819',
    
    // --- Added Languages ---
    'EJS': '#a31f34',
    'HTML+EJS': '#a31f34',
    'Vue': '#41b883',
    'Svelte': '#ff3e00',
    'JavaScript React': '#61dafb',
    'TypeScript React': '#3178c6',
    'JSON': '#292929'
};

// State
let repos = [];
let currentSort = 'updated';

// Fetch repos
async function fetchRepos() {
    try {
        // Direct fetch to user endpoint to avoid wasting rate limits on 404s
        const response = await fetch('https://api.github.com/users/byulabs/repos?per_page=100&sort=updated');
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);

        repos = await response.json();

        // List the repositories you want to hide
        const excludedRepos = ['.github', 'byulabs.github.io'];

        // Filter out forks and excluded repositories
        repos = repos.filter(r => !r.fork && !excludedRepos.includes(r.name));

        updateStats();
        sortAndRender(currentSort);
    } catch (err) {
        console.error('Failed to fetch repos:', err);
        document.getElementById('repoGrid').classList.add('hidden');
        document.getElementById('errorState').classList.remove('hidden');
        
    }
}

function updateStats() {
    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
    const langs = new Set(repos.map(r => r.language).filter(Boolean));
    document.getElementById('totalRepos').textContent = repos.length;
    document.getElementById('totalStars').textContent = totalStars;
    document.getElementById('totalLangs').textContent = langs.size;
}

function sortAndRender(sortBy) {
    currentSort = sortBy;

    let sorted = [...repos];
    if (sortBy === 'updated') {
        sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    } else if (sortBy === 'stars') {
        sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortBy === 'name') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Slice the array to only get the top 10 items after sorting
    const top10Repos = sorted.slice(0, 10);

    renderRepos(top10Repos);
}

function timeAgo(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(months / 12);
    return `${years}y ago`;
}

function renderRepos(sortedRepos) {
    const grid = document.getElementById('repoGrid');
    grid.innerHTML = '';
    grid.classList.remove('hidden');
    document.getElementById('errorState').classList.add('hidden');

    if (sortedRepos.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12 dark:text-gray-500 light:text-gray-400">
                <i data-lucide="inbox" class="w-10 h-10 mx-auto mb-3 opacity-50"></i>
                <p class="text-sm">No public repositories found.</p>
            </div>
        `;
        
        return;
    }

    sortedRepos.forEach(repo => {
        const langColor = langColors[repo.language] || '#8b949e';
        const card = document.createElement('a');
        card.href = repo.html_url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.className = 'repo-card block dark:bg-gray-800/30 light:bg-white border dark:border-gray-800 light:border-gray-200 rounded-xl p-5';

        card.innerHTML = `
            <div class="flex items-start justify-between mb-2">
                <h3 class="font-bold text-sm accent-text truncate mr-2">${repo.name}</h3>
                <div class="flex items-center gap-1 flex-shrink-0 dark:text-gray-500 light:text-gray-400">
                    <i data-lucide="star" class="w-3.5 h-3.5"></i>
                    <span class="text-xs">${repo.stargazers_count}</span>
                </div>
            </div>
            <p class="dark:text-gray-400 light:text-gray-600 text-xs leading-relaxed mb-4 line-clamp-2" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                ${repo.description || 'No description provided.'}
            </p>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    ${repo.language ? `
                        <div class="flex items-center gap-1.5">
                            <span class="lang-dot" style="background-color: ${langColor}"></span>
                            <span class="text-[11px] dark:text-gray-400 light:text-gray-500">${repo.language}</span>
                        </div>
                    ` : ''}
                    ${repo.fork ? `
                        <div class="flex items-center gap-1 dark:text-gray-500 light:text-gray-400">
                            <i data-lucide="git-fork" class="w-3 h-3"></i>
                        </div>
                    ` : ''}
                </div>
                <span class="text-[10px] dark:text-gray-600 light:text-gray-400">Updated ${timeAgo(repo.updated_at)}</span>
            </div>
        `;

        grid.appendChild(card);
    });

    
}

// Sort buttons
document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        sortAndRender(btn.dataset.sort);
    });
});

// Scroll fade-in
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
fadeElements.forEach(el => observer.observe(el));

// Fetch on load
fetchRepos();
