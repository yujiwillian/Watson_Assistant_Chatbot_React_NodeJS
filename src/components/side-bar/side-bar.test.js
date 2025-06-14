import React from 'react';
import { render, screen } from '@testing-library/react';
import SideBar from './side-bar';

test('Render side bar text', () => {
    render(<SideBar />);
    expect(screen.getByTestId('side-message')).toBeInTheDocument();
});
