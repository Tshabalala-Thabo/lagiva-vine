import React from 'react'

export const Button = ({ text, onClick, className, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center text-sm px-4 py-2 rounded-[1px] ${className}`}
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
      className={`flex bg-primary items-center text-white justify-center text-sm px-4 py-2 rounded-[1px] ${className}`}
    >
      {icon}
      {text}
    </button>
  )
}

export const ButtonDanger = ({ text, onClick, className, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex bg-danger items-center text-white justify-center text-sm px-4 py-2 rounded-[1px] ${className}`}
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

export const ButtonSecondaryOutline = ({ text, onClick, className, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex border border-gray-500 items-center text-balck justify-center text-sm px-4 py-2 rounded-[1px] ${className}`}
    >
      {icon}
      {text}
    </button>
  )
}