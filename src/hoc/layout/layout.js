import React from 'react';
import Aux from '../auxilary/auxilary';
import Classes from './layout.module.css';
import Headers from '../../components/UI/header/header';

const layout = (props) => {
	return (
		<Aux>
			<Headers />
			<main className={Classes.Content}>{props.children}</main>
		</Aux>
	);
};

export default layout;
