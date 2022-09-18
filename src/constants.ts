const fieldType = DataStudioApp.createCommunityConnector().FieldType;

const METRICS_FOR_SCHEMA = [
    {
        id: 'postLength',
        name: 'Post length',
        description: 'Number of characters in the post',
        type: fieldType.NUMBER,
        metOrDim: 'met',
    },
];

const DIMENSIONS_FOR_SCHEMA = [
    {
        id: 'userName',
        name: 'User name',
        description: 'Name of user who made the post',
        type: fieldType.TEXT,
        metOrDim: 'dim',
    },
    {
        id: 'postId',
        name: 'Post ID',
        description: 'ID of the post',
        type: fieldType.TEXT,
        metOrDim: 'dim',
    },
];
