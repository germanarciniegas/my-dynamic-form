import React, { useState } from 'react';
import { TextField, MenuItem, Button, Box, Typography } from '@mui/material';

const formConfig = [
  { type: 'text', label: 'Name', required: true },
  { type: 'number', label: 'Age', required: true },
  { type: 'select', label: 'Gender', options: ['Male', 'Female', 'Not defined'], required: true },
];

type propsDynamicForm = {
    setResponse: React.Dispatch<React.SetStateAction<{}>>
}

const DynamicForm = ({setResponse}: propsDynamicForm) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    formConfig.forEach((field) => {
      if (field.required && !formData[field.label]) {
            newErrors[field.label] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(formData);
      setResponse(formData);
    }
  };

  return (
    <Box component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
            boxShadow: '4px 10px 15px -3px rgba(0,0,0,0.1)', 
            backgroundColor: '#32363917', 
            padding: '20px', 
            minWidth: '350px', 
            }
        }>
        <h1>My Dynamic Form</h1>
        {formConfig.map((field, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
            {field.type === 'select' ? (
                <TextField
                select
                label={field.label}
                name={field.label}
                onChange={handleChange}
                fullWidth
                data-testid={field.label}
                error={!!errors[field.label]}
                helperText={errors[field.label]}
                >
                {field.options?.map((option, index) => (
                    <MenuItem key={index} value={option}>
                    {option}
                    </MenuItem>
                ))}
                </TextField>
            ) : (
                <TextField
                type={field.type}
                label={field.label}
                name={field.label}
                onChange={handleChange}
                fullWidth
                error={!!errors[field.label]}
                helperText={errors[field.label]}
                />
            )}
            </div>
        ))}
        <Button type="submit" variant="contained" fullWidth>
            Submit
        </Button>
        {Object.keys(errors).length > 0 && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
            Please fill in all the required fields
            </Typography>
        )}
    </Box>
  );
};

export default DynamicForm;