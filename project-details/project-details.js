// Get project id from URL
const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');

// Connect to your backend
fetch(`http://localhost:3000/projects/${projectId}`)
  .then(response => response.json())
  .then(data => {
    const detailsContainer = document.getElementById('project-details');
    detailsContainer.innerHTML = `
      <h1>${data.title}</h1>
      <img src="${data.image}" alt="${data.title}" />
      <p>${data.description}</p>
      <h3>Tools Used:</h3>
      <p>${data.tools}</p>
    `;
  })
  .catch(error => {
    console.error('Error loading project:', error);
    document.getElementById('project-details').innerHTML = "<p>Project not found.</p>";
  });
