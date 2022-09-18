const resetAuth = () =>
    PropertiesService.getUserProperties().deleteProperty(CLIENT_ID_PROPERTY);

const isAuthValid = () =>
    !!PropertiesService.getUserProperties().getProperty(CLIENT_ID_PROPERTY);

const getAuthType = () => {
    const cc = DataStudioApp.createCommunityConnector();

    return cc.newAuthTypeResponse().setAuthType(cc.AuthType.USER_TOKEN).build();
};

interface SetCredentialsInput {
    [key: string]: string;
}

const setCredentials = ({ key = TEST_CLIENT_ID }: SetCredentialsInput) => {
    PropertiesService.getUserProperties().setProperty(CLIENT_ID_PROPERTY, key);

    return {
        errorCode: !!key ? 'NONE' : 'INVALID_CREDENTIALS',
    };
};
