import {useState, useEffect} from "react"


export const CounterApp =() =>{
    const [value,setValue] = useState(0);

    useEffect(() =>{ 
        console.log("mounting called");
    } , [])

    useEffect(() =>{ 
        console.log(value,"updating called");
    } , [value])

    return(
        <>
        <button className="btn btn-danger"onClick={() => {if(value>0){setValue(value-1)}}}>-</button>
        <h1>{value}</h1>
        <button className="btn btn-success"onClick={() =>setValue(value+1)}>+</button>
        </>
    )

}