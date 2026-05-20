// MaterialsScreen.jsx — wire & stone inventory.

const MaterialsScreen = () => {
  const { wire, stones } = window.FILIGREE_DATA.materials;
  return (
    <div className="fg-screen">
      <TopBar
        title="Materials"
        subtitle="what i hold"
        action={<Button variant="secondary" icon="plus">Add</Button>}
      />
      <Divider/>

      <div className="fg-materials">
        <Card tone="teal">
          <SectionHead eyebrow="wire" title="Spools & lengths"/>
          <table className="fg-table">
            <thead>
              <tr><th>metal</th><th>gauge</th><th>length</th><th>note</th></tr>
            </thead>
            <tbody>
              {wire.map((w, i) => (
                <tr key={i}>
                  <td>{w.metal}</td>
                  <td className="fg-mono">{w.gauge}</td>
                  <td className="fg-mono">{w.length}</td>
                  <td className="fg-quiet">{w.note || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card tone="violet">
          <SectionHead eyebrow="stones" title="What lives in the velvet"/>
          <table className="fg-table">
            <thead>
              <tr><th>stone</th><th>size</th><th>count</th><th>note</th></tr>
            </thead>
            <tbody>
              {stones.map((s, i) => (
                <tr key={i}>
                  <td>{s.name}</td>
                  <td className="fg-mono">{s.size}</td>
                  <td className="fg-mono">{s.count}</td>
                  <td className="fg-quiet">{s.note || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

Object.assign(window, { MaterialsScreen });
