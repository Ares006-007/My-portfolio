import { useState } from 'react';
import RevealOnScroll from './RevealOnScroll';

const books = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '9780735211292',
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    isbn: '9780062316097',
  },
  {
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    isbn: '9780465050659',
  },
  {
    title: 'Zero to One',
    author: 'Peter Thiel',
    isbn: '9780804139298',
  },
  {
    title: "Surely You're Joking, Mr. Feynman!",
    author: 'Richard Feynman',
    isbn: '9780393355628',
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    isbn: '9780374533557',
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    isbn: '9780135957059',
  },
  {
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    isbn: '9780553380163',
  },
];

export default function Library() {
  const [failedCovers, setFailedCovers] = useState(new Set());

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
      </div>
    </section>
  );
}
