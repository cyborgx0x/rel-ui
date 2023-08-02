import React from 'react';

import { Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface PersonInfoProps {
  gender: string;
  ethnic: string;
  marriageStatus: string;
  bloodLine: string;
  dob: string;
  placeOfBirth: string;
  country: string;
}

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 400,
    margin: '20px',
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
  },
});

const PersonInfoCard: React.FC<PersonInfoProps> = ({
  gender,
  ethnic,
  marriageStatus,
  bloodLine,
  dob,
  placeOfBirth,
  country,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          Personal Information
        </Typography>
        <Typography variant="body2" component="p">
          Gender: {gender}
        </Typography>
        <Typography variant="body2" component="p">
          Ethnic: {ethnic}
        </Typography>
        <Typography variant="body2" component="p">
          Marriage Status: {marriageStatus}
        </Typography>
        <Typography variant="body2" component="p">
          Blood Line: {bloodLine}
        </Typography>
        <Typography variant="body2" component="p">
          Date of Birth: {dob}
        </Typography>
        <Typography variant="body2" component="p">
          Place of Birth: {placeOfBirth}
        </Typography>
        <Typography variant="body2" component="p">
          Country: {country}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PersonInfoCard;
