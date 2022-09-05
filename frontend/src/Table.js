import { DataPriority, DataTag, DataBoolean, DataDate } from "./TableTools";
import { useTable } from "react-table";
import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";

function Table() {
  const [data, setData] = useState([]);

	const columns = useMemo(() => 
    [
      {
          Header: "description",
          accessor: "description"
      },
      {
          Header: "priority",
          accessor: "priority",
          Cell: ({ cell: { value } }) => <DataPriority value={value} />
      },
      {
          Header: "tags",
          accessor: "tags",
          Cell: ({ cell: { value } }) => <DataTag valueList={value} />
      },
      {
          Header: "is_flagged",
          accessor: "is_flagged",
          Cell: ({ cell: { value } }) => <DataBoolean value={value} />
      },
      {
          Header: "created_datetime",
          accessor: "created_date",
          Cell: ({ cell: { value } }) => <DataDate value={value} />
      },
      {
          Header: "is_completed",
          accessor: "is_completed",
          Cell: ({ cell: { value } }) => <DataBoolean value={value} />
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } 
    = useTable({ columns, data });

  useEffect(() => {
		let dataUrl = "http://localhost:8080/api/note";
		axios.get(dataUrl)
			.then((res) => {
				setData(res.data.data);
			});
	}, []);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
