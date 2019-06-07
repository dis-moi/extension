import React from 'react';
import Notification from 'components/organisms/Notification';
import Input from 'components/atoms/Forms/Input/Input';
import Textarea from 'components/atoms/Forms/Textarea/Textarea';
import Error from 'components/atoms/Forms/Error/Error';
import { CenterContainer, ContentWrapper } from 'components/atoms/';
import BorderButton from 'components/atoms/Buttons/BorderButton';

interface Props {
  close: () => void;
}
export const CreateNoticeScreen = ({ close }: Props) => (
  <Notification title="créer une bulle ici" close={close}>
    <ContentWrapper>
      <Input type="text" placeholder="your@email.com" />
      <Textarea placeholder="Ecrire le message que vous souhaitez publier" />
      <CenterContainer>
        <BorderButton>prévisualiser et publier</BorderButton>
      </CenterContainer>
      <Error>Les champs en rouge sont incorrects ou incomplets</Error>
    </ContentWrapper>
  </Notification>
);

export default CreateNoticeScreen;
