import Card from "../../Components/Card/Card";
export const faqData = [
  {
    id: "programs",
    question: "What programs do we have?",
    answer: (
      <div>
        As of now, we only have one program: <h2>Full Stack Development.</h2>
        The program is designed to help you become a software developer in Web
        and Mobile applications development.
      </div>
    ),
  },
  {
    id: "course-structure",
    question: "What is the course structure?",
    answer: (
      <div>
        The course is designed according to freshers/beginners. It takes you
        from 0 to being a Rockstar Full Stack Developer, in 4-months. <br />
        <br />
        <ol>
          <li>The first 2 weeks are for HTML and CSS.</li>
          <li>The next 7 weeks are focused on JavaScript, and DSA.</li>
          <li>Then we go over React for 2 weeks, and finally</li>
          <li>NodeJS with MongoDB for 2 weeks.</li>
          <li>
            You spend the last 4-weeks building and deploying 4 Full-Stack
            capstone projects.
          </li>
        </ol>
        <br />
        <ul>
          <li>
            During your 4 months course, you get Practice questions at the end
            of everyday.
          </li>
          <li>
            On every weekend, you'll be send a Major assignment which you can do
            over the weekend.
          </li>
          <li>
            Then we start with Mock Interviews for JavaScript, ReactJS and
            NodeJS.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "pricing",
    question: "What is the price of the course?",
    answer: (
      <div>
        The total price of the Full Stack development course is:
        {/* &#8377;{" "} */}
        {/* <h4 style={{ display: "inline", letterSpacing: "2px" }}>30,000/-</h4>{" "} */}
        <br />
        <br />
        {/* It is divided into 2 parts: */}
        <div className="price-card">
          <Card className="faq-card">
            <h3>&#8377; 35,000</h3>
          </Card>
        </div>
        <span>Note:</span> EMI (Installment) Options are available for making
        the complete payment.
      </div>
    ),
  },
  {
    id: "time-to-job",
    question: "How long does it take to get a Job through WebMasters?",
    answer: (
      <div>
        I'd say 6 - months, from the course start-date would be an ideal time in
        which you could get placed.
        <br />
        Most start-ups have at-least 3 rounds of technical interviews, with a
        gap of 3 - 5 working days between each round. So, it'll be safe to say
        you'd spend at least 1 month, interviewing with multiple companies at
        once, after course ends. While for some it may take longer than this as
        well to crack an interview, those who have performed well during the
        course might get 3 - 4 offers.
      </div>
    ),
  },
  {
    id: "demo-class",
    question: "Do we provide demo classes?",
    answer: (
      <div>
        Absolutely! The first week of every Cohort remains free, walk-in, demo
        classes. You get 5-days, 5 sessions, 2-hours each to attend and evaluate
        if this course is something worth your time and money.
      </div>
    ),
  },
  {
    id: "technologies",
    question: "What technologies do we cover in the program?",
    answer: (
      <div>
        During our Full Stack Development program we cover a bunch of latest,
        in-demand web development technologies. <br />
        <br />
        <h2>Languages</h2>
        <ul>
          <li>
            <b>HTML</b> and{" "}
          </li>{" "}
          <li>
            <b>CSS (SCSS and TailwindCSS)</b>
          </li>
          <li>
            <b>JavaScript</b> (not JAVA) and lastly{" "}
          </li>{" "}
          <li>
            <b>TypeScript.</b>
          </li>
        </ul>
        <br />
        <h2>Libraries/Frameworks</h2>
        <br />
        <h4>Frontend</h4>
        <ul>
          <li>React</li>
          <li>Redux (RTK)</li>
          <li>
            and a plethora of React supported libraries for frontend like MUI,
            react-charts, react-hook-form
          </li>
        </ul>
        <br />
        <h4>Backend</h4>
        <ul>
          <li>NodeJs</li>
        </ul>
        <br />
        <h4>Databases</h4>
        <ul>
          <li>MongoDB</li>
        </ul>
        <br />
        <h4>Versioning</h4>
        <ul>
          <li>Git and Github.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "course-duration",
    question: "What is the duration of the course?",
    answer: <div>The course duration is of 4-months.</div>,
  },
  {
    id: "timings",
    question: "What are the class timings?",
    answer: (
      <div>
        We have classes in the weekday, Mon - Fri, 5.00 PM - 8.00 PM.
        Occassionally, we also arrange for classes during weekends for working
        on projects or mock interviews etc.
      </div>
    ),
  },

  {
    id: "eligibility",
    question: "Can final-year college students join?",
    answer: (
      <div>
        Yes, definitely. It does not matter if you're a college student, a
        college dropout or a working professional. You need to be ready to grind
        through the curriculum. If you're mentally ready that you need a job
        right now, you can surely get one.
      </div>
    ),
  },
  {
    id: "job-after-course",
    question: "Will you easily get a job after the course?",
    answer: (
      <div>
        Well, no. Getting a high paying Job is NOT easy. The course itself is
        pretty intense. It requires long hours of sitting and coding on your
        computer, attending classes, understanding complex topics. Those who do
        all of these have the highest chance of getting a job.
      </div>
    ),
  },
  {
    id: "no-job",
    question: "What if you don't get a Job after the course ends?",
    answer: (
      <div>
        Once the course ends, you start interviewing with companies. You keep
        getting interviews unless you don't get a Job of 5 LPA or more. Even if
        we have to get you to 100s of companies, we will do that. <br />
        Also, if you feel the need, you can also go through the entire course
        once again without any costs at all.
      </div>
    ),
  },
];
