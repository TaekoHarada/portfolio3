import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  appLink: string;
  gitHubLink: string;
}

// Hover zoom effect (larger screens)
// horizontal scroll (smaller screens)
const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  appLink,
  gitHubLink,
}) => {
  return (
    <div className="project-card relative hover:scale-105 transform transition-all duration-300">
      <div className="text-customGray grid place-items-center my-5">
        <Link href={appLink} target="_blank">
          <img
            src={imageUrl}
            alt={title}
            className="w-[180px] h-full sm:w-[300px] sm:h-full lg:w-[330px] lg:h-full"
          ></img>
        </Link>

        <div className="mt-4 mb-3 text-lg hover-underline-animation px-5">
          <Link href={appLink} target="_blank">
            <p>{title}</p>
          </Link>
        </div>
        <div className="mt-3 mb-3">
          <p className="px-10 text-center">{description}</p>
        </div>
        <div className=" text-gray-800 hover:opacity-70">
          <Link href={gitHubLink} target="_blank">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
