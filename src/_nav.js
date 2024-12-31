import React from 'react'
import { FaTachometerAlt, FaClipboardList, FaChartBar, FaUsers, FaPencilAlt, FaUser } from 'react-icons/fa'
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
    name: 'Products',
    to: '/products',
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
    name: 'Profile',
    to: '/profile',
    icon: <FaUser className="nav-icon" />,
  },
]

export default _nav
