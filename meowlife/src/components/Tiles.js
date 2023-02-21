import './Tiles.css'

export default function Tiles({ image, catHearts, updateHearts, userPoints, updatePoints,hungerLvl, updateHunger, thirstLvl, updateThirst, number, x, y }){
    if(number % 2 === 0){
            return (
                <div className='tile pink-tile'>
                    <img src={image} style={{width: '85px'}} onClick={() => {
                if(hungerLvl > 50){
                    console.log('fed', hungerLvl)
                    updatePoints(userPoints += 100)
                    updateHunger(0)
                } else if(thirstLvl > 50){
                    console.log('drank', thirstLvl)
                    updatePoints(userPoints += 100)
                    updateThirst(0)
                }
              }}>
            </img>
                </div>
            )
        } else {
            return (
            <div className = 'tile blue-tile'>
                <img src={image} style={{width: '85px'}}>
            </img>
            </div>
            ) 
        }
        
}