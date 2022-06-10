import { useEffect, useState } from "react";
import "./Weather.css";
import data from "./phrases.json";

export default function Weather(props: {refreshToken: number}) {
  const [icon, setIcon] = useState("clear_day");
  const [temperature, setTemperature] = useState(99);
  const [apparentTemperature, setApparentTemperature] = useState(98);
  const [tagLine, setTagLine] = useState("Tag Line");
  const [phrase, setPhrase] = useState("Phrase");

  useEffect(() => {
    fetch("/api/weather")
      .then((res) => res.json())
      .then((json) => calculatePhrase(json));
  }, [props.refreshToken]);

  const calculatePhrase = (json: any) => {
    const summary = json.summary;
    const temperature = json.temperature;

    setIcon(json.icon.replace(/-/g, "_"));
    setTemperature(Math.round(json.temperature));
    setApparentTemperature(Math.round(json.apparentTemperature));

    let summaryText: string = summary;
    if (summaryText.includes("error")) {
      setTagLine(summary);
      setPhrase("Error Fetching Weather");
      return;
    }
    summaryText = summaryText
      .toLowerCase()
      .replace(/(day)/g, "")
      .replace(/(night)/g, "")
      .replace(/_/g, " ")
      .trim();

    // Loop over all the phrases until we find one which is a good match
    let possiblePhrases = data.phrases.copyWithin(0, 0, 0);
    possiblePhrases = [];
    data.phrases.forEach((phrase) => {
      if (phrase.condition === summaryText) {
        if (phrase.min == undefined && phrase.max == undefined) {
          possiblePhrases.push(phrase);
          return;
        } else if (phrase.min == undefined) {
          if (phrase.max > temperature) {
            possiblePhrases.push(phrase);
            return;
          }
        } else if (phrase.max == undefined) {
          if (phrase.min < temperature) {
            possiblePhrases.push(phrase);
            return;
          }
        } else if (phrase.min < temperature && phrase.max > temperature) {
          possiblePhrases.push(phrase);
          return;
        }
      } else if (phrase.condition == undefined) {
        if (phrase.min == undefined && phrase.max == undefined) {
          possiblePhrases.push(phrase);
          return;
        } else if (phrase.min == undefined) {
          if (phrase.max > temperature) {
            possiblePhrases.push(phrase);
            return;
          }
        } else if (phrase.max == undefined) {
          if (phrase.min < temperature) {
            possiblePhrases.push(phrase);
            return;
          }
        } else if (phrase.min < temperature && phrase.max > temperature) {
          possiblePhrases.push(phrase);
          return;
        }
      }
    });

    const chosenPhrase = possiblePhrases[Math.floor(Math.random() * possiblePhrases.length)];
    setTagLine(chosenPhrase.subline);

    let formattedPhrase = chosenPhrase.title;
    const startIndex = formattedPhrase.indexOf(chosenPhrase.highlight[0]);
    const endIndex = formattedPhrase.indexOf("|", startIndex);

    const prefix = formattedPhrase.substring(0, startIndex);
    let highlight = formattedPhrase.substring(startIndex, endIndex);
    const suffix = formattedPhrase.substring(endIndex);
    highlight = highlight.italics();
    formattedPhrase = `${prefix != "" ? prefix + "<br/>" : ""}<span style="color: ${chosenPhrase.color}">${highlight}</span><br/>${suffix}`;

    formattedPhrase = formattedPhrase.replace(/\|/g, " ");
    setPhrase(formattedPhrase);
  };

  return (
    <div className="weather">
      <img src={require(`./icon/${icon}.png`)} alt={icon} />
      <div id="temperature">{temperature}</div>
      <div id="apparentTemperature">Feels like {apparentTemperature}</div>
      <div id="phrase-box">
        <div dangerouslySetInnerHTML={{ __html: phrase }} id="phrase" />
        <div id="tagLine">{tagLine}</div>
      </div>
    </div>
  );
}
