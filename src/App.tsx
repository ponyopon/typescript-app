import Title from "./components/Title";
import Form from "./components/Form";
import Results from "./components/Results";
import "./App.css";
import { useState } from "react";

type ResultsStateType = {
  country: string;
  cityName: string;
  temperature: string;
  conditionText: string;
  icon: string;
};

export default function App() {
  const [city, setCity] = useState<string>("");
  const [results, setResults] = useState<ResultsStateType>({
    country: "",
    cityName: "",
    temperature: "",
    conditionText: "",
    icon: ""
  });
  const getWeather = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=f8bf441f8da64bb88c715012230509&q=${city}&aqi=no`
    )
      .then((res) => res.json())
      .then((data) => {
        setResults({
          country: data.location.country,
          cityName: data.location.name,
          temperature: data.location.temp_c,
          conditionText: data.current.condition.text,
          icon: data.current.condition.icon
        });
        setCity("");
      })
      .catch((err) => alert("アルファベットで入力してください"));
  };
  return (
    <div className="wrapper">
      <div className="container">
        <Title />
        <Form setCity={setCity} getWeather={getWeather} city={city} />
        <Results results={results} />
      </div>
    </div>
  );
}
