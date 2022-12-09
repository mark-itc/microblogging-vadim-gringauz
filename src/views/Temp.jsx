import React from 'react'

const url =
  'https://firestore.googleapis.com/v1/projects/firestore-caf7c/databases/(default)/documents/tasks/'

export default function Temp () {
  const getData = async () => {
    const response = await fetch(url)
    const result = await response.json()
    console.log('result', result)
  }

  getData()

  const newTask = {
    fields: {
      user: { stringValue: 'Mark' },
      title: { stringValue: 'Not be so serious' }
    }
  }
  const body = JSON.stringify(newTask)
  const addItem = async () => {
    console.log('posting...')
    await fetch(url, {
      method: 'POST',
      body: body
    })
  }
  return (
    <>
      <div>trolling</div>
      <button onClick={addItem}>troll</button>
    </>
  )
}
