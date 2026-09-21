const TABS = [
  {
    id: "overview",
    label: "Meteo",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
  },
  {
    id: "hourly",
    label: "Orario",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    id: "daily",
    label: "7 Giorni",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    id: "bento",
    label: "Dettagli",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "pokedex",
    label: "Pokédex",
    isAction: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    ),
  },
];

const MobileTabBar = ({ activeTab, onTabChange, onOpenPokedex }) => {
  const handleClick = (tab) => {
    if (tab.isAction) {
      if (onOpenPokedex) {
        onOpenPokedex();
      }
      return;
    }
    if (onTabChange) {
      onTabChange(tab.id);
    }
  };

  return (
    <nav className="mobile_tab_dock" role="navigation" aria-label="Mobile Navigation">
      <div className="mobile_tab_capsule">
        {TABS.map((tab) => {
          const isActive = !tab.isAction && activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`mobile_tab_item ${isActive ? "active" : ""} ${tab.isAction ? "pokedex_action" : ""}`}
              onClick={() => handleClick(tab)}
              aria-selected={isActive}
              role={tab.isAction ? "button" : "tab"}
              title={tab.label}
            >
              <span className="mobile_tab_icon">{tab.icon}</span>
              <span className="mobile_tab_label">{tab.label}</span>
            </button>

          );
        })}
      </div>
    </nav>
  );
};

export default MobileTabBar;
