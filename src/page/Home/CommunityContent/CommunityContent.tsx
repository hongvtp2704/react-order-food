import { FC } from "react";
import { Grid, Box } from "@material-ui/core";

import { CommunityContentId } from "models/types";

import { ContentHome } from "components/Content";

import { BoxStyled } from "./style";

import { ContentHomeData } from "assets";

type Props = {
  id: CommunityContentId;
}

const CommunityContent: FC<Props> = ({ id }: Props) => {
  return (
    <div>
      <BoxStyled>
        <Box>
          <Grid item>
            <ContentHome contenthome={ContentHomeData[id]} />
          </Grid>
        </Box>
      </BoxStyled>
    </div>
  );
};
export default CommunityContent;
