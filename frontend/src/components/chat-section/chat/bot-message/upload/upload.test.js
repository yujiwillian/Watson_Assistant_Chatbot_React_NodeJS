import React from 'react';
import { render, screen } from '@testing-library/react';
import Upload from './upload';

test('Render upload container component', () => {
    render(<Upload />);
    expect(screen.getByTestId('upload')).toBeInTheDocument();
});
