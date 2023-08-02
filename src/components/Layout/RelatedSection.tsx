import * as React from 'react';


import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

interface PersonInfoProps {
    gender: string;
    ethnic: string;
    marriageStatus: string;
    bloodLine: string;
    dob: string;
    placeOfBirth: string;
    country: string;
  }

interface GridItem {
  xs: number;
  content: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface BasicGridProps {
  gridItems: PersonInfoProps[];
}

const BasicGrid: React.FC<BasicGridProps> = ({ gridItems }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {gridItems.map((item, index) => (
          <Grid key={index} item xs={item.xs}>
            <Item>{item.content}</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BasicGrid;
