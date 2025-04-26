var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents")
function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove('active-link');
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove('active-tab');
    }
    event.currentTarget.classList.add('active-link')
    document.getElementById(tabname).classList.add('active-tab');
}

async function loadProjects() {
    const response = await fetch('getProjects.php');
    const projects = await response.json();

    const projectGrid = document.getElementById('projectGrid');
    projectGrid.innerHTML = ''; // Clear old content

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
        <img src="${project.image_url}" alt="${project.title}">
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <a href="${project.link}" target="_blank">Read more →</a>
        </div> 
      `;
        projectGrid.appendChild(projectCard);
    });
}


// Load projects on page load
loadProjects();

document.addEventListener('DOMContentLoaded', () => {
    const skillsContainer = document.getElementById('skillsContainer');

    fetch('fetch_skills.php')
    .then(response => response.json())
    .then(data => {
        let currentCategory = '';
        data.forEach(skill => {
            if (currentCategory !== skill.category) {
                currentCategory = skill.category;
                skillsContainer.innerHTML += `<h3 class="skill-category">${currentCategory}</h3>`;
            }
            skillsContainer.innerHTML += `
                <div class="skill">
                    <div class="skill-name">${skill.skill_name}</div>
                    <div class="skill-bar">
                        <div class="skill-level" style="width: 0%;" data-level="${skill.skill_level}%"></div>
                    </div>
                </div>
            `;
        });
    });

    // Animate progress bars on scroll
    function animateSkills() {
        const skillsSection = document.getElementById('skills');
        const sectionTop = skillsSection.offsetTop;
        const sectionHeight = skillsSection.offsetHeight;
        const scrollPos = window.scrollY + window.innerHeight;

        if (scrollPos > sectionTop + 100) {
            document.querySelectorAll('.skill-level').forEach(bar => {
                bar.style.width = bar.getAttribute('data-level');
            });
            window.removeEventListener('scroll', animateSkills);
        }
    }

    window.addEventListener('scroll', animateSkills);
});
