import * as React from 'react';

import Container from '@mui/material/Container';

import BlurItem from '@/components/Layout/Blurred';
import BasicGrid from '@/components/Layout/MainGridSection'
import MainInfoCard from '@/components/PersonInfo/MainInfoCard';
import PersonInfoCard from '@/components/PersonInfo/RelatedCard';
import { DataSearch } from '@/interfaces/personInfo';

interface IProps {
  dataRes: DataSearch
}
const SearchPersonInfo = (props: IProps) => {
  const { dataRes } = props
  const { relatedPerson } = dataRes

  const mainContent = <MainInfoCard dataRes={dataRes} />
  const cleanData = (item: any) => {
    const fieldList = [
      'hoVaTen',
      'quocTich',
      'soDinhDanh',
      'soCMND',
      'type',
    ]
    for (const field in fieldList) {
      if (!(fieldList[field] in item)) {
        item[fieldList[field]] = ''
      }
    }

  }
  cleanData(relatedPerson)


  const relatedItem = (
    <BlurItem>
      {relatedPerson.map((item, index) => (
        <React.Fragment key={index}>
          <PersonInfoCard
            hoVaTen={item.hoVaTen}
            type={item.type}
            key={item.hoVaTen}
          />
        </React.Fragment>
      ))}
    </BlurItem>
  )
  const mainItem = [
    { xs: 12, md: 8, content: mainContent, id: 'mainContent' },
    {
      xs: 12, md: 4, content: relatedItem, id: 'relatedContent',
    },

  ]
  return (
    <div id="mainThread">
      <Container maxWidth="lg">
        <BasicGrid gridItems={mainItem} />
      </Container>
    </div>
  );
};

export default SearchPersonInfo;
