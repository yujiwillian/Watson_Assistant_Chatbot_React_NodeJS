import React, { useState, useContext, useRef, useEffect } from 'react';
import SubmitArrow from 'assets/images/submitArrow.png';

import { ChatbotContext } from 'contexts';

import {
    button,
    buttonDisabled,
    buttonText,
    inputContainer,
    inputElement,
    inputElementDisabled,
    submitIcon,
} from './input.module.scss';

const Input = () => {
    const [userMessage, setUserMessage] = useState('');
    const [placeholder, setPlaceholder] = useState('Escreva a sua pergunta');
    const inputRef = useRef('');

    const {
        handleMessageToHistory,
        submitMessage,
        createMessageObject,
        disableChat,
        setDisableOptions,
        waitingResponse,
    } = useContext(ChatbotContext);

    useEffect(() => {
        if (!disableChat) {
            if (!waitingResponse) {
                setPlaceholder('Escreva a sua pergunta');
            } else {
                setPlaceholder('Aguardando resposta...');
            }
            return;
        }
        setPlaceholder('Conversa encerrada. Obrigado pelo contato!');
    }, [disableChat, waitingResponse]);

    const resetMessage = () => {
        inputRef.current.value = '';
        setUserMessage('');
    };

    const typedMessage = () => {
        setUserMessage(inputRef.current.value);
    };

    const enterSendMessage = (e) => {
        if (e.key === 'Enter') handleUserMessage();
    };

    const handleUserMessage = async () => {
        // Regex to catch blank ou just space messages
        const messageCheck = /^\s*$/.test(userMessage);

        if (!messageCheck) {
            const messageObject = createMessageObject(userMessage);
            handleMessageToHistory(messageObject, 'user');
            submitMessage(userMessage);
            setDisableOptions(true);
            setPlaceholder('Escreva a sua pergunta');
            resetMessage();
        } else {
            setPlaceholder('A mensagem digitada é inválida. Tente novamente.');
            resetMessage();
        }
    };

    return (
        <div className={inputContainer}>
            <input
                type="text"
                ref={inputRef}
                disabled={disableChat || waitingResponse}
                className={
                    disableChat || waitingResponse
                        ? inputElementDisabled
                        : inputElement
                }
                onChange={typedMessage}
                onKeyUp={enterSendMessage}
                placeholder={placeholder}
            />
            <button
                type="button"
                className={
                    disableChat || waitingResponse ? buttonDisabled : button
                }
                disabled={disableChat || waitingResponse}
                onClick={handleUserMessage}
            >
                <span className={buttonText}>Enviar</span>
                <div className={submitIcon}>
                    <img src={SubmitArrow} alt="submit icon" />
                </div>
            </button>
        </div>
    );
};

export default Input;
