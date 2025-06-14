import React, { useContext, useRef } from 'react';
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
    videoSize,
    videoStyle,
} from './video-message.module.scss';

const VideoMessage = ({ url, time }) => {
    const videoRef = useRef(null);

    const { setMediaModalType, setMediaModalDisplay, setMediaModalUrl } =
        useContext(MediaModalContext);

    const pauseVideo = () => {
        videoRef.current.play();
    };

    const handleVideoPress = () => {
        pauseVideo();
        setMediaModalDisplay(true);
        setMediaModalType('video');
        setMediaModalUrl(url);
    };

    return (
        <div className={messageContainer}>
            <div className={messageAvatar}>
                <Bot />
            </div>
            <div className={messageContent}>
                <div className={messageBallon}>
                    <div className={messageTail}>
                        <div className={videoSize}>
                            {
                                // eslint-disable-next-line jsx-a11y/media-has-caption
                                <video
                                    onClick={handleVideoPress}
                                    className={videoStyle}
                                    src={url}
                                    controls
                                    data-testid="video"
                                    ref={videoRef}
                                />
                            }
                        </div>
                    </div>
                </div>
                <p className={messageTime}>{time}</p>
            </div>
        </div>
    );
};

VideoMessage.propTypes = {
    url: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
};

export default VideoMessage;
