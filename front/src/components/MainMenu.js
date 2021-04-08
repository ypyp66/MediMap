import { Button } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";

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

function MainButton() {
  const [disease, setDisease] = useState(false);
  const [target, setTarget] = useState(false);

  const diseaseData = [
    { id: 0, name: "뇌질환" },
    { id: 1, name: "암" },
    { id: 2, name: "심장질환" },
  ];
  const targetData = [
    { id: 0, name: "의사 수" },
    { id: 1, name: "의료 수급권자 수" },
    { id: 2, name: "대학병원 수" },
    { id: 3, name: "구급차 수" },
  ];

  const onClick = (e) => {
    const { name } = e.currentTarget;

    if (name === "disease") {
      setDisease(!disease);
      setTarget(false);
    } else if (name === "target") {
      setTarget(!target);
      setDisease(false);
    }
  };

  const subClick = (e) => {
    console.log(e.currentTarget.name);
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
          children="span"
          onClick={onClick}
        >
          질병
        </Button>
        <Button
          variant="contained"
          size="large"
          name="target"
          color="inherit"
          onClick={onClick}
        >
          지표
        </Button>
      </ButtonContainer>

      <DataContainer>
        {disease &&
          diseaseData.map((data, index) => (
            <Button
              key={data.id}
              variant="outlined"
              size="small"
              color="primary"
              onClick={subClick}
              name={data.id}
              style={{ marginRight: "0.5rem" }}
            >
              {data.name}
            </Button>
          ))}
        {target &&
          targetData.map((data, index) => (
            <Button
              key={data.id}
              variant="outlined"
              size="small"
              color="primary"
              name={`disease${data.id}`}
              style={{ marginRight: "0.5rem" }}
            >
              {data.name}
            </Button>
          ))}
      </DataContainer>
    </div>
  );
}

export default MainButton;
