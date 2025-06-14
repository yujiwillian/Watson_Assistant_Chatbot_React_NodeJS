import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { ReactComponent as Bot } from 'assets/images/logo.svg';

import {
    messageContainer,
    messageContent,
    messageBallon,
    messageTail,
    black,
    messageAvatar,
} from './loader.module.scss';

const Loader = () => (
    <div className={messageContainer} data-testid="loading-container">
        <div className={messageAvatar}>
            <Bot />
        </div>
        <div className={messageContent}>
            <div className={messageBallon}>
                <div className={messageTail}>
                    <PulseLoader color={black} size="10px" />
                </div>
            </div>
        </div>
    </div>
);

export default Loader;
