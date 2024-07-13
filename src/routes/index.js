import config from '../config';
//Layouts
import HeaderOnly from '../layouts/HeaderOnly';

//Pages
import Home from '../pages/Home';
import Login from '../pages/Me/Login';
import Register from '../pages/Me/Register';
import Profile from '../pages/Profile';
import Learning from '../pages/Learn';

import Course from '../pages/Admin/Course';
import User from '../pages/Admin/User';
import UserBlocked from '../pages/Admin/UserBlocked';
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.register, component: Register, layout: HeaderOnly },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.learning, component: Learning, layout: null },
];
const privateRoutes = [
    { path: config.routes.user, component: User },
    { path: config.routes.userBlocked, component: UserBlocked },
    { path: config.routes.admin, component: Course },
];
export { privateRoutes, publicRoutes };
