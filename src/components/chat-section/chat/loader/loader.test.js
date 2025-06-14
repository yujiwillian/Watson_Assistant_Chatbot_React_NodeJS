import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './loader';

test('Render Loader component', () => {
    render(<Loader />);
    expect(screen.getByTestId('loading-container')).toBeInTheDocument();
});
