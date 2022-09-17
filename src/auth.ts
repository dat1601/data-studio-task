const clientIdProperty = 'clientId';

const resetAuth = () =>
    PropertiesService.getUserProperties().deleteProperty(clientIdProperty);

const isAuthValid = () =>
    !!PropertiesService.getUserProperties().getProperty(clientIdProperty);

const getAuthType = () => {
    const cc = DataStudioApp.createCommunityConnector();

    return cc.newAuthTypeResponse().setAuthType(cc.AuthType.USER_TOKEN).build();
};

interface SetCredentialsInput {
    [key: string]: string;
}

const TEST_CLIENT_ID = 'ju16a6m81mhid5ue1z3v2g0uh';

const setCredentials = ({ key = TEST_CLIENT_ID }: SetCredentialsInput) => {
    PropertiesService.getUserProperties().setProperty(clientIdProperty, key);

    return {
        errorCode: !!key ? 'NONE' : 'INVALID_CREDENTIALS',
    };
};
