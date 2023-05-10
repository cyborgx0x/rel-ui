export interface ILogin {
  id: number;
  token: string;
}

export interface IBodyLogin {
  account: string;
  password: string;
  device_id: string;
  platform_type: string;
  is_bio: boolean;
}
