// Shell.jsx — sidebar + top bar wrapping the active screen.
// Reads global components from window (Icon, Orb).

const Sidebar = ({ active, onNavigate }) => {
  const items = [
    { id: "ledger",    label: "Ledger",    icon: "ledger" },
    { id: "letters",   label: "Letters",   icon: "letter" },
    { id: "materials", label: "Materials", icon: "stones" },
    { id: "clients",   label: "Clients",   icon: "client" },
  ];

  return (
    <aside className="fg-sidebar">
      {/* Monogram + wordmark */}
      <div className="fg-sidebar-mark">
        <div className="fg-monogram" aria-hidden="true">
          <object data="../../assets/monogram.svg" type="image/svg+xml"/>
        </div>
        <div className="fg-sidebar-name">
          <div className="fg-sidebar-brand">filigree</div>
          <div className="fg-sidebar-tag">the atelier ledger</div>
        </div>
      </div>

      <nav className="fg-sidenav">
        {items.map(it => (
          <button
            key={it.id}
            className={`fg-sidenav-item${active === it.id ? " active" : ""}`}
            onClick={() => onNavigate(it.id)}
          >
            <Icon name={it.icon} size={18}/>
            <span>{it.label}</span>
          </button>
        ))}
      </nav>

      <div className="fg-sidebar-foot">
        <div className="fg-eyebrow" style={{ marginBottom: 8 }}>this morning</div>
        <div className="fg-foot-quiet">
          A clear day. Tea on the bench. Three letters waiting.
        </div>
      </div>
    </aside>
  );
};

const TopBar = ({ title, subtitle, back, onBack, action }) => (
  <header className="fg-topbar">
    <div className="fg-topbar-left">
      {back && (
        <button className="fg-iconbtn" onClick={onBack} aria-label="Back">
          <Icon name="left" size={18}/>
        </button>
      )}
      <div>
        {subtitle && <div className="fg-eyebrow">{subtitle}</div>}
        <h1 className="fg-topbar-title">{title}</h1>
      </div>
    </div>
    <div className="fg-topbar-right">
      {action}
    </div>
  </header>
);

// Wrapping shell — adds the page vignette + a couple of resting orbs.
const Shell = ({ active, onNavigate, children }) => (
  <div className="fg-app">
    <div className="fg-bg-orbs" aria-hidden="true">
      <Orb color="teal"   size={520} opacity={0.35} style={{ top: -200, right: -200 }} />
      <Orb color="violet" size={460} opacity={0.40} style={{ bottom: -160, left: -160 }} delay={1200}/>
    </div>
    <Sidebar active={active} onNavigate={onNavigate}/>
    <main className="fg-main">{children}</main>
  </div>
);

Object.assign(window, { Sidebar, TopBar, Shell });
