import styled from "styled-components";
import { useRouter } from "next/router";

const StyledImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  box-sizing: border-box;
`;

const StyledImage = styled.img`
  border: 1px solid black;
  border-radius: 5px;
`;

const StyledImageBox = styled.div`
  padding: 10px;
`;

export default function Home() {
  const router = useRouter();
  return (
    <>
      <StyledImageWrapper>
        <StyledImageBox>
          <StyledImage
            src="/flags/DE.png"
            alt="DE"
            width={150}
            height={150}
            onClick={() => router.push("/de")}
          ></StyledImage>
        </StyledImageBox>
        <StyledImageBox>
          <StyledImage
            src="/flags/EN.png"
            alt="EN"
            width={150}
            height={150}
            onClick={() => router.push("/en")}
          ></StyledImage>
        </StyledImageBox>
      </StyledImageWrapper>
    </>
  );
}
