import React, { useState, useEffect } from 'react';
import CsvDownload from 'react-json-to-csv'
import './App.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue} from "firebase/database";

function App() {
  const [gameInfo, setGameInfo] = useState([]);

  const firebaseConfig = {
    apiKey: "AIzaSyAcahuzOi6ndN0x1YOmT1jO6ktT6ibH178",
    authDomain: "universe2-ktno.firebaseapp.com",
    databaseURL: "https://universe2-ktno-default-rtdb.firebaseio.com",
    projectId: "universe2-ktno",
    storageBucket: "universe2-ktno.appspot.com",
    messagingSenderId: "133222311222",
    appId: "1:133222311222:web:44ca36b10b4749a5de7f97",
    measurementId: "G-0G2S27MP5S"
  };
  
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  useEffect(() => {
      const gameRef = ref(database,'users/');
      onValue(gameRef,(snapshot) =>{
        const data = snapshot.val();
        const list = [];
        console.log(data);
        for(let id in data){
          list.push(data[id]);
        }
        setGameInfo(list);
        console.log(gameInfo);
      });
  }, []);

  const handleDeleteAll = async () => {
    await fetch("https://universe2-ktno-default-rtdb.firebaseio.com/users.json", {
      method: 'DELETE',
    })
    const newGameInfo = [];
    setGameInfo(newGameInfo);
  }

  return (
    <div className="App">
      <h1>Universe KTNO gameInfoset</h1>
        <article>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>City</th>
                <th>Sex</th>
                <th>playedTimes</th>
                <th>saleChances</th>
                <th>salesTaken</th>
                <th>soldUnits</th>
                <th>bankDebt</th>
                <th>lastKTNO</th>
                </tr>
            </thead>
            <tbody>
            {gameInfo.map((game,i) => (
              <tr key={i}>
                <td>{game.username}</td>
                <td>{game.city}</td>
                <td>{game.sex==false ? "Masculino":"Femenino"}</td>
                <td>{game.playedTimes}</td>
                <td>{game.saleChances}</td>
                <td>{game.salesTaken}</td>
                <td>{game.soldUnits}</td>
                <td>{game.bankDebt}</td>
                <td>{game.lastKTNO}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </article>
      <CsvDownload data={gameInfo} />
    </div>
  );
}

export default App;