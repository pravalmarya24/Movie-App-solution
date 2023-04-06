import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const FooterSection = () => (
  <div className="footer-section-container">
    <div className="icon-container">
      <FaGoogle className="icon-style" />
      <FaTwitter className="icon-style" />
      <FaInstagram className="icon-style" />
      <FaYoutube className="icon-style" />
    </div>
    <p className="contact-para">Contact us</p>
  </div>
)

export default FooterSection
