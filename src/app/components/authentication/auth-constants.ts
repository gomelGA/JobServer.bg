const appKey = "kid_SyiLotQXM";
const appSecret = "9a9ffcee9c9543f58ecbf48d56a22273";
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

export const authConstants = {
    appKey,
    appSecret,
    registerUrl,
    loginUrl,
    logoutUrl
}
