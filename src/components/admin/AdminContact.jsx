import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSiteConfig, updateSiteConfig } from '../../data/portfolioStore';

export default function AdminContact() {
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

  const contact = config?.contact || {};

  const updateContact = (field, value) => {
    setConfig({
      ...config,
      contact: { ...contact, [field]: value },
    });
  };

  const updateSocialLink = (index, field, value) => {
    const links = [...(contact.socialLinks || [])];
    links[index] = { ...links[index], [field]: value };
    updateContact('socialLinks', links);
  };

  const addSocialLink = () => {
    const links = [...(contact.socialLinks || []), { label: '', href: '' }];
    updateContact('socialLinks', links);
  };

  const removeSocialLink = (index) => {
    const links = (contact.socialLinks || []).filter((_, i) => i !== index);
    updateContact('socialLinks', links);
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
          Manage your contact email and social media links.
        </p>
      </div>

      <div className="admin-form-card">
        <div className="admin-form">
          <div className="admin-form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={contact.email || ''}
              onChange={(e) => updateContact('email', e.target.value)}
              placeholder="hello@example.com"
            />
          </div>

          <div className="admin-form-group">
            <label>Social Links</label>
            <div className="admin-social-list">
              {(contact.socialLinks || []).map((link, i) => (
                <motion.div
                  key={i}
                  className="admin-social-row"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <input
                    type="text"
                    placeholder="Label (e.g. GitHub)"
                    value={link.label || ''}
                    onChange={(e) => updateSocialLink(i, 'label', e.target.value)}
                  />
                  <input
                    type="url"
                    placeholder="https://..."
                    value={link.href || ''}
                    onChange={(e) => updateSocialLink(i, 'href', e.target.value)}
                  />
                  <button
                    onClick={() => removeSocialLink(i)}
                    className="admin-action-btn delete"
                    style={{ fontSize: '12px', padding: '4px 8px' }}
                  >
                    ✕
                  </button>
                </motion.div>
              ))}
              <button onClick={addSocialLink} className="admin-btn-secondary" style={{ marginTop: '8px' }}>
                + Add Link
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
