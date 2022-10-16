import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {

  return (
    <div className='connectContainer' id='contact'>
        <div className='footerBar'>
            <div className='footerButtonContainer'>
                <Link to='/home'> 
                    <button><i class="camera"></i></button>
                </Link>
                <Link to='/home'>
                    <button><i class="home"></i></button>
                </Link>
                    <button><i class="personal"></i></button>
                <Link to='/home'>
                    <button><i class="settings"></i></button>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default Footer;