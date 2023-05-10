import React from 'react';

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableContainerProps,
  TableProps,
  TableHeadProps,
  TableBodyProps,
} from '@mui/material';
import { get } from 'lodash';

export interface IColumns<Data> {
  title: string;
  dataIndex: string;
  align?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';
  width?: number | string;
  render: (item: Data, index: number) => React.ReactNode;
}

interface IProps<Data> {
  columns: Array<IColumns<Data>>;
  dataSource: Array<Data>;
  tableContainerProps?: TableContainerProps;
  tableProps?: TableProps;
  tableHeadProps?: TableHeadProps;
  tableBodyProps?: TableBodyProps;
}
function CustomTable<Data>({
  columns,
  dataSource = [],
  tableContainerProps,
  tableProps,
  tableHeadProps,
  tableBodyProps,
}: IProps<Data>) {
  const emptyData = dataSource.length === 0;
  if (emptyData) {
    // handle empty data
    return <></>;
  }
  return (
    <TableContainer sx={{ width: '100%' }} {...tableContainerProps}>
      <Table {...tableProps}>
        <TableHead {...tableHeadProps}>
          <TableRow>
            {columns?.map((item) => {
              return (
                <TableCell
                  key={item.dataIndex}
                  style={{
                    textAlign: get(item, 'align', 'left'),
                    width: get(item, 'width', 'auto'),
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}
                >
                  {item.title}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody {...tableBodyProps}>
          {dataSource?.map((item: any, index: number) => (
            <TableRow key={get(item, 'id', `table-row-${index}`)}>
              {columns?.map((row) => {
                return (
                  <TableCell
                    key={`colum-${row.dataIndex}`}
                    style={{
                      fontWeight: 500,
                      textAlign: get(row, 'align', 'left'),
                      width: get(row, 'width', 'auto'),
                      whiteSpace: 'break-spaces',
                      wordBreak: 'break-word',
                    }}
                  >
                    {row?.render && row.render(item, index)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;
