import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NOT_HOME } from "../../redux/actions";
import UserCreate from '../../Components/UserCreate/UserCreate';


import './Home.scss';

const Home = (props) => {
    

    useEffect(() => {
        console.log('Created')
        props.dispatch({ type: NOT_HOME })
    }, [])

    return (
        <div className='designHome'>
            {/* <div className='sectionHome'> */}
            
            <UserCreate/>
            
{/* 
            </div> */}
            </div>
    )

}

export default connect()(Home);


