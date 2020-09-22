const dialogflow = require('dialogflow');
const { SessionsClient } = require('dialogflow/src/v2beta1');
const configs = require('./dio-bot-fit');

const sessionClient = new dialogflow.SessionsClient({
    projectId: configs.project_id,
    credentials: {
        private_key: configs.private_key,
        client_email: configs.client_email,
    }
});

async function sendMessage(charId, message) {
    const sessionPath = sessionClient.sessionPath(configs.project_id, charId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message, 
                languageCode: 'pt-BR'
            }
        }
    }
    const response = await sessionClient.detectIntent(request);
    const result = response[0].queryResult;
    return {
        text: result.fulfillmentText,
        intent: result.intent.displayName,
        fields: result.paramenters.fields
    };
    console.log(JSON.stringify(result, null, 2));
};

module.exports.sendMessage = sendMessage;