import React from 'react';


import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Card, CardContent, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';

import SampleAvatar from '@/assets/image/avatar.jpg';
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
  soCMND,
  soDinhDanh,
  type,
}) => {
  const classes = useStyles();
  const formatData = (title: string, nodeData: (string | undefined)) => {
    if (nodeData === undefined) {
      return <></>
    }
    return <Typography variant='button' component='h4'>{title}: {nodeData}</Typography>
  }
  return (
    <Card className={classes.card} sx={{ border: '1px solid rgba(0, 0, 0, 0.2)', mb: '10px' }}>
      <CardHeader
        subheader={
          <Typography variant='body2' component='h4'>{hoVaTen}</Typography>
        }
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <CardMedia
              component="img"
              height="50"
              image={SampleAvatar}
              alt="Avatar"
            />
          </Avatar>
        }
        action={
          <IconButton
            aria-label="copy-content"
            onClick={() => { navigator.clipboard.writeText(`${hoVaTen}`) }}
          >
            <ContentCopyIcon />
          </IconButton>
        }
        title={type}
      />
      <CardContent>
        {formatData('Số Định Danh', soDinhDanh)}
        {formatData('Số Chứng minh nhân dân', soCMND)}
      </CardContent>
    </Card>
  );
};

export default PersonInfoCard;
