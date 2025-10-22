import { Button, cn } from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import type { RootStateType } from "../redux/store";
import { appActions } from "../redux/slices/appSLice";
import { NavLink } from "react-router-dom";
import { navlinks } from "../lib/const";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { TbMenuDeep } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const { isAsideOpen } = useSelector((state: RootStateType) => state.app);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(appActions.setAsideOpen(!isAsideOpen));
  };

  const handleClose = () => {
    dispatch(appActions.setAsideOpen(false));
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      handleClose();
    }
  };

  const labelVariants: Variants = {
    closed: {
      opacity: 0,
      x: -10,
      width: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      width: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <>
      <aside
        className={cn(
          "bg-white  tracking-widest dark:bg-neutral-900   transition-all duration-300 ease-in-out flex flex-col fixed lg:relative h-full z-30",
          {
            "w-60 translate-x-0": isAsideOpen,
            "w-20 -translate-x-full lg:translate-x-0": !isAsideOpen,
          }
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4  h-20">
          <div
            className={cn("flex w-full items-center", {
              "justify-between": isAsideOpen,
              "justify-center": !isAsideOpen,
            })}
          >
            {isAsideOpen ? (
              <>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-bold "
                >
                  Logo
                </motion.h1>
                <div className="flex items-center space-x-2">
                  <Button
                    isIconOnly
                    variant="light"
                    color="default"
                    onPress={handleClose}
                    radius="lg"
                    size="lg"
                  >
                    <CgClose size={23} />
                  </Button>
                </div>
              </>
            ) : (
              <Button
                onPress={handleToggle}
                isIconOnly
                variant="light"
                color="default"
                radius="lg"
                size="lg"
              >
                <TbMenuDeep size={23} />
              </Button>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <motion.ul
            className="space-y-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navlinks.map((link, index) => (
              <motion.li key={index} variants={containerVariants}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-3 py-2.5 rounded-xl  hover:md:rounded-3xl  hover:bg-gray-100  dark:hover:bg-neutral-800 transition-all duration-300 group",
                      {
                        "justify-start": isAsideOpen,
                        "bg-gray-200  md:rounded-3xl hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-700":
                          isActive,
                      }
                    )
                  }
                  onClick={handleLinkClick}
                >
                  <span className="text-xl shrink-0">
                    {<link.icon size={23} />}
                  </span>
                  <motion.span
                    className="ml-3 font-bold text-lg flex-1 whitespace-nowrap"
                    variants={labelVariants}
                    animate={isAsideOpen ? "open" : "closed"}
                    initial="closed"
                  >
                    {link.label}
                  </motion.span>
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
        <div className="mt-auto  p-4">
          <motion.ul
            className="w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.li variants={containerVariants}>
              <button
                className={cn(
                  "flex items-center cursor-pointer w-full justify-start px-3 py-2.5 rounded-xl hover:md:rounded-3xl hover:bg-danger-100 text-danger-500 dark:hover:bg-neutral-800 transition-all duration-300 group"
                )}
                onClick={handleLinkClick}
              >
                <span className="text-xl shrink-0">
                  <FiLogOut   size={23} />
                </span>
                <motion.span
                  className="ml-3 font-bold text-lg flex-1 whitespace-nowrap text-start"
                  variants={labelVariants}
                  animate={isAsideOpen ? "open" : "closed"}
                  initial="closed"
                >
                  Logout
                </motion.span>
              </button>
            </motion.li>
          </motion.ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
