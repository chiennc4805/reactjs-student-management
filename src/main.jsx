import { createRoot } from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import CampusPage from './pages/campus.jsx';
import ClassPage from './pages/class.jsx';
import FacilityPage from './pages/facility.jsx';
import LoginPage from './pages/login.jsx';
import ParentPage from './pages/parent.jsx';
import SchedulePage from './pages/schedule.jsx';
import StudentPage from './pages/student.jsx';
import SubjectPage from './pages/subject.jsx';
import TeacherPage from './pages/teacher.jsx';
import Welcome from './pages/welcome.jsx';
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
				path: "/students",
				element: <StudentPage />
			},
			{
				path: "/schedules",
				element: <SchedulePage />
			},
			{
				path: "/campus",
				element: <CampusPage />
			},
			{
				path: "/facilities",
				element: <FacilityPage />
			},
			{
				path: "/parents",
				element: <ParentPage />
			},
			{
				path: "/classes",
				element: <ClassPage />
			},
			{
				path: "/subjects",
				element: <SubjectPage />
			},
			{
				path: "/teachers",
				element: <TeacherPage />
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
		<RouterProvider router={router} />
	</AuthWrapper>
)
