import { FC, useState, useEffect } from "react";
import { map } from "lodash";
import classNames from "classnames";
import { useHistory, useParams } from "react-router-dom";

import { useGetCategories } from "api/category";
import { useTranslations } from "hooks";

import { Spinner } from "components";
import { Wrapper, ChipStyled, useStyles, SpinnerContainer } from "./styles";

type Params = {
  categoryId?: string;
};

const Tags: FC = () => {
  const classes = useStyles();
  const { categoryId } = useParams<Params>();
  const {
    runRequest: fetchCategories,
    isLoading: fetchingCategories,
    responseData: categories,
  } = useGetCategories({
    successCallback: () => {
      if (categoryId) {
        setIsClick(categoryId);
      }
    },
  });
  const { i18n } = useTranslations();

  const [isClick, setIsClick] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      {fetchingCategories ? (
        <SpinnerContainer>
          <Spinner color="var(--color-primary)" />
        </SpinnerContainer>
      ) : (
        <>
          <ChipStyled
            label={i18n.t("tags.home_page")}
            onClick={() => {
              setIsClick("");
              history.push(`/`);
            }}
            clickable
            className={classNames({
              [`${classes.onActive}`]: isClick === "",
            })}
          />
          {map(categories?.data || [], (item) => (
            <ChipStyled
              label={decodeURI(item.name)}
              onClick={() => {
                setIsClick(item.id);
                history.push(`/category/${item.id}`);
              }}
              clickable
              key={item.id}
              className={classNames({
                [`${classes.onActive}`]: isClick === item.id,
              })}
            />
          ))}
        </>
      )}
    </Wrapper>
  );
};

export default Tags;
