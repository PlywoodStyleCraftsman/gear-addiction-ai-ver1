'use client'

import { useState } from 'react'

type Diagnosis = {
  productName: string
  maker: string
  category: string
  specs: string[]
  priceRange: string
  competitors: string[]
  difference: string
  recommendedUses: string[]
  buyFor: string[]
  notFor: string[]
  ratings: {
    gearAddiction: number
    ownershipDesire: number
    costPerformance: number
    practicality: number
    campStyle: number
  }
  honestPhrases: string[]
  stickerPhrases: string[]
}

function stars(value: number) {
  const safe = Math.max(0, Math.min(5, Number(value) || 0))
  return '★★★★★☆☆☆☆☆'.slice(5 - safe, 10 - safe)
}

export default function Home() {
  const [productName, setProductName] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Diagnosis | null>(null)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<string[]>([])

  async function diagnose() {
    setLoading(true)
    setError('')
    setResult(null)
    setSelected([])

    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '診断に失敗しました。')
      setResult(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : '診断に失敗しました。')
    } finally {
      setLoading(false)
    }
  }

  function togglePhrase(phrase: string) {
    setSelected((prev) => prev.includes(phrase) ? prev.filter((p) => p !== phrase) : [...prev, phrase])
  }

  return (
    <main>
      <section className="hero">
        <div className="brand">STYLE WORKS GARAGE</div>
        <h1>GEAR<br />ADDICTION AI</h1>
        <p><strong>製品名を入れるだけ。</strong><br />スペック、競合、価格帯、ギア沼度をAIが診断。</p>
        <div className="inputRow">
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="例：GOAL ZERO Lighthouse Micro Flash"
          />
          <button onClick={diagnose} disabled={loading || !productName.trim()}>
            {loading ? '診断中' : 'ギア診断する'}
          </button>
        </div>
      </section>

      {error && <div className="error">{error}</div>}

      {result && (
        <>
          <section className="card">
            <h2>基本情報</h2>
            <div className="grid">
              <div className="mini"><div className="label">製品名</div><div className="value">{result.productName}</div></div>
              <div className="mini"><div className="label">メーカー</div><div className="value">{result.maker}</div></div>
              <div className="mini"><div className="label">カテゴリ</div><div className="value">{result.category}</div></div>
              <div className="mini"><div className="label">価格帯</div><div className="value">{result.priceRange}</div></div>
            </div>
            <ul>{result.specs?.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </section>

          <section className="card">
            <h2>AI評価</h2>
            <div className="grid">
              <div className="mini"><div className="label">ギア沼度</div><div className="value">{stars(result.ratings.gearAddiction)}</div></div>
              <div className="mini"><div className="label">所有欲</div><div className="value">{stars(result.ratings.ownershipDesire)}</div></div>
              <div className="mini"><div className="label">コスパ</div><div className="value">{stars(result.ratings.costPerformance)}</div></div>
              <div className="mini"><div className="label">実用性</div><div className="value">{stars(result.ratings.practicality)}</div></div>
              <div className="mini"><div className="label">キャンプ映え</div><div className="value">{stars(result.ratings.campStyle)}</div></div>
            </div>
          </section>

          <section className="card">
            <h2>競合比較</h2>
            <ul>{result.competitors?.map((c, i) => <li key={i}>{c}</li>)}</ul>
            <p>{result.difference}</p>
          </section>

          <section className="card">
            <h2>おすすめ用途</h2>
            <ul>{result.recommendedUses?.map((x, i) => <li key={i}>{x}</li>)}</ul>
            <h2>買うべき人</h2>
            <ul>{result.buyFor?.map((x, i) => <li key={i}>{x}</li>)}</ul>
            <h2>買わなくていい人</h2>
            <ul>{result.notFor?.map((x, i) => <li key={i}>{x}</li>)}</ul>
          </section>

          <section className="card">
            <h2>キャンパーの本音</h2>
            <p>共感した言葉を選んでください。</p>
            <div className="phrases">
              {result.honestPhrases?.map((p) => (
                <button className="phrase" key={p} onClick={() => togglePhrase(p)} style={{ background: selected.includes(p) ? '#111' : '#fff', color: selected.includes(p) ? '#fff' : '#111' }}>
                  {p}
                </button>
              ))}
            </div>
            {selected.length > 0 && <p><strong>選択中：</strong>{selected.join(' / ')}</p>}
          </section>

          <section className="card">
            <h2>ステッカー化候補</h2>
            <div className="phrases">
              {result.stickerPhrases?.map((p) => <span className="phrase" key={p}>{p}</span>)}
            </div>
          </section>

          <section className="card">
            <h2>関連リンク</h2>
            <p>準備中</p>
          </section>
        </>
      )}

      <div className="footer">
        FOR CAMPERS / FOR GEARHOLICS<br />灯りはロマン。物欲は止まらない。
      </div>
    </main>
  )
}
