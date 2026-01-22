document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const projectKey = params.get("project");

  const projectsData = {
    "data-center": {
      title: "Data Center Projects",
      subtitle: "High-performance BIM delivery for mission-critical infrastructure",
      images: [
        "assets/images/projects/data-center-1.png",
        "assets/images/projects/data-center-2.png"
      ],
      points: [
        "Zero-clash, construction-ready BIM models supporting fast-track delivery",
        "C&S, MEP, HVAC, and Fire Protection BIM services delivered",
        "On-site BIM coordination support during construction",
        "As-built BIM models and post-construction drawings",
        "OEM documentation support for asset handover and operations"
      ]
    },

    "stadium": {
      title: "Sports Stadiums",
      subtitle: "Large-scale BIM coordination for complex public venues",
      images: [
        "assets/images/projects/stadium-1.png",
        "assets/images/projects/stadium-2.png"
      ],
      points: [
        "BIM support delivered for a large-scale international stadium",
        "36-week coordinated design delivery",
        "MEP, HVAC, and Fire Protection coordination",
        "Managed complex spatial and interface requirements",
        "Models delivered in compliance with international standards",
        "Issued coordinated sheet drawings"
      ]
    },

    "power-plant": {
      title: "Pertamina Power Plant",
      subtitle: "Industrial BIM delivery for energy infrastructure",
      images: [
        "assets/images/projects/powerplant-1.png",
        "assets/images/projects/powerplant-2.png"
      ],
      points: [
        "18-week design delivery for industrial power plant",
        "Process, C&S, Electrical, Plumbing, and MEP BIM services",
        "3D piping and multidisciplinary coordination",
        "Constructability-driven BIM workflows",
        "High-accuracy models supporting fabrication and installation"
      ]
    },

    "automated-kitchen": {
      title: "Automated Kitchen Facility",
      subtitle: "LOD 500 BIM for high-efficiency food production facilities",
      images: [
        "assets/images/projects/kitchen-1.png",
        "assets/images/projects/kitchen-2.png"
      ],
      points: [
        "LOD 500 BIM model delivered within 2800 man-hours",
        "Architectural, structural, MEP, and automation coordination",
        "Clash-free, construction-ready BIM models",
        "Material take-offs and scheduling support",
        "Optimized workflow and spatial utilization"
      ]
    },

    "institutional": {
      title: "Institutional Buildings",
      subtitle: "Integrated BIM for education and public infrastructure",
      images: [
        "assets/images/projects/institutional-1.png",
        "assets/images/projects/institutional-2.png"
      ],
      points: [
        "LOD 300 BIM model delivered within 2000 man-hours",
        "Architectural, structural, and MEP coordination",
        "Construction-ready BIM supporting quantity take-offs",
        "Improved collaboration and reduced rework",
        "Accurate documentation for execution"
      ]
    },

    "water-treatment": {
      title: "Water Treatment Plants",
      subtitle: "BIM solutions for complex process and utility infrastructure",
      images: [
        "assets/images/projects/wtp-1.png",
        "assets/images/projects/wtp-2.png"
      ],
      points: [
        "LOD 300 BIM model delivered within 2000 man-hours",
        "Complex piping and equipment layout coordination",
        "Integrated civil, mechanical, and electrical BIM workflows",
        "Accurate documentation for installation and commissioning",
        "Optimized spatial and process planning"
      ]
    }
  };

  const project = projectsData[projectKey];

  // ❌ Invalid or missing project
  if (!project) {
    document.getElementById("projectTitle").textContent = "Project Not Found";
    document.getElementById("projectSubtitle").textContent =
      "The requested project does not exist.";
    return;
  }

  // ✅ Populate header
  document.getElementById("projectTitle").textContent = project.title;
  document.getElementById("projectSubtitle").textContent = project.subtitle;
  document.getElementById("breadcrumbProject").textContent = project.title;

  // ✅ Populate images
  const imageContainer = document.getElementById("projectImages");
  project.images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = project.title;
    imageContainer.appendChild(img);
  });

  // ✅ Populate bullet points
  const pointsContainer = document.getElementById("projectPoints");
  project.points.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    pointsContainer.appendChild(li);
  });
});
