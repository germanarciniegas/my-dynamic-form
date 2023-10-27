import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import DynamicForm from './components/DynamicForm/DynamicForm';

test('renders App componet', () => {
  render(<App />);
  const linkElement = screen.getByText(/My Dynamic Form/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders all form fields', () => {
  render(<DynamicForm setResponse={()=>{}}/>);
  const nameField = screen.getByLabelText(/Name/i);
  const ageField = screen.getByLabelText(/Age/i);
  const genderField = screen.getByLabelText(/Gender/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  expect(nameField).toBeInTheDocument();
  expect(ageField).toBeInTheDocument();
  expect(genderField).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('displays error message on form submission with empty fields', () => {
  render(<DynamicForm setResponse={()=>{}}/>);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.click(submitButton);

  const errorMessage = screen.getByText(/Please fill in all the required fields/i);
  expect(errorMessage).toBeInTheDocument();
});

test('submits form data when all fields are filled', () => {
  render(<DynamicForm setResponse={()=>{}}/>);
  const nameField = screen.getByLabelText(/Name/i);
  const ageField = screen.getByLabelText(/Age/i);
  const genderField = screen.getByLabelText(/Gender/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(nameField, { target: { value: 'John Doe' } });
  fireEvent.change(ageField, { target: { value: '30' } });
  fireEvent.click(genderField);
  fireEvent.click(submitButton);
});