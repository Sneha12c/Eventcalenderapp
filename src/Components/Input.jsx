import React from 'react';

export const Input = ({ label, name,type , value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 mt-1 border rounded-lg"
    />
  </div>
);
