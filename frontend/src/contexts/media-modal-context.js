import { createContext } from 'react';

const MediaModalContext = createContext({
    mediaModalDisplay: false,
    setMediaModalDisplay: () => {},
    mediaModalUrl: '',
    setMediaModalUrl: () => {},
    mediaModalAlt: '',
    setMediaModalAlt: () => {},
    mediaModalType: '',
    setMediaModalType: () => {},
});

export default MediaModalContext;
