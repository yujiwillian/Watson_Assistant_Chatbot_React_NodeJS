const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = (apikey, assistantUrl) => {
    const assistantV2 = new AssistantV2({
        authenticator: new IamAuthenticator({
            apikey,
        }),
        url: assistantUrl,
        version: '2018-09-19',
    });
    return assistantV2;
};

module.exports = assistant;

// comentario para push na branch remota
