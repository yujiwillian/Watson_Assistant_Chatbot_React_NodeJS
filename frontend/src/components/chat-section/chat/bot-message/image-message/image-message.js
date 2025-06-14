import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { MediaModalContext } from 'contexts';

import { ReactComponent as Bot } from 'assets/images/logo.svg';

import {
    messageContainer,
    messageAvatar,
    messageBallon,
    messageTail,
    messageTime,
    messageContent,
    imageSize,
    imageStyle,
} from './image-message.module.scss';

const ImageMessage = ({ url, alt, time }) => {
    const {
        setMediaModalType,
        setMediaModalDisplay,
        setMediaModalUrl,
        setMediaModalAlt,
    } = useContext(MediaModalContext);

    const handleClickOnImage = () => {
        setMediaModalDisplay(true);
        setMediaModalType('image');
        setMediaModalUrl(url);
        setMediaModalAlt(alt);
    };

    return (
        <div className={messageContainer}>
            <div className={messageAvatar}>
                <Bot />
            </div>
            <div className={messageContent}>
                <div className={messageBallon}>
                    <div className={messageTail}>
                        <div
                            className={imageSize}
                            onClick={() => handleClickOnImage()}
                            onKeyPress={() => {}}
                            role="button"
                            tabIndex="0"
                        >
                            <img
                                className={imageStyle}
                                src={url}
                                alt={alt}
                                data-testid="image-message"
                            />
                        </div>
                    </div>
                </div>
                <p className={messageTime}>{time}</p>
            </div>
        </div>
    );
};

ImageMessage.propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
    time: PropTypes.string.isRequired,
};

ImageMessage.defaultProps = {
    alt: '',
};

export default ImageMessage;
