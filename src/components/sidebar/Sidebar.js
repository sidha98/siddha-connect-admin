import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CSidebar,
} from '@coreui/react'
import './style.scss'
import { AppSidebarNav } from '../AppSidebarNav'


// sidebar nav config
import navigation from '../../_nav'

const Sidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      // colorScheme="white"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      {/* <CSidebarHeader className="border-bottom">
      <CSidebarBrand to="/">
  <img 
    src= {siddha}
    alt="Siddha Connect Admin Logo" 
    className="sidebar-logo" 
  />
</CSidebarBrand>

        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader> */}
      <div
    className="nav-header"
    style={{ textAlign: 'center', padding: '15px', fontWeight: 'bold', fontSize: '20px' }}
  >
    Siddha Admin
  </div>
 
     <AppSidebarNav items={navigation} />
 

      {/* <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter> */}
    </CSidebar>
  )
}

export default React.memo(Sidebar)
