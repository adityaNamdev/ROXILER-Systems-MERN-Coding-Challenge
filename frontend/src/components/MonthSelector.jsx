import React from "react";

const MonthSelector = ({ month, setMonth }) => {
  const handleMonthSelector = (e) => {
    setMonth(e.target.value);
  };
  return (
    <div className="border rounded-md py-1 bg-gray-800 pr-2">
      <select
        value={month}
        onChange={handleMonthSelector}
        className="px-5 bg-gray-800 text-white md:text-xl text-sm outline-none "
      >
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
    </div>
  );
};

export default MonthSelector;
