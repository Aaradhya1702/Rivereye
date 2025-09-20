import { withTranslation } from "react-i18next";
import { StyledTextArea, StyledContainer, Label } from "./styles";

// eslint-disable-next-line react-refresh/only-export-components
const TextArea = ({ name, placeholder, onChange, t }) => (
  <StyledContainer>
    <Label htmlFor={name}>{t(name)}</Label>
    <StyledTextArea
      placeholder={t(placeholder)}
      id={name}
      name={name}
      onChange={onChange}
    />
  </StyledContainer>
);

// eslint-disable-next-line react-refresh/only-export-components
export default withTranslation()(TextArea);
