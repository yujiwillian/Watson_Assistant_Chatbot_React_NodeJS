import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ChatbotContext } from 'contexts';

import { container, select, selectDisabled } from './select.module.scss';

const Select = ({ options }) => {
    const [optionSelected, setOptionSelected] = useState('n/a');
    const [optionsDisabled, setOptionsDisabled] = useState(false);
    const { handleMessageToHistory, submitMessage, createMessageObject } =
        useContext(ChatbotContext);

    useEffect(() => {
        const isDisabled = options.find((option) => option.disabled === true);

        if (isDisabled) {
            setOptionsDisabled(true);
        }
    }, [options]);

    const handleClick = (event) => {
        const { value } = event.target;
        setOptionSelected(value);

        const messageObject = createMessageObject(value);
        handleMessageToHistory(messageObject, 'user');
        submitMessage(value);
    };

    return (
        <div className={container}>
            <select
                className={
                    optionSelected !== 'n/a' || optionsDisabled
                        ? selectDisabled
                        : select
                }
                onChange={handleClick}
                value={optionSelected}
                disabled={optionSelected !== 'n/a' || optionsDisabled}
            >
                <option defaultValue>Selecione uma opção</option>
                {options.map((option, index) => (
                    <option
                        key={index.toString()}
                        label={option.label}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

Select.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Select;
