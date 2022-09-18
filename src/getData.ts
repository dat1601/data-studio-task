const responseToRows = (requestedFields: Fields, response: PostsResponse) => {
    return response.posts.map((post) => {
        let row = [] as (number | string)[];
        requestedFields.asArray().forEach(function (field) {
            switch (field.getId()) {
                case 'userName':
                    return row.push(post.from_name);
                case 'postId':
                    return row.push(post.id);
                case 'postLength':
                    return row.push(post.message.length);
                default:
                    return row.push('');
            }
        });
        return { values: row };
    });
};

const getFieldsFromRequest = (fields: { name: string }[]) => {
    const requestedFieldIds = fields.map((field) => field.name);
    return getFieldsForSchema().forIds(requestedFieldIds);
};

const getData = ({
    configParams: { name, email },
    fields,
}: Request<ConfigParams>) => {
    const userProperties = PropertiesService.getUserProperties();
    const clientId = userProperties.getProperty(CLIENT_ID_PROPERTY);
    const sl_token = registerToken(name, email, clientId!);
    const requestedFields = getFieldsFromRequest(fields);
    const page = 2;
    const GET_POSTS_URL = `${GET_POSTS_BASE_URL}?sl_token=${sl_token}&page=${page}`;

    try {
        const response = UrlFetchApp.fetch(GET_POSTS_URL);
        const { data } = JSON.parse(response.getContentText());
        const isPostsResponseValid =
            data && data.hasOwnProperty('posts') && data.hasOwnProperty('page');

        if (isPostsResponseValid) {
            const rows = responseToRows(requestedFields, data);
            return {
                schema: requestedFields.build(),
                rows: rows,
            };
        } else {
            throw new Error('Posts response is invalid');
        }
    } catch (err) {
        console.log('Failed to fetch posts: ', err);
    }
};
