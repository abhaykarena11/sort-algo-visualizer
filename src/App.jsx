import Footer from "./assets/Footer";
import ArrayModule from "./assets/Array-module";
import "./App.css";
import { useEffect, useState } from "react";
import sortAlgo from "./assets/sortAlgo.js";

function App() {
  const max = 400;
  const min = 5;
  const [arrayType, setArrayType] = useState("random");
  const [arrayLength, setArrayLength] = useState(50);
  const [speed, setSpeed] = useState(10);
  const [algorithm, setAlgorithm] = useState("bubble");
  const [algorithm2, setAlgorithm2] = useState("bubble");
  const [trigger, setTrigger] = useState(true);
  const [arr, setArr] = useState([]);
  const [barColors, setBarColors] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [barColors2, setBarColors2] = useState([]);
  const [cmpToggle, setCmpToggle] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const onSort = ({ algorithm, speed }) => {
    sortAlgo[algorithm]({
      speed,
      barColors,
      arr,
      setBarColors,
      setArr,
      setIsDisabled,
    });
    sortAlgo[algorithm2]({
      speed,
      barColors: barColors2,
      arr: arr2,
      setBarColors: setBarColors2,
      setArr: setArr2,
      setIsDisabled: setIsDisabled,
    });
  };

  useEffect(() => {
    const newArray = [];
    for (let i = 0; i < arrayLength; i++) {
      newArray.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    if (arrayType === "sorted") {
      newArray.sort((a, b) => a - b);
    }
    if (arrayType === "reversed") {
      newArray.sort((a, b) => b - a);
    }
    setBarColors(new Array(arrayLength).fill("pink"));
    setBarColors2(new Array(arrayLength).fill("pink"));
    setArr(newArray);
    setArr2(newArray);
  }, [arrayLength, arrayType, trigger]);

  return (
    <div className="app-container">
      <header>
        To read project documentation <a href="docs.html">click</a>
      </header>
      <div className="graph-container">
        <ArrayModule arr={arr} barColors={barColors} />
        {cmpToggle ? <ArrayModule arr={arr2} barColors={barColors2} /> : ""}
      </div>

      <Footer
        arrayType={arrayType}
        setArrayType={setArrayType}
        arrayLength={arrayLength}
        setArrayLength={setArrayLength}
        speed={speed}
        setSpeed={setSpeed}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        algorithm2={algorithm2}
        setAlgorithm2={setAlgorithm2}
        trigger={trigger}
        setTrigger={setTrigger}
        onSort={onSort}
        cmpToggle={cmpToggle}
        setCmpToggle={setCmpToggle}
        isDisabled={isDisabled}
      />
    </div>
  );
}

export default App;
