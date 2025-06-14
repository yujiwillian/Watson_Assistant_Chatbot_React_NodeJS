import React, { useContext } from 'react';

import { MediaModalContext } from 'contexts';

import { ReactComponent as Close } from 'assets/images/close.svg';

import {
    modal,
    modalContainer,
    modalWindow,
    modalHeader,
    modalCloseButton,
    modalContentDimensons,
    modalMediaContainer,
    modalMedia,
} from './media-modal.module.scss';

const MediaModal = () => {
    const {
        mediaModalType,
        setMediaModalDisplay,
        mediaModalUrl,
        mediaModalAlt,
    } = useContext(MediaModalContext);

    const handleCloseClick = () => {
        setMediaModalDisplay(false);
    };

    return (
        <div className={modalContainer} data-testid="media-modal-container">
            <div className={modal}>
                <div className={modalWindow}>
                    <div className={modalContentDimensons}>
                        <div className={modalHeader}>
                            <span />
                            <button
                                className={modalCloseButton}
                                type="button"
                                onClick={handleCloseClick}
                            >
                                <Close />
                            </button>
                        </div>
                        <div className={modalMediaContainer}>
                            {mediaModalType === 'image' ? (
                                <img
                                    className={modalMedia}
                                    src={mediaModalUrl}
                                    alt={mediaModalAlt || ''}
                                />
                            ) : (
                                // eslint-disable-next-line jsx-a11y/media-has-caption
                                <video
                                    className={modalMedia}
                                    src={mediaModalUrl}
                                    controls
                                    data-testid="video"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaModal;
