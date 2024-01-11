import React from "react";
import MonorepoIndex from "./monorepoClient/MonorepoIndex";
import RouteList from "./routes/routeList";
import ProfilePage from "./components/profilePage/profilePage";

const dataProfile = {
  personalDetail: {
    fullName: `Sagar Jaiswal`,
    headline: `Frontend developer focused on creating clean, reusable code for enhanced readability and maintainability`,
  },
  socialDetail: {
    address: {
      colony: `81, Sonagiri`,
      city: `Bhopal, India`,
    },
    phoneNumber: `+918959829465`,
    gmail: "sagarjaiswal81555@gmail.com",
    githubLink: `https://github.com/isagarjaiswal`,
    linkedInLink: `https://www.linkedin.com/in/sagar-jaiswal-b35bb321b/`,
  },
  experienceData: [
    {
      companyName: `HackerKernel`,
      companyLocation: `Bhopal, M.P.`,
      role: `SDE ~ 1`,

      startDate: `May 2023`,
      endDate: `PRESENT`,
      description: [
        `Creating REST APIs using NodeJs with ExpressJs, and using MongoDB as Database`,
        `Implemented authentication flow using JWTs, Salting and then Hashing with bcrypt with SHA256 algo, and through cookies.`,
        `Implemented protected routes in React and protected and user-only APIs in Node by adding express.js middlewares`,
        `Wrote custom hook in React for getting API data in a fixed format, also for changing UI elements on "resize" event`,
      ],
      techStack: [`React`, `JavaScript`, `TypeScript`, `CSS(SCSS)`, `Git`],
    },
    {
      companyName: `HackerKernel`,
      companyLocation: `Bhopal, M.P.`,
      startDate: `Oct 2022`,
      endDate: `May 2023`,
      role: `Software Engineer-Intern`,
      description: [
        `Writing React functional components, using built-in hooks.`,
        `Extensive use of hooks such as useState, useEffect, useRef, and other advanced functions like forwardRef, React.memo.`,
        `Created components like Modal and Drawer using React Portal, Accordion, Tooltip, etc.`,
        `Created responsive design for Tablet, Phone, and Desktop using CSS Flexbox.`,
        `Added native CSS animations on the UI, tried implementing parallax effect as well.`,
        `Create PRs on Github, merge them once approved. Fix deployment bugs if CI throws error.`,
      ],
      techStack: [`React`, `JavaScript`, `CSS(SCSS)`, `Git`],
    },
  ],
  projectsData: [
    {
      heading: "ReactTable, @WebMasters",
      description: ["Gained proficiency in effectively utilizing complex state management, including handling deeply nested JSON data, within this application.", "In this project, I've created HTML's native drag-and-drop feature, developed a custom React carousel component, enabled image uploads to Cloudinary from the ground up, implemented auto-saving via localStorage, and integrated conditional rendering, pagination, and column sorting in both ascending and descending orders",
      ],
      deployLink: "https://www.linkedin.com/in/sagar-jaiswal-b35bb321b/",
      gitHubLink: "https://www.linkedin.com/in/sagar-jaiswal-b35bb321b/"
    },
    {
      heading: "Tic-Tac-Toe Game @WebMasters",
      description: ["The standard rules of a Tic-Tac-Toe game.", "Incorporated a player scorekeeping system to determine the victor.", "Add functionality for restarting, resuming, and exiting the game."],
      deployLink: "https://www.linkedin.com/in/sagar-jaiswal-b35bb321b/",
      gitHubLink: "https://www.linkedin.com/in/sagar-jaiswal-b35bb321b/",
      techStack: [`React`, `JavaScript`, `CSS(SCSS)`, `Git`],

    },
  ],
  skillsData: {
    language: [`JavaScript`, `TypeScript`, `HTML`, `CSS`],
    frontend: [`React`, `Redux`, `Context`],
    backend: [`NodeJs`, `ExpressJs`, `Postman`],
    database: [`MongoDB`, `Local Storage`, `Session Storage`, `Cookies`],
    "Version Control": [`Git and Github`],
    "CI/CD": [`Github Action`, `Netlify`]
  },
  educationalData: [
    {
      instituteName: "Rajiv Gandhi Technological University",
      location: "Bhopal, India",
      course: "Bachelor of Technology (B.Tech) in Computer Science",
      startDate: `June 2022`,
      endDate: `May 2023`,
      CGPA: "8.01/10",
    },
    {
      instituteName: "Rajiv Gandhi Technological University",
      location: "Bhopal, India",
      course: "Bachelor of Technology (B.Tech) in Computer Science",
      startDate: `June 2022`,
      endDate: `May 2023`,
      CGPA: "8.01/10",
    }
  ],
  achievementsData: [
    {
      icon: "",
      header: "LeetCode 150 Questions",
      description: "Lorem ipsum dolor sit amet",
      links: "fghjk",
    },
    {
      icon: "",
      header: "HackerRank 5 Star",
      description: "Lorem ipsum dolor sit amet",
      links: "fghjdfghj",
    },
  ],
};


const App = () => {
  return (
    <div>
      {/* <RouteList />
      <MonorepoIndex /> */}
      <ProfilePage dataProfile={dataProfile} />
    </div>
  );
};
export default App;
