import React, {useState, useEffect, useContext} from "react";
import "./Progress.scss";
import {techStack} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

function CircularProgress({exp, index, inView, isDark}) {
  const pct = parseInt(exp.progressPercentage);
  const [count, setCount] = useState(0);
  const circumference = 2 * Math.PI * 80;

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const duration = 1500;
    const step = Math.max(1, Math.floor(pct / (duration / 16)));
    const timer = setInterval(() => {
      current += step;
      if (current >= pct) {
        setCount(pct);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, pct]);

  const dashoffset = circumference - (circumference * count) / 100;
  const dotRotation = inView ? (360 * pct) / 100 : 0;

  return (
    <div className={`circular-block${isDark ? " circular-block-dark" : ""}`}>
      <div className={`circular-box${isDark ? " circular-box-dark" : ""}`}>
        <p className="circular-number">
          <span className="circular-num">{count}</span>
          <span className="circular-sub">%</span>
        </p>
        <p className={`circular-title${isDark ? " circular-title-dark" : ""}`}>
          {exp.Stack}
        </p>
      </div>
      <span
        className="circular-dots"
        style={{
          transform: `rotate(${dotRotation}deg)`,
          opacity: pct >= 100 ? 0 : undefined,
          transition: inView ? "2s transform ease, 0.3s opacity ease" : undefined,
        }}
      />
      <svg className="circular-svg" viewBox="0 0 180 180">
        <defs>
          <linearGradient id={`circGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1565c0" />
            <stop offset="100%" stopColor="#90caf9" />
          </linearGradient>
        </defs>
        <circle
          className="circular-circle"
          cx="90"
          cy="90"
          r="80"
          stroke={`url(#circGrad-${index})`}
          strokeDasharray={circumference}
          strokeDashoffset={inView ? dashoffset : circumference}
          style={{ transition: inView ? "stroke-dashoffset 1.5s ease" : undefined }}
        />
      </svg>
    </div>
  );
}

export default function StackProgress() {
  const {isDark} = useContext(StyleContext);
  const [inView, setInView] = useState(false);

  if (!techStack.viewSkillBars) return null;

  return (
    <Fade bottom duration={1000} distance="20px" onReveal={() => setInView(true)}>
      <div className="skills-circular-container" id="proficiency">
        <h1 className={`skills-circular-heading${isDark ? " dark-mode" : ""}`}>
          Proficiency
        </h1>
        <div className="circular-blocks-row">
          {techStack.experience.map((exp, i) => (
            <CircularProgress
              key={i}
              exp={exp}
              index={i}
              inView={inView}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </Fade>
  );
}
