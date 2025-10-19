import Image from "next/image";

const Logo = ({ size = "w-6 h-6", className = "", alt = "Logo" }) => {
  return (
    <span className={`inline-flex items-center align-middle ${className}`}>
      <Image
        src="/waterloo.png"
        alt={alt}
        width={24} // Default width, can be adjusted via props
        height={24} // Default height, can be adjusted via props
        className={`inline-block ${size}`}
      />
    </span>
  );
};

export default Logo;
