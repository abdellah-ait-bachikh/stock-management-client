const Home = () => {
  const handlePrint = () => {
    try{

      const printWindow = window.open("", "", "width=600,height=400");
      if (printWindow) {
        printWindow.document.write("<h1>Hello World</h1>");
        printWindow.document.close();
        printWindow.print();
      }
    }catch(err){
      console.log(err)
    }
  };

  return (
    <div className="p-4">
      <h1>Home</h1>
      <button
        onClick={handlePrint}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Print "Hello World"
      </button>
    </div>
  );
};

export default Home;
