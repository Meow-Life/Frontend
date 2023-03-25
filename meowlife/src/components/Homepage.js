import styled from '@emotion/styled'
import { useNavigate } from "react-router-dom";

const Border = styled.div`
    display: flex;
    flex-flow: column wrap;
    // border: 2px solid #F0B6D5;
    width: 50vw;
    padding: 50px;
    position: absolute;
    top: 10%;
    left: 20%;
    height: 50vh;
    background-color: #F0B6D5;
    font-family: 'Bubblegum Sans', cursive;
    font-size: 35px;
    text-align: center;
    margin: 25px;
    `
const Button = styled.button`
    padding-top: 50px;
    text-align: center;
    border-radius: 5px;
    padding: 9px 25px;
    font-size: 22px;
    text-decoration: none;
    margin: 20px;
    color: black;
    position: relative;
    display: inline-block;
    background-color: white;
    box-shadow: 0px 5px 0px 0px white;
    margin-top: 120px;
    width: 10vw;
    height: 6vh;
    left: 38%;
    border: 0px white
`
const Text = styled.p`
    font-size: 11px;
    `


export default function Homepage(){
    const navigate = useNavigate();

    const handleClick = () => {
        console.log('hi')
        navigate("/signup")
    }
    return (
        <div>
            <Border>
                    Meow Life
                    <Text>A cat simulation game.</Text>
                    <Button onClick={handleClick}>Begin</Button>
            </Border>
        </div>
    )
};