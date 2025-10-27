import { Select, SelectItem, Tooltip } from "@heroui/react";
import { formatNumber } from "../../lib/utils";
import { useState } from "react";
const years = ["2024", "2025"];
const Home = () => {
  const [selectedYear, setSelectedYear] = useState(
    String(new Date().getFullYear())
  );
  // const handlePrint = () => {
  //   try {
  //     const printWindow = window.open("", "", "width=600,height=400");
  //     if (printWindow) {
  //       printWindow.document.write("<h1>Hello World</h1>");
  //       printWindow.document.close();
  //       printWindow.print();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <section className="p-3 relative">
      <div className="fixed top-[92px] right-0 z-1 w-fit">
        <Select
          variant="flat"
          className="cursor-pointer w-28"
          label="Year"
          placeholder="Select a Year"
          selectedKeys={[selectedYear]}
          onChange={(e) => setSelectedYear(e.target.value)}
          size="sm"
          color="default"
        >
          {years.map((year) => (
            <SelectItem key={year}>{year}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <div className=" bg-linear-to-br from-success-400 to-success-200   rounded-2xl text-gray-900 dark:text-white border-4 border-default-200 h-[100px] flex flex-col items-stretch px-6 justify-center  gap-2">
          <span className="text-xl md:text-2xl font-semibold tracking-widest">
            Sales
          </span>
          <span className="text-nowrap text-ellipsis overflow-hidden  tracking-widest text-lg md:text-2xl font-medium">
            <Tooltip
              content={formatNumber(49845645696.45)}
              showArrow
              color="success"
              size="lg"
              shadow="lg"
            >
              <span>{formatNumber(49845645696.45)} DH</span>
            </Tooltip>
          </span>
        </div>
        <div className=" bg-linear-to-br from-primary-400 to-primary-200   rounded-2xl text-gray-900 dark:text-white border-4 border-default-200  h-[100px] flex flex-col items-stretch px-6 justify-center gap-2">
          <span className="text-xl md:text-2xl font-semibold tracking-widest">
            Parchases
          </span>
          <span className="text-nowrap text-ellipsis overflow-hidden  tracking-widest text-lg md:text-2xl font-medium">
            <Tooltip
              content={formatNumber(54896.45)}
              showArrow
              color="primary"
              size="lg"
              shadow="lg"
            >
              <span> {formatNumber(4896.45)} DH</span>
            </Tooltip>
          </span>
        </div>
        <div className=" bg-linear-to-br from-warning-400 to-warning-200   rounded-2xl text-gray-900 dark:text-white border-4 border-default-200  h-[100px] flex flex-col items-stretch px-6 justify-center gap-2">
          <span className="text-xl md:text-2xl font-semibold tracking-widest">
            OutGoing
          </span>
          <span className="text-nowrap text-ellipsis overflow-hidden  tracking-widest text-lg md:text-2xl font-medium">
            <Tooltip
              content={formatNumber(54896.45)}
              showArrow
              color="warning"
              size="lg"
              shadow="lg"
            >
              <span>{formatNumber(256885)}</span>
            </Tooltip>
          </span>
        </div>
        <div className="bg-linear-to-br from-danger-400 to-danger-200   rounded-2xl text-gray-900 dark:text-white border-4 border-default-200  h-[100px] flex flex-col items-stretch px-6 justify-center gap-2">
          <span className="text-xl md:text-2xl font-semibold tracking-widest">
            Incoming
          </span>
          <span className="text-nowrap text-ellipsis overflow-hidden  tracking-widest text-lg md:text-2xl font-medium">
            <Tooltip
              content={formatNumber(54896.45)}
              showArrow
              color="danger"
              size="lg"
              shadow="lg"
            >
              <span>{formatNumber(5645646)}</span>
            </Tooltip>
          </span>
        </div>
      </div>
    </section>
    //  <section className="p-3">
    //   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
    //     <div
    //
    //       className="bg-primary-300   rounded-md border-primary-400 text-primary-400 h-[100px] flex flex-col items-stretch px-6 justify-center  gap-2"
    //     >
    //       <span className="text-xl md:text-2xl font-semibold tracking-widest">
    //         Sales
    //       </span>
    //       <span className="text-nowrap text-ellipsis overflow-hidden  tracking-widest text-lg md:text-2xl font-medium">
    //         {formatNumber(54896.45)} DH
    //       </span>
    //     </div>
    //     <div
    //
    //       className="bg-primary-300   rounded-md border-success-400 text-success-400 h-[100px] flex flex-col items-stretch px-6 justify-center gap-2"
    //     >
    //       <span className="text-xl md:text-2xl font-semibold tracking-widest">
    //         Parchases
    //       </span>
    //       <span className="text-nowrap text-ellipsis overflow-hidden  tracking-widest text-lg md:text-2xl font-medium">
    //          {formatNumber(4896.45)} DH
    //       </span>
    //     </div>
    //     <div
    //
    //       className="bg-primary-300   rounded-md border-warning-400 text-warning-400 h-[100px] flex flex-col items-stretch px-6 justify-center gap-2"
    //     >
    //       <span className="text-xl md:text-2xl font-semibold tracking-widest">
    //         OutGoing
    //       </span>
    //       <span className="text-nowrap text-ellipsis overflow-hidden  tracking-widest text-lg md:text-2xl font-medium">
    //         {formatNumber(256885)}
    //       </span>
    //     </div>
    //     <div
    //
    //       className="bg-primary-300   rounded-md border-danger-400 text-danger-400 h-[100px] flex flex-col items-stretch px-6 justify-center gap-2"
    //     >
    //       <span className="text-xl md:text-2xl font-semibold tracking-widest">
    //         Incoming
    //       </span>
    //       <span className="text-nowrap text-ellipsis overflow-hidden  tracking-widest text-lg md:text-2xl font-medium">
    //         {formatNumber(5645646)}
    //       </span>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Home;
