import React from 'react';
import { render, screen } from '@testing-library/react';
import BotModal from './bot-modal';

test('Render bot modal', () => {
    render(<BotModal />);
    expect(screen.getByTestId('bot-modal-container')).toBeInTheDocument();
});
