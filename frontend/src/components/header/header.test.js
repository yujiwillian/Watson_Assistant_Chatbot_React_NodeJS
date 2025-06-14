import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './header';

test('Render header', () => {
    render(<Header />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
});
