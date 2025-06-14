import React, { useContext } from 'react';

import { ChatbotContext, ModalContext } from 'contexts';

import { ReactComponent as Close } from 'assets/images/close.svg';

import {
    modalContainer,
    modalWindow,
    modalHeader,
    modalCloseButton,
    modalWindowMessage,
    modalTitleSpace,
    modalMessage,
    modalFooter,
    modalPrimaryButton,
    modalSecundaryButton,
} from './bot-modal.module.scss';

const BotModal = () => {
    const { timer } = useContext(ChatbotContext);
    const {
        modalType,
        modalTitle,
        modalContent,
        setModalDisplay,
        primaryButtonLabel,
        primaryButtonFunction,
        secondaryButtonLabel,
        secondaryButtonFunction,
    } = useContext(ModalContext);

    const msToTime = (duration) => {
        if (duration === 0) {
            return '00:00:00';
        }
        let seconds = parseInt((duration / 1000) % 60, 10);
        let minutes = parseInt((duration / (1000 * 60)) % 60, 10);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);

        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${hours}:${minutes}:${seconds}`;
    };

    const handleCloseClick = () => {
        setModalDisplay(false);
    };

    const handlePrimaryButtonAction = () => {
        handleCloseClick();
        primaryButtonFunction.function();
    };

    const handleSecundaryButtonAction = () => {
        handleCloseClick();
        secondaryButtonFunction.function();
    };

    const handleModalButtons = () => {
        switch (modalType) {
            case 'timeout':
            case 'end':
                return (
                    <div className={modalFooter}>
                        <button
                            className={modalSecundaryButton}
                            type="button"
                            onClick={handleSecundaryButtonAction}
                        >
                            {secondaryButtonLabel}
                        </button>
                    </div>
                );
            case 'warning':
                return (
                    <div className={modalFooter}>
                        <button
                            className={modalSecundaryButton}
                            type="button"
                            onClick={handleSecundaryButtonAction}
                        >
                            {secondaryButtonLabel}
                        </button>
                        <button
                            className={modalPrimaryButton}
                            type="button"
                            onClick={handlePrimaryButtonAction}
                        >
                            {primaryButtonLabel}
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={modalContainer} data-testid="bot-modal-container">
            <div className={modalWindow}>
                <div className={modalHeader}>
                    {modalType !== 'warning' && timer < 60000 && (
                        <span>{msToTime(timer)}</span>
                    )}
                    <span />
                    <button
                        className={modalCloseButton}
                        type="button"
                        onClick={handleCloseClick}
                    >
                        <Close />
                    </button>
                </div>

                <div className={modalWindowMessage}>
                    <h2 className={modalTitleSpace}>{modalTitle}</h2>
                    <p className={modalMessage}>{modalContent}</p>
                </div>

                {handleModalButtons()}
            </div>
        </div>
    );
};

export default BotModal;
