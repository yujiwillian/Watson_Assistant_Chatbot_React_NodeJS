import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatSection from './chat-section';

test('Render Chat Section component', () => {
    render(<ChatSection />);
    expect(screen.getByTestId('chat-container')).toBeInTheDocument();
});
