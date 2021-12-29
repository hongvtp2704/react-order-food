import { FC, ReactNode, useEffect } from "react";
import Footer from "./Footer";

import Header from "./Header";
import { Wrapper, Content } from "./styles";

interface IProps {
  children: ReactNode;
}

const MainPageTemplate: FC<IProps> = ({ children }: IProps) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Header />
      <Content elevation={0}>{children}</Content>
      <Footer />
    </Wrapper>
  );
};

export default MainPageTemplate;
