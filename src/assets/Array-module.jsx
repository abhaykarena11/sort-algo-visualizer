import "./Array-module.css";
const ArrayModule = (props) => {
  const { arr, barColors } = props;

  return (
    <div className="array-container">
      {arr.map((value, index) => {
        return (
          <div
            className="array-bar"
            key={index}
            style={{
              height: `${value}px`,
              backgroundColor: `${barColors[index]}`,
            }} // Set height dynamically
          >
            <span className="bar-value">{value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ArrayModule;
