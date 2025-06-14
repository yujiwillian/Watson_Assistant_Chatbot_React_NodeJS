import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { ChatbotContext } from 'contexts';

import {
    container,
    button,
    buttonDisabled,
    buttonSelected,
} from './button-set.module.scss';

const ButtonSet = ({ options, disableOptionsAfterClick }) => {
    const [optionSelected, setOptionSelected] = useState('');

    const { handleMessageToHistory, submitMessage, createMessageObject } =
        useContext(ChatbotContext);

    const handleClick = (value) => {
        if (optionSelected) return;
        const messageObject = createMessageObject(value);
        setOptionSelected(value);
        handleMessageToHistory(messageObject, 'user');
        submitMessage(value);
        disableOptionsAfterClick(value);
    };

    const handleButtonClass = (option) => {
        if (optionSelected === '' && !option.disabled) {
            return button;
        }

        if (option.disabled) {
            return buttonDisabled;
        }

        return buttonSelected;
    };

    return (
        <div className={container} data-testid="button-set">
            {options.map((option, index) => (
                <button
                    key={String(index)}
                    type="button"
                    className={handleButtonClass(option)}
                    onClick={() => handleClick(option.value)}
                    disabled={option?.disabled}
                >
                    <span>{option.label}</span>
                </button>
            ))}
        </div>
    );
};

ButtonSet.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            disabled: PropTypes.bool,
        })
    ).isRequired,
    disableOptionsAfterClick: PropTypes.func.isRequired,
};

export default ButtonSet;
