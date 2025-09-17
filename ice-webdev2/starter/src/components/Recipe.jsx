import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Stopwatch from "../utils/Stopwatch";

export default function Recipe(props) {

    const [likes, setLikes] = useState(0);

    function handleLike() {
        setLikes(oLikes => oLikes + 1)
    }

    useEffect(() => {
        if (likes > 0) { // remember this gets ran on mount and dependency change, check just for dependency change!
            console.log(Stopwatch.get(), `C: The number of likes has committed for ${props.name ?? "anonymous"} recipe!`)
        } else {
            console.log(Stopwatch.get(), `C: Recipe component has mounted for ${props.name ?? "anonymous"} recipe!`)
        }
    }, [likes]);

    console.log(Stopwatch.get(), `R: ${props.name ?? "anonymous"} Recipe is re-rendering!`)

    return <Card style={{margin: "auto", marginTop: "1rem", maxWidth: "40rem"}}>
        {
            Object.keys(props).length > 0 ? <>
                <img src={props.img.location} alt={props.img.description}/>
                <h2>{props.name}</h2>
                <p>by {props.author} | <strong>{likes} likes</strong></p>
                <p>described as {props.keywords.join(", ")}</p>
                <Button onClick={handleLike}>Like this Recipe</Button>
            </> : <p>Loading...</p>
        }
    </Card>
}