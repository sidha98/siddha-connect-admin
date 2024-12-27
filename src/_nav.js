import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Orders',
    to: '/theme/orders', //change this path
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Channel Targets',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
   component: CNavItem,
   name: 'Dealers',
   to: '/theme/typography',
   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
 },
 {
  component: CNavItem,
  name: 'Products',
  to: '/theme/typography',
  icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
},
{
 component: CNavItem,
 name: 'Users',
 to: '/theme/typography',
 icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
},
{
 component: CNavItem,
 name: 'Profile',
 to: '/theme/typography',
 icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
},
]

export default _nav
