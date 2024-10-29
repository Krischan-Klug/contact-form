import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";

const StyledImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const StyledImage = styled.img`
  border: 1px solid black;
  border-radius: 5px;
`;

const StyledImageBox = styled.div`
  padding: 10px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  min-height: 40vh;
`;

const StyledH2 = styled.h2`
  margin: 10px;
`;

export default function Home() {
  const translations = {
    en: {
      selection: "Select your language",
    },
    de: {
      selection: "Sprachauswahl",
    },
  };

  const router = useRouter();

  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const browserLanguage = navigator.language.split("-")[0];
    setLanguage(browserLanguage);
  }, []);

  return (
    <>
      <HeaderWrapper>
        <Image src="/logo.jpg" alt="logo" width={100} height={100}></Image>
        <StyledH2>
          {translations[language]?.selection || translations.en.selection}
        </StyledH2>
      </HeaderWrapper>
      <StyledImageWrapper>
        <StyledImageBox>
          <StyledImage
            src="/flags/DE.png"
            alt="DE"
            width={80}
            height={80}
            onClick={() => router.push("/de")}
          ></StyledImage>
        </StyledImageBox>
        <StyledImageBox>
          <StyledImage
            src="/flags/EN.png"
            alt="EN"
            width={80}
            height={80}
            onClick={() => router.push("/en")}
          ></StyledImage>
        </StyledImageBox>
      </StyledImageWrapper>
    </>
  );
}
