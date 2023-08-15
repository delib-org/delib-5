import { FC } from "react"
import { Link, useParams } from "react-router-dom"
import { Statement } from "../../../model/statements/statementModel"
import { NavObject, Screen } from "../../../model/system";


interface Props {
    statement: Statement

}



const navArray: NavObject[] = [
    { link: Screen.OPTIONS_CONSENSUS, name: "הסכמה", id: Screen.OPTIONS_CONSENSUS },
    { link: Screen.OPTIONS_NEW, name: "חדש", id: Screen.OPTIONS_NEW },
    { link: Screen.OPTIONS_RANDOM, name: "אקראי", id: Screen.OPTIONS_RANDOM }
   
]


const StatementOptionsNav: FC<Props> = () => {

    const { sort } = useParams();

console.log(sort);
    return (
        <nav className="statement__options__nav">
            {navArray.map((navObject: NavObject) =>
                <Link key={navObject.id} to={`options/${navObject.link}`} className={sort ===  navObject.link?
                    "statement__options__nav__button statement__nav__button--selected"
                    :
                    "statement__options__nav__button"}>
                   
                        {navObject.name}
                   
                </Link>)}

        </nav>
    )
}

export default StatementOptionsNav;