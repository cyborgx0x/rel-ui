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
