//Layouts
import HeaderOnly from '../components/Layout/HeaderOnly';

//Pages
import Home from '../pages/Home';
import CreateCourse from '../pages/Admin';
import Login from '../pages/Me';
import Profile from '../pages/Profile';
import Learning from '../pages/Learn';
const publicRoutes = [
    { path: '/', component: Home, exact: true },
    { path: '/admin', component: CreateCourse },
    { path: '/login', component: Login, layout: HeaderOnly },
    { path: '/learning', component: Learning, layout: null },
];
const privateRoutes = [{ path: '/profile', component: Profile }];
export { privateRoutes, publicRoutes };
