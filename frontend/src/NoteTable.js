import { DataPriority, DataTag, DataBoolean, DataDate } from "./TableTools";
import { useTable } from "react-table";
import axios from "axios";
import EditNoteForm from "./EditNoteForm";
import React, { useEffect, useState, useMemo } from "react";
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { BASE_URL } from './UrlPaths';

function NoteTable({ data, reloader }) {
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
    axios.delete(`${BASE_URL}/${event.target.value}`)
			.then((res) => {
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
    <div className="p-3 mb-2 bg-light text-dark">
    <h2>Current Notes</h2>
    <br/>
    <Table striped hover variant="light" responsive="sm" {...getTableProps()}>
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
              <td><Button variant="secondary" type="submit" name="noteid" value={row.original._id} onClick={openPopUpEditor}>Edit note</Button></td>
              <td><Button variant="danger" type="submit" name="noteid" value={row.original._id} onClick={deleteNote}>Delete note</Button></td>
            </tr>
          );
        })}
      </tbody>
    </Table>
      {isShowing
        ? <EditNoteForm id={noteId} data={note} reloader={reloader} closer={closePopUpEditor}/>
        : null
      }
    </div>
  );
}

export default NoteTable;
