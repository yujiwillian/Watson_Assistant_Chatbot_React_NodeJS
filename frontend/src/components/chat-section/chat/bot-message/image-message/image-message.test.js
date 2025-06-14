import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageMessage from './image-message';

test('Render Video Message component', () => {
    const url = 'mocked_url';
    const alt = 'alt';
    const time = '16:30, 20/04';

    render(<ImageMessage url={url} alt={alt} time={time} />);
    expect(screen.getByText(/16:30/i)).toBeInTheDocument();
});
