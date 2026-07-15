import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RevealOnScroll from './RevealOnScroll';

const featuredBook = {
  title: 'Sapiens',
  author: 'Yuval Noah Harari',
  isbn: '9780062316097',
  note: 'A sweeping narrative that fundamentally changed how I think about human civilization, cooperation, and the stories we tell ourselves to build societies.',
};

const categories = [
  {
    name: 'Design & Craft',
    books: [
      { title: 'The Design of Everyday Things', author: 'Don Norman', isbn: '9780465050659' },
      { title: "Don't Make Me Think", author: 'Steve Krug', isbn: '9780321965516' },
      { title: 'Steal Like an Artist', author: 'Austin Kleon', isbn: '9780761169253' },
      { title: 'The Shape of Design', author: 'Frank Chimero', isbn: '9780985472207' },
      { title: 'Sprint', author: 'Jake Knapp', isbn: '9781501121746' },
    ],
  },
  {
    name: 'Science & Wonder',
    books: [
      { title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '9780553380163' },
      { title: "Surely You're Joking, Mr. Feynman!", author: 'Richard Feynman', isbn: '9780393355628' },
      { title: 'Cosmos', author: 'Carl Sagan', isbn: '9780345539434' },
      { title: 'The Elegant Universe', author: 'Brian Greene', isbn: '9780393338102' },
      { title: 'Astrophysics for People in a Hurry', author: 'Neil deGrasse Tyson', isbn: '9780393609394' },
    ],
  },
  {
    name: 'Mind & Strategy',
    books: [
      { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', isbn: '9780374533557' },
      { title: 'Atomic Habits', author: 'James Clear', isbn: '9780735211292' },
      { title: 'Deep Work', author: 'Cal Newport', isbn: '9781455586691' },
      { title: 'Range', author: 'David Epstein', isbn: '9780735214484' },
      { title: 'Meditations', author: 'Marcus Aurelius', isbn: '9780140449334' },
    ],
  },
  {
    name: 'Building & Making',
    books: [
      { title: 'Zero to One', author: 'Peter Thiel', isbn: '9780804139298' },
      { title: 'The Pragmatic Programmer', author: 'David Thomas & Andrew Hunt', isbn: '9780135957059' },
      { title: 'The Lean Startup', author: 'Eric Ries', isbn: '9780307887894' },
      { title: 'Shoe Dog', author: 'Phil Knight', isbn: '9781501135927' },
      { title: 'Hackers & Painters', author: 'Paul Graham', isbn: '9781449389550' },
    ],
  },
];

const totalBooks =
  categories.reduce((acc, cat) => acc + cat.books.length, 0) + 1;

export default function BooksPage() {
  const [failedCovers, setFailedCovers] = useState(new Set());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageError = (isbn) => {
    setFailedCovers((prev) => new Set(prev).add(isbn));
  };

  const renderCover = (book) => (
    <div className="library-book-cover">
      {failedCovers.has(book.isbn) ? (
        <div className="library-book-fallback">
          <span className="caption-sm">{book.title}</span>
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
  );

  return (
    <div className="books-page">
      {/* Minimal navigation */}
      <nav className="books-nav">
        <div
          className="section-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Link
            to="/"
            className="caption-md"
            style={{ color: 'var(--color-ink)', textDecoration: 'none' }}
            data-cursor="link"
          >
            ← Back to portfolio
          </Link>
          <Link
            to="/"
            className="body-strong"
            style={{
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-ink)',
              textDecoration: 'none',
            }}
            data-cursor="link"
          >
            SMA
          </Link>
        </div>
      </nav>

      {/* Hero / Header */}
      <header className="books-hero">
        <div className="section-container">
          <RevealOnScroll>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-lg)',
                marginBottom: 'var(--space-lg)',
              }}
            >
              <p className="label">Personal Library</p>
              <span
                className="caption-sm"
                style={{ color: 'var(--color-stone)' }}
              >
                {totalBooks} books
              </span>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <h1
              className="display-campaign"
              style={{
                fontSize: 'clamp(40px, 7vw, 80px)',
                color: 'var(--color-ink)',
              }}
            >
              My Library
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p
              className="body-md"
              style={{
                color: 'var(--color-mute)',
                maxWidth: '52ch',
                marginTop: 'var(--space-xl)',
              }}
            >
              A curated collection of books that shaped how I think about design,
              technology, science, and building things that matter. These aren't
              just books I've read — they're the ones I keep coming back to.
            </p>
          </RevealOnScroll>
        </div>
      </header>

      {/* Featured Book */}
      <section className="books-featured section-spacing">
        <div className="section-container">
          <RevealOnScroll>
            <p className="label" style={{ marginBottom: 'var(--space-xl)' }}>
              Currently Reading
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <div className="books-featured-grid">
              <div className="books-featured-cover">
                {renderCover(featuredBook)}
              </div>
              <div className="books-featured-info">
                <h2
                  className="heading-lg"
                  style={{ marginBottom: 'var(--space-sm)' }}
                >
                  {featuredBook.title}
                </h2>
                <p
                  className="caption-md"
                  style={{
                    color: 'var(--color-mute)',
                    marginBottom: 'var(--space-xl)',
                  }}
                >
                  {featuredBook.author}
                </p>
                <p
                  className="body-md"
                  style={{
                    color: 'var(--color-charcoal)',
                    maxWidth: '44ch',
                    lineHeight: '1.7',
                  }}
                >
                  {featuredBook.note}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Category Rows */}
      {categories.map((category, catIndex) => (
        <section
          key={category.name}
          className="books-category"
          style={{
            backgroundColor:
              catIndex % 2 === 0
                ? 'var(--color-soft-cloud)'
                : 'var(--color-canvas)',
          }}
        >
          <div className="section-container">
            <RevealOnScroll>
              <p className="label" style={{ marginBottom: 'var(--space-xl)' }}>
                {category.name}
              </p>
            </RevealOnScroll>
            <div className="library-shelf">
              {category.books.map((book, i) => (
                <RevealOnScroll
                  key={book.isbn}
                  delay={i * 0.06}
                  className="library-book-wrapper"
                >
                  <div className="library-book books-page-book">
                    {renderCover(book)}
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
          </div>
        </section>
      ))}

      {/* Minimal footer */}
      <footer
        style={{
          borderTop: '1px solid var(--color-hairline)',
          padding: 'var(--space-xl) 0',
        }}
      >
        <div
          className="section-container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-sm)',
          }}
        >
          <Link
            to="/"
            className="caption-md"
            style={{ color: 'var(--color-mute)', textDecoration: 'none' }}
            data-cursor="link"
          >
            ← Back to portfolio
          </Link>
          <p className="utility-xs" style={{ color: 'var(--color-mute)' }}>
            © {new Date().getFullYear()} Shaik Mohammad Ajhaj
          </p>
        </div>
      </footer>
    </div>
  );
}
