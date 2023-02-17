import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import QuizStarterPage from "./pages/QuizStarterPage";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Login from "./pages/Login";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/starter" element={<QuizStarterPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
};

export default App;
