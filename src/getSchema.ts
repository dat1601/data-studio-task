const fieldsAddDimension = (
    dimensions: MetricOrDimension[],
    fields: Fields
) => {
    dimensions.forEach((dimension) => {
        fields
            .newDimension()
            .setId(dimension.id)
            .setType(dimension.type)
            .setName(dimension.name)
            .setDescription(dimension.description);
    });
};

const fieldsAddMetrics = (metrics: MetricOrDimension[], fields: Fields) => {
    metrics.forEach((metric) => {
        fields
            .newMetric()
            .setId(metric.id)
            .setType(metric.type)
            .setName(metric.name)
            .setDescription(metric.description);
    });
};

const getFieldsForSchema = () => {
    const cc = DataStudioApp.createCommunityConnector();

    const fields = cc.getFields();

    fieldsAddDimension(DIMENSIONS_FOR_SCHEMA, fields);
    fieldsAddMetrics(METRICS_FOR_SCHEMA, fields);

    fields.setDefaultDimension('userName');
    fields.setDefaultMetric('postLength');

    return fields;
};

const getSchema = () => {
    const fields = getFieldsForSchema().build();

    return {
        schema: fields,
    };
};
