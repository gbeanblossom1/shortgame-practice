import React, {useState} from "react"
import {generateRound} from "./roundGenerator"

export default function App(){

  const [round,setRound] = useState(null)
  const [current,setCurrent] = useState(0)
  const [benchmark,setBenchmark] = useState("10")
  const [leave,setLeave] = useState("")
  const [totalSG,setTotalSG] = useState(0)

  function startRound(){
    setRound(generateRound())
    setCurrent(0)
    setTotalSG(0)
  }

  function submitShot(){
    const sg = Math.random()*0.5 - 0.2
    setTotalSG(totalSG + sg)
    setLeave("")

    if(current < 17){
      setCurrent(current+1)
    }else{
      alert("Round complete. SG: "+(totalSG+sg).toFixed(2))
      setRound(null)
    }
  }

  if(!round){
    return(
      <div className="container">
        <h1>Short Game Practice</h1>

        <select value={benchmark} onChange={e=>setBenchmark(e.target.value)}>
          <option value="scratch">Scratch</option>
          <option value="10">10 Handicap</option>
          <option value="20">20 Handicap</option>
        </select>

        <button onClick={startRound}>Start 18 Hole Round</button>
      </div>
    )
  }

  const hole = round[current]

  return(
    <div className="container">
      <h2>Hole {current+1}</h2>
      <p>{hole.lie} • {hole.yards} yards</p>

      <input
        placeholder="Leave distance (ft)"
        value={leave}
        onChange={e=>setLeave(e.target.value)}
      />

      <button onClick={submitShot}>Submit Shot</button>

      <p>Total SG: {totalSG.toFixed(2)}</p>
    </div>
  )
}