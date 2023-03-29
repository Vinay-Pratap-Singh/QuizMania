import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import QuizStarterPage from "./pages/QuizStarterPage";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/admin/Dashboard";
import StudentsRecord from "./pages/admin/StudentRecord";
import Category from "./pages/admin/Category";
import Question from "./pages/admin/Question";
import AddQuestion from "./pages/admin/AddQuestion";
import Error from "./pages/Error";
import NotRequireAuth from "./components/auth/NotRequireAuth";
import RequireAuth from "./components/auth/RequireAuth";
import { ADMIN_ROLE, USER_ROLE } from "./config/config";
import Denied from "./pages/Denied";
import Contact from "./pages/Contact";
import About from "./pages/About";

const App = () => {
  return (
    <Layout>
      <Toaster />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route element={<NotRequireAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[USER_ROLE, ADMIN_ROLE]} />}>
          <Route path="/starter" element={<QuizStarterPage />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ADMIN_ROLE]} />}>
          <Route path="/dashboard/admin" element={<Dashboard />} />
          <Route path="/dashboard/admin/student" element={<StudentsRecord />} />
          <Route path="/dashboard/admin/category" element={<Category />} />
          <Route path="/dashboard/admin/question" element={<Question />} />
          <Route
            path="/dashboard/admin/addquestion"
            element={<AddQuestion />}
          />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </Layout>
  );
};

export default App;
