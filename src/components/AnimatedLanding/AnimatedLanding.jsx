import './AnimatedLanding.css';
import { useSelector } from 'react-redux';

function AnimatedLanding() {
    const user = useSelector(store =>  store.user);
    console.log(user.id)
    return (
        <>
        <div className='circle'>
        <div className='text'>
            <span>Solidarity Now!</span>
            
        </div>
       </div>

        </>
    )
}

export default AnimatedLanding;