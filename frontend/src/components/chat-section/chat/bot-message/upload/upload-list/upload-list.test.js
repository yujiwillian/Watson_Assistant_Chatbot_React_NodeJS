import React from 'react';
import { render, screen } from '@testing-library/react';
import UploadList from './upload-list';

test('Render upload list container component', () => {
    const files = [
        {
            name: 'fileName',
            size: 1024 * 1204,
        },
    ];

    const handleClick = jest.fn(() => {});
    const handleRemoveFile = jest.fn(() => {});
    render(
        <UploadList
            files={files}
            handleClick={handleClick}
            handleRemoveFile={handleRemoveFile}
        />
    );
    expect(screen.getByTestId('upload-list')).toBeInTheDocument();
});
