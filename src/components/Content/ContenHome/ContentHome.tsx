import { FC } from "react";

import { IContentHome } from "models/types";

import { BoxContent, Decriptions, DecriptionsDetaial } from "./style";

interface IProps {
  contenthome: IContentHome;
}

const ContentHome: FC<IProps> = ({ contenthome }: IProps) => {
  return (
    <div>
      <BoxContent>
        <Decriptions>{contenthome.decriptions}</Decriptions>
        <DecriptionsDetaial>{contenthome.decriptionsDetail}</DecriptionsDetaial>
        <img
          style={{ width: "100%" }}
          src={
            "https://www.jmenu.com/editable/templates/default/images/how-to2.png"
          }
          alt=""
        />
      </BoxContent>
    </div>
  );
};
export default ContentHome;
