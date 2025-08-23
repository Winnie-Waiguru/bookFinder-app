function Footer() {
  const getYear = () => {
    // get the current date
    const currentDate = new Date();
    console.log(currentDate);
    // get the year
    const year = currentDate.getFullYear();
    // return year
    return year;
  };

  return (
    <footer className="bg-white flex items-center text-sm font-light h-[52px] md:h-[72px] fixed bottom-0 left-0 w-full pl-5 md:pl-15 border border-gray-300 shadow-2xl">
      <p>&copy; {getYear()} BookFinder. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
