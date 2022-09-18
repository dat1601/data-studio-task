/**
 * App-related types.
 */
import FieldType = GoogleAppsScript.Data_Studio.FieldType;

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

type MetricOrDimension = {
    id: string;
    type: FieldType;
    name: string;
    description: string;
};

type ResponseRow = (number | string)[];
type ResponseRows = { values: ResponseRow }[];

/**
 * GAS-related types.
 */
import Request = GoogleAppsScript.Data_Studio.Request;
import Fields = GoogleAppsScript.Data_Studio.Fields;
import HttpMethod = GoogleAppsScript.URL_Fetch.HttpMethod;
