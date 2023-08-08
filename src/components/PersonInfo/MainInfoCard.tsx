import * as React from 'react';
import { useState, useEffect } from 'react';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BadgeIcon from '@mui/icons-material/Badge';
import CakeIcon from '@mui/icons-material/Cake';
import CarRentalIcon from '@mui/icons-material/CarRental';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FacebookIcon from '@mui/icons-material/Facebook';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { CardActions, Card, CardContent, Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import { red } from '@mui/material/colors';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import SampleAvatar from '@/assets/image/avatar.jpg';
import { DataSearch } from '@/interfaces/personInfo';

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
interface Items {
  icon: string;
  primaryText: string | string[];
}
export default function MainInfoCard(props: IProps) {
  interface Map {
    [key: string]: string | undefined
  }
  const ReligionList:Map = {
    '00': 'Không',
    '01': 'Phật giáo',
    '02': 'Công giáo',
    '03': 'Tin lành',
    '04': 'Cao Đài',
    '05': 'Phật giáo Hòa Hảo',
    '06': 'Tôn giáo Baha’i',
    '07': 'Tịnh độ Cư sỹ Phật hội Việt Nam',
    '08': 'Đạo Tứ Ân Hiếu nghĩa',
    '09': 'Giáo hội Phật đường Nam Tông Minh Sư đạo',
    '10': 'Hội thánh Minh lý đạo - Tam Tông Miếu',
    '11': 'Chăm Bà la môn',
    '12': 'Giáo hội Các thành hữu Ngày sau của Chúa Giê su Ky tô (Mormon)',
    '13': 'Phật giáo Hiếu Nghĩa Tà Lơn',
    '14': 'Giáo hội Cơ đốc Phục lâm Việt Nam',
  }
  const { dataRes } = props
  const data = dataRes
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const items = [
    { icon: <PermIdentityIcon />, primaryText: data.PII, type: 'pii' },
    { icon: <BadgeIcon />, primaryText: data.FullName, type: 'fullname' },
    { icon: <CakeIcon />, primaryText: data.Birthday, type: 'birthday' },
    { icon: <HomeIcon />, primaryText: data.Address, type: 'address' },
    { icon: <EmailIcon />, primaryText: data.Email, type: 'email' },
    { icon: <PhoneAndroidIcon />, primaryText: data.PhoneNum, type: 'phonenum' },
    { icon: <FacebookIcon />, primaryText: data.Facebook, type: 'facebook' },
    { icon: <PersonPinIcon />, primaryText: data.Username, type: 'usename' },
    { icon: <CarRentalIcon />, primaryText: data.Plate, type: 'plate' },
    { icon: <AccountBalanceIcon />, primaryText: data.PII, type: 'tax' },
    { icon: <AccountBalanceWalletIcon />, primaryText: data.PII, type: 'banknumber' },
  ];

  return (

    <Card sx={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}>
      <CardHeader
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
            onClick={() => { navigator.clipboard.writeText(data.hoTen) }}
          >
            <ContentCopyIcon />
          </IconButton>
        }
        title={data.FullName[0]}
        subheader={data.soDinhDanh}
      />

      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <CardMedia
              sx={{ borderRadius: '.5rem' }}
              component="img"
              height="194"
              image="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg?w=2000"
              alt="Avatar"
            />
          </Grid>
          <Grid item xs={12} md={8}>
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
            <Grid item xs={12} md={6}>
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
                {data.danToc}
              </Typography>
              <Typography variant='button' component='h4'>Sinh năm</Typography>

              <Typography paragraph>
                {data.ngayThangNamSinh}
              </Typography>
              <Typography variant='button' component='h4'>Nơi đăng ký khai sinh</Typography>

              <Typography paragraph>
                {data.noiDangKyKhaiSinh}
              </Typography>
              <Typography variant='button' component='h4'>Địa chỉ thường trú</Typography>

              <Typography paragraph>
                {data.thuongTru}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>

              <Typography variant='button' component='h4'>Họ Tên</Typography>
              <Typography paragraph>
                {data.hoTen}
              </Typography>
              <Typography variant='button' component='h4'>Tôn giáo</Typography>

              <Typography paragraph>
                {ReligionList[data.tonGiao]}
              </Typography>
              <Typography variant='button' component='h4'>Tình trạng hôn nhân</Typography>

              <Typography paragraph>
                {data.tinhTrangHonNhan ? 'Đã kết hôn' : 'Chưa kết hôn'}
              </Typography>
              <Typography variant='button' component='h4'>Nhóm máu</Typography>

              <Typography paragraph>
                {data.nhomMau}
              </Typography>
              <Typography variant='button' component='h4'>Quê quán</Typography>

              <Typography paragraph>
                {data.queQuan}
              </Typography>
              <Typography variant='button' component='h4'>Nơi ở hiện tại</Typography>

              <Typography paragraph>
                {data.noiOHienTai}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>

  );
}
