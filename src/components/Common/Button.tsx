import React from 'react'

export default function Button({btnClass="btn-accent", lable, onClick}: Button) {
  return (
    <button className={`btn ${btnClass}`} onClick={onClick}> {lable} </button>
  )
}
