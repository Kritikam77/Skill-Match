import { useEffect,useState } from "react";
import { useScroll } from "./useScroll";

interface UseTranslateOptions{
    minValue:number;
    maxValue:number;
    step:number;
}

export function UseTranslate({minValue,maxValue,step}:UseTranslateOptions){
    const {scroll,direction}=useScroll();
    const [translate,setTranslate]=useState(-30)

    useEffect(()=>{
       
        let newTranslate=translate;
        
        if (
            scroll > minValue && 
            scroll < maxValue && 
            direction == "down"
        ) {
          newTranslate = newTranslate + step;
          console.log("down " +scroll+" "+translate)
        } else if (
          scroll > minValue &&
          scroll < maxValue &&
          direction == "up" &&
          translate > -10
        ) {
          newTranslate = newTranslate - step;
          console.log("up "+ scroll + " " + translate);
        }

    setTranslate(newTranslate)
    },[scroll,direction])


    return translate;
}