import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom"
import StudentPage from './pages/student.jsx';
import './styles/global.css'
import Welcome from './pages/welcome.jsx';
import SchedulePage from './pages/schedule.jsx';
import ParentPage from './pages/parent.jsx';
import CampusPage from './pages/campus.jsx';
import FacilityPage from './pages/facility.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import ClassPage from './pages/class.jsx';
import SubjectPage from './pages/subject.jsx';
import TeacherPage from './pages/teacher.jsx';

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
]);


createRoot(document.getElementById('root')).render(
	<AuthWrapper>
		<RouterProvider router={router} />
	</AuthWrapper>
)
