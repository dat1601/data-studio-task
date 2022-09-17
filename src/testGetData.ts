const testGetData = () => {
    const sl_token = registerToken(
        'John Doe',
        'johndoe@testmail.com',
        'ju16a6m81mhid5ue1z3v2g0uh'
    );
    const page = 2;
    const GET_POSTS_BASE_URL = 'https://api.supermetrics.com/assignment/posts';
    const GET_POSTS_URL = `${GET_POSTS_BASE_URL}?sl_token=${sl_token}&post_limit=${1000}`;
    try {
        const response = UrlFetchApp.fetch(GET_POSTS_URL);
        const { data } = JSON.parse(response.getContentText());
        const isPostsResponseValid =
            data && data.hasOwnProperty('posts') && data.hasOwnProperty('page');
        if (isPostsResponseValid) {
            console.log(data.page);
            console.log(data.post[10]);
        } else {
            throw new Error('Posts response is invalid');
        }
    } catch (err) {
        console.log('Failed to fetch posts: ', err);
    }
};
