/* eslint-disable max-len */
import {
    About,
    ErrorPage,
    LoggedIn,
    Login,
    Logout,
    Main,
    Register,
} from '../../Pages';

export const accessType = Object.freeze({ requiresLogin: 1, publicOnly: 2, always: 3 });

export default [
    { exact: true, path: '/', content: Main, title: 'Main', accessibility: accessType.always },
    { exact: true, path: '/about', content: About, title: 'About us', accessibility: accessType.always },
    { exact: true, path: '/loggedin', content: LoggedIn, title: 'LoggeIn', accessibility: accessType.always },
    { exact: true, path: '/login', content: Login, title: 'Login', accessibility: accessType.publicOnly },
    { exact: true, path: '/register', content: Register, title: 'Register', accessibility: accessType.publicOnly },
    { exact: true, path: '/logout', content: Logout, title: 'Logout', accessibility: accessType.requiresLogin },
    { exact: false, path: '', content: ErrorPage, title: 'Error', accessibility: accessType.always },
];
