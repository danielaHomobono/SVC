'use client'
'use client'
import React from 'react'

export default function SplitText({ text, by = 'words', className = '' }: { text: string; by?: 'words' | 'chars'; className?: string }) {
  if (by === 'chars') {
    return (
      <span className={className}>
        {Array.from(text).map((ch, i) => (
          <span key={i} style={{ display: 'inline-block' }} className="char">{ch}</span>
        ))}
      </span>
    )
  }

  // words
  const words = text.split(/\s+/).filter(Boolean)
  return (
    <span className={className}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span style={{ display: 'inline-block' }} className="word">{w}</span>
          {i < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </span>
  )
}
