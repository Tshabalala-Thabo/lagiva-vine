import React from 'react'

export const Button = ({ text, onClick, className, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center text-white justify-center px-4 py-2 rounded ${className}`}
    >
      {icon}
      {text}
    </button>
  )
}
