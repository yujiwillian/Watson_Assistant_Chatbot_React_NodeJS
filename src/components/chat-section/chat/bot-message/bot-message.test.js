import React from 'react';
import { render, screen } from '@testing-library/react';
import BotMessage from './bot-message';

test('Render Bot Message component', () => {
    const message = {
        type: 'text',
        from: 'bot',
        text: 'Olá',
        time: '08:10, 20/04',
    };
    render(<BotMessage message={message} />);
    expect(screen.getByTestId('bot-message')).toBeInTheDocument();
});
