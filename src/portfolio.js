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
  title: "Hi all, I'm Tao",
  subTitle: emoji(
    "A passionate Java Backend Engineer 🚀 with 7+ years building high-concurrency backend systems (320k QPS, TB-scale data) — now embracing AI to build smarter, more powerful platforms."
  ),
  resumeLink: "/resume.pdf",
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
      "⚡ Write clean, testable code across backend services"
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
      progressPercentage: "90%"
    },
    {
      Stack: "Cloud / DevOps",
      progressPercentage: "75%"
    },
    {
      Stack: "AI / LLM Engineering",
      progressPercentage: "55%"
    },
    {
      Stack: "Frontend",
      progressPercentage: "35%"
    }
  ],
  displayCodersrank: false
};

// Tech Stack Section

const techStackSection = {
  display: true,
  title: "Tech Stack",
  tabs: [
    {
      label: "Languages",
      techs: [
        {name: "Java",        img: "/tech/java.svg"},
        {name: "SQL",         img: "/tech/sql.svg"},
        {name: "Bash / Shell",img: "/tech/bash.svg"},
        {name: "HTML",        img: "/tech/html.svg"},
        {name: "JavaScript",  img: "/tech/javascript.svg"},
        {name: "React",       img: "/tech/react.svg"},
        {name: "YAML",        img: "/tech/yaml.svg"}
      ]
    },
    {
      label: "Frameworks",
      techs: [
        {name: "Spring Boot",     img: "/tech/springboot.svg"},
        {name: "Spring Cloud",    img: "/tech/springcloud.svg"},
        {name: "Spring Security", img: "/tech/springsecurity.svg"},
        {name: "Hibernate",       img: "/tech/hibernate.svg"},
        {name: "MyBatis",         img: "/tech/mybatis.svg"},
        {name: "JUnit 5",         img: "/tech/junit.svg"},
        {name: "JWT",             img: "/tech/jwt.svg"}
      ]
    },
    {
      label: "Data & Messaging",
      techs: [
        {name: "MySQL",      img: "/tech/mysql.svg"},
        {name: "PostgreSQL", img: "/tech/postgresql.svg"},
        {name: "Oracle",     img: "/tech/oracle.svg"},
        {name: "Redis",      img: "/tech/redis.svg"},
        {name: "Kafka",      img: "/tech/kafka.svg"}
      ]
    },
    {
      label: "DevOps & Cloud",
      techs: [
        {name: "Docker",         img: "/tech/docker.svg"},
        {name: "Kubernetes",     img: "/tech/kubernetes.svg"},
        {name: "AWS",            img: "/tech/aws.svg"},
        {name: "Azure",          img: "/tech/azure.svg"},
        {name: "Jenkins",        img: "/tech/jenkins.svg"},
        {name: "Git",            img: "/tech/git.svg"},
        {name: "Bitbucket",      img: "/tech/bitbucket.svg"},
        {name: "GitHub Actions", img: "/tech/githubactions.svg"},
        {name: "Linux",          img: "/tech/linux.svg"}
      ]
    },
    {
      label: "Architecture & Tools",
      techs: [
        {name: "Microservices", img: "/tech/microservices.svg"},
        {name: "RESTful API",   img: "/tech/restapi.svg"},
        {name: "Maven",         img: "/tech/maven.svg"},
        {name: "Postman",       img: "/tech/postman.svg"},
        {name: "Swagger",       img: "/tech/swagger.svg"},
        {name: "SonarQube",     img: "/tech/sonarqube.svg"},
        {name: "ELK",           img: "/tech/elastic.svg"},
        {name: "Jira",          img: "/tech/jira.svg"},
        {name: "IntelliJ IDEA", img: "/tech/intellijidea.svg"}
      ]
    },
    {
      label: "AI & LLM",
      techs: [
        {name: "Claude",            img: "/tech/claude.svg"},
        {name: "OpenAI",            img: "/tech/openai.svg"},
        {name: "LangChain4j",       img: "/tech/langchain4j.svg"},
        {name: "Qdrant",            img: "/tech/qdrant.svg"},
        {name: "RAG",               img: "/tech/rag.svg"},
        {name: "Cohere",            img: "/tech/cohere.svg"},
        {name: "Hybrid Search",     img: "/tech/hybridsearch.svg"},
        {name: "Prompt",            img: "/tech/prompt.svg"}
      ]
    }
  ]
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
      ],
      techTags: ["Java 11/17", "Spring Boot", "Spring Cloud", "Kafka", "PostgreSQL", "Kubernetes", "Docker", "AWS", "Jenkins", "JUnit 5"]
    },
    {
      role: "Senior Java Software Engineer",
      company: "Alipay (Alibaba)",
      companylogo: require("./assets/images/alipayLogo.png"),
      date: "July 2021 – March 2022",
      desc: "Built a File Platform (TB-level financial data transfer) serving 100+ banks, achieving 60%+ adoption of automated file transfers and a 20% productivity improvement",
      descBullets: [
        "Solved a cross-environment deployment blocker under a 2-month deadline using Maven multi-module + Spring profile build-time isolation",
        "Designed a high-availability layer to handle unreliable dependencies — circuit breakers, rate limiting, and async fallback queue",
        "Implemented a Data Integrity Check Task to ensure end-to-end data consistency, reducing manual validation effort by 2–3 hrs/day"
      ],
      techTags: ["Java", "SofaBoot", "OceanBase(MySQL)", "Redis", "DataWorks", "MyBatis", "Maven", "Docker", "ELK"]
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
      ],
      techTags: ["Java", "Spring Boot", "MyBatis", "MySQL", "Redis", "REST API", "Tomcat"]
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
      ],
      techTags: ["Java", "SpringMVC", "Dubbo", "MySQL", "Redis", "JVM Tuning", "JMeter"]
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
  techStackSection,
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
