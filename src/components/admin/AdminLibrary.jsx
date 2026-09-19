import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCollection, addDocument, updateDocument, deleteDocument } from '../../data/portfolioStore';

export default function AdminLibrary() {
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);

  // Category State
  const [savingCategory, setSavingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Item Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [editingItemIndex, setEditingItemIndex] = useState(null);

  // Item Form State
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [coverUrl, setCoverUrl] = useState('');

  useEffect(() => {
    fetchLibrary();
  }, []);

  const fetchLibrary = async () => {
    const data = await getCollection('library');
    setLibrary(data);
    setLoading(false);
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    setSavingCategory('new');
    await addDocument('library', {
      name: newCategoryName,
      items: [],
      order: library.length,
    });
    setNewCategoryName('');
    await fetchLibrary();
    setSavingCategory(null);
  };

  const handleDeleteCategory = async (id) => {
    if (confirm('Are you sure you want to delete this entire shelf category?')) {
      await deleteDocument('library', id);
      fetchLibrary();
    }
  };

  const openAddItemModal = (categoryId) => {
    setActiveCategoryId(categoryId);
    setEditingItemIndex(null);
    setTitle('');
    setArtist('');
    setSpotifyUrl('');
    setCoverUrl('');
    setIsModalOpen(true);
  };

  const openEditItemModal = (categoryId, item, index) => {
    setActiveCategoryId(categoryId);
    setEditingItemIndex(index);
    setTitle(item.title || '');
    setArtist(item.artist || '');
    setSpotifyUrl(item.spotifyUrl || '');
    setCoverUrl(item.coverUrl || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveCategoryId(null);
    setEditingItemIndex(null);
  };

  const handleSaveItem = async () => {
    if (!title.trim() || !artist.trim()) return;

    const category = library.find((c) => c.id === activeCategoryId);
    if (!category) return;

    const newItem = {
      id: editingItemIndex !== null ? category.items[editingItemIndex].id : Date.now().toString(),
      type: 'album',
      title,
      artist,
      spotifyUrl,
      coverUrl,
    };

    const newItems = [...(category.items || [])];
    if (editingItemIndex !== null) {
      newItems[editingItemIndex] = newItem;
    } else {
      newItems.push(newItem);
    }

    await updateDocument('library', activeCategoryId, { items: newItems });
    await fetchLibrary();
    closeModal();
  };

  const handleDeleteItem = async (categoryId, itemIndex) => {
    if (!confirm('Are you sure you want to remove this record?')) return;
    
    const category = library.find((c) => c.id === categoryId);
    if (!category) return;

    const newItems = category.items.filter((_, i) => i !== itemIndex);
    await updateDocument('library', categoryId, { items: newItems });
    fetchLibrary();
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
          Manage your Music Listening Archive. Note: The /music page will still fetch live Spotify playlists if connected.
        </p>
      </div>

      <div className="admin-list">
        {library.map((category) => (
          <div key={category.id} className="admin-skill-group-card" style={{ marginBottom: '16px' }}>
            <div className="admin-skill-group-header">
              <h3 className="admin-main-title" style={{ fontSize: '18px' }}>{category.name}</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="admin-action-btn" onClick={() => openAddItemModal(category.id)}>+ Add Record</button>
                <button className="admin-action-btn delete" onClick={() => handleDeleteCategory(category.id)}>Delete Category</button>
              </div>
            </div>
            
            <div className="admin-list">
              {(category.items || []).map((item, i) => (
                <div key={i} className="admin-list-item" style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--admin-border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--admin-surface-hover)', borderRadius: '4px', overflow: 'hidden' }}>
                      {item.coverUrl && <img src={item.coverUrl} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    </div>
                    <div>
                      <p className="admin-list-item-title" style={{ fontSize: '13px' }}>{item.title}</p>
                      <p className="admin-list-desc" style={{ fontSize: '12px' }}>{item.artist}</p>
                    </div>
                  </div>
                  <div className="admin-list-item-actions">
                    <button className="admin-action-btn edit" onClick={() => openEditItemModal(category.id, item, i)}>Edit</button>
                    <button className="admin-action-btn delete" onClick={() => handleDeleteItem(category.id, i)}>Delete</button>
                  </div>
                </div>
              ))}
              {(!category.items || category.items.length === 0) && (
                <p className="admin-list-desc" style={{ padding: '12px 0' }}>No records in this shelf.</p>
              )}
            </div>
          </div>
        ))}

        <div className="admin-skill-group-card admin-add-group-card" style={{ marginTop: '16px', minHeight: 'auto', padding: '16px' }}>
          <div className="admin-skill-add-row">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New Shelf Name (e.g., Late Night Code)"
              style={{ padding: '8px 12px', background: 'transparent', border: '1px solid var(--admin-border)', borderRadius: '6px', color: 'var(--admin-ink)', flex: 1 }}
            />
            <button
              className="admin-add-btn"
              onClick={handleAddCategory}
              disabled={savingCategory === 'new' || !newCategoryName.trim()}
            >
              {savingCategory === 'new' ? 'Adding...' : 'Add Shelf'}
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="admin-mobile-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <motion.div
            className="admin-form-card"
            style={{ width: '100%', maxWidth: '500px', margin: '20px', maxHeight: '90vh', overflowY: 'auto' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="admin-main-title" style={{ fontSize: '20px', marginBottom: '20px' }}>
              {editingItemIndex !== null ? 'Edit Record' : 'Add Record'}
            </h2>
            <div className="admin-form">
              <div className="admin-form-group">
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Random Access Memories" />
              </div>
              <div className="admin-form-group">
                <label>Artist</label>
                <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Daft Punk" />
              </div>
              <div className="admin-form-group">
                <label>Spotify Album/Track URL</label>
                <input type="text" value={spotifyUrl} onChange={(e) => setSpotifyUrl(e.target.value)} placeholder="https://open.spotify.com/album/..." />
              </div>
              <div className="admin-form-group">
                <label>Cover Image URL</label>
                <input type="text" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="https://..." />
              </div>
              <div className="admin-form-actions" style={{ marginTop: '12px' }}>
                <button className="admin-btn-secondary" onClick={closeModal}>Cancel</button>
                <button className="admin-btn-primary" onClick={handleSaveItem}>Save Record</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
