import React from 'react';
import * as FaIcons from 'react-icons/fa';

export const SidebarData = [
  {
    title: 'Login',
    path: '/',
    icon: <FaIcons.FaLock />
  },
  {
    title: 'Residents',
    path: '/residents',
    icon: <FaIcons.FaUsers />
  },
  {
    title: 'Programs',
    path: '/programs',
    icon: <FaIcons.FaClipboardList />
  }
];
