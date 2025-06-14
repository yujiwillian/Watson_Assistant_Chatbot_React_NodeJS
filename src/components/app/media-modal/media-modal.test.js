import React from 'react';
import { render, screen } from '@testing-library/react';
import MediaModal from './media-modal';

test('Render media modal', () => {
    render(<MediaModal />);
    expect(screen.getByTestId('media-modal-container')).toBeInTheDocument();
});
