import React from 'react';
import { TextInput } from '../../atoms/TextInput/TextInput';
import { Label } from '../../atoms/Label/Label';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';

interface URLInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export const URLInputField: React.FC<URLInputFieldProps> = ({
  value,
  onChange,
  error,
  disabled = false,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="url-input" required>
        Enter URL
      </Label>
      <TextInput
        id="url-input"
        type="url"
        value={value}
        onChange={onChange}
        placeholder="https://example.com/very/long/url"
        error={error}
        disabled={disabled}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};