import React, {useContext, useState, useEffect} from "react";
import Headroom from "react-headroom";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import {
  greeting,
  workExperiences,
  skillsSection,
  techStackSection,
  openSource,
  bigProjects,
  blogSection,
  talkSection,
  achievementSection,
  resumeSection
} from "../../portfolio";

function Header() {
  const {isDark} = useContext(StyleContext);
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    {id: "skills",       label: "Skills",       show: skillsSection.display},
    {id: "techstack",    label: "Tech Stack",   show: techStackSection.display},
    {id: "experience",   label: "Experience",   show: workExperiences.display},
    {id: "opensource",   label: "Open Source",  show: bigProjects.display},
    {id: "achievements", label: "Achievements", show: achievementSection.display},
    {id: "blogs",        label: "Blogs",        show: blogSection.display},
    {id: "talks",        label: "Talks",        show: talkSection.display},
    {id: "resume",       label: "Resume",       show: resumeSection.display},
    {id: "contact",      label: "Contact Me",   show: true},
  ];

  useEffect(() => {
    const sectionEls = navItems
      .filter(item => item.show)
      .map(item => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      {rootMargin: "-10% 0px -80% 0px", threshold: 0}
    );

    sectionEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Headroom>
      <header className={isDark ? "dark-menu header" : "header"}>
        <a href="/" className="logo">
          <span className="grey-color"> &lt;</span>
          <span className="logo-name">{greeting.username}</span>
          <span className="grey-color">/&gt;</span>
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label
          className="menu-icon"
          htmlFor="menu-btn"
          style={{color: "white"}}
        >
          <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
        </label>
        <ul className={isDark ? "dark-menu menu" : "menu"}>
          {navItems.filter(item => item.show).map(item => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? "nav-active" : ""}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <ToggleSwitch />
            </a>
          </li>
        </ul>
      </header>
    </Headroom>
  );
}
export default Header;
