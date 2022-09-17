/**
 * Supporting Types.
 */
type ConfigParams = {
    [key: string]: any;
};

type UserPost = {
    id: string;
    from_name: string;
    from_id: string;
    message: string;
    type: string;
    created_time: string;
};

type PostsResponse = {
    page: number;
    posts: UserPost[];
};
