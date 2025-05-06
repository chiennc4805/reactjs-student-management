import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import ClassDetailPage from './components/class/view.class.page.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import CampusPage from './pages/campus.jsx';
import ClassPage from './pages/class.jsx';
import FacilityPage from './pages/facility.jsx';
import LoginPage from './pages/login.jsx';
import ParentPage from './pages/parent.jsx';
import RolePage from './pages/role.jsx';
import SchedulePage from './pages/schedule.jsx';
import StudentPage from './pages/student.jsx';
import SubjectPage from './pages/subject.jsx';
import TeacherPage from './pages/teacher.jsx';
import UserPage from './pages/user.jsx';
import Welcome from './pages/welcome.jsx';
import store from './redux/store.js';
import './styles/global.css';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Welcome />
			},
			{
				path: "student",
				element: <StudentPage />
			},
			{
				path: "schedule/:name",
				element: <SchedulePage />
			},
			{
				path: "campus",
				element: <CampusPage />
			},
			{
				path: "facility",
				element: <FacilityPage />
			},
			{
				path: "parent",
				element: <ParentPage />
			},
			{
				path: "class",
				element: <ClassPage />
			},
			{
				path: "class/:name",
				element: <ClassDetailPage />
			},
			{
				path: "subject",
				element: <SubjectPage />
			},
			{
				path: "teacher",
				element: <TeacherPage />
			},
			{
				path: "role",
				element: <RolePage />
			},
			{
				path: "user",
				element: <UserPage />
			},
		]
	},
	{
		path: "/login",
		element: <LoginPage />
	},
]);


createRoot(document.getElementById('root')).render(
	<AuthWrapper>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</AuthWrapper>
)
