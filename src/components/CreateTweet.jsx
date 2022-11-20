import React from 'react'
import { useState } from 'react'
import './CreateTweet.css'

function CreateTweet ({ defaultContent, handleAddTweet }) {
  const [content, setContent] = useState(defaultContent)
  const user = 'admin'

  const [height, setHeight] = useState('180px')
  const autoResize = e => {
    console.log('scrollHeight', e.target.scrollHeight)
    console.log('height=', height)
    if (e.target.scrollHeight > 180) {
      setHeight('auto')
      if (e.target.scrollHeight < 196) setHeight(e.target.scrollHeight + 'px')
    } else {
      setHeight('180px')
    }
  }

  const handleContentChange = newValue => setContent(newValue)

  return (
    <>
      <div className='text-container'>
        <textarea
          autoFocus
          name='content'
          placeholder='What you have in mind...'
          onChange={e => handleContentChange(e.target.value)}
          value={content}
          style={{
            resize: 'none',
            height: height,
            overflow: 'hidden'
          }}
          onInput={autoResize}
        />
        <button
          onClick={() => handleAddTweet({ user: user, content: content })}
        >
          Tweet
        </button>
      </div>
    </>
  )
}
export default CreateTweet
