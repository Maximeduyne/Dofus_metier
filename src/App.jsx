import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout/Layout';
import Navbar from './components/Layout/Navbar';
import ThemeToggle from './components/Layout/ThemeToggle';
import DatabaseStatus from './components/DatabaseStatus';

import Home from './pages/Home';
import Accounts from './pages/Accounts';
import AccountCharacters from './pages/AccountCharacters';
import CharacterJobs from './pages/CharacterJobs';
import CharacterResources from './pages/CharacterResources';
import JobXPCalculator from './pages/JobXPCalculator';
import PacksMetiers from './pages/PacksMetiers';
import Settings from './pages/Settings';

import { db } from './utils/db';
import useAccountStore from './stores/accountStore';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [dbStatus, setDbStatus] = useState({ connected: false, checking: true });
  const initialize = useAccountStore(state => state.initialize);

  useEffect(() => {
    checkDatabase();
  }, []);

  const checkDatabase = async () => {
    try {
      const connected = await db.isConnected();
      setDbStatus({ connected, checking: false });
      if (connected && initialize) {
        await initialize();
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setDbStatus({ connected: false, checking: false });
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <Layout darkMode={darkMode}>
        <DatabaseStatus status={dbStatus} />
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comptes" element={<Accounts />} />
            <Route path="/comptes/:accountId/personnages" element={<AccountCharacters />} />
            <Route path="/comptes/:accountId/personnages/:characterId/metiers" element={<CharacterJobs />} />
            <Route path="/comptes/:accountId/personnages/:characterId/ressources" element={<CharacterResources />} />
            <Route path="/comptes/:accountId/personnages/:characterId/metiers/:jobName/xp" element={<JobXPCalculator />} />
            <Route path="/packs-metiers" element={<PacksMetiers />} />
            <Route path="/parametres" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? "dark" : "light"}
        />
      </Layout>
    </Router>
  );
}