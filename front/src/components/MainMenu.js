import { Button } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import "../styles/menuButton.scss";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding-bottom: 1rem;
`;

const DataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function MainButton({ mainChange, subChange }) {
  const [disease, setDisease] = useState(false);
  const [target, setTarget] = useState(false);

  const diseaseData = [
    { id: 0, name: "뇌질환" },
    { id: 1, name: "암" },
    { id: 2, name: "심장질환" },
  ];
  const targetData = [
    { id: 0, name: "의사 수", describe: "의사 수 설명" },
    { id: 1, name: "의료 수급권자 수", describe: "수급권자 수 설명" },
    { id: 2, name: "대학병원 수", describe: "대학병원 수 설명" },
    { id: 3, name: "구급차 수", describe: "구급차 수 설명" },
  ];

  const useStyles = makeStyles((theme) => ({
    primary: {
      backgroundColor: theme.palette.secondary.main,
    },
  }));
  const onClick = (e) => {
    const { name } = e.currentTarget;

    if (name === "disease") {
      setDisease(!disease);
      setTarget(false);
    } else if (name === "target") {
      setTarget(!target);
      setDisease(false);
    }
    mainChange(name);
  };

  const classes = useStyles();

  const subClick = (e) => {
    const { name } = e.currentTarget;
    subChange(name);
  };
  return (
    <div
      style={{
        width: "100%",
        paddingBottom: "1rem",
      }}
    >
      <ButtonContainer>
        <Button
          variant="contained"
          size="large"
          name="disease"
          color="primary"
          onClick={onClick}
        >
          질병
        </Button>
        <Button
          variant="contained"
          size="large"
          name="target"
          color="secondary"
          onClick={onClick}
        >
          지표
        </Button>
      </ButtonContainer>

      <DataContainer id="menu">
        {disease &&
          diseaseData.map((data) => (
            <div key={data.id}>
              <Button
                key={data.id}
                variant="outlined"
                size="small"
                color="default"
                onClick={subClick}
                name={data.id}
                style={{ marginRight: "0.5rem" }}
              >
                {data.name}
              </Button>
            </div>
          ))}
        {target &&
          targetData.map((data) => (
            <div key={data.id}>
              <Button
                key={data.id}
                variant="contained"
                size="small"
                color="default"
                onClick={subClick}
                name={data.id}
                style={{ marginRight: "0.5rem" }}
              >
                {data.name}
              </Button>
              <p className="sub_menu">{data.describe}</p>
            </div>
          ))}
      </DataContainer>
    </div>
  );
}

export default MainButton;
