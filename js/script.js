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
        <a href="project-details.html?id=1">
        <img src="${project.image_url}" alt="${project.title}">
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <a href="${project.link}" target="_blank">Read more →</a>
        </div>
        </a>
      `;
        projectGrid.appendChild(projectCard);
    });
}


// Load projects on page load
loadProjects();

