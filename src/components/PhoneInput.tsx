import React, { InputHTMLAttributes } from 'react';
import { IMaskInput } from 'react-imask';

export default function PhoneInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <IMaskInput
      {...props}
      mask="+7 (000) 000-00-00"
      placeholder="+7 (___) ___-__-__"
      type="tel"
      value={props.value as string}
      unmask={false} // keep the mask in the value when calling onChange
      onAccept={(value: string, mask: any) => {
        if (props.onChange) {
          // create a synthetic event
          const e = {
            target: {
              value: value,
              name: props.name
            }
          } as React.ChangeEvent<HTMLInputElement>;
          props.onChange(e);
        }
      }}
    />
  );
}
