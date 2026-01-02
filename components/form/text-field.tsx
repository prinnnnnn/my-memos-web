import React from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type TextFieldProps = {
  placeholder: string;
  label: string;
  register: UseFormRegisterReturn<any>;
  error: FieldError;
}

export const TextField = ({ label, placeholder, register, error }: TextFieldProps) => {
  return (
    <>
      <label className="block text-lg text-slate-900 font-bold mb-1">{label}</label>
      <input
        {...register}
        type="text"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-slate-900"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </>
  )
}

export const TextAreaField = ({ label, placeholder, register, error, rows }: TextFieldProps & { rows: number }) => {
  return (
    <>
      <label className="block text-lg text-slate-900 font-bold mb-1">{label}</label>
      <textarea
        {...register}
        rows={rows}
        className="mt-1 mb-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-slate-900"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </>
  )
}