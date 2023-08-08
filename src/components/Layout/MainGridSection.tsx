import * as React from 'react';


import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { GridItems } from '@/interfaces/personInfo';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'whitesmoke',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface BasicGridProps {
  gridItems: GridItems[];
}

const BasicGrid: React.FC<BasicGridProps> = ({ gridItems }) => {
  return (

    <Grid container spacing={2} mt={0.5}>
      {gridItems.map((item, index) => (
        <Grid key={item.id} item xs={item.xs} md={item.md}>
          <Item>
            {item.content}
          </Item>
        </Grid>
      ))}
    </Grid>
  );
};

export default BasicGrid;
