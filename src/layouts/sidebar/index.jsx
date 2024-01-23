import { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation, useRoutes } from "react-router-dom";

import { 
  subMenuRecursoHumanos,
} from './data'

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  const [expandedSubModules, setExpandedSubModules] = useState({});
  const toggleSubModule = (subModuleName) => {
    setExpandedSubModules(prevState => ({
      ...prevState,
      [subModuleName]: !prevState[subModuleName]
    }));
  };
  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);
  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "22rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "22rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998]  ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className="bg-white text-gray shadow-xl z-[999] max-w-[20rem] w-[20rem] overflow-hidden md:relative fixed h-screen"
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          <img       
            width={45}
            alt=""
            placeholder="logo"
          />
          <span className="text-xl whitespace-pre">logo</span>
        </div>
        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-6 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            <li>
              {(open || isTabletMid) && (
                <div className="space-y-2">
                  {subMenuRecursoHumanos.map((module) => (
                    <div key={module.name} className="rounded-md p-2">
                      <div className="font-bold">
                        {module.name}
                      </div>
                      <div className="space-y-1 mt-3">
                        {module.names.map((subMenu) => (
                          <div key={subMenu.nameSubMenu}>
                            <div onClick={() => toggleSubModule(subMenu.nameSubMenu)} className="cursor-pointer p-3 bg-purple-700 text-white rounded-md  truncate">
                              {subMenu.nameSubMenu}
                            </div>
                            <div className={`${expandedSubModules[subMenu.nameSubMenu] ? 'block' : 'hidden'} pl-4 space-y-1`}>
                              {subMenu.submodules.map((subModule) => (
                                <NavLink 
                                key={subModule.name} 
                                to={subModule.path} 
                                className={({ isActive }) => 
                                  `block p-2 mt-1 rounded-md truncate ${isActive ? 'bg-purple-400 text-white' : 'text-gray-700'} hover:bg-purple-300 hover:text-white`
                                }>
                                  {subModule.name}
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: 0,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
