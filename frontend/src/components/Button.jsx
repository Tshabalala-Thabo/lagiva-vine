import React from 'react'

export const Button = ({ text, onClick, className, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center text-sm px-4 py-2 rounded ${className}`}
    >
      {icon}
      {text}
    </button>
  )
}

export const ButtonPrimary = ({ text, onClick, className, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex bg-primary-blue items-center text-white justify-center text-sm px-4 py-2 rounded ${className}`}
    >
      {icon}
      {text}
    </button>
  )
}


export const CancelButton = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center text-sm px-4 py-2 ${className}`}
    >
      {text ? text : 'Cancel'}
    </button>
  )
}
