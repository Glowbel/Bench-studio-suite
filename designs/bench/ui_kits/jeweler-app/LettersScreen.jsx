// LettersScreen.jsx — correspondence drafting view.

const LettersScreen = ({ piece, letters, onBack }) => {
  const [draft, setDraft] = useState(
    "I sat with the stone again last night. The cloud reads true even by lamplight — "
  );

  if (!piece) return null;

  return (
    <div className="fg-screen">
      <TopBar
        title={`Letters · ${piece.client}`}
        subtitle="correspondence"
        back
        onBack={onBack}
      />

      <Divider/>

      <div className="fg-letters">
        {/* Thread — past letters */}
        <div className="fg-letters-thread">
          <div className="fg-eyebrow" style={{ marginBottom: 14 }}>the thread</div>
          {letters.map((l, i) => (
            <div key={i} className={`fg-letter fg-letter-${l.from}`}>
              <div className="fg-letter-head">
                <span className="fg-letter-from">{l.from === "me" ? "me" : piece.client.toLowerCase()}</span>
                <span className="fg-letter-when">{l.when}</span>
              </div>
              <p className="fg-letter-body">{l.body}</p>
            </div>
          ))}
        </div>

        {/* Draft */}
        <aside className="fg-letters-draft">
          <div className="fg-eyebrow">a reply, taking shape</div>
          <textarea
            className="fg-draft-area"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            rows={10}
          />
          <div className="fg-draft-toolbar">
            <div className="fg-draft-context">
              <Icon name="spiral" size={14}/>
              <span>holding 4 details from the thread</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Button variant="ghost">Hold for later</Button>
              <Button variant="primary" icon="send">Send</Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

Object.assign(window, { LettersScreen });
