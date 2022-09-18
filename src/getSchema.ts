const getFields = () => {
    const cc = DataStudioApp.createCommunityConnector();

    const fields = cc.getFields();

    [
        {
            id: 'userName',
            name: 'User name',
            description: 'Name of user who made the post',
            type: cc.FieldType.TEXT,
            metOrDim: 'dim',
        },
        {
            id: 'postId',
            name: 'Post ID',
            description: 'ID of the post',
            type: cc.FieldType.TEXT,
            metOrDim: 'dim',
        },
        {
            id: 'postLength',
            name: 'Post length',
            description: 'Number of characters in the post',
            type: cc.FieldType.NUMBER,
            metOrDim: 'met',
        },
    ].forEach((field) => {
        const newField =
            field.metOrDim === 'dim'
                ? fields.newDimension()
                : fields.newMetric();

        newField
            .setId(field.id)
            .setName(field.name)
            .setDescription(field.description)
            .setType(field.type);
    });

    fields.setDefaultDimension('userName');
    fields.setDefaultMetric('postLength');

    return fields;
};

const getSchema = () => {
    const fields = getFields().build();

    return {
        schema: fields,
    };
};
