import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSiteConfig, updateSiteConfig } from '../../data/portfolioStore';

export default function AdminAbout() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSiteConfig().then((data) => {
      setConfig(data);
      setLoading(false);
    });
  }, []);

  const about = config?.about || {};

  const updateAbout = (field, value) => {
    setConfig({
      ...config,
      about: { ...about, [field]: value },
    });
  };

  const updateStat = (index, field, value) => {
    const stats = [...(about.stats || [])];
    stats[index] = { ...stats[index], [field]: value };
    updateAbout('stats', stats);
  };

  const addStat = () => {
    const stats = [...(about.stats || []), { number: '', label: '' }];
    updateAbout('stats', stats);
  };

  const removeStat = (index) => {
    const stats = (about.stats || []).filter((_, i) => i !== index);
    updateAbout('stats', stats);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateSiteConfig(config);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
          Edit the "About" section content — headlines, bio text, and stats.
        </p>
      </div>

      <div className="admin-form-card">
        <div className="admin-form">
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Headline Line 1</label>
              <input
                type="text"
                value={about.headline1 || ''}
                onChange={(e) => updateAbout('headline1', e.target.value)}
                placeholder="I Build Things"
              />
            </div>
            <div className="admin-form-group">
              <label>Headline Line 2</label>
              <input
                type="text"
                value={about.headline2 || ''}
                onChange={(e) => updateAbout('headline2', e.target.value)}
                placeholder="That Matter"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Bio (main paragraph)</label>
            <textarea
              rows={3}
              value={about.bio || ''}
              onChange={(e) => updateAbout('bio', e.target.value)}
              placeholder="Your main bio text…"
            />
          </div>

          <div className="admin-form-group">
            <label>Extended Bio</label>
            <textarea
              rows={4}
              value={about.extendedBio || ''}
              onChange={(e) => updateAbout('extendedBio', e.target.value)}
              placeholder="Longer description of your work…"
            />
          </div>

          {/* Stats */}
          <div className="admin-form-group">
            <label>Stats</label>
            <div className="admin-stats-list">
              {(about.stats || []).map((stat, i) => (
                <motion.div
                  key={i}
                  className="admin-stat-row"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <input
                    type="text"
                    placeholder="Number"
                    value={stat.number || ''}
                    onChange={(e) => updateStat(i, 'number', e.target.value)}
                    className="admin-stat-input-number"
                  />
                  <input
                    type="text"
                    placeholder="Label"
                    value={stat.label || ''}
                    onChange={(e) => updateStat(i, 'label', e.target.value)}
                    className="admin-stat-input-label"
                  />
                  <button
                    onClick={() => removeStat(i)}
                    className="admin-action-btn delete"
                    style={{ fontSize: '12px', padding: '4px 8px' }}
                  >
                    ✕
                  </button>
                </motion.div>
              ))}
              <button onClick={addStat} className="admin-btn-secondary" style={{ marginTop: '8px' }}>
                + Add Stat
              </button>
            </div>
          </div>

          <div className="admin-form-actions">
            <button onClick={handleSave} disabled={saving} className="admin-btn-primary">
              {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
