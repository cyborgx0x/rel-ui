import Container from '@mui/material/Container';

import BasicGrid from '@/components/Layout/RelatedSection'
import MainInfoCard from '@/components/PersonInfo/MainInfoCard';
import StandardImageList from '@/components/PersonInfo/PersonMedias';
import PersonInfoCard from '@/components/PersonInfo/RelatedCard';

const SearchPersonInfo = () => {
  const relatedPerson = [
    {
      'hoVaTen': 'PHẠM VĂN NƠI',
      'quocTich': 'VN',
      'soDinhDanh': '034069018391',
      'soCMND': '151282619',
      'type': 'cha',
    },
    {
      'hoVaTen': 'PHẠM THỊ TƠ',
      'quocTich': 'VN',
      'soDinhDanh': '034175013724',
      'soCMND': '151956852',
      'type': 'me',
    },

  ]

  const mainContent = <MainInfoCard />
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
  const mainItem = [
    { xs: 12, md: 8, content: mainContent },
    { xs: 12, md: 4, content: <BasicGrid gridItems={gridItems} /> },
    { xs: 12, md: 4, content: instagramCard },
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
