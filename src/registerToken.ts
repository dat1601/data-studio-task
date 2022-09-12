import HttpMethod = GoogleAppsScript.URL_Fetch.HttpMethod;

const registerToken = (): string => {
    const payload = {
        client_id: "ju16a6m81mhid5ue1z3v2g0uh",
        email: "johndoe@testmail.com",
        name: "John Doe"
    }
    const options = {
        method: "post" as HttpMethod,
        payload
    }
    const REGISTER_TOKEN_URL = "https://api.supermetrics.com/assignment/register"
    try {
        const response = UrlFetchApp.fetch(REGISTER_TOKEN_URL, options)
        const {data} = JSON.parse(response.getContentText())
        if (data && data.sl_token) {
            return data.sl_token
        } else {
            throw new Error("No sl_token found")
        }
    }
    catch (err) {
        console.log("Error registering token", err)
        return ""
    }
}
