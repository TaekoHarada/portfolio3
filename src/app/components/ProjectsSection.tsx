import React from "react";
import ProjectCard from "./ProjectCard";

// Common background image for all projects
const PROJECT_BG_IMAGE = "/images/project_.png";

// Project List
const projects = [
  {
    id: 1,
    title: "Test and CI/CD for Web Application",
    description:
      "Develop a Todo List App to experiment with CI/CD and test automations",
    appLink: "/docs/DemoProject_TestCICD.pdf",
    gitHubLink: "https://github.com/TaekoHarada/todo-fullstack-Docker.git",
  },
  {
    id: 2,
    title: "SauceDemo Test",
    description: "Selenium Grid to test SauceDemo applications",
    appLink: "/docs/DemoProject_SeleniumGrid.pdf",
    gitHubLink: "https://github.com/TaekoHarada/MultiBrowserTestSaucedemo",
  },
  {
    id: 3,
    title: "Expense Tracker",
    description: "CRUD App (React + TypeScript + Firebase + bootstrap 5)",
    appLink: "https://expense-tracker-8205b.web.app/",
    gitHubLink: "https://github.com/TaekoHarada/expense_tracker",
  },
  // {
  //   id: 4,
  //   title: "Let's Cook!",
  //   description: "Recipe search web app by React. Fetch from spoonacular API",
  //   appLink: "https://lets-cook-mu.vercel.app/",
  //   gitHubLink: "https://github.com/TaekoHarada/lets_cook",
  // },
  // {
  //   id: 5,
  //   title: "Job Board",
  //   description: "CRUD App. Routing by React Router.",
  //   appLink: "https://job-board-three-kappa.vercel.app/",
  //   gitHubLink: "https://github.com/TaekoHarada/job_board.git",
  // },
];

const ProjectsSection: React.FC = () => {
  return (
    <section
      id="Projects."
      className="project-section grid place-items-center pt-20"
    >
      <div>
        <h2 className="text-2xl w-full text-center my-10 bold">Projects</h2>
        <div className="rounded-xl">
          <ul className="grid md:grid-cols-3 gap-8 md:gap-12">
            {projects.map((project) => (
              <li key={project.id}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  imageUrl={PROJECT_BG_IMAGE}
                  appLink={project.appLink}
                  gitHubLink={project.gitHubLink}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
