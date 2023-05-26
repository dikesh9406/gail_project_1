import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Textfit } from 'react-textfit';
// import { Logo } from '../components';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import React from 'react';

const Landing = () => {
  const { user } = useAppContext();
  return (
    <React.Fragment>
      {user && <Navigate to='/' />}
      <Wrapper>
        <nav>
          {/* <Logo /> */}
        </nav>
        <div className='container page'>
          {/* info */}
          <div className='info'>
            <Textfit>
            <h1>
              Real-time <span>Data Visulization</span> Dashboard
            </h1>
            <h4>
              This Web Application fetches 
              Data of Electric Motors and displays them on a Dashboard.
              <br></br>
              <br></br>
              Project under: <br></br>
              Gas Authority of India (GAIL)
            </h4>
            </Textfit>
            
            <Link to='/register' className='btn btn-hero'>
              Login/Register
            </Link>
          </div>
          {/* <img src={main} alt='job hunt' className='img main-img' /> */}
          <img 
      src="https://cdn-icons-png.flaticon.com/512/6292/6292175.png"
      alt="new"
      />
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default Landing;
