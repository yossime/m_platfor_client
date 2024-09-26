import React from 'react';
import Text from '@components/Library/text/Text';
import { Container, TextContainer, IndexContainer } from './CommonStyles';
import { FontFamily, FontWeight,  TextSize } from '@constants/text';
import { TextColor } from '@constants/colors';



const Domain4: React.FC = () => {


    return (
        <Container>
            <TextContainer>
                <Text size={TextSize.TEXT2} $family={FontFamily.Poppins} $weight={FontWeight.SEMI_BOLD}
                    color={TextColor.PRIMARY_TEXT}>cfgjdjdghjdgjh</Text>
            </TextContainer>
  
        </Container>
    );
};

export default Domain4;