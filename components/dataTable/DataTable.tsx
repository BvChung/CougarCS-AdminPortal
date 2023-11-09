import React from "react";
import { dataTableProps } from "../../types/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const DataTable = ({
  schema,
  data,
  className,
  rowClick,
}: dataTableProps) => {
  // schema stays the same so we get the names + values outside of the maps
  const headerNames = Object.keys(schema);
  const columnValues = Object.values(schema);

  const headerElements = headerNames.map((columnTitle) => (
    <th
      key={columnTitle}
      className="rounded-t-xl bg-tableHD px-3 py-2 text-left"
    >
      {columnTitle}
    </th>
  ));

  const rowElements = data.map((row: any, rowIndex) => {
    const columns = columnValues.map((value: any, colIndex) => {
      // replacement system changed so the original objects
      // are no longer modified

      let replacement;

      switch (value) {
        case "timestamp":
          replacement = dayjs(row.timestamp).format("MM-DD-YYYY");
          break;
        case "event_timestamp":
          replacement = dayjs(row.event_timestamp).format(
            "MM-DD-YYYY[ ]h:mm[ ]A"
          );
          break;
        case "swag":
          replacement = row.swag ? "TRUE" : "FALSE";
        default:
          break;
      }

      return (
        <td
          key={colIndex}
          className=" border-collapse px-3 py-1.5"
          onClick={() => {
            if (row && rowClick) {
              rowClick(row);
            }
          }}
        >
          {replacement ? replacement : row[value]}
        </td>
      );
    });

    return (
      <tr
        key={rowIndex}
        className="cursor-pointer border-b-2 border-b-tableHD bg-sidebarBG hover:bg-zinc-800"
      >
        {columns}
      </tr>
    );
  });

  return (
    <table
      className={`w-full border-collapse rounded-xl bg-tableHD ${className}`}
    >
      <thead className="">
        <tr className="sticky top-0">{headerElements}</tr>
      </thead>

      <tbody>{rowElements}</tbody>
    </table>
  );
};
