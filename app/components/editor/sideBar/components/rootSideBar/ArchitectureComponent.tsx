
import React, { useEffect, useState } from 'react';
import { useEditor } from '@/context/useEditorContext';
import { InputMode, InputSize } from '@constants/input';
import { ButtonMode, ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
import { FontWeight, TextSize } from '@constants/text';
import { IconName, IconSize } from '@constants/icon';
import Icon from '@/components/Library/icon/Icon';
import Button from '@/components/Library/button/Button';
import Text from '@/components/Library/text/Text';
import { IconColor } from '@constants/colors';
import { SubButton, SubContainer, SubWrapper, Container, Divider } from '../general/CommonStyles';
import { useSidebarContext } from '@/context/SidebarContext ';
import { ESkybox } from '@/components/editor/types';
import { useSelectedObject } from '@/components/editor/context/Selected.context';

const options = [
  { value: ESkybox.DEFAULT, label: "Default" },
  { value: ESkybox.DARK, label: "Dark" },
];

interface ArchitectureComponentProps {
  handleBackOrAdd: () => void;
}

export const ArchitectureComponent: React.FC<ArchitectureComponentProps> = ({ handleBackOrAdd }) => {
  const {setActiveSidebarHeader} = useSidebarContext()
  const { selectedObject, setSelectedObject } = useSelectedObject();

  const { sceneModel } = useEditor();
  const [panels, setPanels] = useState<any[]>([]);

  useEffect(() => {
    if (sceneModel?.root) {
      const scenePanels = sceneModel.root.children;
      setPanels(scenePanels);
    }
  }, [sceneModel]);

  const handleSelect = (panel: any) => {
    setActiveSidebarHeader(panel.name);
    setSelectedObject(panel)
    // sceneModel?.setSelectedObject(panel);

  };

  return (
    <Container>
      {panels.length > 0 && (
        <SubWrapper>
          <Text $weight={FontWeight.SEMI_BOLD} size={TextSize.TEXT2}>
            My Boards
          </Text>
          <SubContainer>
            {panels.map((panel, index) => (
              <SubButton
                key={index}
                onClick={() => handleSelect(panel)}
              >
                <Text size={TextSize.TEXT2}>Board {index + 1}: {panel.name}</Text>
                <Icon name={IconName.EDIT} color={IconColor.PRIMARY} size={IconSize.SMALL} />
              </SubButton>
            ))}
          </SubContainer>
        </SubWrapper>
      )}
    
      <Button 
        type={ButtonType.PRIMARY}
        variant={ButtonVariant.SECONDARY}
        size={ButtonSize.LARGE}
        icon={IconName.PLUS}
        onClick={handleBackOrAdd}
        mode={ButtonMode.NORMAL}
        fullWidth={true}
      />
    </Container>
  );
};

export default ArchitectureComponent;