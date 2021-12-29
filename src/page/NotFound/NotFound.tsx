import { styled } from "@material-ui/styles";
import { FC } from "react";

const Container = styled("div")({
  width: "100%",
  height: "100vh",
  backgroundImage: 'url("/404.jpg")',
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

const NotFound: FC = () => {
  return <Container />;
};

export default NotFound;
