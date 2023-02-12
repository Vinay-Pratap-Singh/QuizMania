import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import QuizStarterPage from "./pages/QuizStarterPage";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/starter" element={<QuizStarterPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
