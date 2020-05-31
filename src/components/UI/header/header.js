import React from 'react';
import Aux from '../../../hoc/auxilary/auxilary';
import Logo from '../../logo/logo';
import Classes from './header.module.css';

const Headers = () => {
	return (
		<header className={Classes.Headers}>
            <Logo/>
			<h2> Covid19 India Dashboard</h2>
		</header>
	);
};

export default Headers;
