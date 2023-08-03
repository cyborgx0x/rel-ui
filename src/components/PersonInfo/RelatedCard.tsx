import React from 'react';

import { Card, CardContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import { PersonInfoProps } from '@/interfaces/personInfo'

const useStyles = makeStyles({
  card: {
    // margin: '10px',
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
  },
});

const PersonInfoCard: React.FC<PersonInfoProps> = ({
  hoVaTen,
  quocTich,
  soDinhDanh,
  soCMND,
  type,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {type}: {hoVaTen}
        </Typography>
        <Typography variant="body2" component="p">
          Quốc tịch: {quocTich}
        </Typography>
        <Typography variant="body2" component="p">
          Số định danh: {soDinhDanh}
        </Typography>
        <Typography variant="body2" component="p">
          Số CMND: {soCMND}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PersonInfoCard;
