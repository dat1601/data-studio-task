const testQueryPostsInPage = (page: number, sl_token: string) => {
    const GET_POSTS_URL = `${GET_POSTS_BASE_URL}?sl_token=${sl_token}&page=${page}`;
    try {
        const response = UrlFetchApp.fetch(GET_POSTS_URL);
        const { data } = JSON.parse(response.getContentText());
        const isPostsResponseValid =
            data && data.hasOwnProperty('posts') && data.hasOwnProperty('page');
        if (isPostsResponseValid) {
            return [data.page, data.posts.length];
        } else {
            throw new Error('Posts response is invalid');
        }
    } catch (err) {
        console.log('Failed to fetch posts: ', err);
        return [];
    }
};

const testGetData = () => {
    const sl_token = registerToken(
        'John Doe',
        'johndoe@testmail.com',
        'ju16a6m81mhid5ue1z3v2g0uh'
    );
    const AMOUNT_OF_PAGES = Math.ceil(250 / 100);
    let rows = [];
    for (let page = 1; page <= AMOUNT_OF_PAGES && page <= TOTAL_PAGES; page++) {
        console.log(page + '');
        const nextRows = testQueryPostsInPage(page, sl_token);
        rows = rows.concat(nextRows);
    }
    console.log(rows);
};
