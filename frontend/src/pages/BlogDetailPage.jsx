import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useApi from '../hooks/useApi'
import Icon from '../components/Icons'

const SERVER_URL = 'http://localhost:5000';

export default function BlogDetailPage() {
  const { slug } = useParams()
  const { data: allBlogs, loading } = useApi('/blogs')
  const [post, setPost] = useState(null)

  useEffect(() => {
    if (allBlogs) {
      const found = allBlogs.find(b => b.slug === slug)
      setPost(found)
    }
  }, [allBlogs, slug])

  // Alternative: Use derived state to avoid setState in effect
  // const post = allBlogs?.find(b => b.slug === slug) ?? null

  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith('http')) return img;
    if (img.startsWith('uploads/')) return `${SERVER_URL}/${img}`;
    return `${SERVER_URL}/uploads/${img}`;
  }

  if (loading) return <div className="loading" style={{ textAlign:'center', padding:'100px', color:'#fff' }}>Decrypting Data...</div>
  if (!post) return <div style={{ textAlign:'center', padding:'100px', color:'#fff' }}>Article Not Found</div>

  const postImage = getImageUrl(post.image);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Navigation */}
      <Link to="/blog" style={{ color: '#666', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px' }}>
        ← BACK TO ARCHIVE
      </Link>

      {/* Header Section */}
      <header style={{ marginBottom: '50px' }}>
        <div style={{ color: 'var(--accent)', fontWeight: '900', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
          {post.category}
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', lineHeight: '1', marginBottom: '30px' }}>
          {post.title}
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderTop: '1px solid #333', paddingTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#222', border: '1px solid #444', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                   <Icon name="User" size={16} color="var(--accent)" />
                </div>
                <span style={{ fontSize: '14px', color: '#fff' }}>By {post.author?.name || 'Codecelix Admin'}</span>
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
               {new Date(post.createdAt).toDateString()}
            </div>
        </div>
      </header>

      {/* Hero Image */}
      {postImage && (
        <div style={{ marginBottom: '50px', borderRadius: '24px', overflow: 'hidden', border: '1px solid #333' }}>
          <img src={postImage} alt={post.title} style={{ width: '100%', height: '500px', display: 'block' }} />
        </div>
      )}

      {/* Article Content */}
      <article 
        style={{ 
          fontSize: '18px', 
          lineHeight: '1.8', 
          color: '#ccc', 
          fontStyle: 'italic'
        }}
        className="blog-content-area"
      >
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

      {/* Footer CTA */}
      <footer style={{ marginTop: '80px', padding: '40px', background: '#111', borderRadius: '24px', border: '1px solid #222', textAlign: 'center' }}>
         <h3 style={{ fontStyle: 'italic', fontWeight: '900', textTransform: 'uppercase', marginBottom: '15px' }}>Next Tech Insight?</h3>
         <p style={{ color: '#666', marginBottom: '25px' }}>Follow us for more updates on web architecture and design.</p>
         <Link to="/contact" className="btn btn-solid" style={{ display: 'inline-block', padding: '12px 30px' }}>Work With Us</Link>
      </footer>
    </div>
  )
}