"use client";

import React from "react";
import "./Sidebar.css"; // make sure to create a corresponding CSS file
// import { Sidebar } from "flowbite-react"; // import the component from the library

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { LuLayoutDashboard, LuSettings } from "react-icons/lu";

const avatarTheme = {
  root: {
    base: "flex justify-center items-center space-x-4 rounded",
    bordered: "p-1 ring-2",
    rounded: "rounded-full",
    color: {
      dark: "ring-gray-800 dark:ring-gray-800",
      failure: "ring-red-500 dark:ring-red-700",
      gray: "ring-gray-500 dark:ring-gray-400",
      info: "ring-cyan-400 dark:ring-cyan-800",
      light: "ring-gray-300 dark:ring-gray-500",
      purple: "ring-purple-500 dark:ring-purple-600",
      success: "ring-green-500 dark:ring-green-500",
      warning: "ring-yellow-300 dark:ring-yellow-500",
      pink: "ring-pink-500 dark:ring-pink-500",
    },
    img: {
      base: "rounded",
      off: "relative overflow-hidden bg-gray-100 dark:bg-gray-600",
      on: "",
      placeholder: "absolute w-auto h-auto text-gray-400 -bottom-1",
    },
    size: {
      xs: "w-6 h-6",
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-20 h-20",
      xl: "w-36 h-36",
    },
    stacked: "ring-2 ring-gray-300 dark:ring-gray-500",
    statusPosition: {
      "bottom-left": "-bottom-1 -left-1",
      "bottom-center": "-bottom-1 center",
      "bottom-right": "-bottom-1 -right-1",
      "top-left": "-top-1 -left-1",
      "top-center": "-top-1 center",
      "top-right": "-top-1 -right-1",
      "center-right": "center -right-1",
      center: "center center",
      "center-left": "center -left-1",
    },
    status: {
      away: "bg-yellow-400",
      base: "absolute h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800",
      busy: "bg-red-400",
      offline: "bg-gray-400",
      online: "bg-green-400",
    },
    initials: {
      text: "font-medium text-gray-600 dark:text-gray-300",
      base: "inline-flex overflow-hidden relative justify-center items-center bg-gray-100 dark:bg-gray-600",
    },
  },
  group: {
    base: "flex -space-x-4",
  },
  groupCounter: {
    base: "relative flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full ring-2 ring-gray-300 hover:bg-gray-600 dark:ring-gray-500",
  },
};

const sideBarTheme = {
  root: {
    base: "between bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4 h-screen border-gray-300 border-r-2",
    rounded: {
      on: "",
      off: "",
    },
    bordered: {
      on: "border",
      off: "",
    },
    inner: {
      base: "flex flex-col flex-nowrap items-center justify-between h-full",
      fluid: {
        on: "",
        off: "container",
      },
    },
  },
  brand: {
    base: "flex flex-col items-center ",
  },
  collapse: {
    base: "w-full md:block md:w-auto",
    list: "flex flex-col items-center",
    hidden: {
      on: "hidden",
      off: "",
    },
  },
  link: {
    base: "block py-2 pr-4 pl-3 md:p-0",
    active: {
      on: "bg-purple-700 text-white dark:text-white md:bg-transparent md:text-purple-700",
      off: "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-purple-700 md:dark:hover:bg-transparent md:dark:hover:text-white",
    },
    disabled: {
      on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
      off: "",
    },
  },
  toggle: {
    base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
    icon: "h-6 w-6 shrink-0",
  },
};

const PicoSidebar = () => {
  // return (
  //   <Sidebar
  //     className="h-full w-[10svh] text-center content-between"
  //     aria-label="Sidebar with logo branding example"
  //   >
  //     <Sidebar.Logo
  //       href="#"
  //       img="/logo.png"
  //       imgAlt="Flowbite logo"
  //     ></Sidebar.Logo>
  //     <Sidebar.Items className="text-center"></Sidebar.Items>
  //     <Sidebar.Logo href="#" img="/user.png" imgAlt="user"></Sidebar.Logo>
  //   </Sidebar>
  // );
  return (
    <Navbar fluid rounded theme={sideBarTheme.root}>
      <Navbar.Brand href="#" theme={sideBarTheme.brand}>
        <img
          src="/logo.png"
          className="mr-3 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center text-center text-lg font-semibold dark:text-white">
          Pico Tracer
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 h-[100px]">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              size="70px"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              bonnie@gmail.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse theme={sideBarTheme.collapse}>
        <Navbar.Link href="#" className="mb-4" theme={sideBarTheme.link}>
          <Avatar img={LuLayoutDashboard} size="sm" color="purple" />
        </Navbar.Link>
        <Navbar.Link href="#" theme={sideBarTheme.link}>
          <Avatar img={LuSettings} size="sm" color="purple" />
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PicoSidebar;
