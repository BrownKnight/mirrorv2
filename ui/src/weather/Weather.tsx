import { useEffect, useState } from "react";
import * as icons from "./icon/*.png"
import "./Header.css";

export default function Weather() {

  const [icon, setIcon] = useState("error");

  const calculatePhrase = (json: any) => {
    
  }

  return (
    <div className="weather">
      <span>{greeting}</span>
    </div>
  );
}
