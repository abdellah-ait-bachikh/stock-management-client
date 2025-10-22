import { TbHomeSignal } from "react-icons/tb";
import { PiPackage } from "react-icons/pi";
import { BiCategoryAlt } from "react-icons/bi";

import { RiExportFill, RiImportFill } from "react-icons/ri";

export const navlinks = [
  { id: 1, href: "/", label: "Home", icon: TbHomeSignal },
  { id: 2, href: "/categories", label: "Categories", icon: BiCategoryAlt },
  { id: 3, href: "/products", label: "Products", icon: PiPackage },
  { id: 4, href: "/exports", label: "Exports", icon: RiExportFill },
  { id: 5, href: "/imports", label: "imports", icon: RiImportFill },
];

// export const user = {
//   id: "1234",
// };
export const user = null
