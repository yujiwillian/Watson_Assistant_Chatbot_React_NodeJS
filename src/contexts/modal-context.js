import React from 'react';

const ModalContext = React.createContext({
    modalDisplay: false,
    setModalDisplay: () => {},
    modalType: '',
    setModalType: () => {},
    modalTitle: '',
    setModalTitle: () => {},
    modalContent: '',
    setModalContent: () => {},
    primaryButtonLabel: '',
    setPrimaryButtonLabel: () => {},
    primaryButtonFunction: {},
    setPrimaryButtonFunction: () => {},
    secondaryButtonLabel: '',
    setSecondaryButtonLabel: () => {},
    secondaryButtonFunction: {},
    setSecondaryButtonFunction: () => {},
});

export default ModalContext;
