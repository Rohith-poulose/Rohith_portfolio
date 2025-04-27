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

        // Attach the scroll animation only AFTER skills are loaded
        window.addEventListener('scroll', animateSkills);
    });

    function animateSkills() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return; // Safety check

        const sectionTop = skillsSection.offsetTop;
        const sectionHeight = skillsSection.offsetHeight;
        const scrollPos = window.scrollY + window.innerHeight;

        if (scrollPos > sectionTop + 100) {
            document.querySelectorAll('.skill-level').forEach(bar => {
                bar.style.width = bar.getAttribute('data-level');
            });
            window.removeEventListener('scroll', animateSkills); // Remove after animating once
        }
    }
});

// jQuery should be included already
$(document).ready(function() {
    // Attach submit event to your form
    $("#contact-form").submit(function(e) {
        e.preventDefault(); // Prevent the default form action

        // Get the form data
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();

        popup();

        // Simulate a 3-second wait for sending the message
        setTimeout(function() {
            $('#popup-message').text('Your message has been sent successfully!'); // Update the message
        }, 2000); // 3 seconds delay

        // After another 3 seconds, hide the popup and loader
        setTimeout(function() {
            $('#popup-container').fadeOut(); // Hide the entire popup
            $('#loading-spinner').fadeOut(); // Hide the loading spinner
        }, 3000); // 6 seconds (3 seconds + 3 seconds)

        // Perform the AJAX request to the Google Apps Script Web App
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycby7L5XaeZaXhCjyWrGcN7XDrHePlAdHMg6dUNbsmVMGglYGZoPx0RONV4rf3PBNHt3ZXg/exec", // Your Google Apps Script Web App URL
            type: "POST",
            data: {
                name: name,
                email: email,
                message: message
            },
            success: function(response) {
                // Clear the input fields on success
                $("#name").val('');
                $("#email").val('');
                $("#message").val('');

                // Optionally, you can add a success alert or message here
                console.log("Message sent successfully!");
            },
            error: function(error) {
                // Clear the input fields on error
                $("#name").val('');
                $("#email").val('');
                $("#message").val('');

                // Optionally, you can add an error alert or message here
                console.log("Error sending message!");
            }
        });
    });
      // Function to show the popup and loader
      function popup() {
        $('#popup-container').show(); // Show the popup container
        $('#popup-message').text('Your message is sending...'); // Show the initial message
        $('#loading-spinner').show(); // Show the loading spinner
    }
});

$(document).ready(function () {
    // Toggle the menu visibility on hamburger click
    $(".menu-toggle").click(function () {
        $(".nav-links").toggleClass("active");
    });
});

console.log("Script is loaded");
    