import { Route, Routes } from "react-router-dom";

import {
    WelcomePage,
    StudentPage,
    TeacherPage,
    HomeworkPage,
    Source_download_historyPage,
    Visit_historyPage,
    SubjectPage,
    Homework_submit_historyPage,
    Login_historyPage,
    UniversityPage,
} from "./pages/index";

import Root from "./layout/Root";

import "antd/dist/antd.css";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/dashboard" element={<Root />}>
                    <Route path="/dashboard/student" element={<StudentPage />} />
                    <Route path="/dashboard/teacher" element={<TeacherPage />} />
                    <Route path="/dashboard/homework" element={<HomeworkPage />} />
                    <Route
                        path="/dashboard/source_download_history"
                        element={<Source_download_historyPage />}
                    />
                    <Route path="/dashboard/visit_history" element={<Visit_historyPage />} />
                    <Route path="/dashboard/subject" element={<SubjectPage />} />
                    <Route
                        path="/dashboard/homework_submit_history"
                        element={<Homework_submit_historyPage />}
                    />
                    <Route path="/dashboard/login_history" element={<Login_historyPage />} />
                    <Route path="/dashboard/university" element={<UniversityPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
