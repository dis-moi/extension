import React from 'react';
import { useTranslation } from 'react-i18next';
import SidebarBox from './SidebarBox';
import { ButtonWithIcon, Paragraph } from 'components/atoms';
import { Download } from 'components/atoms/icons';

export default () => {
  const { t } = useTranslation();
  return (
    <SidebarBox>
      <Paragraph>
        {t('profiles:view.add_browser_box.description_dismoi')}
      </Paragraph>

      <ButtonWithIcon className="bulle-installer">
        {t('profiles:action.add_to_my_browser')} <Download />
      </ButtonWithIcon>
    </SidebarBox>
  );
};
