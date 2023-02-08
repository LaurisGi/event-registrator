import React from "react"
import { useCornify } from 'use-cornify'

export const Error = () => {
const { remove } = useCornify({
    keys: ['ArrowUp', 'ArrowUp', 'Enter'],
    showCupCakeButton: false,
    addMagicalWords: false,
    younicorns: '12,957,826,716,386'
  })


  return (
    <div
      style={{
        fontFamily: 'arial, verdana, sans-serif',
        margin: '20vmin auto',
        textAlign: 'center',
        color: 'white',
      }}>
      <h1>ERROR404</h1>
      <h2>The page you looking for is not found</h2>
      <h3>Type this code secret code: ↑ ↓ and click Enter</h3>
      <button onClick={() => remove()}>Remove</button>
    </div>
  )
}
