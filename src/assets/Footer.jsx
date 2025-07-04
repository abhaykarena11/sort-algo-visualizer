import React from "react";
import "./Footer.css"; // Import the CSS file

const Footer = (props) => {
  const {
    arrayType,
    setArrayType,
    arrayLength,
    setArrayLength,
    speed,
    setSpeed,
    algorithm,
    setAlgorithm,
    trigger,
    setTrigger,
    onSort,
    algorithm2,
    setAlgorithm2,
    cmpToggle,
    setCmpToggle,
    isDisabled,
  } = props;

  const handleGenerateClick = () => {
    trigger ? setTrigger(false) : setTrigger(true);
  };

  const handleSortClick = () => {
    onSort({ algorithm, speed });
  };

  return (
    <footer>
      {/* Generate Array Type */}
      <div>
        <p>Generate Array:</p>
        <select
          value={arrayType}
          onChange={(e) => {
            setArrayType(e.target.value);
          }}
          disabled={isDisabled}
        >
          <option value="random">Random</option>
          <option value="reversed">Reversed</option>
          <option value="sorted">Sorted</option>
        </select>
      </div>

      {/* Array Length with Slider */}
      <div>
        <p>
          Array Length: <span>{arrayLength}</span>
        </p>
        <input
          type="range"
          min="2"
          max="50"
          value={arrayLength}
          onChange={(e) => {
            if (!isDisabled) setArrayLength(parseInt(e.target.value));
          }}
        />
      </div>

      {/* Speed */}
      <div>
        <p>Speed:</p>
        <div>
          {[
            { label: "slow", value: 50 },
            { label: "normal", value: 10 },
            { label: "fast", value: 1 },
          ].map((spd) => (
            <label key={spd}>
              <input
                type="radio"
                name="speed"
                value={spd.value}
                checked={speed === spd.value}
                onChange={() => {
                  if (!isDisabled) setSpeed(spd.value);
                }}
              />
              {spd.label}
            </label>
          ))}
        </div>
      </div>

      {/* Algorithm Selection */}
      <div>
        <p>Algorithm 1:</p>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="radix">radix Sort</option>
          <option value="countingSort">counting Sort</option>
          <option value="bucketSort">Bucket Sort</option>
        </select>
      </div>
      <div>
        <p>Algorithm 2:</p>
        <select
          value={algorithm2}
          onChange={(e) => setAlgorithm2(e.target.value)}
        >
          {!cmpToggle ? (
            <option value="none">none</option>
          ) : (
            <>
              <option value="bubble">Bubble Sort</option>
              <option value="insertion">Insertion Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="merge">Merge Sort</option>
              <option value="quick">Quick Sort</option>
              <option value="radix">radix Sort</option>
              <option value="countingSort">counting Sort</option>
              <option value="bucketSort">Bucket Sort</option>
            </>
          )}
        </select>
      </div>

      {/* Toggle Switch */}
      <div className="toggle-container">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={cmpToggle}
            onChange={() => {
              if (!isDisabled) setCmpToggle(!cmpToggle);
            }}
          />
          <span className="slider"></span>
        </label>
        <span className="toggle-label">Double</span>
      </div>
      {/* This should be visible */}

      {/* Buttons */}
      <div className="btn-component">
        <button onClick={handleGenerateClick} disabled={isDisabled}>
          Generate
        </button>
        <button
          className="sort"
          onClick={handleSortClick}
          disabled={isDisabled}
        >
          Sort
        </button>
      </div>
    </footer>
  );
};

export default Footer;
