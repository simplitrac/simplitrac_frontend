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

const FeaturesList = () => {
    const features = [
      "Our application is a simple to use financial tracker that allows you to record expenses on the go",
      "Intuitive AI-Driven Camera Support",
      "Manual Expense Entry",
      "Cost Tracker via Up-to-date data display and Pie Chart",
      "Edit/Delete Transaction Fuctionality",
      "Achievement System to display activity and rewards",
    ];
  
    // Render the features list
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Website Features</h2>
        <ul style={styles.list}>
          {features.map((feature, index) => (
            <li key={index} style={styles.listItem}>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  const styles = {
    container: {
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    title: {
      fontSize: "24px",
      marginBottom: "15px",
      color: "#333",
    },
    list: {
      listStyleType: "disc",
      paddingLeft: "20px",
    },
    listItem: {
      fontSize: "18px",
      marginBottom: "10px",
      color: "#555",
    },
  };
  
  // Export the component
  export default FeaturesList;