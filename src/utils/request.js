// Make HTTP request using fetch API
const request = (method, url, postData) => {
    const fetchOptions = {
        method,
        mode: 'cors',
        credentials: 'include',
    };

    if (['POST', 'PATCH', 'PUT'].includes(method)) {
        if (postData) {
            fetchOptions.headers = {
                'Content-Type': 'application/json'
            };

            fetchOptions.body = JSON.stringify(postData);
        }
    }

    return fetch(url, fetchOptions).then(res => {
        return res.status !== 204 ? res.json() : '';
    })
}


export default request;
