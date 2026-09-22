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
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <AppInput
          value={value}
          onChangeText={onChange}
          error={error?.message}
          {...inputProps}
        />
      )}
    />
  );
};
