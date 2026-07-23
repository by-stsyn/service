import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react';

export const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';
  
  if (['7', '8', '9'].includes(digits[0])) {
    const isNine = digits[0] === '9';
    const number = isNine ? digits : digits.slice(1);
    const prefix = '+7';
    
    let formatted = prefix;
    if (number.length > 0) formatted += ` (${number.substring(0, 3)}`;
    if (number.length >= 4) formatted += `) ${number.substring(3, 6)}`;
    if (number.length >= 7) formatted += `-${number.substring(6, 8)}`;
    if (number.length >= 9) formatted += `-${number.substring(8, 10)}`;
    return formatted;
  } else {
    return `+${digits.substring(0, 15)}`;
  }
};

export default function PhoneInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = useState(props.defaultValue || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue(formatted);
    if (props.onChange) {
      e.target.value = formatted;
      props.onChange(e);
    }
  };

  return (
    <input
      {...props}
      type="tel"
      value={value}
      onChange={handleChange}
    />
  );
}
