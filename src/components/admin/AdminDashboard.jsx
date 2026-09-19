import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { seedDefaults } from '../../data/portfolioStore';
import AdminProjects from './AdminProjects';
import AdminAchievements from './AdminAchievements';
import AdminSkills from './AdminSkills';
import AdminAbout from './AdminAbout';
import AdminContact from './AdminContact';

const sidebarItems = [
  { key: 'projects', label: 'Projects', icon: '◻' },
  { key: 'achievements', label: 'Achievements', icon: '◆' },
  { key: 'skills', label: 'Skills', icon: '⚙' },
  { key: 'about', label: 'About', icon: '◉' },
  { key: 'contact', label: 'Contact', icon: '✉' },
];

const panels = {
  projects: AdminProjects,
  achievements: AdminAchievements,
  skills: AdminSkills,
  about: AdminAbout,
  contact: AdminContact,
};

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState('projects');
  const [seeded, setSeeded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    seedDefaults().then(() => setSeeded(true));
  }, []);

  const ActivePanel = panels[activeSection];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link to="/" className="admin-sidebar-logo" data-cursor="link">
            SMA
          </Link>
          <span className="admin-sidebar-badge">Admin</span>
        </div>

        <nav className="admin-sidebar-nav">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveSection(item.key);
                setMobileMenuOpen(false);
              }}
              className={`admin-sidebar-item ${activeSection === item.key ? 'active' : ''}`}
            >
              <span className="admin-sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt=""
                className="admin-user-avatar"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="admin-user-details">
              <p className="admin-user-name">{user?.displayName || 'Admin'}</p>
              <p className="admin-user-email">{user?.email}</p>
            </div>
          </div>
          <button onClick={signOut} className="admin-signout-btn">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="admin-mobile-header">
        <button
          className="admin-mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
        <span className="admin-mobile-title">
          {sidebarItems.find((s) => s.key === activeSection)?.label}
        </span>
        <Link to="/" className="admin-mobile-back">Portfolio</Link>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="admin-mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              className="admin-mobile-sidebar"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="admin-sidebar-nav">
                {sidebarItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setActiveSection(item.key);
                      setMobileMenuOpen(false);
                    }}
                    className={`admin-sidebar-item ${activeSection === item.key ? 'active' : ''}`}
                  >
                    <span className="admin-sidebar-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="admin-main">
        <div className="admin-main-header">
          <h1 className="admin-main-title">
            {sidebarItems.find((s) => s.key === activeSection)?.label}
          </h1>
          <Link to="/" className="admin-back-link" data-cursor="link">
            ← Back to Portfolio
          </Link>
        </div>

        <div className="admin-main-content">
          {seeded ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <ActivePanel />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="admin-loading">
              <div className="admin-loading-spinner" />
              <p style={{ color: 'var(--admin-mute)', marginTop: '16px' }}>Loading data…</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
