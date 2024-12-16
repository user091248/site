// Function to fetch and display GitHub repositories
const fetchProjects = async () => {
    try {
        const reposResponse = await fetch('https://api.github.com/users/code-zm/repos?sort=stars');
        const repos = await reposResponse.json();

        const projectsContainer = document.getElementById('projects');

        repos.forEach(async (repo) => {
            const languagesResponse = await fetch(repo.languages_url);
            const languages = await languagesResponse.json();

            // Calculate language proportions
            const total = Object.values(languages).reduce((sum, val) => sum + val, 0);
            const languageBars = Object.entries(languages).map(([lang, val]) => ({
                lang,
                proportion: (val / total) * 100,
                color: getLanguageColor(lang)
            }));

            // Generate Language Bar
            const languageBar = languageBars.map(lang => `
                <div style="width: ${lang.proportion}%; background-color: ${lang.color};"></div>
            `).join("");

            // Generate Language List
            const languageList = languageBars.map(lang => `
                <div class="language-item">
                    <div class="language-color" style="background-color: ${lang.color};"></div>
                    <span>${lang.lang}</span>
                </div>
            `).join("");

            // Build Card
            const card = document.createElement('div');
            card.classList.add('card', 'bg-dark-secondary', 'text-light', 'p-4');
            card.style.width = '100%';

            card.innerHTML = `
                <div class="card-body">
                    <h3 class="card-title text-accent">${repo.name}</h3>
                    <p class="card-text">${repo.description || 'No description available.'}</p>
                    <p class="stars-text mb-2">
                        <strong>Stars:</strong> ⭐ ${repo.stargazers_count}
                    </p>
                    <h6 class="text-accent">Languages:</h6>
                    <div class="language-bar">${languageBar}</div>
                    <div class="language-list">${languageList}</div>
                    <a href="${repo.html_url}" target="_blank" class="btn btn-accent mt-3">View on GitHub</a>
                </div>
            `;

            projectsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
    }
};

// Function to assign colors to programming languages
const getLanguageColor = (language) => {
    const colors = {
        HTML: "#e34c26",
        JavaScript: "#f1e05a",
        Python: "#3572A5",
        CSS: "#563d7c",
        Shell: "#89e051",
        Default: "#ccc"
    };
    return colors[language] || colors["Default"];
};

// Fetch projects on page load
document.addEventListener('DOMContentLoaded', fetchProjects);

