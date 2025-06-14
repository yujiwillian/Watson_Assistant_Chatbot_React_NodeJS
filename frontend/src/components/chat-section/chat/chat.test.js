import React from 'react';
import { render, screen } from '@testing-library/react';
import Chat from './chat';

test('Render Chat component', () => {
    render(<Chat />);
    expect(screen.getByTestId('chat')).toBeInTheDocument();
});
