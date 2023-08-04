export interface PersonInfoProps {
  hoVaTen: string;
  quocTich: string | undefined;
  soDinhDanh: string;
  soCMND: string;
  type: string;
}

export interface GridItems {
  xs: number;
  md: number;
  content: any;
}

export interface BasicGridProps {
  gridItems: GridItems[];
}

export interface DataSearch {
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
  hoTen: HoTen;
  gioiTinh: number;
  danToc: string;
  tonGiao: string;
  nhomMau: string;
  ngayThangNamSinh: DateOfBirth;
  noiDangKyKhaiSinh: Address;
  quocTich: string;
  queQuan: Address;
  thuongTru: Address;
  noiOHienTai: Address;
}

export interface HoTen {
  ho: string;
  chuDem: string;
  ten: string;
}

export interface DateOfBirth {
  nam: number;
  ngayThangNam: string;
}

export interface Address {
  maTinhThanh: number;
  maQuanHuyen: number;
  maPhuongXa: number;
  chiTiet: string;
  quocGia: string;
}
