import React from "react";

interface TableData {
  columns: string[];
  data: any[];
}

const TableWidget = (props: TableData) => {
  console.log(props.columns, props.data);
  return (
    <div className="table-widget bg-blue text-black w-100">
      <table className="table">
        <thead>
          <tr className="bg-blue">
            {props.columns.map((colName, index) => (
              <th key={index}>{colName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {props.columns.map((colName, colIndex) => (
                <td key={colIndex}>{rowData[colName]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWidget;
