import * as React from 'react';


import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { GridItems } from '@/interfaces/personInfo';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const MainGrid: React.FC<GridItems> = (gridItem) => {
  return (

    <Grid container spacing={0.5}>

      <Grid xs={gridItem.xs} md={gridItem.md}>
        <Item>
          {gridItem.content}
        </Item>
      </Grid>
      <Grid xs={gridItem.xs} md={gridItem.md}>
        <Item>{gridItem.content}</Item>
      </Grid>

    </Grid>
  );
};

export default MainGrid;
