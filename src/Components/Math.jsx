import React, { useEffect, useState } from "react";

function Math({ values }) {
  const [maximas, setMaximas] = useState([]);
  useEffect(() => {
    if (Object.keys(values).length) {
      let x = [],
        z = [],
        timestamp = [];
      for (let key in values) {
        if (values.hasOwnProperty(key)) {
          x.push(values[key].x);
          z.push(values[key].z);
          timestamp.push(values[key].timestamp);
        }
      }

      let maxes = [];
      for (var i = 1; i < z.length - 1; ++i) {
        if (z[i - 1] < z[i] && z[i] > z[i + 1]) maxes.push(z[i]);
      }

      setMaximas(maxes);
    }
  }, [values]);
  return (
    <div>
      Local Maxima : {maximas} <br />
      Slope of X : {}
    </div>
  );
}

export default Math;
