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





// document.getElementById('contact-form').addEventListener('submit', function(e) {
//     e.preventDefault(); // Prevent the default form submission

//     var form = e.target;
//     var popup = document.getElementById('popup');
//     var loader = document.getElementById('loader');
//     var popupMessage = document.getElementById('popup-message');

//     // Show the popup and loader
//     popup.style.display = 'block';

//     // Start form submission (simulate form submission with timeout for demo purposes)
//     setTimeout(function() {
//         // Hide the loader after 3 seconds
//         loader.style.display = 'none';
//         popupMessage.innerHTML = 'Your request has been successfully sent!';
        
//         // Simulate form data submission (replace with your actual form submission code)
//         // e.g., send the form data to the server, Google Sheets, etc.

//         // Clear the form after 2 seconds
//         setTimeout(function() {
//             form.reset(); // Clear all form inputs
//             popup.style.display = 'none'; // Hide the popup after 2 seconds
//         }, 2000);
//     }, 3000); // Simulating a delay of 3 seconds for form submission
// });
// jQuery should be included already
$(document).ready(function() {
    $("#contact-form").submit(function(e) {
        e.preventDefault(); // Prevent form from submitting the traditional way (refresh)

        // Debugging: Check if the event is properly triggered
        console.log('Form submission intercepted.');

        // Show the "Sending..." message
        $("#display").html("Sending...⏳");

        var formData = {
            name: $("#name").val(),
            email: $("#email").val(),
            message: $("#message").val()
        };

        // Make AJAX request
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbwXJLLzdESNDF-oJ5-WApTUObP_kKXmL2bvPUEHGTqfhdWP9HPpladA-_50rshyNHCgkA/exec",
            type: "POST",
            data: formData,
            success: function(response) {
                $("#display").html("✅ Message Sent Successfully!");
                // Clear the form fields after success
                $("#name").val('');
                $("#email").val('');
                $("#message").val('');

                // Hide the success message after 3 seconds
                setTimeout(function() {
                    $("#display").fadeOut();
                }, 3000);
            },
            error: function(error) {
                $("#display").html("❌ Error! Please try again.");
            }
        });
        
    });
});console.log("Script is loaded");
    