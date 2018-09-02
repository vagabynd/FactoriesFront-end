import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

class Navigation extends React.Component{
    render(){
        return <div>
            <Nav tabs>
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/companies">Companies</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/phones">Phones</NavLink>
                </NavItem>
            </Nav>
        </div>;
    }
}

export default Navigation;