import React, {useContext, useState} from "react";
import "./WorkExperience.scss";
import {workExperiences} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function WorkExperience() {
  const {isDark} = useContext(StyleContext);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!workExperiences.display) return null;

  const selected = workExperiences.experience[selectedIndex];

  return (
    <div id="experience">
      <Fade bottom duration={1000} distance="20px">
        <div className="experience-container" id="workExperience">
          <h1 className={isDark ? "experience-heading dark-mode-text" : "experience-heading"}>
            Experiences
          </h1>

          <div className="experience-timeline-layout">

            {/* Left: clickable timeline */}
            <div className="experience-timeline">
              <div className="timeline-track" />
              {workExperiences.experience.map((exp, i) => (
                <div
                  key={i}
                  className={`timeline-item ${i === selectedIndex ? "active" : ""}`}
                  onClick={() => setSelectedIndex(i)}
                >
                  <div className="timeline-dot" />
                  <div className="timeline-info">
                    <span className={isDark ? "timeline-company dark-mode-text" : "timeline-company"}>
                      {exp.company}
                    </span>
                    <span className="timeline-date">{exp.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: detail panel */}
            <div className={isDark ? "experience-detail dark-card" : "experience-detail"}>
              <div key={selectedIndex} className="detail-inner">
                <div className="detail-header">
                  <img
                    src={selected.companylogo}
                    alt={selected.company}
                    className="detail-logo"
                  />
                  <div className="detail-header-text">
                    <h3 className={isDark ? "detail-role dark-mode-text" : "detail-role"}>
                      {selected.role}
                    </h3>
                    <h4 className={isDark ? "detail-company dark-mode-text" : "detail-company"}>
                      {selected.company}
                    </h4>
                    <span className="detail-date">{selected.date}</span>
                  </div>
                </div>

                <p className={isDark ? "detail-desc dark-mode-text" : "detail-desc"}>
                  {selected.desc}
                </p>

                <ul className="detail-bullets">
                  {selected.descBullets?.map((bullet, i) => (
                    <li key={i} className={isDark ? "dark-mode-text" : ""}>
                      {bullet}
                    </li>
                  ))}
                </ul>

                {selected.techTags?.length > 0 && (
                  <div className="detail-tags">
                    {selected.techTags.map((tag, i) => (
                      <span key={i} className={isDark ? "detail-tag dark-tag" : "detail-tag"}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </Fade>
    </div>
  );
}
