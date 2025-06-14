import { createContext } from 'react';

const ChatbotContext = createContext({
    chatToken: null,
    setChatToken: () => {},
    chatHistory: [],
    setChatHistory: () => {},
    handleMessageToHistory: () => {},
    createMessageObject: () => {},
    timer: 0,
    setTimer: () => {},
    waitingResponse: false,
    setWaitingResponse: () => {},
    startChat: () => {},
    disableChat: false,
    setDisableChat: () => {},
});

export default ChatbotContext;
