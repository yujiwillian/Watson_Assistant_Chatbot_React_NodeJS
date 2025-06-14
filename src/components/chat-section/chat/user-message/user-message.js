import React from 'react';

import PropTypes from 'prop-types';

import {
    messageContainer,
    messagePosition,
    messageBalloon,
    messageTail,
    messageTime,
} from './user-message.module.scss';

const UserMessage = ({ message }) => (
    <div className={messageContainer} data-testid="user-message-container">
        <div className={messagePosition}>
            <div className={`${messageBalloon} ${messageTail}`}>
                <p>{message.text}</p>
            </div>
            <p className={messageTime}>{message?.time}</p>
        </div>
    </div>
);

UserMessage.propTypes = {
    message: PropTypes.shape({
        text: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
    }).isRequired,
};

export default UserMessage;
