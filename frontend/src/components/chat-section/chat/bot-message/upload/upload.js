import React, { useState, useRef, useContext, useEffect } from 'react';
import { ChatbotContext } from 'contexts';
import { sendAttachment } from 'services';
import { button, container, buttonDisabled } from './upload.module.scss';
import UploadList from './upload-list';


const Upload = (data) => {
    // const { disableChat, submitMessage, chatHistory } = useContext(ChatbotContext);
    const {
        disableChat,
        submitMessage,
        chatHistory,
        andleMessageToHistory,
        submitAttachment,
        createMessageObject
    } = useContext(ChatbotContext);

    const { incident } = data;

    console.log('console funcao:',submitAttachment);

    const [files, setFiles] = useState([]);
    const [uploaded, setUploaded] = useState(false);
    const hiddenFileInput = useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const handleChange = (event) => {
        setFiles([...event.target.files]);
    };

    const handleRemoveFile = (position) => {
        const filesCopy = [...files];
        filesCopy.splice(position, 1);
        setFiles(filesCopy);
    };

    const submitFiles = async () => {
        console.log('uploaded');
        if(files.length == 0)
            return;
        await submitAttachment(files, incident);
        setUploaded(true);
    };

    return (
        <div className={container} data-testid="upload">
            {files.length === 0 && (
                <>
                    <button
                        type="button"
                        className={!uploaded ? button : buttonDisabled}
                        onClick={handleClick}
                        disabled={uploaded == true}
                    >
                        <span>Anexar</span>
                    </button>
                </>
            )}
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
                multiple
            />
            {files.length > 0 && (
                <UploadList
                    files={files}
                    handleClick={handleClick}
                    handleRemoveFile={handleRemoveFile}
                    submitFiles={submitFiles}
                    data-testid="upload-item"
                />
            )}
        </div>
    );
};

export default Upload;
