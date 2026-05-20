// LedgerScreen.jsx — home view, list of all pieces.

const LedgerScreen = ({ pieces, onOpenPiece, filter, setFilter }) => {
  const filters = [
    { id: "all",            label: "All",            n: pieces.length },
    { id: "in-process",     label: "In process",     n: pieces.filter(p => p.status === "in-process").length },
    { id: "awaiting-reply", label: "Awaiting reply", n: pieces.filter(p => p.status === "awaiting-reply").length },
    { id: "finished",       label: "Finished",       n: pieces.filter(p => p.status === "finished").length },
    { id: "laid-aside",     label: "Laid aside",     n: pieces.filter(p => p.status === "laid-aside").length },
  ];

  const visible = filter === "all" ? pieces : pieces.filter(p => p.status === filter);

  return (
    <div className="fg-screen">
      <TopBar
        title="The ledger"
        subtitle="the work"
        action={<Button icon="plus">Begin a piece</Button>}
      />

      {/* Filter row — pill nav */}
      <div className="fg-filter-row">
        <div className="fg-filter-nav">
          {filters.map(f => (
            <button
              key={f.id}
              className={`fg-filter-item${filter === f.id ? " active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <span className="fg-filter-count">{f.n}</span>
            </button>
          ))}
        </div>
        <div className="fg-search">
          <Icon name="search" size={16}/>
          <input placeholder="Search by client, stone, or word…"/>
        </div>
      </div>

      <Divider ornament/>

      {/* Pieces grid */}
      <div className="fg-piece-grid">
        {visible.map(p => (
          <Card
            key={p.id}
            tone={p.status === "finished" ? "gold" : p.status === "awaiting-reply" ? "violet" : "teal"}
            interactive
            onClick={() => onOpenPiece(p.id)}
          >
            <div className="fg-piece-head">
              <Chip status={p.status}/>
              <span className="fg-piece-when">{p.lastTouched}</span>
            </div>
            <h3 className="fg-piece-title">{p.title}</h3>
            <p className="fg-piece-dream">"{p.dream}"</p>
            <div className="fg-piece-meta">
              <div className="fg-piece-meta-row">
                <Tag>{p.stone}</Tag>
                {p.wire && <Tag>{p.wire.split(",")[0]}</Tag>}
              </div>
              <Price value={p.price} tone={p.status === "finished" ? "gold" : "default"}/>
            </div>
            {p.progress > 0 && p.progress < 1 && (
              <div className="fg-piece-progress">
                <Progress value={p.progress}/>
                <span className="fg-piece-progress-num">{Math.round(p.progress * 100)}%</span>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { LedgerScreen });
