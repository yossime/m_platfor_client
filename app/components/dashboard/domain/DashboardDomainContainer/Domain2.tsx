import React from 'react';
import Text from '@components/Library/text/Text';
import { Container, TextContainer, IndexContainer, WaitContainer } from './CommonStyles';
import { FontFamily, FontWeight,  TextSize } from '@constants/text';
import { TextColor } from '@constants/colors';
import DashboardDomainIndexContainer from '../DashboardDomainIndexContainer/DashboardDomainIndexContainer';
import Icon from '@/components/Library/icon/Icon';
import { IconName } from '@constants/icon';



const Domain2: React.FC = () => {


    return (
        <Container>
            <WaitContainer>
                    <Icon name={IconName.SPINNERGAP} shouldRotate={true}/>
                  <Text size={TextSize.TEXT1}>We’re finding your provider, it’ll take 30 seconds tops</Text>
            </WaitContainer>
            {/* <TextContainer>
                <Text size={TextSize.TEXT2} $family={FontFamily.Poppins} $weight={FontWeight.SEMI_BOLD}
                    color={TextColor.PRIMARY_TEXT}>cfgjdjdghjdgjh</Text>
            </TextContainer> */}
        </Container>
    );
};

export default Domain2;