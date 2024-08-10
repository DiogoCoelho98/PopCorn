import Star from "./Star.jsx";

import { useState} from "react";
import PropTypes from "prop-types";


StarRating.propTypes = {
    maxRating: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    onUserRating: PropTypes.func
}

const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
  };
  
  const starContainerStyle = {
    display: "flex",
  };

export default function StarRating({ maxRating = 5, color = "#fcc419", size = 48, onUserRating }) {
    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0);

    const textStyle = {
        lineHeight: "1",
        margin: "0",
        color,
        fontSize: `${size / 1.5}px`,
      };

    function handleRating(rating) {
        setRating(rating);
        onUserRating(rating);
    }

    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_,i) => (
                    <Star 
                        key={i} 
                        color={color}
                        size={size}
                        onRating={() => handleRating(i + 1)} 
                        onHoverIn={() => setTempRating(i + 1)} 
                        onMouseOut={() => setTempRating(0)} 
                        full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                    />
                ))}
            </div>
            <p style={textStyle}>{tempRating || rating || ""}</p>
        </div>
    )
}       