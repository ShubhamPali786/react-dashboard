import React from 'react';
import Aux from '../../../hoc/auxilary/auxilary';
import Logo from '../../logo/logo';
import Classes from './header.module.css';

const Headers = () => {
	return (
		<header className={Classes.Headers}>
            <Logo/>
			<div style={{position:'relative',width:'100%'}}><h2> Covid19 India Dashboard</h2> </div>
		</header>
	);
};

export default Headers;
