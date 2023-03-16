import { useContext, useRef, useState } from "react";
import axios from "axios";
import RapidApiToken from "./apiKey";
import { youtube_parser } from "./youtubeParser";
import styled, { createGlobalStyle } from "styled-components";

function App() {
  const inputUrlRef = useRef<any>();

  const [data, setData] = useState<any>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(inputUrlRef.current.value);
    const YouTubeID = youtube_parser(inputUrlRef.current.value)

  
  const options = {
    method: "get",
    url: "https://youtube-mp36.p.rapidapi.com/dl",
    headers: {
      "X-RapidAPI-Key": RapidApiToken,
      "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
    },
    params: {
       id: YouTubeID 
      },
  };

  axios(options)
    .then(response => setData(response.data.link))
    .catch(error => console.error(error));

    inputUrlRef.current.value = ""
};
  return (
    <div className="App">
      <GlobalStyles/>
      <DivMain>
        <H1>Free Youtube mp3 converter</H1>
        <Form action="" onSubmit={handleSubmit}>
          <Input ref={inputUrlRef} type="text" placeholder="paste your link" />
          <Button onClick={handleSubmit}>Convert</Button>
         
          
        </Form>
        {data ? 
        <A target="_blank" rel="noreferrer" href={data}>download</A>
        : 
        null}
      </DivMain>
    </div>
  );
}

export default App;


const A = styled.a`
  align-self: center;
  margin-top: 15px;
  color: red;
`
const DivMain = styled.div`
  width: 100%;
  border-radius: 15px;
  margin: 200px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
 
  
`
const H1 = styled.h1`
margin-top: 25px;
text-align: center;
  font-size: 25px;
`
const Input = styled.input`
margin-top: 25px;
  border: none;
  border-radius: 10px;
  padding: 10px 0 10px 10px;
  width: calc(100% - 120px);
  
`
const Button = styled.button`
margin-top: 25px;
  border: none;
  padding: 10px auto;
  border-radius: 10px;
  width: 100px;
  background:transparent;
  color: white;
  border: 1px solid white;
  cursor: pointer;
  transition: all .3s ease;
  :hover {
    transform: scale(1.05);
    color: white;
    
  
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  width: 100%;

`
const GlobalStyles = createGlobalStyle`
  
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
    font-family: 'Josefin Sans', sans-serif;
  }
  body{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background: linear-gradient(45deg,  blue, lightblue);
    color: white;
    background-image: url("/assets/3.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    @media (width > 500px) {
      background-image: url("/assets/1.jpg");
    }
  }
`
