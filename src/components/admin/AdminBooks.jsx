import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCollection, addDocument, updateDocument, deleteDocument } from '../../data/portfolioStore';

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [order, setOrder] = useState(0);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const data = await getCollection('books');
    setBooks(data);
    setLoading(false);
  };

  const openAddModal = () => {
    setEditingBook(null);
    setTitle('');
    setAuthor('');
    setIsbn('');
    setOrder(books.length);
    setIsModalOpen(true);
  };

  const openEditModal = (book) => {
    setEditingBook(book);
    setTitle(book.title || '');
    setAuthor(book.author || '');
    setIsbn(book.isbn || '');
    setOrder(book.order ?? books.length);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBook(null);
  };

  const handleSave = async () => {
    if (!title.trim() || !isbn.trim()) return;

    setSaving(true);
    const bookData = { title, author, isbn, order: Number(order) };

    if (editingBook) {
      await updateDocument('books', editingBook.id, bookData);
    } else {
      await addDocument('books', bookData);
    }

    await fetchBooks();
    setSaving(false);
    closeModal();
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this book?')) {
      await deleteDocument('books', id);
      fetchBooks();
    }
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
          Manage your "On My Shelf" books. Changes reflect instantly on the homepage and books page.
        </p>
        <button className="admin-add-btn" onClick={openAddModal}>
          + Add Book
        </button>
      </div>

      <div className="admin-skills-grid">
        {books.map((book) => (
          <div key={book.id} className="admin-skill-group-card" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '72px', flexShrink: 0, backgroundColor: 'var(--admin-surface-hover)', borderRadius: '4px', overflow: 'hidden' }}>
              <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-S.jpg`} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="admin-list-item-title">{book.title}</h3>
              <p className="admin-list-desc" style={{ marginBottom: '8px' }}>{book.author}</p>
              <div className="admin-list-item-actions">
                <button className="admin-action-btn edit" onClick={() => openEditModal(book)}>
                  Edit
                </button>
                <button className="admin-action-btn delete" onClick={() => handleDelete(book.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
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
              {editingBook ? 'Edit Book' : 'Add Book'}
            </h2>
            <div className="admin-form">
              <div className="admin-form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., The Design of Everyday Things"
                />
              </div>
              <div className="admin-form-group">
                <label>Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g., Don Norman"
                />
              </div>
              <div className="admin-form-group">
                <label>ISBN (for cover image)</label>
                <input
                  type="text"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  placeholder="e.g., 9780465050659"
                />
                <p className="caption-sm" style={{ color: 'var(--admin-mute)', marginTop: '4px' }}>
                  The ISBN-13 is used to fetch the book cover automatically.
                </p>
              </div>
              <div className="admin-form-group">
                <label>Display Order</label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                />
              </div>
              <div className="admin-form-actions" style={{ marginTop: '12px' }}>
                <button className="admin-btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Book'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
