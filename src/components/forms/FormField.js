import React from 'react';
import { Controller } from 'react-hook-form';
import { AppInput } from '../common/AppInput';

export const FormField = ({ control, name, rules, defaultValue = '', ...inputProps }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <AppInput
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
          {...inputProps}
        />
      )}
    />
  );
};
