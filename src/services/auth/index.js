/* eslint-disable prettier/prettier */
import * as Msal from 'msal';
import strategy from './strategy';

const msalInstance = new Msal.UserAgentApplication(strategy);

const allowSilentToken = process.env.REACT_APP_ALLOW_SILENT_TOKEN == true || false;

const getModalStateFunction = (
    setModalDisplay,
    setModalType,
    setModalTitle,
    setModalMessage,
    setNegativeButtonLabel,
    setNegativeFunction,
    setPositiveButtonLabel,
    setPositiveFunction
) => (
    isVisible,
    modalType,
    modalTitle,
    modalMessage,
    negativeButtonLabel,
    negativeButtonFunction,
    positiveButtonLabel,
    positiveButtonFunction
) => {
    setModalDisplay(isVisible);
    setModalType(modalType);
    setModalTitle(modalTitle);
    setModalMessage(modalMessage);
    setNegativeButtonLabel(negativeButtonLabel);
    setNegativeFunction(negativeButtonFunction);
    setPositiveButtonLabel(positiveButtonLabel);
    setPositiveFunction(positiveButtonFunction);
}

const auth = async (
    setUser,
    setModalDisplay,
    setModalType,
    setModalTitle,
    setModalMessage,
    setNegativeButtonLabel,
    setNegativeFunction,
    setPositiveButtonLabel,
    setPositiveFunction
) => {

    const setModalState = getModalStateFunction(
        setModalDisplay,
        setModalType,
        setModalTitle,
        setModalMessage,
        setNegativeButtonLabel,
        setNegativeFunction,
        setPositiveButtonLabel,
        setPositiveFunction
    );

    const showAuthErrorModal = (message) => {
        setModalState(
            true,
            'warning',
            'Falha na autenticação',
            message,
            'Sair',
            {
                function: () => {
                    window.location.href = 'https://www.google.com.br';
                },
            },
            'Tentar novamente',
            {
                function: () => {
                    window.location.reload();
                },
            }
        )
    }

    const request = {
        scopes: ["user.read", "mail.send"]
    }

    const ssoRequest = {
        loginHint: 'user@example.com'
    }

    const account = await msalInstance.getAccount();
    if(!account){
        try{
            const ssoSilent = await msalInstance.ssoSilent(ssoRequest);
            console.log('sso silent');
            console.log(ssoSilent);
        }catch(stError){
            console.log('couldnt get silent token');
            console.log(stError);
            try{
                const loginRedirect = await msalInstance.loginRedirect(request);
                console.log('loginRedirect')
                console.log(loginRedirect);
            }catch(lrError){
                console.log('couldnt get login redirect');
                console.log(lrError);
            }
        }
    }else{
        console.log('account ok');
        console.log(account);
        setUser({
            name: account.name,
            email: account.userName,
            isLoaded: true,
        });
    }

};

export { auth, msalInstance };