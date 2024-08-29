"use client";

import React from "react";
import Drawer from "../Drawer/Drawer";

const Nav: React.FC = () => {
  const routes = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
  ];
  return <Drawer routes={routes} displayAsNavBar={true} position={"right"} />;
};

export default Nav;
