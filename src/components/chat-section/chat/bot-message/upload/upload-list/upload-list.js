import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Trash } from 'assets/images/trash-can.svg';
import { KILOBYTES, MEGABYTES } from 'utils';
import {
    list,
    listItem,
    excludeButton,
    addFiles,
    sendFiles,
    fileInfo,
} from './upload-list.module.scss';

const UploadList = ({ files, handleClick, handleRemoveFile, submitFiles }) => {
    const handleCalcOfFileSize = (fileSize) => {
        const fileSizeInMegaBytes = fileSize / MEGABYTES;
        if (fileSizeInMegaBytes < 1) {
            return `${Math.round(fileSize / KILOBYTES)} kb`;
        }

        return `${Math.round(fileSizeInMegaBytes)} mb`;
    };

    return (
        <>
            <>
                <button
                    type="button"
                    className={addFiles}
                    onClick={handleClick}
                >
                    Anexar outro
                </button>
                <button
                    type="button"
                    className={sendFiles}
                    onClick={submitFiles}>
                    Confirmar
                </button>
            </>
            <ul className={list} data-testid="upload-list">
                {files.map((file, index) => (
                    <li className={listItem} key={index.toString()}>
                        <p className={fileInfo}>
                            {file.name} - {handleCalcOfFileSize(file.size)}
                        </p>
                        <button
                            type="button"
                            className={excludeButton}
                            onClick={() => handleRemoveFile(index)}
                        >
                            <Trash />
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
};

UploadList.propTypes = {
    files: PropTypes.arrayOf(PropTypes.any).isRequired,
    handleClick: PropTypes.func.isRequired,
    handleRemoveFile: PropTypes.func.isRequired,
    submitFiles: PropTypes.func.isRequired,
};

export default UploadList;
