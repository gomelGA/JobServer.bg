const appKey = "kid_SyiLotQXM";
const appSecret = "9a9ffcee9c9543f58ecbf48d56a22273";
const getAllAdvertsUrl = `https://baas.kinvey.com/appdata/${appKey}/advertisements`;
const getAdvertDetailsUrl = `https://baas.kinvey.com/appdata/${appKey}/advertisements/`;
const getUpdateJobseekerApplicationsURL = `https://baas.kinvey.com/user/${appKey}/`;
const getAllByCreatorUrl = `https://baas.kinvey.com/appdata/${appKey}/advertisements/?query=`;

export const showAdvertsConstants = {
    appKey,
    appSecret,
    getAllAdvertsUrl,
    getAdvertDetailsUrl,
    getUpdateJobseekerApplicationsURL,
    getAllByCreatorUrl
}