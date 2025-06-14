import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoMessage from './video-message';

test('Render Video Message component', () => {
    const url = 'mocked_url';
    const time = '09:30, 20/04';

    render(<VideoMessage url={url} time={time} />);
    expect(screen.getByText(/09:30/i)).toBeInTheDocument();
});
