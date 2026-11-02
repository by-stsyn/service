import React, { InputHTMLAttributes, useState, useEffect, useRef } from 'react';
import { IMaskInput } from 'react-imask';

export default function PhoneInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const [internalValue, setInternalValue] = useState<string>((props.value as string) || '');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (props.value !== undefined) {
      setInternalValue(props.value as string);
    }
  }, [props.value]);

  // Listen to parent form reset events so uncontrolled forms reset the masked phone input properly
  useEffect(() => {
    const el = inputRef.current;
    const form = el?.closest('form');
    if (!form) return;

    const handleFormReset = () => {
      setInternalValue('');
      if (el) {
        el.setCustomValidity('');
      }
    };

    form.addEventListener('reset', handleFormReset);
    return () => form.removeEventListener('reset', handleFormReset);
  }, []);

  const validatePhoneElement = (val: string, el: HTMLInputElement | null) => {
    if (!el) return;
    const digits = val.replace(/\D/g, '');
    if (props.required && digits.length < 11) {
      el.setCustomValidity('Пожалуйста, введите полный номер телефона (10 цифр после +7)');
    } else {
      el.setCustomValidity('');
    }
  };

  return (
    <IMaskInput
      {...props}
      inputRef={(el: HTMLInputElement | null) => {
        inputRef.current = el;
        validatePhoneElement(internalValue, el);
      }}
      mask="+7 (000) 000-00-00"
      placeholder={props.placeholder || '+7 (___) ___-__-__'}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      minLength={18}
      pattern="\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}"
      title="Формат: +7 (999) 000-00-00"
      value={internalValue}
      unmask={false}
      onAccept={(value: string) => {
        setInternalValue(value);
        validatePhoneElement(value, inputRef.current);

        if (props.onChange) {
          const e = {
            target: {
              value: value,
              name: props.name,
            },
          } as React.ChangeEvent<HTMLInputElement>;
          props.onChange(e);
        }
      }}
    />
  );
}
