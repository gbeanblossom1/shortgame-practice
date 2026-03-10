const lies = ["fairway","rough","bunker"]

const lieWeights = {
  fairway:0.45,
  rough:0.40,
  bunker:0.15
}

const distanceWeights = [
  {range:[1,5], weight:0.20},
  {range:[6,10], weight:0.25},
  {range:[11,20], weight:0.25},
  {range:[21,30], weight:0.20},
  {range:[31,50], weight:0.10}
]

function weightedChoice(weights){
  const r = Math.random()
  let total = 0
  for(const key in weights){
    total += weights[key]
    if(r <= total) return key
  }
}

function randomDistance(){
  const r = Math.random()
  let total = 0
  for(const d of distanceWeights){
    total += d.weight
    if(r <= total){
      const [min,max] = d.range
      return Math.floor(Math.random()*(max-min+1))+min
    }
  }
}

export function generateRound(){
  const holes=[]
  for(let i=0;i<18;i++){
    holes.push({
      lie: weightedChoice(lieWeights),
      yards: randomDistance()
    })
  }
  return holes
}