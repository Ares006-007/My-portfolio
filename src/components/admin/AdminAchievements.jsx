import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCollection, addDocument, updateDocument, deleteDocument } from '../../data/portfolioStore';

const roles = ['Organized', 'Competed', 'Volunteered', 'Production', 'Other'];

const emptyAchievement = {
  name: '',
  role: 'Competed',
  date: '',
  description: '',
};

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyAchievement);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getCollection('achievements');
    setAchievements(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyAchievement);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      name: item.name || '',
      role: item.role || 'Competed',
      date: item.date || '',
      description: item.description || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      ...form,
      order: editing ? editing.order : achievements.length,
    };
    if (editing) {
      await updateDocument('achievements', editing.id, data);
    } else {
      await addDocument('achievements', data);
    }
    setModalOpen(false);
    setSaving(false);
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this achievement?')) return;
    await deleteDocument('achievements', id);
    load();
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner" />
      </div>
    );
  }

  return (
    <div>
      <div className="admin-section-header">
        <p className="admin-section-desc">
          Manage hackathons, events, and achievements shown in the "Hackathons & Events" section.
        </p>
        <button onClick={openAdd} className="admin-add-btn">
          + Add Achievement
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="admin-empty-state">
          <span className="admin-empty-icon">◆</span>
          <p>No achievements yet</p>
          <button onClick={openAdd} className="admin-add-btn" style={{ marginTop: '16px' }}>
            + Add Your First Achievement
          </button>
        </div>
      ) : (
        <div className="admin-list">
          {achievements.map((item) => (
            <motion.div
              key={item.id}
              className="admin-list-item"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="admin-list-item-content">
                <div className="admin-list-item-top">
                  <h3 className="admin-list-item-title">{item.name}</h3>
                  <span className={`admin-role-badge ${item.role?.toLowerCase()}`}>
                    {item.role}
                  </span>
                </div>
                <div className="admin-list-item-meta">
                  {item.date && <span className="admin-list-date">{item.date}</span>}
                  <p className="admin-list-desc">{item.description}</p>
                </div>
              </div>
              <div className="admin-list-item-actions">
                <button onClick={() => openEdit(item)} className="admin-action-btn edit">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="admin-action-btn delete">
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="admin-modal"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin-modal-header">
                <h2>{editing ? 'Edit Achievement' : 'Add Achievement'}</h2>
                <button onClick={() => setModalOpen(false)} className="admin-modal-close">✕</button>
              </div>
              <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Event or achievement name"
                  />
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Role</label>
                    <select
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                      {roles.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Date</label>
                    <input
                      type="text"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      placeholder="2026"
                    />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Brief description"
                  />
                </div>
                <div className="admin-form-actions">
                  <button type="button" onClick={() => setModalOpen(false)} className="admin-btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="admin-btn-primary">
                    {saving ? 'Saving…' : editing ? 'Update' : 'Add Achievement'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
