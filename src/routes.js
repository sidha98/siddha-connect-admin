import React from 'react'
import Dashboard from './components/dashboard/Dashboard'
import ExtractionData from './components/extraction'
import Orders from './components/orders/Orders'
import Profile from './components/profile'
import Sales_Data from './components/salesData'
import SegmentData from './components/segmentTarget'
import Users from './components/users'
// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/orders', name: 'Orders', element: Orders },
  { path: '/extraction', name: 'Extraction', element: ExtractionData },
  { path: '/users', name: 'Users', element: Users },
  { path: '/salesData', name: 'Sales Data', element: Sales_Data },
  { path: '/segment', name: 'Segment Data', element: SegmentData },

  { path: '/profile', name: 'Sales', element: Profile },

]

export default routes
