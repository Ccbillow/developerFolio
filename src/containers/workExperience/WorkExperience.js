import React, {useContext, useState, useEffect, useRef} from "react";
import "./WorkExperience.scss";
import {workExperiences} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import {IconBuildingPlus, IconBrandAlipay} from "@tabler/icons-react";

/* ── Business icons per company ──────────────── */
// 0=Deloitte(building-plus), 1=Alipay(brand-alipay), 2=SINOSIG(shield), 3=NetEase(e-commerce)
const tabIcons = [
  // Deloitte — IconBuildingPlus
  ["M3 21h9",
    "M9 8h1",
    "M9 12h1",
    "M9 16h1",
    "M14 8h1",
    "M14 12h1",
    "M5 21v-16c0 -.53 .211 -1.039 .586 -1.414c.375 -.375 .884 -.586 1.414 -.586h10c.53 0 1.039 .211 1.414 .586c.375 .375 .586 .884 .586 1.414v7",
    "M16 19h6",
    "M19 16v6"],
  // Alipay — IconBrandAlipay
  ["M19 3h-14a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2v-14a2 2 0 0 0 -2 -2",
    "M7 7h10",
    "M12 3v7",
    "M21 17.314c-2.971 -1.923 -15 -8.779 -15 -1.864c0 1.716 1.52 2.55 2.985 2.55c3.512 0 6.814 -5.425 6.814 -8h-6.604"],
  // SINOSIG — shield (insurance)
  ["M12,1 L22,5 L22,12 C22,18 12,23 12,23 C12,23 2,18 2,12 L2,5 Z",
    "M8,11 l3,3 l6,-6"],
  // NetEase Kaola — shopping bag (e-commerce)
  ["M4,6 h16 a2,2 0 0,1 2,2 v12 a2,2 0 0,1 -2,2 h-16 a2,2 0 0,1 -2,-2 v-12 a2,2 0 0,1 2,-2 z",
    "M8,6 v-2 a4,4 0 0,1 8,0 v2",
    "M8,13 l4,4 l4,-4"],
];

function getYearRange(dateStr) {
  const years = dateStr.match(/\d{4}/g);
  if (years && years.length >= 2) return `${years[0]}–${years[1].slice(2)}`;
  return dateStr;
}

function getYearDuration(dateStr) {
  const years = dateStr.match(/\d{4}/g);
  if (years && years.length >= 2) return Math.max(1, parseInt(years[1]) - parseInt(years[0]));
  return 1;
}

/* ── SVG Winding Road ────────────────────────── */
function RoadSVG({isDark, selectedIndex, onSelect}) {
  // Newest on the left, oldest on the right (2022–24 → 2017–18)
  const exps = workExperiences.experience;
  const icons = tabIcons;

  const durations = exps.map(e => getYearDuration(e.date));
  const total = durations.reduce((a, b) => a + b, 0);
  const totalLen = 1000;

  let segs = durations.map(d => Math.round((d / total) * totalLen));
  const diff = totalLen - segs.reduce((a, b) => a + b, 0);
  segs[segs.length - 1] += diff;

  let offsets = [0];
  for (let i = 0; i < segs.length - 1; i++) {
    offsets.push(offsets[i] + segs[i]);
  }

  const segColors = ["#1565c0", "#1976d2", "#42a5f5", "#90caf9"];
  const segColorsDark = ["#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa"];

  const roadPath = "M 40,190 C 140,190 170,155 270,155 C 370,155 400,200 500,200 C 600,200 630,155 730,155 C 830,155 860,190 920,190";

  const pinPositions = [
    {pct: offsets[0] + segs[0] / 2, x: 170, y: 158},
    {pct: offsets[1] + segs[1] / 2, x: 350, y: 175},
    {pct: offsets[2] + segs[2] / 2, x: 580, y: 175},
    {pct: offsets[3] + segs[3] / 2, x: 810, y: 170},
  ];

  const roadStroke = isDark ? "#0c2340" : "#c5d5e3";
  const roadFill = isDark ? "#1e3a5f" : "#e0eaf5";
  const dashColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.7)";
  const colors = isDark ? segColorsDark : segColors;

  // Ripple animation for active pin (float handled by CSS @keyframes)
  const [ripplePhase, setRipplePhase] = useState(0);
  const rippleRef = useRef(null);

  useEffect(() => {
    rippleRef.current = setInterval(() => setRipplePhase(p => (p + 1) % 100), 75);
    return () => {
      clearInterval(rippleRef.current);
    };
  }, []);

  // Ripple: two rings at different phases
  const rippleR1 = 22 + (ripplePhase / 100) * 22;
  const rippleO1 = 0.55 * (1 - ripplePhase / 100);
  const rippleR2 = 22 + (((ripplePhase + 50) % 100) / 100) * 22;
  const rippleO2 = 0.55 * (1 - ((ripplePhase + 50) % 100) / 100);

  function roadYAtPct(pct) {
    const t = pct / totalLen;
    if (t < 0.25) return 190 + (155 - 190) * (t / 0.25);
    if (t < 0.5) return 155 + (200 - 155) * ((t - 0.25) / 0.25);
    if (t < 0.75) return 200 + (155 - 200) * ((t - 0.5) / 0.25);
    return 155 + (190 - 155) * ((t - 0.75) / 0.25);
  }

  return (
    <svg className="exp-road-svg" viewBox="0 0 960 300" xmlns="http://www.w3.org/2000/svg">

      {/* road border */}
      <path d={roadPath} fill="none" stroke={roadStroke} strokeWidth="34" strokeLinecap="round" pathLength={totalLen} />
      {/* road surface */}
      <path d={roadPath} fill="none" stroke={roadFill} strokeWidth="26" strokeLinecap="round" pathLength={totalLen} />
      {/* colored segments */}
      {segs.map((seg, i) => {
        const isActive = selectedIndex === i;
        return (
          <React.Fragment key={i}>
            {/* Glow layer behind active segment — CSS pulse animation */}
            {isActive && (
              <path className="exp-road-glow" d={roadPath} fill="none"
                stroke={colors[i]} strokeWidth="32" strokeLinecap="round"
                pathLength={totalLen}
                strokeDasharray={`${seg} ${totalLen - seg}`}
                strokeDashoffset={-offsets[i]}
              />
            )}
            {/* Main segment — active gets smooth pulse, inactive stays static */}
            <path className={`exp-road-seg${isActive ? " exp-road-seg--active" : ""}`}
              d={roadPath} fill="none" stroke={colors[i]} strokeWidth="22" strokeLinecap="round"
              pathLength={totalLen}
              strokeDasharray={`${seg} ${totalLen - seg}`}
              strokeDashoffset={-offsets[i]}
            />
          </React.Fragment>
        );
      })}
      {/* road dashes (highway style) */}
      <path d={roadPath} fill="none" stroke={dashColor} strokeWidth="1.5" strokeLinecap="round"
        strokeDasharray="16 10" pathLength={totalLen} />

      {/* ── Clouds at company-logo level ─────────────── */}
      {(() => {
        const cloudFill = isDark ? "#1d4ed8" : "#90caf9";
        return (
          <g fill={cloudFill}>
            {/* near pin 1 — Deloitte (logo y≈80) */}
            <g transform="translate(120, 85) scale(0.5)" opacity="0.3">
              <circle cx="0" cy="0" r="18" /><circle cx="22" cy="-6" r="14" /><circle cx="-18" cy="2" r="12" /><circle cx="10" cy="8" r="10" />
            </g>
            <g transform="translate(200, 92) scale(0.38)" opacity="0.22">
              <circle cx="0" cy="0" r="16" /><circle cx="18" cy="-4" r="12" /><circle cx="-14" cy="1" r="10" />
            </g>

            {/* near pin 2 — Alipay (logo y≈97) */}
            <g transform="translate(300, 108) scale(0.5)" opacity="0.25">
              <circle cx="0" cy="0" r="20" /><circle cx="25" cy="-8" r="16" /><circle cx="-20" cy="3" r="14" /><circle cx="12" cy="10" r="12" />
            </g>

            {/* between pins 2 & 3 */}
            <g transform="translate(460, 98) scale(0.45)" opacity="0.22">
              <circle cx="0" cy="0" r="18" /><circle cx="22" cy="-6" r="14" /><circle cx="-18" cy="2" r="12" /><circle cx="10" cy="8" r="10" />
            </g>

            {/* near pin 3 — SINOSIG (logo y≈97) */}
            <g transform="translate(550, 105) scale(0.48)" opacity="0.28">
              <circle cx="0" cy="0" r="20" /><circle cx="25" cy="-8" r="16" /><circle cx="-20" cy="3" r="14" /><circle cx="12" cy="10" r="12" />
            </g>
            <g transform="translate(640, 90) scale(0.38)" opacity="0.2">
              <circle cx="0" cy="0" r="16" /><circle cx="18" cy="-4" r="12" /><circle cx="-14" cy="1" r="10" />
            </g>

            {/* near pin 4 — NetEase (logo y≈92) */}
            <g transform="translate(760, 95) scale(0.5)" opacity="0.26">
              <circle cx="0" cy="0" r="18" /><circle cx="22" cy="-6" r="14" /><circle cx="-18" cy="2" r="12" /><circle cx="10" cy="8" r="10" />
            </g>
            <g transform="translate(870, 100) scale(0.4)" opacity="0.22">
              <circle cx="0" cy="0" r="20" /><circle cx="24" cy="-7" r="15" /><circle cx="-19" cy="2" r="13" /><circle cx="10" cy="9" r="11" />
            </g>
          </g>
        );
      })()}

      {/* ── Scenery: trees, bushes, stones ────────── */}
      {/* Dark/light foliage colors */}
      {(() => {
        const fOuter = isDark ? "#1d4ed8" : "#90caf9";
        const fInner = isDark ? "#2563eb" : "#bbdefb";
        const bushColor = isDark ? "#1d4ed8" : "#90caf9";
        const rockColor = isDark ? "#334155" : "#cbd5e3";
        const trunk = "#7c4a1e";

        return (
          <g>
            {/* ═══ LEFT SIDE ═══ */}
            {/* tree L1 — large */}
            <rect x="14" y="160" width="7" height="24" rx="2" fill={trunk} opacity="0.55" />
            <ellipse cx="17.5" cy="148" rx="18" ry="22" fill={fOuter} opacity="0.45" />
            <ellipse cx="17.5" cy="138" rx="12" ry="16" fill={fInner} opacity="0.5" />
            {/* tree L2 — small */}
            <rect x="42" y="172" width="5" height="15" rx="1.5" fill={trunk} opacity="0.5" />
            <ellipse cx="44.5" cy="164" rx="12" ry="14" fill={fOuter} opacity="0.38" />
            <ellipse cx="44.5" cy="156" rx="8" ry="10" fill={fInner} opacity="0.42" />
            {/* tree L3 — tiny, further back */}
            <rect x="5" y="178" width="4" height="10" rx="1" fill={trunk} opacity="0.4" />
            <ellipse cx="7" cy="172" rx="9" ry="10" fill={fOuter} opacity="0.3" />
            <ellipse cx="7" cy="166" rx="6" ry="7" fill={fInner} opacity="0.35" />

            {/* ═══ RIGHT SIDE ═══ */}
            {/* tree R1 — large */}
            <rect x="905" y="158" width="8" height="26" rx="2" fill={trunk} opacity="0.55" />
            <ellipse cx="909" cy="145" rx="20" ry="24" fill={fOuter} opacity="0.45" />
            <ellipse cx="909" cy="135" rx="13" ry="17" fill={fInner} opacity="0.5" />
            {/* tree R2 — small */}
            <rect x="925" y="170" width="5" height="16" rx="1.5" fill={trunk} opacity="0.5" />
            <ellipse cx="927.5" cy="162" rx="12" ry="14" fill={fOuter} opacity="0.38" />
            <ellipse cx="927.5" cy="154" rx="8" ry="9" fill={fInner} opacity="0.42" />
            {/* tree R3 — tiny */}
            <rect x="875" y="182" width="4" height="10" rx="1" fill={trunk} opacity="0.4" />
            <ellipse cx="877" cy="175" rx="9" ry="10" fill={fOuter} opacity="0.3" />
            <ellipse cx="877" cy="169" rx="6" ry="7" fill={fInner} opacity="0.35" />

            {/* ═══ MIDDLE bushes & stones (between pins) ═══ */}
            <ellipse cx="255" cy="192" rx="16" ry="9" fill={bushColor} opacity="0.28" />
            <ellipse cx="265" cy="194" rx="10" ry="6" fill={bushColor} opacity="0.22" />
            <ellipse cx="460" cy="196" rx="14" ry="8" fill={bushColor} opacity="0.3" />
            <ellipse cx="690" cy="188" rx="13" ry="8" fill={bushColor} opacity="0.26" />
            <ellipse cx="700" cy="190" rx="9" ry="5" fill={bushColor} opacity="0.2" />

            {/* small stones near road edges */}
            <ellipse cx="105" cy="195" rx="5" ry="3.5" fill={rockColor} opacity="0.3" />
            <ellipse cx="305" cy="198" rx="4" ry="3" fill={rockColor} opacity="0.25" />
            <ellipse cx="440" cy="202" rx="6" ry="3.5" fill={rockColor} opacity="0.28" />
            <ellipse cx="630" cy="188" rx="4.5" ry="3" fill={rockColor} opacity="0.25" />
            <ellipse cx="850" cy="192" rx="5" ry="3.5" fill={rockColor} opacity="0.3" />
          </g>
        );
      })()}

      {/* Date labels below road */}
      {exps.map((exp, i) => {
        const midPct = (offsets[i] + segs[i] / 2) / totalLen;
        const labelX = 40 + midPct * 880;
        const isActive = selectedIndex === i;
        return (
          <text key={i} x={labelX} y={228} textAnchor="middle"
            fontSize="18" fontWeight={isActive ? "700" : "600"}
            fill={isDark ? "#93c5fd" : "#1565c0"}
            className={`exp-date-label${isActive ? " exp-date-label--active" : ""}`}>
            {getYearRange(exp.date)}
          </text>
        );
      })}

      {/* Pins above road */}
      {pinPositions.map((pos, i) => {
        const exp = exps[i];
        const isActive = selectedIndex === i;
        const pinColor = colors[i];
        const pinY = pos.y;
        const roadY = roadYAtPct(pos.pct);

        return (
          <g key={i} className={`exp-pin-group${isActive ? " active" : ""}`}
            onClick={() => onSelect(i)}
            onTouchStart={() => onSelect(i)}
            style={{cursor: "pointer"}}>
            {/* connector line */}
            <line x1={pos.x} y1={pinY - 5} x2={pos.x} y2={pinY - 58}
              stroke={isDark ? "#3b82f6" : "#1565c0"} strokeWidth="1.2"
              strokeDasharray="4 3" opacity={isActive ? 0.9 : 0.5} />
            {/* Pulse ripple rings — only for active pin, React-controlled */}
            {isActive && (
              <>
                <circle cx={pos.x} cy={pinY - 78} r={rippleR1} fill="none"
                  stroke={isDark ? "#60a5fa" : "#42a5f5"} strokeWidth="2"
                  opacity={rippleO1} />
                <circle cx={pos.x} cy={pinY - 78} r={rippleR2} fill="none"
                  stroke={isDark ? "#60a5fa" : "#42a5f5"} strokeWidth="2"
                  opacity={rippleO2} />
              </>
            )}
            {/* pin body + tail + icon — float animation (CSS) + scale (inline) */}
            <g transform={`translate(${pos.x},${pinY - 78})`}>
              <g className={isActive ? "exp-pin-float" : ""}>
                <g style={{
                  transform: `scale(${isActive ? 1.5 : 1})`,
                  transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}>
                {/* pin body */}
                <circle cx="0" cy="0" r="22" fill={isDark ? "#0c1e3d" : "#fff"} />
                <circle cx="0" cy="0" r="19" fill={pinColor} />
                {/* pin tail */}
                <polygon points="0,20 -5,12 5,12" fill={pinColor} />
                {/* icon */}
                <g stroke={isDark ? "#bfdbfe" : "#fff"} strokeWidth="1.6"
                  fill="none" strokeLinecap="round" strokeLinejoin="round">
                  {icons[i].map((d, j) => (
                    <path key={j} d={d} transform="translate(-12,-11)" />
                  ))}
                </g>
              </g>
            </g>
            </g>
            {/* road dot */}
            <circle cx={pos.x} cy={roadY + 4} r={isActive ? "7" : "5"} fill="#93c5fd"
              stroke={isDark ? "#1e293b" : "#fff"} strokeWidth="2" />
            {/* company name above pin */}
            <text x={pos.x} y={pinY - 120} textAnchor="middle" fontSize="18" fontWeight="700"
              fill={isDark ? "#bfdbfe" : "#1565c0"}>{exp.company}</text>
          </g>
        );
      })}

      {/* Per-segment click targets — each directly calls onSelect with correct index */}
      {segs.map((seg, i) => (
        <path key={`road-hit-${i}`} d={roadPath} fill="none"
          stroke="transparent" strokeWidth="50" strokeLinecap="round"
          pointerEvents="stroke"
          pathLength={totalLen}
          strokeDasharray={`${seg} ${totalLen - seg}`}
          strokeDashoffset={-offsets[i]}
          style={{cursor: "pointer"}}
          onClick={() => onSelect(i)}
          onTouchEnd={(e) => {
            e.preventDefault();
            onSelect(i);
          }}
        />
      ))}
    </svg>
  );
}

/* ── Main component ──────────────────────────── */
export default function WorkExperience() {
  const {isDark} = useContext(StyleContext);
  // Newest on left, oldest on right; default select newest (index 0 = 2022–24)
  const experiences = workExperiences.experience;
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!workExperiences.display) return null;

  const selected = experiences[selectedIndex];

  return (
    <div id="experience">
      <Fade bottom duration={1000} distance="20px">
        <div className={`exp-wrap${isDark ? " exp-wrap-dark" : ""}`} id="workExperience">
          <h1 className={`exp-heading${isDark ? " dark-mode-text" : ""}`}>
            Experiences
          </h1>

          <RoadSVG isDark={isDark} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />

          {/* Single detail card */}
          <div className={`exp-detail${isDark ? " exp-detail-dark" : ""}`}>
            <div className="exp-detail-header">
              <div className="exp-detail-icon-wrap">
                {(() => {
                  const iconPaths = tabIcons[selectedIndex];
                  if (selectedIndex === 0) {
                    // Deloitte (leftmost, newest) — use BuildingPlus component
                    return (
                      <IconBuildingPlus size={28} stroke={2} color={isDark ? "#60a5fa" : "#1565c0"} />
                    );
                  }
                  if (selectedIndex === 1) {
                    // Alipay — use BrandAlipay component
                    return (
                      <IconBrandAlipay size={28} stroke={2} color={isDark ? "#60a5fa" : "#1565c0"} />
                    );
                  }
                  // SINOSIG or NetEase — inline SVG
                  return (
                    <svg viewBox="0 0 24 24" width="28" height="28" stroke={isDark ? "#60a5fa" : "#1565c0"}
                      fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {iconPaths.map((d, i) => (
                        <path key={i} d={d} />
                      ))}
                    </svg>
                  );
                })()}
              </div>
              <div>
                <div className="exp-detail-role">{selected.role}</div>
                <div className="exp-detail-company">{selected.company} · Full-time</div>
                <div className="exp-detail-period">{selected.date} · {getYearDuration(selected.date)} yrs</div>
              </div>
            </div>

            {selected.techTags?.length > 0 && (
              <div className="exp-detail-tags">
                {selected.techTags.map((tag, j) => (
                  <span key={j} className="exp-detail-tag">{tag}</span>
                ))}
              </div>
            )}

            <ul className="exp-detail-bullets">
              {selected.descBullets?.map((bullet, j) => {
                const match = bullet.match(/^\[([^\]]+)\]\s*(.*)/);
                return (
                  <li key={j}>
                    {match ? (
                      <>
                        <span className="exp-company-tag">{match[1]}</span>
                        {match[2]}
                      </>
                    ) : (
                      bullet
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Fade>
    </div>
  );
}
