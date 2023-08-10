import { ReactElement } from 'react';

export interface PersonInfoProps {
  hoVaTen: string;
  type: string;
  quocTich: string | undefined;
  soDinhDanh: string | undefined;
  soCMND: string | undefined;
}

export interface GridItems {
  xs: number;
  md: number;
  content: ReactElement;
  id: string;
}

export interface BasicGridProps {
  gridItems: GridItems[];
}

export interface DataSearch {
  media: string;
  PII: string[];
  FullName: string[];
  Birthday: string[];
  Address: string[];
  Email: string[];
  PhoneNum: string[];
  Facebook: string[];
  Username: string[];
  TypeVehicle: string[];
  Plate: string[];
  remaining: number | string;
  relatedPerson: PersonInfoProps[];
  tinhTrangHonNhan: string;
  soDinhDanh: string;
  soCMND: string;
  hoTen: string;
  gioiTinh: number;
  danToc: string;
  tonGiao: string;
  nhomMau: string;
  ngayThangNamSinh: string;
  noiDangKyKhaiSinh: string;
  quocTich: string;
  queQuan: string;
  thuongTru: string;
  noiOHienTai: string;
}
