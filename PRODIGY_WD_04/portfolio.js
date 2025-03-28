document.addEventListener("DOMContentLoaded", () => {
    const aboutText = "I am a passionate web developer with experience in HTML, CSS, JavaScript, and modern frameworks.";
    document.getElementById("about-text").textContent = aboutText;

    const projects = [
        { name: "Project One", description: "A web application for managing tasks." },
        { name: "Project Two", description: "An e-commerce platform with React." },
        { name: "Project Three", description: "A portfolio website showcasing my work." }
    ];

    const projectsList = document.getElementById("projects-list");
    projects.forEach(project => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.innerHTML = `<h3>${project.name}</h3><p>${project.description}</p>`;
        projectsList.appendChild(projectDiv);
    });
});
