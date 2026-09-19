import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getCollection, addDocument, updateDocument, deleteDocument } from '../../data/portfolioStore';

export default function AdminSkills() {
  const [skillGroups, setSkillGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newGroupTitle, setNewGroupTitle] = useState('');
  const [newSkills, setNewSkills] = useState({});

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getCollection('skills');
    setSkillGroups(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addGroup = async () => {
    if (!newGroupTitle.trim()) return;
    setSaving(true);
    await addDocument('skills', {
      title: newGroupTitle.trim(),
      skills: [],
      order: skillGroups.length,
    });
    setNewGroupTitle('');
    setSaving(false);
    load();
  };

  const deleteGroup = async (id) => {
    if (!window.confirm('Delete this skill group?')) return;
    await deleteDocument('skills', id);
    load();
  };

  const renameGroup = async (group, newTitle) => {
    await updateDocument('skills', group.id, { ...group, title: newTitle, id: undefined });
    load();
  };

  const addSkillToGroup = async (group) => {
    const skill = (newSkills[group.id] || '').trim();
    if (!skill) return;
    const updated = [...(group.skills || []), skill];
    await updateDocument('skills', group.id, { skills: updated });
    setNewSkills({ ...newSkills, [group.id]: '' });
    load();
  };

  const removeSkillFromGroup = async (group, skillIndex) => {
    const updated = group.skills.filter((_, i) => i !== skillIndex);
    await updateDocument('skills', group.id, { skills: updated });
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
          Manage skill categories and individual skills shown in the "Toolkit" section.
        </p>
      </div>

      <div className="admin-skills-grid">
        {skillGroups.map((group) => (
          <motion.div
            key={group.id}
            className="admin-skill-group-card"
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="admin-skill-group-header">
              <input
                type="text"
                className="admin-skill-group-title-input"
                defaultValue={group.title}
                onBlur={(e) => {
                  if (e.target.value !== group.title) {
                    renameGroup(group, e.target.value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.target.blur();
                }}
              />
              <button
                onClick={() => deleteGroup(group.id)}
                className="admin-action-btn delete"
                style={{ fontSize: '12px', padding: '4px 8px' }}
              >
                Delete
              </button>
            </div>

            <div className="admin-skill-list">
              {(group.skills || []).map((skill, i) => (
                <div key={`${skill}-${i}`} className="admin-skill-chip">
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkillFromGroup(group, i)}
                    className="admin-skill-remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="admin-skill-add-row">
              <input
                type="text"
                placeholder="Add skill…"
                value={newSkills[group.id] || ''}
                onChange={(e) => setNewSkills({ ...newSkills, [group.id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkillToGroup(group);
                  }
                }}
              />
              <button
                onClick={() => addSkillToGroup(group)}
                className="admin-btn-primary"
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                Add
              </button>
            </div>
          </motion.div>
        ))}

        {/* Add new group card */}
        <div className="admin-skill-group-card admin-add-group-card">
          <p className="admin-add-group-label">Add New Category</p>
          <div className="admin-skill-add-row">
            <input
              type="text"
              placeholder="Category name…"
              value={newGroupTitle}
              onChange={(e) => setNewGroupTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addGroup();
                }
              }}
            />
            <button
              onClick={addGroup}
              disabled={saving || !newGroupTitle.trim()}
              className="admin-btn-primary"
              style={{ padding: '8px 16px', fontSize: '13px' }}
            >
              {saving ? '…' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
