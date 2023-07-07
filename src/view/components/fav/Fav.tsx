import {FC} from 'react'

interface Props {
    onclick?:Function;
}
const Fav:FC<Props> = ({onclick}) => {
  return (
    <div className="fav" onClick={(ev)=>onclick?onclick(ev):null}><div>+</div></div>
  )
}

export default Fav