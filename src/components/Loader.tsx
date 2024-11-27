import "./Loader.css"; // Assurez-vous d'avoir un fichier CSS pour styliser le loader
import Image from "next/image";

const Loader = () => {
  return (
    <div className="loader-container">
      <Image src="/logo_bg.svg" width={100} height={100} className="loader-logo" alt="Loading..." />
      <div className="loader-text font-semibold">Loading...</div>
    </div>
  );
};

export default Loader;
