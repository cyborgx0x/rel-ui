import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import BasicGrid from '@/components/Layout/RelatedSection'
import MainInfoCard from '@/components/PersonInfo/MainInfoCard';
import StandardImageList from '@/components/PersonInfo/PersonMedias';
import PersonInfoCard from '@/components/PersonInfo/RelatedCard';

const SearchPersonInfo = () => {
  interface GridItem {
    xs: number;
    content: string;
  }
  // Sample data for the person's information
  const personInfo = {
    gender: 'Male',
    ethnic: 'Caucasian',
    marriageStatus: 'Married',
    bloodLine: 'O+',
    dob: '1990-05-15',
    placeOfBirth: 'CityName',
    country: 'United States',
  };
  const firstRelated = <PersonInfoCard
    gender={personInfo.gender}
    ethnic={personInfo.ethnic}
    marriageStatus={personInfo.marriageStatus}
    bloodLine={personInfo.bloodLine}
    dob={personInfo.dob}
    placeOfBirth={personInfo.placeOfBirth}
    country={personInfo.country}
  />
  const gridItems = [


    { xs: 4, content: firstRelated },
    { xs: 4, content: firstRelated },
    { xs: 4, content: firstRelated },
  ];
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={8}>
            <MainInfoCard />
          </Grid>
          <Grid item xs={4}>
            <StandardImageList />
          </Grid>
        </Grid>
      </Box>
      <BasicGrid gridItems={gridItems} />

    </div>
  );
};

export default SearchPersonInfo;
