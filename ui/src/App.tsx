import { useEffect, useState } from "react";
import "./App.css";
import Header from "./header/Header";
import Weather from "./weather/Weather";

function App() {
  const [refreshToken, setRefreshToken] = useState(0);
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    setTimer(setInterval(() => setRefreshToken(Math.random()), 1000 * 60 * 15));

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <Header />
      <Weather refreshToken={refreshToken} />
    </div>
  );
}

export default App;
