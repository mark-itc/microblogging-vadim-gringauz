import React from 'react'
import styled from 'styled-components'
import { TextareaAutosize, Stack, Button } from '@mui/material'
import CharsCounter from './CharsCounter'

const TextContainerStyle = styled.form`
  box-sizing: border-box;
  width: 100%;
  border: 2px solid #cccccc;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  margin-right: auto;
  margin-left: auto;
  background-color: whitesmoke;
  color: black;

  @media screen and (width < 600px) {
    width: 90%;
  }

  textarea {
    box-sizing: border-box;
    width: calc(100% - 72px);
    left: 367px;
    top: 105px;
    background-color: whitesmoke;
    font-style: normal;
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 22px;
    border: 0;
    outline: none;
    resize: 'none';
    overflow: 'hidden';
    transition: 0.5s;
  }
`

function TextContainer (props) {
  const {
    handleSubmit,
    state,
    handleKeyDown,
    handleContentChange,
    buttonRef
  } = props

  return (
    <TextContainerStyle action='submit' onSubmit={handleSubmit}>
      <TextareaAutosize
        autoFocus
        name='content'
        placeholder='What you have in mind...'
        onChange={e => handleContentChange(e.target.value)}
        value={state.content}
        minRows={6}
        style={{
          resize: 'none',
          overflow: 'hidden'
        }}
        onKeyDown={handleKeyDown}
      />
      <Stack justifyContent={'space-between'}>
        <CharsCounter length={state.content.length} />
        <Button
          variant='contained'
          size='small'
          ref={buttonRef}
          type='submit'
          disabled={!state.isContentValid}
        >
          Tweet
        </Button>
      </Stack>
    </TextContainerStyle>
  )
}

export default TextContainer
