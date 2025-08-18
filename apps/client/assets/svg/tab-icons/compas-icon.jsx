import React from "react";
import Svg, { Path } from "react-native-svg";

export const CompasIcon = ({ width = 25, height = 25, fill, strokeColor }) => (
	<Svg width={width} height={height} viewBox="0 0 25 25" fill={fill}>
		{/* Cercle extérieur */}
		<Path
			d="M12.0802 21.5C17.0508 21.5 21.0802 17.4706 21.0802 12.5C21.0802 7.52944 17.0508 3.5 12.0802 3.5C7.10964 3.5 3.0802 7.52944 3.0802 12.5C3.0802 17.4706 7.10964 21.5 12.0802 21.5Z"
			stroke="#C9C8C9"
			strokeWidth="0.73"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		{/* Trait intérieur dynamique */}
		<Path
			d="M11.3872 10.239L15.0802 9.5L14.3412 13.193C14.2638 13.5801 14.0737 13.9356 13.7947 14.2148C13.5156 14.494 13.1602 14.6844 12.7732 14.762L9.0802 15.5L9.8192 11.807C9.89674 11.4201 10.087 11.0648 10.366 10.7858C10.645 10.5068 11.0003 10.3165 11.3872 10.239Z"
			stroke={strokeColor}
			strokeWidth="0.73"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);
