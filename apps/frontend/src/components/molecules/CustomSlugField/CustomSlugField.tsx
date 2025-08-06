import React from 'react';
import { TextInput } from '../../atoms/TextInput/TextInput';
import { Label } from '../../atoms/Label/Label';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';

interface CustomSlugFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export const CustomSlugField: React.FC<CustomSlugFieldProps> = ({
  value,
  onChange,
  error,
  disabled = false,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="slug-input">
        Custom Slug (Optional)
      </Label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-500 text-sm">
          short.ly/
        </div>
        <TextInput
          id="slug-input"
          value={value}
          onChange={onChange}
          placeholder="my-custom-slug"
          error={error}
          disabled={disabled}
          className="pl-20"
        />
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};