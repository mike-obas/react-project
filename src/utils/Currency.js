import React from "react";

export function Formatter(amount) {
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);
  return formatter;
}
export const Currency = {
  naira: <span>&#8358;</span>,
};
