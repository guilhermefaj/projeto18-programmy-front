import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import apiClasses from "../../services/apiClasses";


export default function Header() {
    const [showClasses, setShowClasses] = useState(false);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        apiClasses
            .showClasses()
            .then((res) => {
                const apiClasses = res.data;
                setClasses(apiClasses);
                console.log(classes);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    const handleMouseEnter = () => {
        setShowClasses(true);
    };

    const handleMouseLeave = () => {
        setShowClasses(false);
    };

    return (
        <HeaderContainer>
            <Logo>Programmy</Logo>
            <Navigation>
                <NavItem to="/">Home</NavItem>
                <NavItem to="/students/register">Registro</NavItem>
                <NavItem
                    to="/classes"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Turmas
                    {showClasses && (
                        <Dropdown>
                            {classes.map((classItem) => (
                                <DropdownItem
                                    key={classItem.id}
                                    to={`/classes/${classItem.id}`}>
                                    {classItem.code}
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    )}
                </NavItem>
                <NavItem to="/projects">Projetos</NavItem>
            </Navigation>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
  display: flex;
  height: 60px;
  font-family: "Silkscreen";
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #24262f;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #ecfb77;
  margin-right: 20px;
`;

const Navigation = styled.nav`
  display: flex;
`;

const NavItem = styled(Link)`
  position: relative;
  margin-left: 20px;
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #888;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  font-family: "Roboto";
  width: 100%;
  border-radius: 5px;
  gap: 5px;
  top: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

const DropdownItem = styled(Link)`
  color: #555;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: white;
    background-color: #24262F;
  }
`;
