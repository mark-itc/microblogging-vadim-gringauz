import React from 'react'

function DateTimeDisplay({ timeStamp }) {
  return (
    <div>{timeStamp.toDateString()}, {timeStamp.toLocaleTimeString()}</div>
  )
}

export default DateTimeDisplay
