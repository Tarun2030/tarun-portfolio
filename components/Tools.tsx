const tools = [
  'Next.js 14', 'Supabase', 'Vercel', 'Claude API',
  'TypeScript', 'Tailwind CSS', 'Cursor', 'n8n', 'Notion', 'Linear',
]

export default function Tools() {
  return (
    <section id="tools" style={{ padding: '80px 0' }}>
      <div className="badge" style={{ marginBottom: '12px' }}>Daily Stack</div>
      <h2 style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '32px',
        fontWeight: 700,
        color: 'var(--text)',
        marginBottom: '32px',
      }}>{"// TOOLS"}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {tools.map(tool => (
          <span key={tool} className="badge" style={{ fontSize: '11px', padding: '6px 14px' }}>
            {tool}
          </span>
        ))}
      </div>
    </section>
  )
}
