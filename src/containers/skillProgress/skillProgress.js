import React, {useState} from "react";
import "./Progress.scss";
import {illustration, techStack} from "../../portfolio";
import {Fade} from "react-reveal";
import Build from "../../assets/lottie/build";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";

export default function StackProgress() {
  const [inView, setInView] = useState(false);

  if (techStack.viewSkillBars) {
    return (
      <Fade bottom duration={1000} distance="20px" onReveal={() => setInView(true)}>
        <div className="skills-container">
          <div className="skills-bar">
            <h1 className="skills-heading">Proficiency</h1>
            {techStack.experience.map((exp, i) => (
              <div key={i} className="skill">
                <p>{exp.Stack}</p>
                <div className="meter">
                  <span
                    className={inView ? "bar-animated" : ""}
                    style={{
                      "--target-width": exp.progressPercentage,
                      animationDelay: `${i * 0.18}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="skills-image">
            {illustration.animated ? (
              <DisplayLottie animationData={Build} />
            ) : (
              <img
                alt="Skills"
                src={require("../../assets/images/skill.svg")}
              />
            )}
          </div>
        </div>
      </Fade>
    );
  }
  return null;
}
