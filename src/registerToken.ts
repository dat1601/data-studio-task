const registerToken = (
    name: string,
    email: string,
    clientId: string
): string => {
    const payload = {
        client_id: clientId,
        email,
        name,
    };
    const options = {
        method: 'post' as HttpMethod,
        payload,
    };
    const REGISTER_TOKEN_URL =
        'https://api.supermetrics.com/assignment/register';
    try {
        const response = UrlFetchApp.fetch(REGISTER_TOKEN_URL, options);
        const { data } = JSON.parse(response.getContentText());
        if (data && data.sl_token) {
            return data.sl_token;
        } else {
            throw new Error('No sl_token found');
        }
    } catch (err) {
        console.log('Error registering token', err);
        return '';
    }
};
