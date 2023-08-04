import Container from '@mui/material/Container';

import BlurItem from '@/components/Layout/Blurred';
import BasicGrid from '@/components/Layout/MainGridSection'
import MainInfoCard from '@/components/PersonInfo/MainInfoCard';
import StandardImageList from '@/components/PersonInfo/PersonMedias';
import PersonInfoCard from '@/components/PersonInfo/RelatedCard';
import { DataSearch } from '@/interfaces/personInfo';

interface IProps {
  dataRes: DataSearch
}
const SearchPersonInfo = (props: IProps) => {
  const { dataRes } = props
  const { relatedPerson } = dataRes

  const mainContent = <MainInfoCard dataRes={dataRes} />
  const instagramCard = <StandardImageList />
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
  const gridItems = relatedPerson.map(item => ({

    xs: 12,
    md: 12,
    content: <PersonInfoCard
      {...item}
    />,
  }))
  // const item = {
  //   xs: 12,
  //   md: 12,
  //   content: instagramCard,
  // }
  // gridItems.push(item)
  const relatedItem = (
    <BlurItem>
      {relatedPerson.map(item => (
        <PersonInfoCard
          {...item}
          key={item.hoVaTen}
        />
      ))}
    </BlurItem>
  )
  const mainItem = [
    { xs: 12, md: 8, content: mainContent },
    {
      xs: 12, md: 4, content: relatedItem,
    },
    // { xs: 12, md: 4, content: instagramCard },
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
