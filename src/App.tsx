import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
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

const App = () => {
  return (
    <Layout>
      <Toaster />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/starter" element={<QuizStarterPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/admin" element={<Dashboard />} />
        <Route path="/dashboard/admin/student" element={<StudentsRecord />} />
        <Route path="/dashboard/admin/category" element={<Category />} />
        <Route path="/dashboard/admin/question" element={<Question />} />
        <Route path="/dashboard/admin/addquestion" element={<AddQuestion />} />
      </Routes>
    </Layout>
  );
};

export default App;
