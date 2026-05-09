// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Briefcase,
//   FileText,
//   MessageSquare,
//   Settings,
//   LogOut,
//   ChevronRight,
//   Globe
// } from "lucide-react";
// import toast from "react-hot-toast";

// const menuItems = [
//   { label: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
//   { label: 'Services', icon: Briefcase, path: '/admin/services' },
//   { label: 'Blogs', icon: FileText, path: '/admin/blogs' },
//   { label: 'Contacts/Leads', icon: MessageSquare, path: '/admin/contacts' },
// ];

// export default function AdminLayout({ children }) {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     toast.success("Logged out from Admin");
//     navigate('/login');
//   };

//   return (
//     <div className="flex min-h-screen bg-[#0a0503] text-white">
//       {/* SIDEBAR */}
//       <aside className="w-72 border-r border-line bg-surface/20 backdrop-blur-xl sticky top-0 h-screen hidden lg:flex flex-col">
//         <div className="p-8">
//           <Link to="/" className="flex items-center gap-3">
//             <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
//               <Globe size={18} />
//             </div>
//             <span className="font-black tracking-tighter text-xl uppercase italic">Codecelix</span>
//           </Link>
//         </div>

//         <nav className="flex-1 px-4 space-y-2">
//           {menuItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${
//                 location.pathname === item.path
//                 ? 'bg-accent text-white shadow-lg shadow-accent/20'
//                 : 'hover:bg-white/5 text-muted'
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <item.icon size={20} />
//                 <span className="font-medium">{item.label}</span>
//               </div>
//               <ChevronRight size={14} className={location.pathname === item.path ? 'opacity-100' : 'opacity-0'} />
//             </Link>
//           ))}
//         </nav>

//         <div className="p-4 border-t border-line">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 w-full p-4 text-danger hover:bg-danger/10 rounded-2xl transition-all"
//           >
//             <LogOut size={20} />
//             <span className="font-bold text-sm">Logout System</span>
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="flex-1 overflow-x-hidden pt-10">
//         <div className="max-w-6xl mx-auto px-6 pb-20">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }

// src/components/admin/AdminLayout.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  LogOut,
  ChevronRight,
  Globe
} from 'lucide-react'
import toast from 'react-hot-toast'

const menuItems = [
  { label: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
  { label: 'Services', icon: Briefcase, path: '/admin/services' },
  { label: 'Blogs', icon: FileText, path: '/admin/blogs' },
  { label: 'Contacts/Leads', icon: MessageSquare, path: '/admin/contacts' }
]

export default function AdminLayout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('codecelix-token')
    localStorage.removeItem('user')
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-[#0a0503] text-white">
      <aside className="w-72 border-r border-line bg-surface/20 backdrop-blur-xl sticky top-0 h-screen hidden lg:flex flex-col">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Globe size={18} />
            </div>
            <span className="font-black tracking-tighter text-xl uppercase italic">
              Codecelix
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${
                location.pathname === item.path
                  ? 'bg-accent text-white shadow-lg shadow-accent/20'
                  : 'hover:bg-white/5 text-muted'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight
                size={14}
                className={
                  location.pathname === item.path ? 'opacity-100' : 'opacity-0'
                }
              />
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-line">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-4 text-danger hover:bg-danger/10 rounded-2xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-bold text-sm">Logout System</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden pt-10">
        <div className="max-w-6xl mx-auto px-6 pb-20">{children}</div>
      </main>
    </div>
  )
}
