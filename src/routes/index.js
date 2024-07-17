import config from '../config';
//Layouts
import HeaderOnly from '../layouts/HeaderOnly';

//Pages
import Home from '../pages/Home';
import Login from '../pages/Me/Login';
import Register from '../pages/Me/Register';
import Profile from '../pages/Profile';
import Course from '../pages/Course';
import Learning from '../pages/Learn';

import CourseAdmin from '../pages/Admin/Course';
import User from '../pages/Admin/User';
import UserBlocked from '../pages/Admin/UserBlocked';
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.register, component: Register, layout: HeaderOnly },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.learning, component: Learning, layout: HeaderOnly },
    { path: config.routes.course, component: Course },
];
const privateRoutes = [
    { path: config.routes.user, component: User },
    { path: config.routes.userBlocked, component: UserBlocked },
    { path: config.routes.admin, component: CourseAdmin },
];
export { privateRoutes, publicRoutes };
