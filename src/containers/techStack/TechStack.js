import React, {useState, useContext} from "react";
import "./TechStack.scss";
import {techStackSection} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

function TechIcon({tech, isDark}) {
  if (tech.img) {
    return <img src={tech.img} alt={tech.name} />;
  }
  return (
    <div
      className="tech-fa-icon"
      style={{backgroundColor: tech.bg || "#f0f0f0"}}
    >
      <i className={tech.icon} style={{color: tech.color || "#555"}}></i>
    </div>
  );
}

export default function TechStack() {
  const {isDark} = useContext(StyleContext);
  const [activeTab, setActiveTab] = useState(0);

  if (!techStackSection.display) return null;

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="tech-stack-section" id="techstack">
        <h1 className={isDark ? "dark-mode tech-stack-heading" : "tech-stack-heading"}>
          {techStackSection.title}
        </h1>
        <div className="tech-stack-tabs">
          {techStackSection.tabs.map((tab, i) => (
            <button
              key={i}
              className={`tech-tab-btn${activeTab === i ? " active" : ""}${isDark ? " dark" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="tech-grid">
          {techStackSection.tabs[activeTab].techs.map((tech, i) => (
            <div key={i} className={isDark ? "tech-item dark-mode" : "tech-item"}>
              <TechIcon tech={tech} isDark={isDark} />
              <p>{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </Fade>
  );
}
