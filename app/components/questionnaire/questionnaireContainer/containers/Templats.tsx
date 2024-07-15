
// "use client"

// import React, { useState } from 'react';
// import Template from '@/components/questionnaire/boxes/template/Template';
// import Text from '@components/Library/text/Text';
// import { useQuestionnaireIndex } from '@/context/useQuestionnaire';
// import { Container, ContentWrapper, TextContainer, ItemsContainer } from './CommonStyles';

// const data = [
//   { "title": "Nostalgic" },
//   { "title": "Sci-fi" },
//   { "title": "Forest" },
//   { "title": "Luxury" },
//   { "title": "Innovative" },
//   { "title": "Health" },
//   { "title": "Gaming" },
//   { "title": "Playfuly" },
//   { "title": "Sunset" },
//   { "title": "Swift" }
// ];

// const Design: React.FC = () => {
//   const { contextData, setContextData } = useQuestionnaireIndex();
//   const [selected, setSelected] = useState<string | null>(contextData.Templates.value);

//   const handleClick = (type: string) => {
//     setSelected(type);
//     setContextData({
//       ...contextData,
//       Templates: {
//         ...contextData.Templates,
//         value: type,
//         valid: true
//       }
//     });
//   };

//   return (
//     <Container>
//       <ContentWrapper>
//         <TextContainer>
//           <Text size="H1" weight="SEMIBLOB" color="primary_text">
//             Choose a template to start designing with:
//           </Text>
//           <Text size="TEXT1" weight="NORMAL" color="primary_text">
//             Give your business environment a matching theme
//           </Text>
//         </TextContainer>
//       </ContentWrapper>
//       <ItemsContainer>
//         {data.map((item, index) => (
//           <Template 
//             key={index} 
//             title={item.title} 
//             onClick={() => handleClick(item.title)} 
//             clicked={item.title === selected} 
//           />
//         ))}
//       </ItemsContainer>
//     </Container>
//   );
// };

// export default Design;


"use client"

import React, { useState } from 'react';
import Template from '@/components/questionnaire/boxes/template/Template';
import Text from '@components/Library/text/Text';
import { useQuestionnaireIndex } from '@/context/useQuestionnaire';
import { Container, ContentWrapper, TextContainer, ItemsContainer } from './CommonStyles';

const data = [
  { "title": "Nostalgic", "backgroundImage": "/images/Nostalgic.jpg" },
  { "title": "Sci-fi", "backgroundImage": "/images/Sci-fi.jpg" },
  { "title": "Forest", "backgroundImage": "/images/Forest.jpg" },
  { "title": "Luxury", "backgroundImage": "/images/Luxury.jpg" },
  { "title": "Innovative", "backgroundImage": "/images/Innovative.jpg" },
  { "title": "Health", "backgroundImage": "/images/Health.jpg" },
  { "title": "Gaming", "backgroundImage": "/images/Gaming.jpg" },
  { "title": "Playfuly", "backgroundImage": "/images/Playfuly.jpg" },
  { "title": "Sunset", "backgroundImage": "/images/Sunset.jpg" },
  { "title": "Swift", "backgroundImage": "/images/Swift.jpg" }
];

const Design: React.FC = () => {
  const { contextData, setContextData } = useQuestionnaireIndex();
  const [selected, setSelected] = useState<string | null>(contextData.Templates.value);

  const handleClick = (type: string) => {
    setSelected(type);
    setContextData({
      ...contextData,
      Templates: {
        ...contextData.Templates,
        value: type,
        valid: true
      }
    });
  };

  return (
    <Container>
      <ContentWrapper>
        <TextContainer>
          <Text size="H1" weight="SEMIBLOB" color="primary_text">
            Choose a template to start designing with:
          </Text>
          <Text size="TEXT1" weight="NORMAL" color="primary_text">
            Give your business environment a matching theme
          </Text>
        </TextContainer>
      </ContentWrapper>
      <ItemsContainer>
        {data.map((item, index) => (
          <Template
            key={index}
            title={item.title}
            onClick={() => handleClick(item.title)}
            clicked={item.title === selected}
            backgroundImage={item.backgroundImage}
          />
        ))}
      </ItemsContainer>
    </Container>
  );
};

export default Design;