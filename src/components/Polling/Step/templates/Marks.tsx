import React from "react";
import { StepProps } from "../../types";

const Marks: React.FC<StepProps> = ({ onSubmit }) => {
  const handleSubmit = mark => {
    onSubmit(mark, true);
  };
  return (
    <div className="polling-marks">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(mark => {
        return (
          <span
            key={mark}
            className="polling-mark"
            onClick={handleSubmit.bind(null, mark)}
          >
            {mark}
          </span>
        );
      })}
    </div>
  );
};

export default Marks;
