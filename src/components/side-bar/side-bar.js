import React, { useContext } from 'react';
// original
import bot from 'assets/images/chatbot.png';
import { ChatbotContext, ModalContext } from 'contexts';

import {
    content,
    description,
    logo,
    message,
    sideContainer,
    restartChat,
    title,
} from './side-bar.module.scss';

const SideBar = () => {
    const {
        setModalDisplay,
        setModalType,
        setModalTitle,
        setModalContent,
        setSecondaryButtonLabel,
        setSecondaryButtonFunction,
        setPrimaryButtonLabel,
        setPrimaryButtonFunction,
    } = useContext(ModalContext);

    const {
        chatToken,
        setChatToken,
        setChatHistory,
        startChat,
        setDisableChat,
    } = useContext(ChatbotContext);

    const refreshChat = () => {
        if (chatToken) {
            setChatToken(null);
        }
        setChatHistory([]);
        startChat();
        setDisableChat(false);
    };

    const handleRefreshClick = () => {
        setModalDisplay(true);
        setModalType('warning');
        setModalTitle('Você realmente deseja reiniciar a conversa?');
        setModalContent('Todo o progresso da conversa atual será perdido.');
        setSecondaryButtonLabel('Reiniciar');
        setSecondaryButtonFunction({
            function: () => refreshChat(),
        });
        setPrimaryButtonLabel('Cancelar');
        setPrimaryButtonFunction({
            function: () => {},
        });
    };

    return (
        <aside className={sideContainer} data-testid="side-message">
            <div className={logo}>
                <img src={bot} alt="Chatbot" />
            </div>

            <div className={content}>

                <button
                    type="button"
                    className={restartChat}
                    onClick={handleRefreshClick}
                >
                    Reiniciar conversa
                </button>
            </div>
        </aside>
    );
};

export default SideBar;
