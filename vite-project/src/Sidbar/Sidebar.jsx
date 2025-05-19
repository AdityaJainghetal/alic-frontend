import React, { useState, useEffect } from 'react';
import {
  FiHome,
  FiBook,
  FiHelpCircle,
  FiMail,
  FiFileText,
  FiChevronLeft,
  FiChevronRight,
  FiSettings,
  FiLogOut,
  FiUser,
  FiX,
  FiMenu,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (!isMobileView) setMobileOpen(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { to: '/dashboard', name: 'Dashboard', icon: <FiHome /> },
    {
      name: 'Courses',
      icon: <FiBook />,
      subItems: [
        { name: 'My Courses', to: '/courses' },
        { name: 'All Courses', to: '/allcourse' },
      ],
    },
    {
      name: 'Category',
      icon: <FiBook />,
      subItems: [{ name: 'Category', to: '/categories' }],
    },
    {
      name: 'Banner',
      icon: <FiHelpCircle />,
      subItems: [
        { to: '/banner', name: 'Banner' },
        { to: '/allbanner', name: 'All Banner' },
        { to: '/blogdisplay', name: 'Blog' },


        
      ],
    },
    {
      name: 'Enquiry',
      icon: <FiHelpCircle />,
      subItems: [
        { to: '/enquirydisplay', name: 'Enquiry' },
        { to: '/contactdisplay', name: 'Contact' },
        { to: '/enroll', name: 'Enroll' },
        { to: '/whatsnew', name: 'WhatsNew' },
        { to: '/whatsnewdisplay', name: 'WhatsNew Display' },
        { to: '/blog', name: 'Blog' },

        

        



        
      ],
    },
    {
      name: 'Success Story',
      icon: <FiMail />,
      subItems: [
        { name: 'Success Story', to: '/sucessStory' },
        { name: 'Story Display', to: '/sucessStorydisplay' },
      ],
    },
  ];

  const toggleSidebar = () => setCollapsed((prev) => !prev);
  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleMobileMenu}
          className="fixed z-50 top-4 left-4 p-2 rounded-md bg-gray-800 text-white shadow-lg"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`
          flex flex-col h-screen bg-gray-800 text-white transition-all duration-300
          ${collapsed ? 'w-20' : 'w-64'}
          ${isMobile ? (mobileOpen ? 'fixed z-40 w-64' : 'hidden') : ''}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!collapsed && <h1 className="text-xl font-bold">EduPortal</h1>}
          {!isMobile && (
            <button onClick={toggleSidebar} className="p-1 rounded-lg hover:bg-gray-700">
              {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
            </button>
          )}
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  {item.to ? (
                    <Link
                      to={item.to}
                      className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-700 ${
                        activeItem === item.name ? 'bg-gray-700' : ''
                      }`}
                      onClick={() => {
                        setActiveItem(item.name);
                        if (isMobile) setMobileOpen(false);
                      }}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {!collapsed && <span className="ml-3">{item.name}</span>}
                    </Link>
                  ) : (
                    <div
                      className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-700 ${
                        activeItem === item.name ? 'bg-gray-700' : ''
                      }`}
                      onClick={() => setActiveItem(item.name)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {!collapsed && <span className="ml-3">{item.name}</span>}
                    </div>
                  )}

                  {!collapsed && item.subItems && (
                    <ul className="ml-8 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            to={subItem.to}
                            className="block p-2 text-sm rounded-lg hover:bg-gray-700"
                            onClick={() => {
                              if (isMobile) setMobileOpen(false);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
              <FiUser />
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-400">Student</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <div className="flex justify-between mt-4">
              <button className="p-2 rounded-lg hover:bg-gray-700">
                <FiSettings />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-700">
                <FiLogOut />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
