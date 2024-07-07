import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import BackButton from "./BackButton.jsx";
import {useContext} from "react";
import {AppContext} from "../context/AppContext.jsx";
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

//
// import React, { useEffect, useState } from 'react';
//
// // import './App.css';
// import { auth, onAuthStateChanged } from '../config/initializeFirestore.js'




const Chart = () =>{

    const {user} = useContext(AppContext)

    const countCategories = () => {
        const categories = user.categories

        return categories.map((category) => {
        return {
            category: category,
            count: user.transactions.filter((transaction) => transaction === category)}
        })
    }

    return (
        <>
            <LineChart width={600} height={300} data={user}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey={user.categories} />
                <YAxis dataKey={countCategories()}/>
            </LineChart>
            <BackButton />
        </>
    );
}

export default Chart

//
//
// const Chart = () => {
//     const [userId, setUserId] = useState("");
//
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 setUserId(user.uid);
//             } else {
//                 setUserId("");
//             }
//         });
//         return () => unsubscribe();
//     }, []);
//
//     return (
//         <div className="App">
//             <h1>SimpliTrac</h1>
//             {userId && <LookerStudioChart userId={userId} />}
//         </div>
//     );
// };
//

// export default Chart;