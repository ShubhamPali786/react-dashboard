import React from 'react';
import Aux from '../auxilary/auxilary';
import Classes from './layout.module.css';
import Headers from '../../components/UI/header/header';
import Footer from '../../components/UI/Footer/Footer';
import loaderImg from '..//..//assets/loading-animated.gif';
const layout = (props) => {
	return (
		<Aux>
			<div id="loaderContainer" style={{display:"none"}} >
					<img src={loaderImg} className="loaderImg" alt="Loading..."/>
			</div>
			<Headers />
			
			<main className={Classes.Content}>
				
				{props.children}
				</main>
			<Footer/>
		</Aux>
	);
};

export default layout;
