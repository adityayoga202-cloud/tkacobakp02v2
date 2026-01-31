import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Confirmation from './pages/Confirmation';
import QuizRunner from './pages/QuizRunner';
import Result from './pages/Result';
import AdminDashboard from './pages/AdminDashboard'; // Import Admin Page
import { User, Question } from './types';
import { generateQuizQuestions } from './services/geminiService';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subjectName, setSubjectName] = useState('');
  
  // Quiz State tracking
  const [lastAnswers, setLastAnswers] = useState<Record<string, number>>({});

  const handleLogin = (u: User) => {
    setUser(u);
    navigate('/confirmation');
  };

  const handleStartExam = async (subject: string) => {
    setLoading(true);
    setSubjectName(subject);
    try {
      // Generate questions (Manual + AI)
      // SETTING JUMLAH SOAL MENJADI 30 SESUAI PERMINTAAN
      const qs = await generateQuizQuestions(subject, 30);
      setQuestions(qs);
      navigate('/exam');
    } catch (error) {
      alert("Gagal memuat soal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinishExam = (answers: Record<string, number>) => {
      setLastAnswers(answers);
      navigate('/result');
  };

  const handleLogout = () => {
      setUser(null);
      setQuestions([]);
      navigate('/');
  }

  return (
    <Routes>
        <Route 
            path="/" 
            element={
                <Login onLogin={handleLogin} />
            } 
        />
        
        {/* Admin Route */}
        <Route 
            path="/admin" 
            element={
                <AdminDashboard />
            } 
        />

        <Route 
            path="/confirmation" 
            element={
                user ? (
                    <Layout user={user} onLogout={handleLogout}>
                        <Confirmation 
                            user={user} 
                            onConfirm={handleStartExam} 
                            isLoading={loading} 
                        />
                    </Layout>
                ) : <Navigate to="/" />
            } 
        />

        <Route 
            path="/exam" 
            element={
                user && questions.length > 0 ? (
                    <Layout user={user} onLogout={handleLogout}>
                        <QuizRunner 
                            user={user}
                            questions={questions} 
                            subjectName={subjectName}
                            onFinish={handleFinishExam} 
                        />
                    </Layout>
                ) : <Navigate to={user ? "/confirmation" : "/"} />
            } 
        />

        <Route 
            path="/result" 
            element={
                user && questions.length > 0 ? (
                    <Layout user={user} onLogout={handleLogout}>
                         <Result 
                            questions={questions} 
                            answers={lastAnswers}
                            onRetry={() => navigate('/confirmation')}
                            onHome={handleLogout}
                         />
                    </Layout>
                ) : <Navigate to="/" />
            } 
        />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;