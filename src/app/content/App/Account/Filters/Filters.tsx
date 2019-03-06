import React from "react";
import Notification from "components/organisms/Notification";

interface Props {
  close?: () => void;
}
export default ({ close }: Props) => (
  <Notification contentTitle="Mes filtres" title="Mes Filtres" close={close} />
);
