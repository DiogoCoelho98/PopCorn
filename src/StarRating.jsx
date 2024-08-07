import Star from "./Star.jsx";

import { useState} from "react";
import PropTypes from "prop-types";


StarRating.propTypes = {
    maxRating: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
}

export default function StarRating({ maxRating = 5, color = "#fcc419", size = 48 }) {
    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0);

    const textStyle = {
        lineHeight: "1",
        margin: "0",
        color,
        fontSize: `${size / 1.8}px`,
        alignContent: "center",
        marginLeft: "10px",
        gap: 0
    }

    function handleRating(rating) {
        setRating(rating);
    }

    return (
        <div style={{gap:0, marginTop:"20px"}}>
            <div style={{gap:0}}>
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