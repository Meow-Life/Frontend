import './Tiles.css'

export default function Tiles({ image, catHearts, updateHearts, userPoints, updatePoints, hungerLvl, updateHunger, thirstLvl, updateThirst, number, x, y }){

    const handleSpriteClick = (e) => {
        // verifying the sprite clicked + hunger lvl is above 50
            if(e.target.id === "4" && hungerLvl > 50){
                updatePoints(userPoints += 100)
                updateHunger(0)
                console.log('hunger', hungerLvl, userPoints)
                // checking if game redeem cat hearts if necessary (i.e. they lost hearts but now gained 1)
                if(catHearts < 3){
                    updateHearts(catHearts += 1)
                    console.log(catHearts)
                }
        // verifying the sprite clicked + thirst lvl is above 50
            } else if(e.target.id === "6" && thirstLvl > 50){
                updatePoints(userPoints += 100)
                updateThirst(0)
                console.log('thirst', thirstLvl, userPoints)
            // checking if game redeem cat hearts if necessary (i.e. they lost hearts but now gained 1)
                if(catHearts < 3){
                        updateHearts(catHearts += 1)
                        console.log(catHearts)
                    }
        // checking if the wrong sprite was clicked
            } else if (e.target.id === "4" && hungerLvl <= 50){
                updatePoints(userPoints -= 50)
                updateHearts(catHearts -= 1)
                console.log(userPoints, catHearts)
            } else if (e.target.id === "6" && thirstLvl <= 50){
                updatePoints(userPoints -= 50)
                updateHearts(catHearts -= 1)
                console.log(userPoints, catHearts)
            }
          }

    if(number % 2 === 0){
            return (
                <div className='tile pink-tile'>
                    <img id={number} src={image} style={{width: '85px'}} onClick={(e) => handleSpriteClick(e)}></img>
                </div>
            )
        } else {
            return (
            <div className = 'tile blue-tile'>
                <img id={number} src={image} style={{width: '85px'}} onClick={(e) => handleSpriteClick(e)}></img>
            </div>
            ) 
        }
        
}