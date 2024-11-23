import React from 'react'
import { PulseLoader } from 'react-spinners'

export const Button = ({ text, onClick, className, icon, disabled }) => {
  return (
    <button
      onClick={disabled ? null : onClick}
      className={`flex items-center justify-center text-sm px-4 py-2 rounded-[1px] ${className} ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {icon}
      {text}
    </button>
  )
}

export const ButtonPrimary = ({ text, onClick, className, icon, disabled }) => {
  return (
    <button
      onClick={disabled ? null : onClick}
      className={`flex bg-primary items-center text-white justify-center text-sm px-4 py-2 rounded-[1px] ${className} ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {icon}
      {text}
    </button>
  )
}

export const ButtonDanger = ({ text, onClick, className, icon, disabled }) => {
  return (
    <button
      onClick={disabled ? null : onClick}
      className={`flex bg-danger items-center text-white justify-center text-sm px-4 py-2 rounded-[1px] ${className} ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {icon}
      {text}
    </button>
  )
}

export const ButtonDangerOutline = ({ text, onClick, className, icon, disabled }) => {
  return (
    <button
      onClick={disabled ? null : onClick}
      className={`flex border border-danger items-center text-danger justify-center text-sm px-4 py-2 rounded-[1px] ${className} ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {icon}
      {text}
    </button>
  )
}

export const CancelButton = ({ text, onClick, className, disabled }) => {
  return (
    <button
      onClick={disabled ? null : onClick}
      className={`flex items-center justify-center text-sm px-4 py-2 ${className} ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {text ? text : 'Cancel'}
    </button>
  )
}

export const ButtonSecondaryOutline = ({ text, onClick, className, icon, disabled }) => {
  return (
    <button
      onClick={disabled ? null : onClick}
      className={`flex border border-gray-500 items-center text-balck justify-center text-sm px-4 py-2 rounded-[1px] ${className} ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {icon}
      {text}
    </button>
  )
}

export const SubmitButton = ({ 
  loading, 
  text = 'Submit', 
  width = 'w-24', 
  height = 'h-10',
  onClick, 
  icon 
}) => (
  <button
      type="submit"
      className={`bg-primary text-white px-4 py-2 rounded-[1px] flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${width} ${height}`}
      disabled={loading}
      onClick={onClick}
  >
      {loading ? (
          <PulseLoader size={10} color={"#ffffff"} loading={loading} />
      ) : (
          <>
              {icon && icon}
              {text}
          </>
      )}
  </button>
)

export const DialogSubmitButton = ({ loading, text = 'Yes, delete', disabled, onClick }) => (
  <button
      type="submit"
      className={`inline-flex h-10 items-center justify-center rounded-[1px]  px-4 py-2 text-sm font-medium ring-offset-white transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
      disabled={loading}
      onClick={onClick}
  >
      {loading ? (
          <PulseLoader size={10} color={"#b40100"} loading={loading} />
      ) : (
          text
      )}
  </button>
)

export const DialogCancelButton = ({ text, onClick, className, disabled }) => {
  return (
    <button
      onClick={disabled ? null : onClick}
      className={`inline-flex h-10 items-center bg-primary justify-center rounded-[1px]  px-4 py-2 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className} ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {text ? text : 'Cancel'}
    </button>
  )
}