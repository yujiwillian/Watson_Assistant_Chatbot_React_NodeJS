import { useContext, useEffect, useRef } from 'react';

import { ChatbotContext, ModalContext } from 'contexts';

import { TIMEOUT } from 'utils';

const Timer = () => {
    const {
        timer,
        setTimer,
        chatHistory,
        setChatHistory,
        startChat,
        setChatToken,
        setDisableChat,
        chatToken,
    } = useContext(ChatbotContext);

    const {
        modalDisplay,
        setModalDisplay,
        modalType,
        setModalType,
        setModalTitle,
        setModalContent,
        setSecondaryButtonLabel,
        setSecondaryButtonFunction,
    } = useContext(ModalContext);

    useInterval(
        () => {
            setTimer(timer - 1000);
        },
        timer >= 1000 ? 1000 : null
    );

    useEffect(() => {
        const handleTimeOut = () => {
            if (timer === 59000) {
                setModalDisplay(true);
                setModalType('timeout');
                setModalTitle('Você ainda está ai?');
                setModalContent(
                    'O chat está inativo há muito tempo e em breve será encerrado.'
                );
                setSecondaryButtonLabel('Voltar ao chat');
                setSecondaryButtonFunction({
                    function: () => {},
                });
            }
        };
        handleTimeOut();
    }, [
        timer,
        setModalDisplay,
        setModalType,
        setModalTitle,
        setModalContent,
        setSecondaryButtonLabel,
        setSecondaryButtonFunction,
    ]);

    useEffect(() => {
        if (timer === 0 && chatToken && modalType === 'timeout') {
            setModalDisplay(true);
            setModalType('end');
            setModalTitle('Você tem mais perguntas?');
            setModalContent(
                'O chat foi encerrado por inatividade. Reinicie o chat para continuar a conversar.'
            );
            setSecondaryButtonLabel('Reiniciar');
            setSecondaryButtonFunction({
                function: () => {
                    setChatHistory([]);
                    startChat();
                    setDisableChat(false);
                },
            });
            setDisableChat(true);
            setChatToken(null);
        }
    }, [
        setModalType,
        timer,
        setModalTitle,
        setModalContent,
        setSecondaryButtonLabel,
        setSecondaryButtonFunction,
        setChatHistory,
        modalDisplay,
        setModalDisplay,
        modalType,
        setChatToken,
        startChat,
        chatToken,
        setDisableChat,
    ]);

    useEffect(() => {
        setTimer(TIMEOUT);
    }, [chatHistory, setTimer]);

    return null;
};

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    // The useEffect returning null breaks the app
    // eslint-disable-next-line consistent-return
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default Timer;
