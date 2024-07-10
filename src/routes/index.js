import config from '../config';
//Layouts
import HeaderOnly from '../layouts/HeaderOnly';

//Pages
import Home from '../pages/Home';
import CreateCourse from '../pages/Admin';
import Login from '../pages/Me/Login';
import Register from '../pages/Me/Register';
import Profile from '../pages/Profile';
import Learning from '../pages/Learn';
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.register, component: Register, layout: HeaderOnly },
];
const privateRoutes = [
    { path: config.routes.admin, component: CreateCourse },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.learning, component: Learning, layout: null },
];
export { privateRoutes, publicRoutes };
