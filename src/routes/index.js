import config from '../config';
//Layouts
import HeaderOnly from '../layouts/HeaderOnly';

//Pages
import Home from '../pages/Home';
import CreateCourse from '../pages/Admin';
import Login from '../pages/Me';
import Profile from '../pages/Profile';
import Learning from '../pages/Learn';
const publicRoutes = [
    { path: config.routes.home, component: Home, exact: true },
    { path: config.routes.admin, component: CreateCourse },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.learning, component: Learning, layout: null },
];
const privateRoutes = [{ path: '/profile', component: Profile }];
export { privateRoutes, publicRoutes };
