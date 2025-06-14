/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useCallback } from 'react';

import {
    ChatbotContext,
    MediaModalContext,
    ModalContext,
    useUser,
} from 'contexts';

import { TIMEOUT } from 'utils';

import * as moment from 'moment';
import * as timezone from 'moment-timezone';

import { sendMessage }  from 'services';

import { main, window } from './app.module.scss';

import ChatSection from '../chat-section';
import Header from '../header';
import MediaModal from './media-modal';
import Modal from './bot-modal';
import SideBar from '../side-bar';
import Timer from './timer';

// import auth from '../../services/auth';

import {auth, msalInstance} from '../../services/auth';

timezone.tz.setDefault('America/Sao_Paulo');

function App() {
    const { user, setUser } = useUser();

    // Chat state
    const [chatToken, setChatToken] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [waitingResponse, setWaitingResponse] = useState(false);
    const [disableChat, setDisableChat] = useState(false);

    // Media Modal States
    const [mediaModalDisplay, setMediaModalDisplay] = useState(false);
    const [mediaModalUrl, setMediaModalUrl] = useState('');
    const [mediaModalAlt, setMediaModalAlt] = useState('');
    const [mediaModalType, setMediaModalType] = useState('');

    // Bot Modal States
    const [modalDisplay, setModalDisplay] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [primaryButtonLabel, setPrimaryButtonLabel] = useState('');
    const [primaryButtonFunction, setPrimaryButtonFunction] = useState({
        function: () => { },
    });
    const [secondaryButtonLabel, setSecondaryButtonLabel] = useState('');
    const [secondaryButtonFunction, setSecondaryButtonFunction] = useState({
        function: () => { },
    });

    // Initialization of timer
    const [timer, setTimer] = useState(TIMEOUT);

    const authUser = useCallback(() => {
        
        if (!user.isLoaded) {
            //  comentar codigo abaixo somente em teste
            // auth(
            //     setUser,
            //     setModalDisplay,
            //     setModalType,
            //     setModalTitle,
            //     setModalContent,
            //     setSecondaryButtonLabel,
            //     setPrimaryButtonFunction,
            //     setPrimaryButtonLabel,
            //     setSecondaryButtonFunction
            // );
        }
    }, [setUser, user]);

    const createMessageObject = (message) => ({
        text: message,
        type: 'text'
    });
        
    useEffect(() => {
        authUser();
    }, [authUser]);

    const handleMessageToHistory = useCallback(
        (message, userType = 'bot') => {
            const newValue = {
                ...message,
                time: handleMessageTime(message),
                from: userType,
            };
            setChatHistory((previousValue) => [...previousValue, newValue]);
        },
        [setChatHistory]
    );

    const handleMessageTime = (message) => {
        const currentDate = message?.time ? moment(message?.time) : moment();

        return `${currentDate.format('HH')}:${currentDate.format(
            'mm'
        )}, ${currentDate.format('DD')}/${currentDate.format('MM')}`;
    };

    const startChat = useCallback(async () => {
        let startChatTries = 0;
        console.log(`user_startchat: ${user.email}`);
        console.log(`nome user_start_chat: ${user.name}`);
        console.log(`ambiente: ${process.env.REACT_APP_ENV}`);
        try {
            setWaitingResponse(true);
            numTries: while (startChatTries <= 3) {
                const {
                    data: { chatId, messages },
                    // eslint-disable-next-line no-await-in-loop
                } = await sendMessage('', 'conversation_start', user);
                console.log('enviando nome inicio de conversa:',user);
                setChatToken(chatId);
                for (const item of messages) {
                    if (item.type === "error") {
                        if (startChatTries < 3) {
                            // eslint-disable-next-line no-plusplus
                            startChatTries++;
                            // eslint-disable-next-line no-continue
                            continue numTries;
                        }
                        throw new Error(item.text)
                    }
                    handleMessageToHistory(item)
                }
                break;
            }
        } catch (err) {
            const error = createMessageObject(
                'Ocorreu um erro ao enviar a mensagem. Reinicie a conversa e tente novamente.'
            );
            if (err.message) {
                error.text = err.message
            }
            handleMessageToHistory(error, 'bot');
        } finally {
            setWaitingResponse(false);
        }
    }, [handleMessageToHistory, user]);
    
    useEffect (async () => {
        console.log(`user: ${user.email}`);
        console.log(`nome user: ${user.name}`);
        if(!user.isLoaded)
            return;
            console.log('user quando nao carregado:',user);
            let startChatTries = 0;
            try {
                setWaitingResponse(true);
                numTries: while (startChatTries <= 3) {
                    const {
                        data: { chatId, messages },
                        // eslint-disable-next-line no-await-in-loop
                    } = await sendMessage('', 'conversation_start', user);
                    setChatToken(chatId);
                    for (const item of messages) {
                        if (item.type === "error") {
                            if (startChatTries < 3) {
                                // eslint-disable-next-line no-plusplus
                                startChatTries++;
                                // eslint-disable-next-line no-continue
                                continue numTries;
                            }
                            throw new Error(item.text)
                        }
                        handleMessageToHistory(item)
                    }
                    break;
                }
            } catch (err) {
                const error = createMessageObject(
                    'Ocorreu um erro ao enviar a mensagem. Reinicie a conversa e tente novamente.'
                );
                if (err.message) {
                    error.text = err.message
                }
                handleMessageToHistory(error, 'bot');
            } finally {
                setWaitingResponse(false);
            }
        }, 
        [startChat, user, handleMessageToHistory, setWaitingResponse, setChatToken, handleMessageToHistory]);

    const value = {
        chatToken,
        setChatToken,
        chatHistory,
        setChatHistory,
        createMessageObject,
        handleMessageToHistory,
        timer,
        setTimer,
        waitingResponse,
        setWaitingResponse,
        startChat,
        disableChat,
        setDisableChat,
    };

    const mediaModalValue = {
        mediaModalDisplay,
        setMediaModalDisplay,
        mediaModalUrl,
        setMediaModalUrl,
        mediaModalAlt,
        setMediaModalAlt,
        mediaModalType,
        setMediaModalType,
    };

    const modalValue = {
        modalDisplay,
        setModalDisplay,
        modalType,
        setModalType,
        modalTitle,
        setModalTitle,
        modalContent,
        setModalContent,
        primaryButtonLabel,
        setPrimaryButtonLabel,
        primaryButtonFunction,
        setPrimaryButtonFunction,
        secondaryButtonLabel,
        setSecondaryButtonLabel,
        secondaryButtonFunction,
        setSecondaryButtonFunction,
    };

    useEffect(() => {
        if (modalDisplay) {
            setMediaModalDisplay(false);
        }
    }, [modalDisplay]);

    return (
        <ChatbotContext.Provider value={value}>
            <MediaModalContext.Provider value={mediaModalValue}>
                <ModalContext.Provider value={modalValue}>
                    <div className={main}>
                        <Header />
                        <div className={window}>
                            <SideBar />
                            <ChatSection />
                            <Timer />
                        </div>
                        {mediaModalDisplay && <MediaModal />}
                        {modalDisplay && <Modal />}
                    </div>
                </ModalContext.Provider>
            </MediaModalContext.Provider>
        </ChatbotContext.Provider>
    );
}

export default App;
