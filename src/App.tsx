import { useState } from 'react'

const WA = '237691717518'
const MIN = 20
type Key = 'nature' | 'choco'
const PRODUCTS: { key: Key; name: string; desc: string; price: number; img: string }[] = [
  { key: 'nature', name: 'Crêpe nature', desc: 'La classique, fine et moelleuse', price: 100, img: 'img/nature.jpg' },
  { key: 'choco', name: 'Crêpe au chocolat', desc: 'Nappée de chocolat fondant', price: 150, img: 'img/chocolat.jpg' },
]
const fmt = (n: number) => n.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' F'

const Logo = () => (
  <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#F7C948"/><circle cx="50" cy="52" r="34" fill="#E9A23B"/><circle cx="50" cy="50" r="34" fill="#F4C064"/><g fill="#C9781C" opacity=".8"><circle cx="38" cy="40" r="3.5"/><circle cx="58" cy="36" r="2.6"/><circle cx="64" cy="54" r="4"/><circle cx="44" cy="62" r="3"/><circle cx="54" cy="70" r="2.2"/><circle cx="30" cy="54" r="2.4"/></g><path d="M27 38Q35 33 40 38T52 38T64 38T75 36M25 50Q33 45 40 50T52 50T64 50T77 48M28 62Q36 57 42 62T54 62T66 62T73 60" fill="none" stroke="#3B1D0E" strokeWidth="4" strokeLinecap="round"/></svg>
)
const WaIcon = () => (
  <svg viewBox="0 0 32 32"><path fill="#1FAF55" d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.8 2 6.8L3.3 29l6.6-1.7c1.9 1 4 1.6 6.1 1.6 7.2 0 13-5.7 13-12.8S23.2 3 16 3z"/><path fill="#fff" d="M11.6 9.4c-.3-.6-.6-.6-.9-.6h-.8c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.9c.2.2 2.6 4.1 6.4 5.6 3.2 1.2 3.8 1 4.5.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5l-2.5-1.2c-.3-.1-.6-.2-.8.2-.2.4-.9 1.2-1.1 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.6.1-.3.1-.5 0-.7l-1.1-2.5z"/></svg>
)

export default function App() {
  const [q, setQ] = useState<Record<Key, number>>({ nature: 0, choco: 0 })
  const [err, setErr] = useState('')
  const count = q.nature + q.choco
  const total = PRODUCTS.reduce((s, p) => s + q[p.key] * p.price, 0)
  const change = (k: Key, d: number) => { setErr(''); setQ(v => ({ ...v, [k]: Math.max(0, v[k] + d) })) }

  const send = () => {
    if (count < MIN) return setErr(`Minimum ${MIN} crêpes : ajoutez-en encore ${MIN - count}.`)
    const lines = [
      'Bonjour A.L Crêperie ! Je souhaite commander :', '',
      ...PRODUCTS.filter(p => q[p.key]).map(p => `${p.name} : ${q[p.key]} x ${p.price} = ${fmt(q[p.key] * p.price)}`),
      `Total : ${count} crêpes, ${fmt(total)} (hors livraison)`,
    ]
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank')
  }

  return (
    <div className="page">
      <header className="top">
        <div className="hd">
          <div className="mk"><Logo /></div>
          <div className="bn"><b>A.L</b><i>crêperie</i></div>
          <div className="kk">Fait maison · Kotto, Douala</div>
        </div>
        <h1>Crêpes maison</h1>
        <div className="ts">fines, dorées, faites pour vous</div>
        <svg className="drip" viewBox="0 0 1000 90" preserveAspectRatio="none"><path fill="#3B1D0E" d="M0 0H1000V22C975 22 968 40 960 58C952 78 930 78 925 58C918 30 900 24 880 26C850 30 845 70 830 74C812 78 806 52 800 38C790 18 760 20 745 30C730 40 735 62 718 64C700 66 698 40 680 30C650 16 630 30 620 52C610 82 585 86 578 60C570 34 555 22 530 26C505 30 500 48 488 50C474 52 470 30 450 26C425 22 410 40 405 66C400 88 376 88 372 64C368 40 352 22 325 24C300 26 295 46 280 48C266 50 260 30 240 26C215 22 200 36 195 54C190 72 168 74 162 54C156 34 140 22 115 24C90 26 82 50 68 52C52 54 50 30 30 24C18 20 6 22 0 24Z"/></svg>
      </header>

      <main className="mid">
        <div className="prods">
          {PRODUCTS.map((p, i) => (
            <section key={p.key} className={'pr' + (i % 2 ? ' alt' : '')}>
              <div className="ph"><img src={p.img} alt={p.name} /></div>
              <div className="pi">
                <div className="pn">{p.name}</div>
                <div className="pd">{p.desc}</div>
                <div className="pp"><b>{p.price}</b><span>FCFA / pièce</span></div>
                <div className="qt">
                  <button aria-label="Retirer" onClick={() => change(p.key, -1)}>−</button>
                  <span>{q[p.key]}</span>
                  <button aria-label="Ajouter" onClick={() => change(p.key, 1)}>+</button>
                  <button className="plus10" onClick={() => change(p.key, 10)}>+10</button>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mn">
          <div className="mq">{MIN}<small>MINI</small></div>
          <div className="mt"><b>{MIN} crêpes minimum</b><span>20 nature = 2 000 F<br />20 chocolat = 3 000 F</span></div>
        </div>

        <div className="inf">
          <div className="ir"><div className="ic"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg></div>Kotto, immeuble à l’entrée Pilote</div>
          <div className="ir"><div className="ic"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 5h12v10H2zM14 8h4l4 4v3h-8z"/><circle cx="6" cy="17.5" r="2.2"/><circle cx="17.5" cy="17.5" r="2.2"/></svg></div>Livraison aux frais du client</div>
        </div>

        <section className="form">
          <h2>Votre commande</h2>
          {PRODUCTS.map(p => (
            <div className="line" key={p.key}><span>{p.name} × {q[p.key]}</span><b>{fmt(q[p.key] * p.price)}</b></div>
          ))}
          <div className="bar"><i style={{ width: Math.min(100, (count / MIN) * 100) + '%' }} /></div>
          <div className="cnt">{count >= MIN ? `${count} crêpes ✓` : `${count} / ${MIN} crêpes minimum`}</div>
          <div className="tot"><span>Total</span><b>{fmt(total)}</b></div>
          {err && <div className="err">{err}</div>}
        </section>
      </main>

      <footer className="cta">
        <svg className="drip2" viewBox="0 0 1000 50" preserveAspectRatio="none"><path fill="#3B1D0E" d="M0 50V30C60 30 70 8 120 10C170 12 180 34 240 32C300 30 310 6 370 6C430 6 440 30 500 30C560 30 570 4 630 6C690 8 700 32 760 30C820 28 830 8 880 8C930 8 950 26 1000 26V50Z"/></svg>
        <button className="wa" onClick={send}>
          <div className="wi"><WaIcon /></div>
          <div className="wt"><span>Commandez sur WhatsApp</span><b>{count ? fmt(total) : '+237 6 91 71 75 18'}</b></div>
        </button>
        <div className="fn">Frais de livraison confirmés sur WhatsApp · © A.L Crêperie</div>
      </footer>
    </div>
  )
}
