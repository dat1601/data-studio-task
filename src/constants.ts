const fieldType = DataStudioApp.createCommunityConnector().FieldType;

const METRICS_FOR_SCHEMA: MetricOrDimension[] = [
    {
        id: 'postLength',
        name: 'Post length',
        description: 'Number of characters in the post',
        type: fieldType.NUMBER,
    },
];

const DIMENSIONS_FOR_SCHEMA: MetricOrDimension[] = [
    {
        id: 'userName',
        name: 'User name',
        description: 'Name of user who made the post',
        type: fieldType.TEXT,
    },
    {
        id: 'postId',
        name: 'Post ID',
        description: 'ID of the post',
        type: fieldType.TEXT,
    },
];

const REGISTER_TOKEN_URL = 'https://api.supermetrics.com/assignment/register';

const GET_POSTS_BASE_URL = 'https://api.supermetrics.com/assignment/posts';

const CLIENT_ID_PROPERTY = 'clientId';

const TEST_CLIENT_ID = 'ju16a6m81mhid5ue1z3v2g0uh';
