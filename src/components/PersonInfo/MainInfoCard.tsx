import * as React from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FacebookIcon from '@mui/icons-material/Facebook';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { Button, CardActionArea, CardActions, Card, CardContent, Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


import CustomizableList from './ListItem';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

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

export default function MainInfoCard() {
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const data = {
    'soDinhDanh': '034200003214',
    'soCMND': '',
    'hoTen': {
      'ho': '',
      'chuDem': '',
      'ten': 'PHẠM TRUNG LIN',
    },
    'gioiTinh': 1,
    'danToc': '01',
    'tonGiao': '00',
    'tinhTrangHonNhan': '1',
    'nhomMau': '00',
    'ngayThangNamSinh': {
      'nam': 2000,
      'ngayThangNam': '20000709',
    },
    'noiDangKyKhaiSinh': {
      'maTinhThanh': 34,
      'maQuanHuyen': 344,
      'maPhuongXa': 13234,
      'chiTiet': '',
      'quocGia': 'VN',
    },
    'quocTich': 'VN',
    'queQuan': {
      'maTinhThanh': 34,
      'maQuanHuyen': 344,
      'maPhuongXa': 13234,
      'chiTiet': '',
      'quocGia': 'VN',
    },
    'thuongTru': {
      'maTinhThanh': 34,
      'maQuanHuyen': 344,
      'maPhuongXa': 13234,
      'chiTiet': 'THÔN TRỰC NHO',
      'quocGia': 'VN',
    },
    'noiOHienTai': {
      'maTinhThanh': 34,
      'maQuanHuyen': 344,
      'maPhuongXa': 13234,
      'chiTiet': 'THÔN TRỰC NHO',
      'quocGia': 'VN',
    },
  }
  const items = [
    { icon: <HomeIcon />, primaryText: '63 Lê Văn Lương, Trung Hòa, Cầu Giấy, Hà Nội' },
    { icon: <PhoneAndroidIcon />, primaryText: 'Số Điện Thoại' },
    { icon: <EmailIcon />, primaryText: 'Email' },
    { icon: <FacebookIcon />, primaryText: 'https://www.facebook.com/w4rf0t' },
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
          <IconButton aria-label="copy-content">
            <ContentCopyIcon />
          </IconButton>
        }
        title="Hoàng Kim Phú"
        subheader="031095002414"
      />

      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CardMedia
              sx={{ borderRadius: '.5rem' }}
              component="img"
              height="194"
              image="https://plus.unsplash.com/premium_photo-1670002383626-10c63bbe67d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
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
                Họ tên: {data.hoTen.ho} {data.hoTen.chuDem} {data.hoTen.ten}
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
