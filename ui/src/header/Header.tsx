import { timeStamp } from 'console';
import { useEffect, useState } from 'react';
import './Header.css';

export default function Header() {
  const morningGreetings = ["Good Morning Aman!"]
  const afternoonGreetings = ["Good Afternoon Aman!"]
  const eveningGreetings = ["Good Evening Aman!"]
  const nightGreetings = ["Goodnight"]
  const hour = new Date().getHours();

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    let arrayOfGreetings : string[] = [];
    if (hour < 5) {
      arrayOfGreetings = nightGreetings;
    }
    else if (hour < 12) {
      arrayOfGreetings = morningGreetings;
    }
    else if (hour < 17) {
      arrayOfGreetings = afternoonGreetings;
    }
    else if (hour < 22) {
      arrayOfGreetings = eveningGreetings;
    }
    else if (hour < 24) {
      arrayOfGreetings = morningGreetings;
    }

    // choose the greeting
    setGreeting(arrayOfGreetings[Math.floor(Math.random()*arrayOfGreetings.length)])
  }, [afternoonGreetings, eveningGreetings, hour, morningGreetings, nightGreetings])

  return (
    <div className="header">
      <span>{greeting}</span>
    </div>
  );
}
