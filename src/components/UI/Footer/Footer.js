import React from 'react';
import Classes from './Footer.module.css';
const Footer = () =>{

    return(<footer>
        <div className={Classes.footerContainer}>
            <div className={Classes.gitLinkContainer} >
                <p onClick={()=>window.open("https://github.com/ShubhamPali786/react-dashboard")}>Open Sourced on GitHub</p>
            </div>
            <div className={Classes.ApiLinkContainer} >
                <p onClick={()=>window.open("https://api.covid19india.org/")}>COVID19-India API</p>

            </div>
        </div>
    </footer>);
}

export default Footer
