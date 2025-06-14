import React, { useContext, useState, useCallback, useEffect } from 'react';

import { ChatbotContext } from 'contexts';

/* eslint-disable prettier/prettier */
import { sendMessage, sendAttachment } from 'services';

import {
    chatContainer,
    chatFigure,
    chatWindow,
} from './chat-section.module.scss';

import Chat from './chat';
import Input from './input';

const ChatSection = () => {
    const [disableOptions, setDisableOptions] = useState(false);

    const {
        chatToken,
        chatHistory,
        setChatHistory,
        handleMessageToHistory,
        createMessageObject,
        waitingResponse,
        setWaitingResponse,
        disableChat,
        setDisableChat,
    } = useContext(ChatbotContext);

    const submitMessage = useCallback(
        async (message) => {
            try {
                setWaitingResponse(true);
                const {
                    data: { messages },
                } = await sendMessage(chatToken, message);
                messages.forEach((item) => {
                    if (item.type === 'error') {
                        throw new Error('Erro');
                    }
                    handleMessageToHistory(item);
                });
            } catch {
                const error = createMessageObject(
                    'Ocorreu um erro ao enviar a mensagem. Reinicie a conversa e tente novamente.'
                );
                handleMessageToHistory(error, 'bot');
            } finally {
                setWaitingResponse(false);
            }
        },
        [
            chatToken,
            createMessageObject,
            handleMessageToHistory,
            setWaitingResponse,
        ]
    );

    const submitAttachment = useCallback(async (files, incident) => {
        try {
            setWaitingResponse(true);
            const {
                data: { messages },
            } = await sendAttachment(chatToken, files, incident);
            messages.forEach((item) => {
                if (item.type === 'error') {
                    throw new Error('Erro');
                }
                handleMessageToHistory(item);
            });
        } catch (attachmentError) {
            const error = createMessageObject(
                'Ocorreu um erro ao enviar os anexos. Reinicie a conversa e tente novamente.'
            );
            handleMessageToHistory(error, 'bot');
        } finally {
            setWaitingResponse(false);
        }
    });

    console.log('submitAttachment chat section',submitAttachment);

    const value = {
        waitingResponse,
        chatHistory,
        setChatHistory,
        handleMessageToHistory,
        createMessageObject,
        submitMessage,
        submitAttachment,
        disableChat,
        setDisableChat,
        disableOptions,
        setDisableOptions,
    };

    useEffect(() => {
        if (!disableChat) {
            setDisableOptions(false);
            return;
        }

        setDisableOptions(true);
    }, [disableChat]);

    return (
        <ChatbotContext.Provider value={value}>
            <div className={chatContainer} data-testid="chat-container">
                <div className={chatWindow}>
                    <Chat />
                    <Input />
                </div>
                <div className={chatFigure} />
            </div>
        </ChatbotContext.Provider>
    );
};
export default ChatSection;
