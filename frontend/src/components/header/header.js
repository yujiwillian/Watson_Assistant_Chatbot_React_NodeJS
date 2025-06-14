import React, { useContext } from 'react';
import Logo from 'assets/images/Logo.png';
import { ReactComponent as Renew } from 'assets/images/renew.svg';
import { ChatbotContext, ModalContext } from 'contexts';
import {
    header,
    workWarning,
    restartChat,
    renew,
    inside,
} from './header.module.scss';

const Header = () => {
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
        <div className={header} data-testid="header">
            <div className={inside}>
                <div>
                    <img src={Logo} alt="Logo" />
                </div>
                {process.env.REACT_APP_ENV !== 'production' && (
                    <p className={workWarning}>{process.env.REACT_APP_ENV_NAME || "NON-PROD"}</p>
                )}
            </div>
            <div>
                <button
                    type="button"
                    className={restartChat}
                    onClick={handleRefreshClick}
                >
                    <Renew className={renew} />
                </button>
            </div>
        </div>
    );
};

export default Header;
