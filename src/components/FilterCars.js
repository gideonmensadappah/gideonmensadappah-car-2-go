import React, { useMemo, useState } from "react";
import { useCallback } from "react";

export const FilterCars = ({ car, sortFunc }) => {
  const handleSortLowest = useCallback(() => {
    const cars = car.sort((a, b) => a.price - b.price);
    sortFunc(cars);
  }, [car, sortFunc]);
  const handleSortHighest = useCallback(() => {
    const cars = car.sort((a, b) => b.price - a.price);
    sortFunc(cars);
  }, [car, sortFunc]);

  return (
    <>
      Sort price from:{" "}
      <input
        type="button"
        value="lowest"
        className="btn btn-primary btn-sm"
        onClick={handleSortLowest}
      />{" "}
      /{" "}
      <input
        type="button"
        value="highest"
        className="btn btn-primary btn-sm"
        onClick={handleSortHighest}
      />
    </>
  );
};
