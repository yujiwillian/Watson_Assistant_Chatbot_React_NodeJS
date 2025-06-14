import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from './input';

test('Render App component', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
});
