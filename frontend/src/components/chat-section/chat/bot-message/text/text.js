import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Bot } from 'assets/images/logo.svg';

import HtmlParser from 'html-react-parser';

import {
    messageContainer,
    messageBallon,
    messageTail,
    messageTime,
    messageContent,
    messageAvatar,
} from './text.module.scss';

const Text = ({ message, time }) => (
    <div className={messageContainer} data-testid="bot-message-container">
        <div className={messageAvatar}>
            <Bot />
        </div>
        <div className={messageContent}>
            <div className={messageBallon}>
                <div className={messageTail}>
                    <p>{HtmlParser(message)}</p>
                </div>
            </div>
            <p className={messageTime}>{time}</p>
        </div>
    </div>
);

Text.propTypes = {
    message: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
};

export default Text;
