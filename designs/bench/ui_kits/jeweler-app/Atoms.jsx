// Atoms.jsx — small reusable UI primitives.
// All components attach to window at the bottom for cross-script access.

const { useState, useEffect } = React;

// ---- Icons (inline Lucide-style; 1.5 stroke) ---------------------------------
const Icon = ({ name, size = 18, ...rest }) => {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    ...rest,
  };
  switch (name) {
    case "search":   return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>;
    case "plus":     return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case "left":     return <svg {...p}><path d="M11 17l-5-5 5-5M6 12h13"/></svg>;
    case "check":    return <svg {...p}><path d="M20 6L9 17l-5-5"/></svg>;
    case "x":        return <svg {...p}><path d="M18 6L6 18M6 6l12 12"/></svg>;
    case "ledger":   return <svg {...p}><path d="M4 4h16v16H4z"/><path d="M4 9h16M9 4v16"/></svg>;
    case "letter":   return <svg {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>;
    case "stones":   return <svg {...p}><path d="M12 2 2 9l10 13L22 9z"/><path d="M2 9h20M8 9l4 13M16 9l-4 13"/></svg>;
    case "client":   return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>;
    case "filter":   return <svg {...p}><path d="M3 6h18M6 12h12M10 18h4"/></svg>;
    case "more":     return <svg {...p}><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>;
    case "send":     return <svg {...p}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>;
    case "clock":    return <svg {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
    case "spiral":
      return (
        <svg {...p}>
          <path d="M21 12H17V6H8V18H15V10H11V14H13V12"/>
          <circle cx="12" cy="12" r="0.6" fill="currentColor"/>
        </svg>
      );
    default: return <svg {...p} />;
  }
};

// ---- Button ----------------------------------------------------------------
const Button = ({ variant = "primary", children, icon, ...rest }) => {
  const cls = `fg-btn fg-btn-${variant}`;
  return (
    <button className={cls} {...rest}>
      {icon && <Icon name={icon} size={16}/>}
      <span>{children}</span>
    </button>
  );
};

// ---- Chip (status) ----------------------------------------------------------
const STATUS_LABEL = {
  "in-process":      { label: "in process",     tone: "teal"   },
  "finished":        { label: "finished",       tone: "gold"   },
  "awaiting-reply":  { label: "awaiting reply", tone: "violet" },
  "laid-aside":      { label: "laid aside",     tone: "muted"  },
};
const Chip = ({ status, tone, children }) => {
  const meta = STATUS_LABEL[status];
  const t = tone || (meta ? meta.tone : "muted");
  return (
    <span className={`fg-chip fg-chip-${t}`}>
      <span className="fg-chip-dot"/>
      <span>{children || (meta ? meta.label : status)}</span>
    </span>
  );
};

// ---- Tag (small caps stone/material tag) ------------------------------------
const Tag = ({ children }) => <span className="fg-tag">{children}</span>;

// ---- Card -------------------------------------------------------------------
const Card = ({ tone = "teal", interactive, children, onClick, style }) => (
  <div
    className={`fg-card fg-card-${tone}${interactive ? " fg-card-i" : ""}`}
    onClick={onClick}
    style={style}
  >
    {children}
  </div>
);

// ---- Field ------------------------------------------------------------------
const Field = ({ label, value, onChange, placeholder, multiline }) => (
  <div className="fg-field">
    {label && <div className="fg-field-label">{label}</div>}
    {multiline
      ? <textarea className="fg-input" value={value} onChange={e => onChange?.(e.target.value)} placeholder={placeholder} rows={4}/>
      : <input className="fg-input" value={value} onChange={e => onChange?.(e.target.value)} placeholder={placeholder}/>}
  </div>
);

// ---- Orb (decorative breathing glow) ----------------------------------------
const Orb = ({ color = "teal", size = 200, opacity = 0.6, delay = 0, style = {} }) => (
  <div
    className="fg-orb"
    style={{
      width: size, height: size,
      background: `var(--orb-${color})`,
      opacity,
      animationDelay: `${delay}ms`,
      ...style,
    }}
  />
);

// ---- Divider (ornament-aware) -----------------------------------------------
const Divider = ({ ornament }) => ornament
  ? <div className="fg-divider-ornament" style={{ color: "var(--violet-300)" }}>
      <object data="../../assets/ornament-divider-horizontal.svg" type="image/svg+xml" aria-hidden="true"/>
    </div>
  : <div className="fg-divider"/>;

// ---- Section header (small caps over title) --------------------------------
const SectionHead = ({ eyebrow, title, action }) => (
  <div className="fg-section-head">
    <div>
      {eyebrow && <div className="fg-eyebrow">{eyebrow}</div>}
      {title && <h2 className="fg-section-title">{title}</h2>}
    </div>
    {action}
  </div>
);

// ---- Progress bar -----------------------------------------------------------
const Progress = ({ value }) => (
  <div className="fg-progress">
    <div className="fg-progress-fill" style={{ width: `${Math.round(value * 100)}%` }}/>
  </div>
);

// ---- KeyVal -----------------------------------------------------------------
const KeyVal = ({ k, children }) => (
  <div className="fg-kv">
    <div className="fg-kv-k">{k}</div>
    <div className="fg-kv-v">{children}</div>
  </div>
);

// ---- Price (display serif treatment) ---------------------------------------
const Price = ({ value, tone = "default" }) => {
  if (value == null) return <span className={`fg-price fg-price-empty`}>— not yet priced —</span>;
  return <span className={`fg-price fg-price-${tone}`}>${value.toLocaleString()}</span>;
};

Object.assign(window, {
  Icon, Button, Chip, Tag, Card, Field, Orb, Divider, SectionHead, Progress, KeyVal, Price,
  STATUS_LABEL,
});
