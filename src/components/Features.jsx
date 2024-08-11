import {useContext, useEffect, useRef, useState} from "react";
import { useForm, Controller} from 'react-hook-form';
import { AppContext } from "../context/AppContext.jsx";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import FormData from '../models/FormData.js';
import logo from '../../docs/pictures/simplitrac_logo.png';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../App.css';
import BackButton from "./BackButton.jsx";

const Features = () => {
    return(
        <>
        <Container>
                <Row>
                    <Col xs={1} md={1}>
                        <Image src={logo} role="logo" style={{ width: '300px', height: '300px' }} roundedCircle/>
                    </Col>
                </Row>
        </Container>
         <div>
            <p>Welcome to the SimpliTrac Features Guide!</p>
            <p>Our application is a simple to use financial tracker that allows you to record expenses on the go.</p>
            <p> -------------------------------------------- </p>
            <p>With our intuitive AI-driven camera setup, you can snap pictures of your receipts on the fly and record your daily expenses.</p>
            <p> -------------------------------------------- </p>
            <p>Or you can manually enter your expenses on the main page with our easy to use Expense Table.</p>
            <p> -------------------------------------------- </p>
            <p>See where your money is going in real time with our handy Chart feature.</p>
            <p> -------------------------------------------- </p>
            <p>And use the Edit Transaction function to correct any errors in your expense processing.</p>
            <p> -------------------------------------------- </p>
            <p>Be sure to check your achievements tab to see how you rank among other users and earn badges while maintaining financial peace of mind!</p>
            <BackButton />
         </div>
    </>
    )
}

export default Features;