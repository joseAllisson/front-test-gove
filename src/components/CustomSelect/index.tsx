import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormHelperText, InputLabel } from '@mui/material';

interface Option {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  label?: string;
  variant?: 'standard' | 'filled' | 'outlined';
  minWidth?: number;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  label = '',
  variant = 'standard',
  minWidth = 120,
  disabled = false,
  required = false,
  error = false,
  helperText
}: CustomSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  const selectId = `custom-select-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <FormControl
      variant={variant}
      sx={{ m: 0, minWidth }}
      disabled={disabled}
      required={required}
      error={error}
    >
      {label && <InputLabel id={`${selectId}-label`}>{label}</InputLabel>}
      <Select
        labelId={`${selectId}-label`}
        id={selectId}
        value={value.toString()}
        onChange={handleChange}
        label={label}
      >
        <MenuItem value="">
          <em>{label}</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value.toString()}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}