import React, { useState, useEffect, useContext } from 'react';

import PropTypes from 'prop-types';

import { ChatbotContext } from 'contexts';

import { messageContainer } from './bot-message.module.scss';

import ButtonSet from './button-set';
import ImageMessage from './image-message';
import Select from './select';
import Text from './text';
import Upload from './upload';
import VideoMessage from './video-message';

const BotMessage = ({ message }) => {
    const { disableOptions, chatToken } = useContext(ChatbotContext);
    const [optionsState, setOptionsState] = useState(message?.options || []);

    useEffect(() => {
        setOptionsState((previousValue) =>
            previousValue.map((item) => ({
                ...item,
                disabled: true,
            }))
        );
    }, [disableOptions]);

    useEffect(() => {
        setOptionsState((previousValue) =>
            previousValue.map((item) => ({
                ...item,
                disabled: false,
            }))
        );
    }, []);

    const disableOptionsAfterClick = (selectedValue) => {
        setOptionsState((previousValue) =>
            previousValue.map((item) => ({
                ...item,
                disabled: selectedValue !== item.value,
            }))
        );
    };

    const handleBotMessageDisplay = () => {
        switch (message.type) {
            case 'text': {
                return <Text message={message?.text} time={message?.time} />;
            }

            case 'options': {
                if (message?.dropdown) {
                    return <Select options={optionsState} />;
                }
                return (
                    <ButtonSet
                        options={optionsState}
                        disableOptionsAfterClick={disableOptionsAfterClick}
                    />
                );
            }

            case 'image': {
                return (
                    <ImageMessage
                        url={message?.url}
                        alt={message?.alt}
                        time={message?.time}
                    />
                );
            }

            case 'video': {
                return <VideoMessage url={message?.url} time={message?.time} />;
            }

            case 'attachment': {
                return <Upload incident={message.incident} />;;
            }

            default:
                return null;
        }
    };

    const value = {
        chatToken,
        disableOptions,
    }

    return (

        <div className={messageContainer} data-testid="bot-message">
            {handleBotMessageDisplay()}
        </div>
    );
};

BotMessage.propTypes = {
    message: PropTypes.shape({
        type: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired,
        text: PropTypes.string,
        url: PropTypes.string,
        alt: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.object),
        time: PropTypes.string,
        dropdown: PropTypes.bool,
        incident: PropTypes.string,
    }).isRequired,
};

export default BotMessage;
