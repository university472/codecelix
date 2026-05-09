import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icons'
import useApi from '../hooks/useApi'

const ALL = 'All'
const SERVER_URL = import.meta.env.VITE_API_URL?.replace('/api', '')

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(ALL)
  const { data: apiBlogs, loading, error } = useApi('/blogs')

  // Smart Image Logic for Seed & Admin data
  const getImageUrl = (img) => {
    if (!img) return 'https://placehold.co/600x400?text=No+Image'
    if (img.startsWith('http')) return img // Admin URL
    // Agar seed data hai toh ho sakta hai '/uploads/' ki zaroorat na ho ya ho
    if (img.startsWith('uploads/')) return `${SERVER_URL}/${img}`
    return `${SERVER_URL}/uploads/${img}` // Admin file
  }

  const blogs = useMemo(() => {
    if (!apiBlogs) return []
    return apiBlogs.map((b) => ({
      ...b,
      author: b.author?.name || 'Codecelix Team',
      date: new Date(b.createdAt).toLocaleDateString(),
      displayImage: getImageUrl(b.image)
    }))
  }, [apiBlogs])

  const categories = useMemo(
    () => [ALL, ...new Set(blogs.map((b) => b.category))],
    [blogs]
  )

  const filtered = blogs.filter((b) => {
    const matchesCat = activeCategory === ALL || b.category === activeCategory
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div
      className="blog-page container"
      style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}
    >
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: '900',
            fontStyle: 'italic',
            textTransform: 'uppercase'
          }}
        >
          The <span style={{ color: 'var(--accent)' }}>Archive</span>
        </h1>
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          Insights and tutorials from the Codecelix team.
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Search articles..."
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            background: '#111',
            color: '#fff'
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <div className="loader">Connecting to Backend...</div>}

      <div
        className="blog-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '25px'
        }}
      >
        {filtered.map((post) => (
          <article
            key={post._id}
            className="blog-card"
            style={{
              border: '1px solid #333',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#1a1a1a'
            }}
          >
            <Link
              to={`/blog/${post.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img
                src={post.displayImage}
                alt={post.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div className="blog-card-content" style={{ padding: '20px' }}>
                <span
                  className="blog-cat-badge"
                  style={{
                    background: 'var(--accent)',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  {post.category}
                </span>
                <h3
                  style={{
                    margin: '15px 0',
                    fontSize: '1.2rem',
                    fontWeight: '800',
                    fontStyle: 'italic',
                    textTransform: 'uppercase'
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    color: '#999',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    fontStyle: 'italic'
                  }}
                >
                  {post.description}
                </p>
                <div
                  style={{
                    marginTop: '15px',
                    color: 'var(--accent)',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  READ MORE →
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
