import React, { useState, useEffect } from 'react';

import { Box } from '@mui/material';

import { IParamsDB } from '@/interfaces/dashBoard';
import { dashBoardService } from '@/services/dashBoard';

import Home from './Home';

const CommandCenter = () => {
  const defaultParam = {
    from_date: undefined,
    to_date: undefined,
    departments: undefined,
    status: 'day',
  };
  const [params, setParams] = useState<IParamsDB>(defaultParam);
  const [alignment, setAlignment] = React.useState<string | null>('day');
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const { getDashBoard, data: dataChartDB } = dashBoardService.useLazyDashBoard();
  const listDepartment = dashBoardService.useDepartment();
  const [menuChart, setMenuChart] = React.useState<null | HTMLElement>(null);
  const [keyChart, setKeyChart] = React.useState<string>('XN');
  useEffect(() => {
    getDashBoard(params);
    const interval = setInterval(async () => {
      await getDashBoard(params);
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [params, getDashBoard]);

  return (
    <Box width="100%">
      <Home
        params={params}
        setParams={setParams}
        alignment={alignment}
        setAlignment={setAlignment}
        expanded={expanded}
        setExpanded={setExpanded}
        listDepartment={listDepartment}
        dataChartDB={dataChartDB}
        menuChart={menuChart}
        keyChart={keyChart}
        setMenuChart={setMenuChart}
        setKeyChart={setKeyChart}
      />
    </Box>
  );
};

export default CommandCenter;
