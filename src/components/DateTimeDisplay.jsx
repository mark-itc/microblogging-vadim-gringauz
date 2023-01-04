import React from 'react'

function DateTimeDisplay({ timeStamp }) {
  return (
    <>{timeStamp.toDateString()}, {timeStamp.toLocaleTimeString()}</>
  )
}

export default DateTimeDisplay
