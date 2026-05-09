import { Link } from 'react-router-dom'
import Icon from '../components/Icons'
import useApi from '../hooks/useApi'

export default function HomePage() {
const { data: services, loading: sLoading } = useApi('/services')
const { data: blogs, loading: bLoading } = useApi('/blogs')
const { data: dashboard, loading: dLoading } = useApi('/dashboard/stats')
  const stats = dashboard?.stats || {}
  // Sirf pehle 3 services dikhane ke liye
  const displayServices = services?.slice(0, 3) || []
  // Sirf latest 2 blogs dikhane ke liye
  const displayBlogs = blogs?.slice(0, 2) || []

  return (
    <div className="home-container">
      {/* ── HERO SECTION ────────────────────────────────── */}
      <section className="section-block hero-min-height flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fade-in">
          <p className="eyebrow text-accent uppercase tracking-widest mb-4">
            AI-Driven Future
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Automate Your Workflow <br /> With Precision
          </h1>
          <p className="hero-copy max-w-2xl mx-auto text-muted mb-8">
            Codecelix delivers enterprise-grade AI solutions that transform how
            modern product teams build, scale, and optimize.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="btn btn-solid px-8 py-3 rounded-full"
            >
              Get Started
            </Link>
            <Link
              to="/services"
              className="btn btn-outline px-8 py-3 rounded-full"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ────────────────────────────────── */}
      <section className="section-block border-y border-line py-12 bg-surface/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-accent">
              {dLoading ? '...' : stats.users || 0}
            </h3>
            <p className="text-sm text-muted">Total Users</p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-accent">
              {dLoading ? '...' : stats.services || 0}
            </h3>
            <p className="text-sm text-muted">Services</p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-accent">
              {dLoading ? '...' : stats.messages || 0}
            </h3>
            <p className="text-sm text-muted">Contact Messages</p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-accent">24/7</h3>
            <p className="text-sm text-muted">Support</p>
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ─────────────────────────────── */}
      <section className="section-block py-20 px-4">
        <div className="flex justify-between items-end mb-12 max-w-6xl mx-auto">
          <div>
            <p className="eyebrow text-accent">Expertise</p>
            <h2 className="text-4xl font-bold">Our Core Pillars</h2>
          </div>
          <Link
            to="/services"
            className="hidden md:block text-accent hover:underline"
          >
            Explore all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sLoading ? (
            <p>Loading services...</p>
          ) : (
            displayServices.map((svc) => (
              <Link
                to={`/services/${svc.slug}`}
                key={svc._id}
                className="svc-card group p-8 rounded-2xl border border-line bg-surface hover:border-accent transition-all"
              >
                <div className="mb-4 text-accent group-hover:scale-110 transition-transform">
                  <Icon name={svc.icon || 'bot'} size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{svc.title}</h3>
                <p className="text-muted text-sm line-clamp-2">
                  {svc.description}
                </p>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* ── BLOG PREVIEW ─────────────────────────────────── */}
      <section className="section-block py-20 px-4 bg-surface/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Latest Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bLoading ? (
              <p>Loading blogs...</p>
            ) : (
              displayBlogs.map((post) => (
                <article
                  key={post._id}
                  className="blog-card glass p-6 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs text-accent font-bold uppercase tracking-widest">
                      {post.category}
                    </span>
                    <h3 className="text-2xl font-bold mt-2 mb-4">
                      {post.title}
                    </h3>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-sm font-semibold border-b border-accent self-start"
                  >
                    Read More
                  </Link>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
