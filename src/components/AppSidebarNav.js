// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import '../components/sidebar/style.scss'; // Custom styles

// export const AppSidebarNav = ({ items }) => {
//   const navLink = (name, icon, badge, indent = false) => (
//     <>
//       {icon && <span className="nav-icon">{icon}</span>}
//       <span className={`nav-text ${indent ? 'nav-indent' : ''}`}>{name}</span>
//       {badge && <span className="nav-badge">{badge.text}</span>}
//     </>
//   );

//   const navItem = (item, index, indent = false) => {
//     const { name, badge, icon, to, href } = item;

//     return (
//       <div key={index} className="nav-item">
//         {to || href ? (
//           <NavLink
//             to={to}
//             href={href}
//             target={href ? '_blank' : undefined}
//             rel={href ? 'noopener noreferrer' : undefined}
//             className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
//           >
//             {navLink(name, icon, badge, indent)}
//           </NavLink>
//         ) : (
//           <span className="nav-link">{navLink(name, icon, badge, indent)}</span>
//         )}
//       </div>
//     );
//   };

//   const navGroup = (item, index) => {
//     const { name, icon, items } = item;

//     return (
//       <div key={index} className="nav-group">
//         <div className="nav-group-header">
//           {navLink(name, icon)}
//         </div>
//         <div className="nav-group-items">
//           {items.map((subItem, subIndex) =>
//             subItem.items ? navGroup(subItem, subIndex) : navItem(subItem, subIndex, true)
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="custom-sidebar-nav">
//       {items.map((item, index) =>
//         item.items ? navGroup(item, index) : navItem(item, index)
//       )}
//     </div>
//   );
// };

// AppSidebarNav.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.any).isRequired,
// };
