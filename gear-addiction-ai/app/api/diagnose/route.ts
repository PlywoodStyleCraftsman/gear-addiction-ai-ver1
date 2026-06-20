import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  try {
    const { productName } = await req.json()

    if (!productName || typeof productName !== 'string') {
      return NextResponse.json({ error: '製品名を入力してください。' }, { status: 400 })
    }

    const prompt = `
あなたはキャンプギア専門の比較診断AIです。
ユーザーが入力した製品名について、分かる範囲で診断してください。
不確かな情報は断定せず、「目安」「一般的には」と表現してください。

ブランド名：STYLE WORKS GARAGE
サービス名：GEAR ADDICTION AI

対象製品：${productName}

必ず以下のJSON形式だけで返してください。説明文やMarkdownは不要です。
{
  "productName": "",
  "maker": "",
  "category": "",
  "specs": ["", "", ""],
  "priceRange": "",
  "competitors": ["", "", ""],
  "difference": "",
  "recommendedUses": ["", "", ""],
  "buyFor": ["", "", ""],
  "notFor": ["", "", ""],
  "ratings": {
    "gearAddiction": 5,
    "ownershipDesire": 5,
    "costPerformance": 3,
    "practicality": 4,
    "campStyle": 5
  },
  "honestPhrases": ["", "", "", "", "", "", "", "", "", ""],
  "stickerPhrases": ["", "", "", "", "", "", "", "", "", ""]
}
文体は、キャンプ好き・ガレージ好きに刺さる、少し無骨でユーモアのある表現にしてください。
`

    const response = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      return NextResponse.json({ error: '診断結果を取得できませんでした。' }, { status: 500 })
    }

    return NextResponse.json(JSON.parse(content))
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: '診断中にエラーが発生しました。' }, { status: 500 })
  }
}
