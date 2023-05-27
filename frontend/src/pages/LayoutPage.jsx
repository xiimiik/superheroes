import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { routs } from "../routes/router";
import AddEditForm from "../components/AddForm";

function LayoutPage() {
  const [isFormActive, setIsFormActive] = useState(false);

  return (
    <>
      <Nav pills fill className='pt-3 pb-3 mb-3 border'>
        <NavItem>
          <NavLink to={routs.MAIN} className='btn btn-lg btn-primary' onClick={() => setIsFormActive(false)}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className='btn btn-lg btn-success' onClick={() => setIsFormActive(true)}>
            Create new
          </NavLink>
        </NavItem>
      </Nav>
      <main>{isFormActive ? <AddEditForm setIsFormActive={setIsFormActive}/> : <Outlet />}</main>
    </>
  );
}

export default LayoutPage;
