import MainInfoCard from '@/components/PersonInfo/MainInfoCard';
import StandardImageList from '@/components/PersonInfo/PersonMedias';
import PersonInfoCard from '@/components/PersonInfo/RelatedCard';

const SearchPersonInfo = () => {
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

  return (
    <div>
      <MainInfoCard />
      <StandardImageList />
      <PersonInfoCard
        gender={personInfo.gender}
        ethnic={personInfo.ethnic}
        marriageStatus={personInfo.marriageStatus}
        bloodLine={personInfo.bloodLine}
        dob={personInfo.dob}
        placeOfBirth={personInfo.placeOfBirth}
        country={personInfo.country}
      />
    </div>
  );
};

export default SearchPersonInfo;
