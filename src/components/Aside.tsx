import { cn } from "@heroui/react";
import CloseAside from "./CloseAside";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatchType, RootStateType } from "../redux/store";
import { motion } from "framer-motion";
import logo from "../assets/images/icon.png";
import { NavLink } from "react-router-dom";
import { navlinks } from "../lib/const";
import { appActions } from "../redux/slices/appSLice";
const Aside = () => {
  const { isAsideOpen } = useSelector((state: RootStateType) => state.app);
  const dispatch = useDispatch<AppDispatchType>();
  const handelCLoseAside = () => {
    dispatch(appActions.setAsideOpen(false));
  };
  return (
    <div
      className={cn(
        "fixed h-screen z-999 overflow-hidden flex align-items-stretch flex-col md:static bg-white transition-width duration-400",
        {
          "w-screen md:w-[240px]": isAsideOpen,
          "w-0 md:w-[80px]": !isAsideOpen,
        }
      )}
    >
      <div className="flex flex-nowrap items-start justify-between p-4 ">
        <motion.div
          animate={{
            x: isAsideOpen ? 0 : -250,
            opacity: isAsideOpen ? 1 : 0,
          }}
          transition={{
            type: "tween",
            ease: "easeOut",
            duration: 0.5,
            delay: 0 * 0.05, // staggered animation
          }}
          className="md:hidden"
        >
          <div className="flex items-center gap-3 ">
            <img src={logo} className="size-[80px]" />
            <div className="text-2xl font-bold flex flex-col tracking-widest">
              <span>Stock</span> <span>Management</span>
            </div>
          </div>
        </motion.div>
        <div className="hidden md:block relative h-10 w-full overflow-hidden">
          {/* Big Logo */}
          <motion.div
            animate={{
              x: isAsideOpen ? 0 : -200,
              opacity: isAsideOpen ? 1 : 0,
            }}
            transition={{ type: "tween", duration: 0.2 }}
            className="absolute left-0 top-0"
          >
            Big Logo
          </motion.div>

          <motion.div
            animate={{
              x: isAsideOpen ? 200 : 0,
              opacity: isAsideOpen ? 0 : 1,
            }}
            transition={{ type: "tween", duration: 0.2 }}
            className="absolute left-0 top-0"
          >
            Small Logo
          </motion.div>
        </div>
        <CloseAside />
      </div>
      <div className="md:hidden p-4" id="modile-aside">
        <div className="w-full flex flex-col items-stretch gap-3">
          {navlinks.map((item, i) => (
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{
                x: isAsideOpen ? 0 : -200,
                opacity: isAsideOpen ? 1 : 0,
              }}
              transition={{
                type: "tween",
                ease: "easeOut",
                duration: 0.3,
                delay: i * 0.02, // staggered animation
              }}
              key={item.id}
            >
              <NavLink
                to={item.href}
                onClick={handelCLoseAside}
                className={
                  "block font-semibold text-xl p-3  overflow-hidden  w-full tracking-widest "
                }
              >
                <div className="flex items-center justify-center gap-2">
                  <div>{<item.icon size={23} />}</div>
                  <div>{item.label}</div>
                </div>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aside;
