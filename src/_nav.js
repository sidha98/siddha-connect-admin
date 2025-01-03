import React from 'react'
import { FaTachometerAlt, FaClipboardList, FaFilter,FaChartBar, FaUsers, FaPencilAlt, FaUser } from 'react-icons/fa'
import { AiFillProduct } from "react-icons/ai";
import '../src/components/sidebar/style.scss'

import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'


const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <FaTachometerAlt className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Orders',
    to: '/orders', 
    icon: <FaClipboardList className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Sales Data',
    to: '/salesData',
    icon: <FaChartBar className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Dealers',
    to: '/dealers',
    icon: <FaPencilAlt className="nav-icon" />,
  },
  {
   component: CNavItem,
   name: 'Extraction',
   to: '/extraction',
   icon: <FaFilter className="nav-icon" />,
 },
  {
    component: CNavItem,
    name: 'Segment',
    to: '/segment',
    icon: <AiFillProduct className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <FaUsers className="nav-icon" />,
  },
  {
   component: CNavItem,
   name: "Logout",
   to: "/login", // Add this to ensure redirection
   icon: <FaUser className="nav-icon" />,
   onClick: () => {
     // Perform the logout logic
     localStorage.removeItem("token");
     localStorage.removeItem("user");
     navigate("/login");
   },
 },
]

export default _nav
