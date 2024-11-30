import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t flex justify-between">
      <div className="container mx-auto p-4 flex flex-col md:flex-row md:justify-between text-center">
        <p className="text-center">© All Rights Reserved 2024</p>
        <div className="flex items-center gap-4 justify-center mt-1 text-3xl">
          <a href="" target="_blank">
            <FaFacebook className="hover:text-yellow-500" />
          </a>
          <a href="">
            <FaInstagram className="hover:text-yellow-500" />
          </a>
          <a href="">
            <FaLinkedin className="hover:text-yellow-500" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
