const getData = (request: unknown) => {
    const sl_token = registerToken()
    const page = 2
    const GET_POSTS_BASE_URL = "https://api.supermetrics.com/assignment/posts"
    const GET_POSTS_URL = `${GET_POSTS_BASE_URL}?sl_token=${sl_token}&page=${page}`
    try {
        const response = UrlFetchApp.fetch(GET_POSTS_URL)
        const {data} = JSON.parse(response.getContentText())
        const isPostsResponseValid =
            data &&
            data.hasOwnProperty("posts") &&
            data.hasOwnProperty("page")
        if (isPostsResponseValid) {
            console.log(data.page)
            console.log(data.post[10])
        } else {
            throw new Error("Posts response is invalid")
        }
    } catch (err) {
        console.log("Failed to fetch posts: ", err)
    }
};
