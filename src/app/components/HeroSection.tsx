import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faSquareGithub } from "@fortawesome/free-brands-svg-icons";

const HeroSection: React.FC = () => {
  return (
    <section
      id="Hero."
      className="hero-section sm:h-screen grid place-items-center pt-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 px-10 sm:px-20">
        <div className="col-span-6 place-self-center">
          <h1 className="text-customGray text-2xl sm:text-3xl lg:text-4xl mb-5 font-semibold fadeLeft">
            Hello, I am Taeko.
          </h1>

          <div className="text-customGray text-lg lg:text-xl sm:mt-8 sm:mb-12 fadeLeft">
            With a background as a System and Application Administrator in Japan
            and recent graduation from the Software Development program at SAIT
            in Calgary, I am passionate about contributing to IT systems and
            software development to help businesses grow efficiently.
          </div>

          <div className="flex flex-wrap items-center mt-5 fadeLeft">
            {/* <div className="mr-5">
              <Link
                href="./docs/Resume-TaekoHarada.pdf"
                target="_blank"
                rel="Resume-Taeko-Harada"
              >
                <div className="bg-btnBlue hover:opacity-85 text-white px-5 py-2 rounded-lg border flex">
                  <p className="pr-3">Resume</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                </div>
              </Link>
            </div> */}
            <div className="flex mt-3 sm:mt-0">
              <div className="mr-2 text-gray-800 hover:opacity-70">
                <Link
                  href="https://www.linkedin.com/in/taeko-harada/"
                  target="_blank"
                  rel="LindedIn Taeko Harada"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </Link>
              </div>
              <div className="mr-2 text-gray-800 hover:opacity-70">
                <Link
                  href="https://github.com/TaekoHarada"
                  target="_blank"
                  rel="GitHub Taeko Harada"
                >
                  <FontAwesomeIcon icon={faSquareGithub} size="2x" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-6 place-self-center m-10 lg:m-0 fadeIn">
          {/* YouTube Movie Section */}
          <div className="w-full aspect-video fadeLeft">
            <iframe
              src="https://www.youtube.com/embed/sUYDcfNTcgg"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              height={315}
              // className="rounded-lg"
            ></iframe>
          </div>
          {/*         
          <div className="rounded-full bg-[#e1f0ff] bg-opacity-70 p-3">
            <img
              src="/images/portrait.png"
              alt="My portrait"
              className="w-[115px] h-[115px] sm:w-[200px] sm:h-[200px] rounded-full "
            ></img>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
