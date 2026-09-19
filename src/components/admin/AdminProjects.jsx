import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCollection, addDocument, updateDocument, deleteDocument } from '../../data/portfolioStore';

const emptyProject = {
  title: '',
  description: '',
  tags: '',
  imageUrl: '',
  liveUrl: '',
  githubUrl: '',
  featured: false,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getCollection('projects');
    setProjects(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyProject);
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditing(project);
    setForm({
      title: project.title || '',
      description: project.description || '',
      tags: (project.tags || []).join(', '),
      imageUrl: project.imageUrl || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured || false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      order: editing ? editing.order : projects.length,
    };
    if (editing) {
      await updateDocument('projects', editing.id, data);
    } else {
      await addDocument('projects', data);
    }
    setModalOpen(false);
    setSaving(false);
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await deleteDocument('projects', id);
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
          Manage your portfolio projects. These appear in the "Selected Work" section.
        </p>
        <button onClick={openAdd} className="admin-add-btn">
          + Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="admin-empty-state">
          <span className="admin-empty-icon">◻</span>
          <p>No projects yet</p>
          <button onClick={openAdd} className="admin-add-btn" style={{ marginTop: '16px' }}>
            + Add Your First Project
          </button>
        </div>
      ) : (
        <div className="admin-card-grid">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="admin-card"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {project.imageUrl && (
                <div className="admin-card-image">
                  <img src={project.imageUrl} alt={project.title} />
                </div>
              )}
              <div className="admin-card-body">
                <div className="admin-card-title-row">
                  <h3 className="admin-card-title">{project.title}</h3>
                  {project.featured && <span className="admin-badge-featured">Featured</span>}
                </div>
                <p className="admin-card-desc">{project.description}</p>
                {project.tags?.length > 0 && (
                  <div className="admin-card-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="admin-tag">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="admin-card-actions">
                  <button onClick={() => openEdit(project)} className="admin-action-btn edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="admin-action-btn delete">
                    Delete
                  </button>
                </div>
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
                <h2>{editing ? 'Edit Project' : 'Add Project'}</h2>
                <button onClick={() => setModalOpen(false)} className="admin-modal-close">✕</button>
              </div>
              <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Project title"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Brief description of the project"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="React, Firebase, AI"
                  />
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Image URL</label>
                    <input
                      type="url"
                      value={form.imageUrl}
                      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Live URL</label>
                    <input
                      type="url"
                      value={form.liveUrl}
                      onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>GitHub URL</label>
                    <input
                      type="url"
                      value={form.githubUrl}
                      onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-checkbox-label">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    />
                    <span>Featured project</span>
                  </label>
                </div>
                <div className="admin-form-actions">
                  <button type="button" onClick={() => setModalOpen(false)} className="admin-btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="admin-btn-primary">
                    {saving ? 'Saving…' : editing ? 'Update' : 'Add Project'}
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
