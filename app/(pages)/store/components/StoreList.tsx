// import React from 'react';
// import { useRouter } from 'next/navigation';
// import styled from 'styled-components';
// import { Store } from '../types/store';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   padding: 20px;
// `;

// const StoreButton = styled.button`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   background: #ffffff;
//   border: 1px solid #dddddd;
//   border-radius: 8px;
//   padding: 15px;
//   cursor: pointer;
//   transition: background 0.3s, box-shadow 0.3s;

//   &:hover {
//     background: #f0f0f0;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   }
// `;

// const StoreName = styled.h3`
//   margin: 0;
//   font-size: 18px;
//   color: #333333;
// `;

// const StoreDetails = styled.p`
//   margin: 5px 0;
//   font-size: 14px;
//   color: #666666;
// `;

// interface StoreListProps {
//   storesList: Store[];
// }

// const StoreList: React.FC<StoreListProps> = ({ storesList }) => {
//   const router = useRouter();

//   const onSelectedStore = (storeId: string) => {
//     router.push(`/store/${storeId}`);
//   };

//   return (
//     <Container>
//       {storesList?.map((store) => (
//         <StoreButton key={store.id} onClick={() => onSelectedStore(store.id)}>
//           <StoreName>{store.name}</StoreName>
//           <StoreDetails>Owner: {store.ownerId}</StoreDetails>
//           <StoreDetails>Status: {store.status}</StoreDetails>
//         </StoreButton>
//       ))}
//     </Container>
//   );
// };

// export default StoreList;


import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Store } from '../types/store';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StoreButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: background 0.3s, box-shadow 0.3s, transform 0.3s;
  width: 100%;
  text-align: left;
  
  &:hover {
    background: #f7f7f7;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const StoreName = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #333333;
  font-weight: 600;
`;

const StoreDetails = styled.p`
  margin: 5px 0;
  font-size: 16px;
  color: #555555;
`;

interface StoreListProps {
  storesList: Store[];
}

const StoreList: React.FC<StoreListProps> = ({ storesList }) => {
  const router = useRouter();

  const onSelectedStore = (storeId: string) => {
    router.push(`/store/${storeId}`);
  };

  return (
    <Container>
      {storesList.map((store) => (
        <StoreButton key={store.id} onClick={() => onSelectedStore(store.id)}>
          <StoreName>{store.name}</StoreName>
          <StoreDetails><strong>Owner:</strong> {store.ownerId}</StoreDetails>
          <StoreDetails><strong>Status:</strong> {store.status}</StoreDetails>
        </StoreButton>
      ))}
    </Container>
  );
};

export default StoreList;