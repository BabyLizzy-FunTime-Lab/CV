let skillLevels = {
    "html": 70,
    "javascript": 70,
    "css": 70,
    "php": 70,
    "vue": 60,
    "ionic": 60,
    "node": 50,
    "express": 50,
    "php-storm": 50,
    "laravel": 60,
    "sql": 50,
    "github": 50,
    "bootstrap": 55,
    "scrum": 50,
    "pug": 30,
    "jquery": 35,
    "twig": 40,
    "symphony": 35,
    "doctrine": 35,
    "shopware": 35,
    "ddev": 35,
    "zendesk": 50,
    "magento": 35,
    "confluence": 50,
    "project-based-work": 70,
    "critical-thinking": 75,
    "clinical-reasoning": 65,
    "self-reflection": 75,
}

let bars = document.querySelectorAll(".skill-bar__lv");

let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let skill = entry.target.dataset.skill;
            let level = skillLevels[skill] || 0;
            entry.target.style.width = level + '%';
        } else {
            entry.target.style.width = '0%';
        }
    })
},{ threshold: 0.5 });

bars.forEach(bar => observer.observe(bar));