import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonSet from './button-set';

test('Render Button Set component', () => {
    const options = [
        {
            label: 'Teste',
            value: 'Teste',
        },
    ];

    const disableOptionsAfterClick = jest.fn();

    render(
        <ButtonSet
            options={options}
            disableOptionsAfterClick={disableOptionsAfterClick}
        />
    );
    expect(screen.getByText(/Test/i)).toBeInTheDocument();
});
