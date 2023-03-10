import React from 'react';
import { Link } from 'react-router-dom';

import { SidebarData } from './SidebarData';

import styled from 'styled-components';

const SidebarMenu = styled.div`
    width: 250px;
    height: 100vh;
    background-color: #00ADD8;
    position: fixed;
    top: 0;
    left: 0;
    transition: .6s;
`;

const MenuItems = styled.li`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 90px;
`;

const MenuItemLinks = styled(Link)`
    display: flex;
    align-items: center;
    padding: 0 2rem;
    font-size: 20px;
    text-decoration: none;
    color: #ffffff;

    &:hover {
        background-color: #ffffff;
        color: #000080;
        width: 100%;
        height: 45px;
        text-align: center;
        border-radius: 5px;
    }
`;

const Sidebar: React.FunctionComponent = () => {
  return (
        <>
            <SidebarMenu>
                {SidebarData.map((item, index) => {
                  return (
                        <MenuItems key={index}>
                            <MenuItemLinks to={item.path}>
                                {item.icon}
                                <span style={{ marginLeft: '16px' }}>{item.title}</span>
                            </MenuItemLinks>
                        </MenuItems>
                  );
                })}
            </SidebarMenu>
        </>
  );
};

export default Sidebar;
