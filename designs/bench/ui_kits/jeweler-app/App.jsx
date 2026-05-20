// App.jsx — top-level: routing + state.

const App = () => {
  const [screen, setScreen] = useState("ledger"); // "ledger" | "piece" | "letters" | "materials" | "clients"
  const [activePieceId, setActivePieceId] = useState(null);
  const [filter, setFilter] = useState("all");

  const data = window.FILIGREE_DATA;
  const pieces = data.pieces;
  const piece = pieces.find(p => p.id === activePieceId);
  const letters = (data.letters[activePieceId] || []);

  const nav = (target) => {
    if (target === "ledger" || target === "letters" || target === "materials" || target === "clients") {
      setScreen(target);
      setActivePieceId(null);
    }
  };

  const openPiece = (id) => { setActivePieceId(id); setScreen("piece"); };
  const openLetters = () => { setScreen("letters"); };

  let content;
  if (screen === "ledger") {
    content = <LedgerScreen pieces={pieces} onOpenPiece={openPiece} filter={filter} setFilter={setFilter}/>;
  } else if (screen === "piece") {
    content = <PieceScreen piece={piece} onBack={() => setScreen("ledger")} onOpenLetters={openLetters}/>;
  } else if (screen === "letters") {
    // If we got here from a piece, use that piece's letters; otherwise default to anna's
    const p = piece || pieces.find(x => x.id === "p-042");
    const l = data.letters[p.id] || data.letters["p-042"];
    content = <LettersScreen piece={p} letters={l} onBack={() => activePieceId ? setScreen("piece") : setScreen("ledger")}/>;
  } else if (screen === "materials") {
    content = <MaterialsScreen/>;
  } else if (screen === "clients") {
    content = (
      <div className="fg-screen">
        <TopBar title="Clients" subtitle="the dear ones"/>
        <Divider/>
        <div style={{ padding: "40px 0", textAlign: "center", color: "var(--fg-subtle)", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 18 }}>
          Held lightly. To be designed once the ledger has run a season.
        </div>
      </div>
    );
  }

  // Sidebar active state — "piece" / "letters" both light up Ledger root unless on letters list
  const activeNav = screen === "piece" ? "ledger"
                  : screen === "letters" ? "letters"
                  : screen;

  return (
    <Shell active={activeNav} onNavigate={nav}>
      {content}
    </Shell>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
