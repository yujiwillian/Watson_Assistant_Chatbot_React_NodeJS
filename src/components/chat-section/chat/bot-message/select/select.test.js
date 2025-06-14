import React from 'react';
import { render, screen } from '@testing-library/react';
import Select from './select';

test('Render select container component', () => {
    const options = [
        {
            label: 'Teste',
            value: 'Teste',
        },
    ];

    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
});
