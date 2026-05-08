/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation";

// Splash Screen

const splashScreen = {
  enabled: true,
  animation: splashAnimation,
  duration: 2000
};

// Summary And Greeting Section

const illustration = {
  animated: true
};

const greeting = {
  username: "TaoCheng",
  title: "Hi, I'm Tao",
  subTitle: emoji(
    "A passionate Java Engineer 🚀 with 7+ years building high-concurrency backend systems (320k QPS, TB-scale data) — now embracing AI to build smarter, more powerful platforms."
  ),
  resumeLink: "https://drive.google.com/open?id=1jJdI1KrRKarGsu9wEFk0zemfDNleweP4&usp=drive_fs",
  displayGreeting: true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/Ccbillow",
  linkedin: "https://www.linkedin.com/in/tao-cheng-bb4024105/",
  gmail: "ctaoaoo@gmail.com",
  // 不用的平台设为空字符串或直接删掉这几行
  gitlab: "",
  facebook: "",
  medium: "",
  stackoverflow: "",
  display: true
};

// Skills Section

const skillsSection = {
  title: "What I Do",
  subTitle: "BACKEND ENGINEER BY TRAINING, AI BUILDER BY CHOICE",
  skills: [
    emoji(
      "⚡ Build Java microservices — from architecture to production reliability"
    ),
    emoji(
      "⚡ Design and ship production RAG systems — hybrid search, reranking, streaming, and LLM integration"
    ),
    emoji(
      "⚡ Write clean, testable code with unit and integration tests across backend services"
    )
  ],

  softwareSkills: [
    {
      skillName: "Java",
      fontAwesomeClassname: "fab fa-java"
    },
    {
      skillName: "Spring Boot",
      fontAwesomeClassname: "fas fa-leaf"
    },
    {
      skillName: "AWS",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "Docker",
      fontAwesomeClassname: "fab fa-docker"
    },
    {
      skillName: "Kubernetes",
      fontAwesomeClassname: "fas fa-dharmachakra"
    },
    {
      skillName: "SQL / PostgreSQL",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "Redis",
      fontAwesomeClassname: "fas fa-memory"
    },
    {
      skillName: "Kafka",
      fontAwesomeClassname: "fas fa-stream"
    },
    {
      skillName: "Git",
      fontAwesomeClassname: "fab fa-git-alt"
    },
    {
      skillName: "Linux",
      fontAwesomeClassname: "fab fa-linux"
    },
    {
          skillName: "AI / LLM",
          fontAwesomeClassname: "fas fa-brain"
    },
    {
      skillName: "LangChain4j",
      fontAwesomeClassname: "fas fa-link"
    },
    {
      skillName: "Qdrant",
      fontAwesomeClassname: "fas fa-vector-square"
    }
  ],
  display: true
};

// Education Section

const educationInfo = {
  display: true,
  schools: [
    {
      schoolName: "Chongqing University of Posts and Telecommunications",
      logo: require("./assets/images/CQUPTlogo.png"),
      subHeader: "Bachelor of Engineering in Software Engineering",
      duration: "September 2012 – June 2016",
      desc: "Studied core computer science and software engineering fundamentals that laid the foundation for 7+ years of enterprise Java development.",
      descBullets: [
        "Software Engineering, Data Structures & Algorithms, Computer Networks",
        "Database Systems, Operating Systems, Object-Oriented Design"
      ]
    }
  ]
};

// Proficiency Bars

const techStack = {
  viewSkillBars: true,
  experience: [
    {
      Stack: "Java Backend & Microservices",
      progressPercentage: "95%"
    },
    {
          Stack: "DevOps & Cloud (Docker / K8s / AWS)",
          progressPercentage: "80%"
    },
    {
      Stack: "AI / RAG Engineering",
      progressPercentage: "65%"
    }
  ],
  displayCodersrank: false
};

// Work Experience Section

const workExperiences = {
  display: true,
  experience: [
    {
      role: "Senior Java Software Engineer",
      company: "Deloitte",
      companylogo: require("./assets/images/deloitteLogo.png"),
      date: "April 2022 – February 2024",
      desc: "Delivered two international client projects across banking (OCBC Singapore) and pharma (Sanofi Germany).",
      descBullets: [
        "[OCBC] Led 6-person team on OCBC's Personal Deposit System migration, using Kafka event-driven architecture",
        "[OCBC] Introduced a dual-phase sprint approach that reduced rework and improved delivery predictability",
        "[Sanofi] Refactored Sanofi's complex reverse-match legacy system using test-first approach; 10+ business branches mapped into XMind",
        "[Sanofi] Rebuilt test infrastructure: BaseTest context reuse, full mocking, JSON fixtures — tests went from manual eyeballing to failures caught at build time"
      ]
    },
    {
      role: "Senior Java Software Engineer",
      company: "Alipay (Alibaba)",
      companylogo: require("./assets/images/alipayLogo.png"),
      date: "July 2021 – March 2022",
      desc: "Built and owned a File Platform (TB-level financial data transfer) serving 100+ banks, achieving 60%+ adoption of automated file transfers and a 20% productivity improvement",
      descBullets: [
        "Solved a cross-environment deployment blocker under a 2-month deadline using Maven multi-module + Spring profile build-time isolation — adopted by other teams",
        "Designed a high-availability layer to handle unreliable dependencies — circuit breakers, rate limiting, and async fallback queue",
        "Implemented a Data Integrity Check Task to ensure end-to-end data consistency, reducing manual validation effort by 2–3 hrs/day",
        "Resolved a cross-team SDK delivery crisis through structured escalation; phased delivery plan got the project back on track without blame"
      ]
    },
    {
      role: "Java Software Engineer",
      company: "SINOSIG (Sunshine Insurance Group)",
      companylogo: require("./assets/images/sinosigLogo.png"),
      date: "October 2018 – March 2021",
      desc: "Built the Insurance Portal System 0-to-1, digitising the policy lifecycle.",
      descBullets: [
        "Designed a DB-configurable policy workflow using Strategy + Factory — process changes require config updates only, no code modification",
        "Implemented Redis caching for credit-check API calls, reducing third-party costs by 80%",
        "Traced a recurring OOM crash (2 incidents before root cause found) to unclosed HttpConnections via heap dump + MAT; shipped hotfix and RCA"
      ]
    },
    {
      role: "Java Software Engineer",
      company: "NetEase (Kaola)",
      companylogo: require("./assets/images/neteaseLogo.png"),
      date: "April 2017 – July 2018",
      desc: "Joined a high-traffic e-commerce Activity Promotion System supporting 10+ promotion types.",
      descBullets: [
        "On-call during load testing, we diagnosed a throughput bottleneck via heap dump and GC log analysis",
        "Implemented optimisations  — object restructuring, batch queries, and JVM tuning — lifting core API throughput from 28k to 320k QPS during peak sales",
        "Activity Submission System: rewrote the detail page using batch queries + async calls, response time 6s → 300ms"
      ]
    }
  ]
};

// Open Source / GitHub Profile
const openSource = {
  showGithubProfile: "true",
  display: false
};

// Featured Projects

const bigProjects = {
  title: "Open Source Projects",
//  subtitle: "PRODUCTION-GRADE SYSTEMS I DESIGNED AND BUILT END-TO-END",
  projects: [
    {
      projectName: " RAG AI Portfolio Assistant",
      projectDesc:
        "🤖 Production-grade AI assistant with hybrid search (BM25 + vector), Cohere reranking, and Claude streaming.\n⚙️ Spring Boot · Qdrant · Redis · RBAC · LangChain4j.",
      footerLink: [
        {
          name: "View on GitHub",
          url: "https://github.com/Ccbillow/portfolio-ai-rag"
        }
      ]
    },
    {
      projectName: " Concurrent Money Transfer Service",
      projectDesc:
        "🔒 Concurrent-safe microservices transfer system — optimistic locking, Redis idempotency, circuit breaker, rate limiting.\n🧪 Stress-tested with 1000-thread JMeter scenarios.",
      footerLink: [
        {
          name: "View on GitHub",
          url: "https://github.com/Ccbillow/MoneyTransfer"
        }
      ]
    }
  ],
  display: true
};

// Achievements — disabled (no certifications to list)

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆"),
  subtitle: "",
  achievementsCards: [],
  display: false // disabled
};

// Blog — disabled

const blogSection = {
  title: "Blogs",
  subtitle: "",
  displayMediumBlogs: "false",
  blogs: [],
  display: false // disabled
};

// Talks — disabled

const talkSection = {
  title: "TALKS",
  subtitle: emoji(""),
  talks: [],
  display: false // disabled
};

// Podcast — disabled

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "",
  podcast: [],
  display: false // disabled
};

// Resume Section

const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",
  display: true
};

// Contact

const contactInfo = {
  title: emoji("Reach Out to me!"),
  subtitle: "Open to Senior Java / AI Engineer roles in Australia. Happy to chat.",
  number: "",
  email_address: "ctaoaoo@gmail.com"
};

// Twitter — disabled

const twitterDetails = {
  userName: "twitter",
  display: false // disabled
};

const isHireable = true;

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
