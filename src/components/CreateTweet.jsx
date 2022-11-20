import React from 'react'
import { useState } from 'react'
import './CreateTweet.css'

function CreateTweet ({ defaultContent, handleAddTweet }) {
  const [content, setContent] = useState(defaultContent)
  const user = 'admin'

  const handleContentChange = newValue => setContent(newValue)

  return (
    <>
      <textarea
        autoFocus
        name='content'
        placeholder='What you have in mind...'
        onChange={e => handleContentChange(e.target.value)}
        value={content}
      />
      <button onClick={() => handleAddTweet({ user: user, content: content })}>
        Tweet
      </button>
    </>
  )
}
export default CreateTweet
