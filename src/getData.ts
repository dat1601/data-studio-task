const responseToRows = (
    requestedFields: Fields,
    { page, posts }: PostsResponse
): ResponseRows => {
    return posts.map((post) => {
        let row = [] as ResponseRow;
        requestedFields.asArray().forEach(function (field) {
            switch (field.getId()) {
                case 'userName':
                    return row.push(post.from_name);
                case 'postId':
                    return row.push(post.id);
                case 'page':
                    return row.push(page);
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

const queryPostsInPage = (
    page: number,
    sl_token: string,
    requestedFields: Fields,
    isLastPage: boolean,
    postAmountOnLastPage: number
) => {
    const GET_POSTS_URL = `${GET_POSTS_BASE_URL}?sl_token=${sl_token}&page=${page}`;
    try {
        const response = UrlFetchApp.fetch(GET_POSTS_URL);
        const { data } = JSON.parse(response.getContentText());
        const isPostsResponseValid =
            data && data.hasOwnProperty('posts') && data.hasOwnProperty('page');

        if (isPostsResponseValid) {
            const rows = responseToRows(requestedFields, data);
            return isLastPage ? rows.slice(0, postAmountOnLastPage) : rows;
        } else {
            throw new Error('Posts response is invalid');
        }
    } catch (err) {
        console.log('Failed to fetch posts: ', err);
        return [] as ResponseRows;
    }
};

const getData = ({
    configParams: { name, email, postLimit },
    fields,
}: Request<ConfigParams>) => {
    const userProperties = PropertiesService.getUserProperties();
    const clientId = userProperties.getProperty(CLIENT_ID_PROPERTY);
    const sl_token = registerToken(name, email, clientId!);
    const requestedFields = getFieldsFromRequest(fields);
    const PAGE_AMOUNT = Math.ceil(+postLimit / POSTS_PER_PAGE);
    const POST_AMOUNT_ON_LAST_PAGE =
        postLimit > TOTAL_POSTS ? 100 : postLimit % POSTS_PER_PAGE;

    let rows = [] as ResponseRows;
    for (let page = 1; page <= PAGE_AMOUNT && page <= TOTAL_PAGES; page++) {
        const isLastPage = page === PAGE_AMOUNT || page === TOTAL_PAGES;
        const nextRows = queryPostsInPage(
            page,
            sl_token,
            requestedFields,
            isLastPage,
            POST_AMOUNT_ON_LAST_PAGE
        );
        rows = rows.concat(nextRows);
    }

    return {
        schema: requestedFields.build(),
        rows: rows,
    };
};
