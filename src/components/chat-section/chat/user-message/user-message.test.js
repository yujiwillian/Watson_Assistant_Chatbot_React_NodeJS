import React from 'react';
import { render, screen } from '@testing-library/react';
import UserMessage from './user-message';

test('Render Chat component', () => {
    const message = {
        text: 'Ola',
        from: 'user',
        time: '08:10, 20/04',
    };
    render(<UserMessage message={message} />);
    expect(screen.getByTestId('user-message-container')).toBeInTheDocument();
});
