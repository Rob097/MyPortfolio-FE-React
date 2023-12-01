import React, { useState } from "react";

function PricingComponent(props) {
  const [selected, setSelected] = useState("monthly");

  const handleSwitch = () => {
    setSelected(selected === "monthly" ? "yearly" : "monthly");
  };

  return (
    <form className="justify-center items-stretch bg-orange-500 self-center flex gap-0 mt-8 p-1 rounded">
      <button
        className={`text-${selected === "monthly" ? "orange-500" : "white"} text-base leading-7 whitespace-nowrap justify-center items-stretch rounded bg-${selected === "monthly" ? "white" : "orange-500"} grow px-7 py-4 max-md:px-5`}
        aria-label="Monthly"
        aria-role="button"
        onClick={handleSwitch}
      >
        Monthly
      </button>
      <button
        className={`text-${selected === "yearly" ? "orange-500" : "white"} text-base leading-7 whitespace-nowrap justify-center items-stretch rounded bg-${selected === "yearly" ? "white" : "orange-500"} grow px-9 py-4 max-md:px-5`}
        aria-label="Yearly"
        aria-role="button"
        onClick={handleSwitch}
      >
        Yearly
      </button>
    </form>
  );
}

export default PricingComponent;