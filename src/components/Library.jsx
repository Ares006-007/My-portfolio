import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RevealOnScroll from './RevealOnScroll';

import { getCollection } from '../data/portfolioStore';

export default function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failedCovers, setFailedCovers] = useState(new Set());

  useEffect(() => {
    getCollection('books').then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  const handleImageError = (isbn) => {
    setFailedCovers((prev) => new Set(prev).add(isbn));
  };

  return (
    <section id="library" className="section-spacing">
      <div className="section-container">
        {/* Section header — follows heading-xl pattern */}
        <RevealOnScroll>
          <h2
            className="heading-xl"
            style={{ marginBottom: 'var(--space-md)' }}
          >
            On My Shelf
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <p
            className="body-md"
            style={{
              color: 'var(--color-mute)',
              marginBottom: 'var(--space-section)',
              maxWidth: '44ch',
            }}
          >
            Books that shaped how I think and build.
          </p>
        </RevealOnScroll>

        {/* Horizontal shelf rail */}
        <div className="library-shelf">
          {books.map((book, i) => (
            <RevealOnScroll
              key={book.isbn}
              delay={i * 0.06}
              className="library-book-wrapper"
            >
              <div className="library-book">
                <div className="library-book-cover">
                  {failedCovers.has(book.isbn) ? (
                    <div className="library-book-fallback">
                      <span className="caption-sm">
                        {book.title}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
                      alt={`${book.title} by ${book.author}`}
                      loading="lazy"
                      onError={() => handleImageError(book.isbn)}
                    />
                  )}
                </div>
                <p
                  className="caption-md"
                  style={{
                    color: 'var(--color-ink)',
                    marginTop: 'var(--space-md)',
                  }}
                >
                  {book.title}
                </p>
                <p
                  className="caption-sm"
                  style={{
                    color: 'var(--color-mute)',
                    marginTop: 'var(--space-xxs)',
                  }}
                >
                  {book.author}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Shelf edge — subtle physical surface line */}
        <div className="library-shelf-edge" aria-hidden="true" />

        {/* Show more link */}
        <RevealOnScroll>
          <div className="library-show-more">
            <Link
              to="/books"
              className="caption-md"
              data-cursor="link"
            >
              See the full library →
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
