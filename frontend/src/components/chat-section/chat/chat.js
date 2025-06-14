import React, { useContext, useRef, useEffect } from 'react';

import { ChatbotContext } from 'contexts';

import { chatContainer } from './chat.module.scss';

import BotMessage from './bot-message';
import UserMessage from './user-message';
import LoaderMessage from './loader';

const Chat = () => {
    const {
        chatToken,
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
    } = useContext(ChatbotContext);

    const container = useRef(null);
    
    const scrollDown = () => {
        setTimeout(() => {
            if (container.current !== null)
                container.current.scrollTop = container.current.scrollHeight;
        }, 65);
    };

    useEffect(() => {
        scrollDown();
    }, [chatHistory]);

    const renderMessage = (message) => {
        switch (message.from) {
            case 'bot':
                return <BotMessage message={message} />;
            case 'user':
                return <UserMessage message={message} />;
            default:
                return null;
        }
    };

    const value = {
        chatToken,
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
    }
    return (
        <ChatbotContext.Provider value={value}>
            <div className={chatContainer} data-testid="chat" ref={container}>
                {chatHistory.length > 0 &&
                    chatHistory.map((message, index) => (
                        <React.Fragment key={index.toString()}>
                            {renderMessage(message)}
                        </React.Fragment>
                    ))}
                {waitingResponse && <LoaderMessage />}
            </div>
        </ChatbotContext.Provider>
    );
};

export default Chat;
