import cookie from 'cookie';
import {v4 as uuid} from '@lukeed/uuid';

export const handle = async ({request, resolve}) => {
    const cookies = cookie.parse(request.headers.cookie || '');
    request.locals.userid = cookies.userid || uuid();

    // TODO https://github.com/sveltejs/kit/issues/1046
    if (request.query.has('_method')) {
        request.method = request.query.get('_method').toUpperCase();
    }

    const response = await resolve(request);

    if (!cookies.userid) {
        // if this is the first time the user has visited this app,
        // set a cookie so that we recognise them when they return
        response.headers['set-cookie'] = cookie.serialize('userid', request.locals.userid, {
            path: '/',
            httpOnly: true
        });
    }

    return response;
};


export const getSession = (request) => {
    return {};
    // return request.locals.user
    //     ? {
    //         user: {
    //             // only include properties needed client-side —
    //             // exclude anything else attached to the user
    //             // like access tokens etc
    //             name: request.locals.user.name,
    //             email: request.locals.user.email,
    //             avatar: request.locals.user.avatar
    //         }
    //     }
    //     : {};
};

// export const externalFetch = async (request) => {
//     if (request.url.startsWith('https://api.yourapp.com/')) {
//         // clone the original request, but change the URL
//         request = new Request(
//             request.url.replace('https://api.yourapp.com/', 'http://localhost:9999/'),
//             request
//         );
//     }
//
//     return fetch(request);
// };