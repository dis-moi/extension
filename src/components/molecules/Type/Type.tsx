import React from "react";
import { withTheme } from "styled-components";
import Background from "./Background";
import noticeTypeIcons from "../../atoms/icons/types";
import { Theme } from "app/theme";
import { getTypeOrFallback, NoticeType } from "app/lmem/noticeType";

interface Style {
  background: string;
}
interface Props {
  type?: NoticeType;
  theme: Theme;
}
const NoticeTypeIcon = ({ type, theme }: Props) => {
  const NoticeTypeIcon = getTypeOrFallback(noticeTypeIcons)(type);
  const style = getTypeOrFallback<Style>(theme.noticeTypes)(type);

  return (
    <Background color={style && style.background}>
      {NoticeTypeIcon && <NoticeTypeIcon />}
    </Background>
  );
};

export default withTheme(NoticeTypeIcon);
