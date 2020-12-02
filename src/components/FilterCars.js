import React, { useMemo, useState } from "react";
import { useCallback } from "react";

export const FilterCars = ({ car, sortFunc }) => {
  const handleSorting = useCallback(
    (event) => {
      const sortingValue = event.target.value;

      if (sortingValue === "lowest") {
        const sortFromHighest = car.sort((a, b) => a.price - b.price);
        sortFunc(sortFromHighest);
      } else {
        const sortFromLowest = car.sort((a, b) => b.price - a.price);
        sortFunc(sortFromLowest);
      }
    },
    [car, sortFunc]
  );

  return (
    <>
      Sort price from:
      <select
        onChange={(event) => {
          handleSorting(event);
        }}
      >
        <option value="lowest">Lowest</option>
        <option value="highest">Highest</option>
      </select>
    </>
  );
};

// <input
//         type="button"
//         value="lowest"
//         className="btn btn-primary btn-sm"
//         onClick={handleSortLowest}
//       />{" "}
//       /{" "}
//       <input
//         type="button"
//         value="highest"
//         className="btn btn-primary btn-sm"
//         onClick={handleSortHighest}
//       />
