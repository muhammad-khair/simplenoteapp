import { DataPriority, DataTag, DataBoolean, DataDate } from "./TableTools";
import { useTable } from "react-table";
import axios from "axios";
import EditNoteForm from "./EditNoteForm";
import React, { useEffect, useState, useMemo } from "react";

function Table({ data, reloader }) {
  const [isShowing, setIsShowing] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const [note, setNote] = useState(null);

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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  useEffect(() => reloader(), []);

  const deleteNote = (event) => {
		let dataUrl = "http://localhost:8080/api/note";
    axios.delete(`${dataUrl}/${event.target.value}`)
			.then((res) => {
        alert("Note deleted!");
        reloader();
			});
  }

  const openPopUpEditor = (event) => {
    let noteId = event.target.value;
    let note = data.find(n => n._id === noteId);
    setNoteId(noteId);
    setNote(Object.assign({}, note));
    setIsShowing(true);
  }

  const closePopUpEditor = (event) => {
    setIsShowing(false);
  }

  return (
    <div>
    <h2>Current Notes</h2>
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
              <td><button type="submit" name="noteid" value={row.original._id} onClick={openPopUpEditor}>Edit note</button></td>
              <td><button type="submit" name="noteid" value={row.original._id} onClick={deleteNote}>Delete note</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>
      {isShowing
        ? <EditNoteForm id={noteId} data={note} reloader={reloader} closer={closePopUpEditor}/>
        : null
      }
    </div>
  );
}

export default Table;
