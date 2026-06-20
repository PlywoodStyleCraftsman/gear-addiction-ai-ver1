'use client';

import { useMemo, useState } from 'react';

type Gear = {
  name: string;
  aliases: string[];
  maker: string;
  category: string;
  price: string;
  use: string;
  competitors: string[];
  difference: string;
  scores: { numa: number; desire: number; cost: number; utility: number; mood: number };
  buyFor: string[];
  notFor: string[];
  honest: string[];
  stickers: string[];
};

const gears: Gear[] = [
  {
    name: 'GOAL ZERO Lighthouse Micro Flash',
    aliases: ['goal zero', 'ゴールゼロ', 'lighthouse', 'micro flash'],
    maker: 'Goal Zero',
    category: '小型LEDランタン',
    price: '約3,500〜5,000円前後',
    use: 'ソロキャンプ、テント内照明、サブランタン、非常用ライト',
    competitors: ['38灯', 'Ledlenser ML4', 'Black Diamond Moji'],
    difference: '小型・軽量・USB充電。明るさよりも携帯性と所有欲で刺さるタイプ。',
    scores: { numa: 5, desire: 5, cost: 4, utility: 4, mood: 5 },
    buyFor: ['小型ランタンが好きな人', 'ソロキャンパー', '予備を持って安心したい人', 'ギアを並べて楽しみたい人'],
    notFor: ['1台でサイト全体を照らしたい人', '明るさ最優先の人', 'ギアを増やしたくない人'],
    honest: ['また増えた', '予備が本命', '灯りはロマン', '必要経費', '今夜も点灯', '気付けば3個目', '光の民', 'ランタン沼', '所有欲全開', '増殖中'],
    stickers: ['灯りはロマン', '予備が本命', '必要経費', '今夜も点灯', 'また増えた']
  },
  {
    name: '38灯',
    aliases: ['38灯', '38-kT', '38explore', '38explore 38灯'],
    maker: '38explore',
    category: 'LEDランタン / カスタムギア',
    price: '約6,000〜10,000円前後',
    use: 'キャンプサイト演出、テーブル周り、カスタム好き向け照明',
    competitors: ['GOAL ZERO', 'Ledlenser ML4', 'ZIG'],
    difference: '実用性だけでなくカスタム性とブランド感が強い。沼に入りやすい。',
    scores: { numa: 5, desire: 5, cost: 3, utility: 4, mood: 5 },
    buyFor: ['人と違うギアが好きな人', 'カスタム沼の住人', 'サイトの雰囲気を作りたい人'],
    notFor: ['安さ重視の人', 'シンプル運用派', '照明は明るければいい人'],
    honest: ['これは沼', 'カスタム前提', '光る所有欲', 'またパーツ増えた', '雰囲気重視', '高いけど欲しい', '沼の入口', 'ギアは正義', '卓上の主役', '夜が楽しい'],
    stickers: ['これは沼', '光る所有欲', 'カスタム前提', '沼の入口', '夜が楽しい']
  },
  {
    name: 'シェルコン25',
    aliases: ['シェルコン', 'シェルコン25', 'snow peak シェルコン', 'シェルフコンテナ25'],
    maker: 'snow peak',
    category: 'コンテナ / 収納ギア',
    price: '約14,000〜18,000円前後',
    use: 'キャンプギア収納、車載、テーブル化、ガレージ収納',
    competitors: ['トランクカーゴ', 'アルミコンテナ', 'コンテナボックス'],
    difference: '収納ギアなのにカスタム欲が出る。実用品から所有物へ変わるタイプ。',
    scores: { numa: 5, desire: 5, cost: 3, utility: 5, mood: 5 },
    buyFor: ['収納も見た目もこだわる人', 'キャンプギアを整理したい人', 'カスタム好き'],
    notFor: ['軽さ重視の人', '安い収納で十分な人', '積載に余裕がない人'],
    honest: ['箱なのに沼', '収納はロマン', '積載美学', 'またカスタム', 'ギアの家', '中身より箱', '重いけど正義', '所有欲の箱', '積むだけで映える', 'ガレージ感'],
    stickers: ['箱なのに沼', '収納はロマン', '積載美学', '所有欲の箱', 'ガレージ感']
  },
  {
    name: 'トランクカーゴ50L',
    aliases: ['トランクカーゴ', 'トランクカーゴ50', 'トランクカーゴ50L', 'risu trunk cargo'],
    maker: 'RISU / TRUNK CARGO',
    category: '収納ボックス / コンテナ',
    price: '約4,000〜7,000円前後',
    use: 'キャンプ道具収納、車載、屋外収納、簡易テーブル',
    competitors: ['シェルコン25', '無印頑丈収納ボックス', 'アルミコンテナ'],
    difference: '価格と実用性のバランスが強い。ガシガシ使える現場系コンテナ。',
    scores: { numa: 4, desire: 4, cost: 5, utility: 5, mood: 4 },
    buyFor: ['コスパ重視のキャンパー', '道具をまとめたい人', 'ラフに使いたい人'],
    notFor: ['高級感重視の人', '軽量化したい人', '人と被りたくない人'],
    honest: ['結局これ', '雑に強い', '積めば正義', '道具箱感', 'コスパ優勝', '車載の味方', '収納沼', '現場感が良い', '増やしやすい', 'ギアの基地'],
    stickers: ['結局これ', '雑に強い', '積めば正義', 'コスパ優勝', 'ギアの基地']
  },
  {
    name: 'マキタ MR005G',
    aliases: ['マキタ', 'makita', 'mr005g', 'マキタ mr005g', '現場ラジオ'],
    maker: 'Makita',
    category: '充電式ラジオ / ガレージギア',
    price: '約25,000〜40,000円前後',
    use: 'ガレージ、作業場、キャンプ、車中泊、DIY時間',
    competitors: ['マキタ MR113', 'DeWALT ToughSystem Radio', 'Bluetoothスピーカー'],
    difference: '音楽機器というより現場感のあるガレージギア。工具好きに刺さる。',
    scores: { numa: 4, desire: 5, cost: 3, utility: 4, mood: 5 },
    buyFor: ['工具好き', 'ガレージ時間が好きな人', '作業中に音楽を流したい人'],
    notFor: ['小型スピーカーで十分な人', '価格重視の人', '持ち運び軽量派'],
    honest: ['現場が家', '音も工具', 'ガレージの相棒', 'マキタは正義', '作業BGM', '無骨で良い', '工具沼', '必要経費', 'バッテリー共有最高', '置くだけで現場'],
    stickers: ['現場が家', '音も工具', 'マキタは正義', '工具沼', '必要経費']
  }
];

function stars(n: number) {
  return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
}

function findGear(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return gears[0];
  return gears.find(g => g.aliases.some(a => q.includes(a.toLowerCase()) || a.toLowerCase().includes(q))) || gears[0];
}

export default function Page() {
  const [query, setQuery] = useState('GOAL ZERO');
  const [selected, setSelected] = useState<string[]>([]);
  const gear = useMemo(() => findGear(query), [query]);

  const toggle = (word: string) => {
    setSelected(prev => prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]);
  };

  const examples = ['GOAL ZERO', '38灯', 'シェルコン25', 'トランクカーゴ50L', 'マキタ MR005G'];

  return (
    <main className="container">
      <div className="wrap">
        <section className="hero">
          <div className="brand">STYLE WORKS GARAGE</div>
          <h1>GEAR<br />ADDICTION<br />AI</h1>
          <p className="lead">製品名を入力するだけ。ギア沼度、競合、価格帯、キャンパーの本音を診断。</p>
          <div className="search">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="例：GOAL ZERO" />
            <button onClick={() => setQuery(query)}>診断する</button>
          </div>
          <div className="examples">
            {examples.map(ex => <button className="secondary" key={ex} onClick={() => { setQuery(ex); setSelected([]); }}>{ex}</button>)}
          </div>
        </section>

        <section className="card">
          <h2>{gear.name}</h2>
          <div className="grid">
            <div className="item"><span className="label">メーカー</span>{gear.maker}</div>
            <div className="item"><span className="label">カテゴリ</span>{gear.category}</div>
            <div className="item"><span className="label">価格帯目安</span>{gear.price}</div>
            <div className="item"><span className="label">用途</span>{gear.use}</div>
          </div>
          <p className="note">※価格帯・仕様は目安です。購入前に公式情報や販売ページをご確認ください。</p>
        </section>

        <section className="card">
          <h2>AI評価</h2>
          <div className="grid">
            <div className="item"><span className="label">ギア沼度</span><div className="score">{stars(gear.scores.numa)}</div></div>
            <div className="item"><span className="label">所有欲</span><div className="score">{stars(gear.scores.desire)}</div></div>
            <div className="item"><span className="label">コスパ</span><div className="score">{stars(gear.scores.cost)}</div></div>
            <div className="item"><span className="label">実用性</span><div className="score">{stars(gear.scores.utility)}</div></div>
            <div className="item"><span className="label">キャンプ映え</span><div className="score">{stars(gear.scores.mood)}</div></div>
          </div>
        </section>

        <section className="card">
          <h2>競合比較</h2>
          <ul>{gear.competitors.map(c => <li key={c}>{c}</li>)}</ul>
          <p><strong>違い：</strong>{gear.difference}</p>
        </section>

        <section className="card">
          <h2>買うべき人</h2>
          <ul>{gear.buyFor.map(x => <li key={x}>{x}</li>)}</ul>
          <h2 style={{marginTop: 24}}>買わなくていい人</h2>
          <ul>{gear.notFor.map(x => <li key={x}>{x}</li>)}</ul>
        </section>

        <section className="card">
          <h2>キャンパーの本音</h2>
          <p className="note">共感した言葉を押してください。人気ワードは次の商品企画に使います。</p>
          <div className="words">
            {gear.honest.map(word => (
              <button key={word} className="word" onClick={() => toggle(word)}>{selected.includes(word) ? '✓ ' : ''}{word}</button>
            ))}
          </div>
          {selected.length > 0 && <p><strong>選択中：</strong>{selected.join(' / ')}</p>}
        </section>

        <section className="card">
          <h2>ステッカー化候補</h2>
          <div className="words">{gear.stickers.map(word => <span className="word" key={word}>{word}</span>)}</div>
        </section>

        <section className="cta">
          <div className="cta-title">関連リンク</div>
          <p>BOOTH / SUZURI リンクは準備中</p>
          <p className="note">Ver.1は無料の固定データ版です。反応を見てギア追加・集計機能・AI接続を検討します。</p>
        </section>

        <div className="footer">FOR CAMPERS / FOR GEARHOLICS / STYLE WORKS GARAGE</div>
      </div>
    </main>
  );
}
