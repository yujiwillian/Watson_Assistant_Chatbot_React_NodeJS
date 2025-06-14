const router = require('express').Router();
const { pino } = require('../../LogsConfig/logs');
const assistantV2 = require('../../assistant');
const { checkSession } = require('../../middlewares');

//criação de sessão do assistant
router.get('/session', async (req, res) => {
    try {
        const { assistantid: assistantId, token, assistantUrl } = req.headers;
        const [, apikey] = token.split('Bearer ');
        const assistant = assistantV2(apikey, assistantUrl);
        const { result } = await assistant.createSession({ assistantId });
        return res.json({
            session_id: result.session_id,
            message: 'Session created',
        });
    } catch (error) {
        pino.error(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
});

//finalização de sessão do assistant
router.delete('/session', checkSession, async (req, res) => {
    try {
        const {
            assistantid: assistantId,
            token,
            sessionid: sessionId,
            assistantUrl,
        } = req.headers;
        const [, apikey] = token.split('Bearer ');
        const assistant = assistantV2(apikey, assistantUrl);
        await assistant.deleteSession({
            assistantId,
            sessionId,
        });
        return res.send({ message: 'Session was deleted successfully' });
    } catch (error) {
        pino.error(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
});

//envio de mensagem para o assistant
router.post('/message', checkSession, async (req, res) => {
    try {
        const { input, context: contextData = {} } = req.body;
        if (!input) {
            return res.status(400).send({
                message: 'Input message is required at body',
            });
        }

        const {
            assistantid: assistantId,
            token,
            sessionid: sessionId,
            assistantUrl,
        } = req.headers;

        const context = {
            skills: {
                'main skill': {
                    user_defined: {
                        ...contextData,
                    },
                },
            },
        };

        const [, apikey] = token.split('Bearer ');

        const assistant = assistantV2(apikey, assistantUrl);

        input.options = {
            return_context: true,
        };

        const { result } = await assistant.message({
            input,
            context,
            assistantId,
            sessionId,
        });

        const { generic, user_defined: userDefined } = result.output;
        const { user_defined: skillsContext } = result.context.skills[
            'main skill'
        ];

        return userDefined
            ? res.json({ generic, userDefined, skillsContext })
            : res.json({ generic, skillsContext });
    } catch (error) {
        pino.error(error);

        if (error.status === 404) {
            return res.status(404).send({ message: 'Invalid session' });
        }
        return res.status(500).send({ message: 'Internal server error' });
    }
});

router.post('/message-full', checkSession, async (req, res) => {
    try {
        const { input } = req.body;
        if (!input) {
            return res.status(400).send({
                message: 'Input message is required at body',
            });
        }
        const {
            assistantid: assistantId,
            token,
            sessionid: sessionId,
            assistantUrl,
        } = req.headers;

        const [, apikey] = token.split('Bearer ');

        const assistant = assistantV2(apikey, assistantUrl);

        const { result } = await assistant.message({
            input,
            assistantId,
            sessionId,
        });
        return res.send({ result });
    } catch (error) {
        pino.error(error);

        if (error.status === 404) {
            return res.status(404).send({ message: 'Invalid session' });
        }
        return res.status(500).send({ message: 'Internal server error' });
    }
});

module.exports = router;
