import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faCode,
  faBriefcase,
  faGraduationCap,
  faAward,
} from "@fortawesome/free-solid-svg-icons";

const AboutSection: React.FC = () => {
  return (
    <section
      id="About."
      className="about-section lg:h-screen grid place-items-center px-3 pt-0"
    >
      <div>
        <h2 className="text-2xl w-full text-center my-10 bold">About me</h2>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="bg-white rounded-lg shadow p-10 col-span-7 lg:mr-5">
            <div className="flex items-center">
              <div className="w-5 mr-2 text-gray-800">
                <FontAwesomeIcon icon={faBriefcase} />
              </div>
              <div className="text-lg">Experiences</div>
            </div>
            <ul className="mt-5 ml-7">
              <li className="mb-2">Math Tutor (May 2011 - Dec 2011)</li>
              <li className="mb-2">
                System Administrator (Feb 2009 - Feb 2011)
              </li>
              <li className="mb-2">
                Flash ActionScript Coder (Oct 2007 - Jan 2009)
              </li>
              <li className="mb-2">Web Designer (2007)</li>
              <li className="mb-2">System Architect</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-10 col-span-5 mt-5 lg:mt-0">
            <div className="flex items-center">
              <div className="w-6 mr-2 text-gray-800">
                <FontAwesomeIcon icon={faCode} />
              </div>
              <div className="text-lg">Skills</div>
            </div>
            <ul className="mt-5 ml-7">
              <li className="mb-2">
                JavaScript, TypeScript - React, Next.js, Node.js
              </li>
              <li className="mb-2">Python</li>
              <li className="mb-2">Java - Selenium</li>
              <li className="mb-2">Linux</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 mt-5">
          <div className="bg-white rounded-lg shadow p-10 col-span-7 lg:mr-5">
            <div className="flex items-center">
              <div className="w-6 mr-2 text-gray-800">
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>
              <div className="text-lg">Education</div>
            </div>
            <ul className="mt-5 ml-7">
              <li className="mb-2">
                <p>
                  <span className="font-semibold">Software Development</span>:
                  2-year Diploma
                </p>
                <p className="pl-10">
                  at Southern Alberta Institute of Technology (SAIT)
                </p>
              </li>
              <li className="mb-2">
                <p>
                  <span className="font-semibold">Applied Mathematics</span>:
                  Bachelor of Science
                </p>
                <p className="pl-10">at Osaka Women&apos;s University</p>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-10 col-span-5 mt-5 lg:mt-0">
            <div className="flex items-center">
              <div className="w-5 mr-2 text-gray-800">
                <FontAwesomeIcon icon={faAward} />
              </div>
              <div className="text-lg">Certifications</div>
            </div>
            <ul className="mt-5 ml-7">
              <li className="mb-2">Google IT Support Specialist (2025)</li>
              <li className="mb-2">
                AZ-900 Microsoft Azure Fundamentals (2025)
              </li>
              <li className="mb-2">AWS Cloud Practitioner (2024)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
