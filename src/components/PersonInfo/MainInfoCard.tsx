import * as React from 'react';
import { useState, useEffect } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FacebookIcon from '@mui/icons-material/Facebook';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { CardActions, Card, CardContent, Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import { red } from '@mui/material/colors';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';


import { DataSearch } from '@/interfaces/personInfo';
import { sampleData } from '@/pages/PersonInfo/PersonInfoAnonymous';

import CustomizableList from './ListItem';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
interface IProps {
  dataRes: DataSearch
}
export default function MainInfoCard(props: IProps) {
  const [expanded, setExpanded] = React.useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { dataRes } = props
  const [data, setData] = useState<DataSearch>(dataRes)

  const items = [
    { icon: <HomeIcon />, primaryText: 'Xã Minh Quang, Huyện Vũ Thư, Tỉnh Thái Bình' },
    { icon: <PhoneAndroidIcon />, primaryText: '0852134401' },
    { icon: <EmailIcon />, primaryText: 'leeboykt@gmail.com' },
    { icon: <FacebookIcon />, primaryText: 'https://www.facebook.com/nguyenkhanhthuan' },
  ];

  return (

    <Card sx={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <CardMedia
              component="img"
              height="50"
              image="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
              alt="Avatar"
            />
          </Avatar>
        }
        action={
          <IconButton
            aria-label="copy-content"
            onClick={() => { navigator.clipboard.writeText(`${data.hoTen.ho} ${data.hoTen.chuDem} ${data.hoTen.ten}`) }}
          >
            <ContentCopyIcon />
          </IconButton>
        }
        title={`${data.hoTen.ho} ${data.hoTen.chuDem} ${data.hoTen.ten}`}
        subheader={data.soDinhDanh}
      />

      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CardMedia
              sx={{ borderRadius: '.5rem' }}
              component="img"
              height="194"
              image="https://wallpapershome.com/images/wallpapers/barbara-palvin-1440x2560-victorias-secret-angel-model-fashion-portrait-12712.jpg"
              alt="Avatar"
            />
          </Grid>
          <Grid item xs={8}>
            <CustomizableList items={items} />
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <InfoIcon />
        </IconButton>

        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{ textAlign: 'left' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant='button' component='h4'>Số định danh</Typography>
              <Typography paragraph>
                {data.soDinhDanh}
              </Typography>
              <Typography variant='button' component='h4'>Giới tính</Typography>

              <Typography paragraph>
                {data.gioiTinh ? 'Nam' : 'Nữ'}
              </Typography>
              <Typography variant='button' component='h4'>Dân tộc</Typography>

              <Typography paragraph>
                {data.danToc ? 'Kinh' : 'Nữ'}
              </Typography>
              <Typography variant='button' component='h4'>Sinh năm</Typography>

              <Typography paragraph>
                {data.ngayThangNamSinh.nam}
              </Typography>
            </Grid>
            <Grid item xs={6}>

              <Typography variant='button' component='h4'>Họ Tên</Typography>
              <Typography paragraph>
                {data.hoTen.ho} {data.hoTen.chuDem} {data.hoTen.ten}
              </Typography>
              <Typography variant='button' component='h4'>Tôn giáo</Typography>

              <Typography paragraph>
                {data.tonGiao ? 'Không' : 'Nữ'}
              </Typography>
              <Typography variant='button' component='h4'>Tình trạng hôn nhân</Typography>

              <Typography paragraph>
                {data.tinhTrangHonNhan ? 'Đã kết hôn' : 'Chưa kết hôn'}
              </Typography>
              <Typography variant='button' component='h4'>Nhóm máu</Typography>

              <Typography paragraph>
                {data.nhomMau}
              </Typography>

            </Grid>
          </Grid>



        </CardContent>
      </Collapse>

    </Card>


  );
}
