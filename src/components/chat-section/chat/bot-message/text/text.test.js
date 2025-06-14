import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from './text';

test('Render Bot Message component', () => {
    const message = `Olá, tudo bem? meu nome é Chatbot, e eu sou o
    responsável pelo seu atendimento! Aqui alguns assuntos que eu posso te ajudar:`;
    const time = '16:30, 20/04';

    render(<Text message={message} time={time} />);
    expect(screen.getByText(/Olá, tudo bem?/i)).toBeInTheDocument();
});
