// PieceScreen.jsx — a single piece's full record.

const PieceScreen = ({ piece, onBack, onOpenLetters }) => {
  if (!piece) return null;
  return (
    <div className="fg-screen">
      <TopBar
        title={piece.title}
        subtitle={`a piece · held ${piece.held}`}
        back
        onBack={onBack}
        action={
          <div style={{ display: "flex", gap: 10 }}>
            <Button variant="ghost" icon="letter" onClick={onOpenLetters}>Letters ({piece.letters})</Button>
            {piece.status !== "finished" && <Button variant="ceremony" icon="check">Mark finished</Button>}
          </div>
        }
      />

      <Divider ornament/>

      <div className="fg-piece-detail">
        {/* Left: the dream + stone + setting */}
        <div className="fg-piece-detail-main">
          <Card tone="violet">
            <div className="fg-eyebrow">the dream</div>
            <p className="fg-dream-large">"{piece.dream}"</p>
            <div className="fg-dream-cite">— {piece.client}, {piece.held}</div>
          </Card>

          <Card tone="teal">
            <SectionHead eyebrow="the stone" title={piece.stone}/>
            <div className="fg-kv-grid">
              <KeyVal k="size">{piece.stoneSize}</KeyVal>
              <KeyVal k="held">{piece.held}</KeyVal>
            </div>
            {piece.stoneNote && (
              <p className="fg-quiet-note">{piece.stoneNote}</p>
            )}
          </Card>

          <Card tone="teal">
            <SectionHead eyebrow="the setting" title="Wire & form"/>
            <div className="fg-kv-grid">
              <KeyVal k="wire">{piece.wire}</KeyVal>
              <KeyVal k="setting">{piece.setting}</KeyVal>
            </div>
            {piece.progress > 0 && piece.progress < 1 && (
              <div style={{ marginTop: 16 }}>
                <div className="fg-eyebrow" style={{ marginBottom: 8 }}>
                  in process · {Math.round(piece.progress * 100)}%
                </div>
                <Progress value={piece.progress}/>
              </div>
            )}
          </Card>
        </div>

        {/* Right: price card + status */}
        <aside className="fg-piece-detail-side">
          <Card tone={piece.status === "finished" ? "gold" : "teal"}>
            <div className="fg-eyebrow">{piece.status === "finished" ? "the whole" : "working price"}</div>
            <div className="fg-price-large" style={piece.status === "finished" ? { color: "var(--gold-300)" } : null}>
              <Price value={piece.price} tone={piece.status === "finished" ? "gold" : "default"}/>
            </div>
            <div style={{ height: 14 }}/>
            <div className="fg-price-break">
              <div className="fg-price-line"><span>materials</span><span>$ 380</span></div>
              <div className="fg-price-line"><span>time · 14 h</span><span>$ 840</span></div>
              <div className="fg-price-line"><span>depth · spirit</span><span>$ 200</span></div>
            </div>
          </Card>

          <Card tone="teal">
            <div className="fg-eyebrow">status</div>
            <div style={{ marginTop: 6 }}><Chip status={piece.status}/></div>
            <div className="fg-quiet-note" style={{ marginTop: 14 }}>
              <Icon name="clock" size={14} style={{ verticalAlign: "-2px", marginRight: 6 }}/>
              last touched {piece.lastTouched}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};

Object.assign(window, { PieceScreen });
