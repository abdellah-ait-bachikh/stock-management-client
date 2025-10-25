const Home = () => {
  const handlePrint = () => {
    try {
      const printWindow = window.open("", "", "width=600,height=400");
      if (printWindow) {
        printWindow.document.write("<h1>Hello World</h1>");
        printWindow.document.close();
        printWindow.print();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <h1>Home</h1>
      <button
        onClick={handlePrint}
        className="mt-4  bg-blue-500  rounded-lg hover:bg-blue-600 transition dark:text-amber-50"
      >
        Print "Hello World"
      </button>

      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
      <div>bdd</div>
    </div>
  );
};

export default Home;
