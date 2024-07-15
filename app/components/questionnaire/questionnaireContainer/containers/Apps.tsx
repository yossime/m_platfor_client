import React, { useState } from 'react';
import App from '@/components/questionnaire/boxes/app/App';
import Text from '@components/Library/text/Text';
import { useQuestionnaireIndex } from '@/context/useQuestionnaire';
import { Container, ContentWrapper, TextContainer, ItemsContainer } from './CommonStyles';

const getRandomColor = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
};

const data = [
  {
    box: {
      title: "menu",
      body: "Create and display your menu and 3D dishes online",
      backgroundColor: getRandomColor()
    }
  },
  {
    box: {
      title: "Form",
      body: "Customize forms to contact leads",
      backgroundColor: getRandomColor()
    }
  }
];

const data2 = [
  {
    box: {
      title: "events Schedule ",
      body: "Display events on a calendar and promote booking ",
      backgroundColor: getRandomColor()

    }
  },
  {
    box: {
      title: "appointment Booking",
      body: "Let your site visitors book your services",
      backgroundColor: getRandomColor()
    }
  },
  {
    box: {
      title: "Showroom",
      body: "Display your 3D content",
      backgroundColor: getRandomColor()
    }
  },
  {
    box: {
      title: "Mini Form",
      body: "Present a single field to fill and promote easy subscription",
      backgroundColor: getRandomColor()
    }
  },
  {
    box: {
      title: "Shared exhibition",
      body: "Let your visitors upload 3D and 2D content ",
      backgroundColor: getRandomColor()
    }
  },
  {
    box: {
      title: "Blog",
      body: "Let your visitors upload content and comment",
      backgroundColor: getRandomColor()
    }
  },
  {
    box: {
      title: "Theatre",
      body: "Let your visitors share videos including 360°",
      backgroundColor: getRandomColor()
    }
  },
  {
    box: {
      title: "3D online store",
      body: "Display products in 3D with a purchase flow ",
      backgroundColor: getRandomColor()
    }
  },
  {
    box: {
      title: "Game",
      body: "Games are fun",
      backgroundColor: getRandomColor()
    }
  },
  {
    box: {
      title: "3D Mini store",
      body: "Display selected products in 3D with a purchase flow ",
      backgroundColor: getRandomColor()
    }
  }
];

const Apps: React.FC = () => {
  const { contextData, setContextData } = useQuestionnaireIndex();
  const [selected, setSelected] = useState<string[]>(contextData.Apps.value);

  const handleClick = (type: string) => {
    const newSelected = selected.includes(type)
      ? selected.filter(item => item !== type)
      : [...selected, type];
    setSelected(newSelected);
    const isValid = newSelected.length > 0;

    setContextData({
      ...contextData,
      Apps: {
        ...contextData.Apps,
        value: newSelected,
        valid: isValid
      }
    });
  };

  return (
    <Container>
      <ContentWrapper>
        <TextContainer>
          <Text size="H1" weight="SEMIBLOB" color="primary_text">Choose apps you'd like to add</Text>
          <Text size="TEXT1" weight="NORMAL" color="primary_text">Give your site more functionality with Mocart business solutions.</Text>
        </TextContainer>
      </ContentWrapper>
      <div>
        <Text size="TEXT1" weight="SEMIBLOB" color="primary_text">Recommended for you:</Text>
        <ItemsContainer>
          {data.map((item, index) => (
            <App
              key={index}
              title={item.box.title}
              body={item.box.body}
              onClick={() => handleClick(item.box.title)}
              clicked={selected.includes(item.box.title)}
              backgroundColor={item.box.backgroundColor}
            />
          ))}
        </ItemsContainer>
      </div>
      <div>
        <Text size="TEXT1" weight="SEMIBLOB" color="primary_text">Discover more apps:</Text>
        <ItemsContainer>
          {data2.map((item, index) => (
            <App
              key={index}
              title={item.box.title}
              body={item.box.body}
              onClick={() => handleClick(item.box.title)}
              clicked={selected.includes(item.box.title)}
              backgroundColor={item.box.backgroundColor}
            />
          ))}
        </ItemsContainer>
      </div>
    </Container>
  );
};

export default Apps;