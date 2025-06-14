/* eslint-disable prettier/prettier */
import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_ADDRESS}/api/v1`;

export const sendMessage = async (chatToken = '', message = '', payload) => {
    const response = await axios.post(`${baseUrl}/chat`, {
        chatId: chatToken,
        message,
        payload: { success: true, data: payload },
    });
    return response;
};

export const sendAttachment = (chatToken, fileList, incident) => {

    const form = new FormData();

    form.append('chatId', chatToken);
    form.append('number',incident);
    fileList.forEach((file, idx) => {
        form.append(`attachments[${idx}]`, file);
    });


    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    };

    return axios.post(`${baseUrl}/chat/attachment`, form, config)

};