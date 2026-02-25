import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import QuestionsPage from './pages/QuestionsPage';
import LeadFormPage from './pages/LeadFormPage';
import SuccessPage from './pages/SuccessPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { api } from './services/api';
import { v4 as uuidv4 } from 'uuid';

type Screen = 'landing' | 'game' | 'questions' | 'form' | 'success' | 'limit-reached';

function App() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Experience Flow State
  const [screen, setScreen] = useState<Screen>('landing');
  const [submits, setSubmits] = useLocalStorage<number>('zyka_submits', 0);
  const [deviceId] = useLocalStorage<string>('zyka_device_id', uuidv4());
  const [source, setSource] = useLocalStorage<string>('zyka_source', 'direct');

  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin State
  const [adminCreds, setAdminCreds] = useLocalStorage<string>('zyka_admin_token', '');

  useEffect(() => {
    // Extract source from URL if present
    const s = searchParams.get('src');
    if (s && ['qrcode_1', 'qrcode_2', 'qrcode_3', 'qrcode_4', 'whatsapp'].includes(s)) {
      setSource(s);
    } else if (s === 'whatsapp') {
      setSource('whatsapp');
    }
  }, [searchParams, setSource]);

  useEffect(() => {
    // Log visit ONLY if not on admin route and not already logged this session
    const isNoTrack = window.location.pathname.startsWith('/admin');
    const isLogged = sessionStorage.getItem('zyka_visit_logged');

    if (!isNoTrack && !isLogged) {
      api.logVisit({ source, deviceId })
        .then(() => {
          sessionStorage.setItem('zyka_visit_logged', 'true');
        })
        .catch(console.error);
    }
  }, [source, deviceId]);

  useEffect(() => {
    if (submits >= 3 && screen !== 'success' && screen !== 'limit-reached') {
      setScreen('limit-reached');
    }
  }, [submits, screen]);

  const handleStart = () => setScreen('questions');

  const handleQuestionsComplete = (ans: any) => {
    setAnswers(ans);
    setScreen('form');
  };

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const submission = {
        ...formData,
        ...answers,
        reward: 'Lucky Draw Entry',
        deviceId,
        source
      };

      await api.submitLead(submission);
      setSubmits(submits + 1);
      setScreen('success');
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminLogin = (creds: string) => {
    setAdminCreds(creds);
    navigate('/admin/dashboard');
  };

  return (
    <Routes>
      {/* Customer Experience Flow */}
      <Route path="/" element={
        <Layout>
          {screen === 'landing' && <LandingPage onStart={handleStart} />}
          {screen === 'questions' && <QuestionsPage onComplete={handleQuestionsComplete} />}
          {screen === 'form' && <LeadFormPage onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />}
          {screen === 'success' && <SuccessPage />}

          {screen === 'limit-reached' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="bg-primary/10 p-8 rounded-full mb-6 text-4xl">🛑</div>
              <h2 className="text-2xl font-bold text-secondary mb-2">Limit Reached</h2>
              <p className="text-secondary/60">
                You have already submitted 3 times from this device. Thank you!
              </p>
            </div>
          )}
        </Layout>
      } />

      {/* Admin Panel */}
      <Route path="/admin" element={
        adminCreds ? <Navigate to="/admin/dashboard" /> : (
          <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
            <AdminLoginPage onLogin={handleAdminLogin} />
          </div>
        )
      } />

      <Route path="/admin/dashboard" element={
        adminCreds ? (
          <AdminDashboard credentials={adminCreds} />
        ) : <Navigate to="/admin" />
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
