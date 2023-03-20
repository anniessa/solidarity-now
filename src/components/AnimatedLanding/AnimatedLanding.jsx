import Web from '../graphics/spider_web.png';
import HandHeart from '../graphics/hand_heart.png';
import Logo from '../graphics/logo.png';
import './AnimatedLanding.css';

function AnimatedLanding() {


    return (
        <div className='container'>
        <div className='web'>
            <div className="web-img">
                
            </div>
            <div className='circle'>
                <div className='icon'><img src={Logo} /></div>
            </div>
        </div>
        </div>
    )

}

export default AnimatedLanding;