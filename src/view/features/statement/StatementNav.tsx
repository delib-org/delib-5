import { FC } from "react"
import { Link, useParams } from "react-router-dom"
import { Statement } from "../../../model/statements/statementModel"
import { Screen } from "../../../model/system";


interface Props {
    statement: Statement

}

interface NavObject {
    link: Screen;
    name: string;
    id: string;
}

const navArray: NavObject[] = [
    { link: Screen.OPTIONS, name: "Options", id: "options" },
    { link: Screen.CHAT, name: "Chat", id:"main" },
]


const StatementNav: FC<Props> = () => {

    const { statementId, page } = useParams();

    console.log(statementId, page)

    return (
        <nav className="statement__nav">
            {navArray.map((navObject: NavObject) =>
                <Link key={navObject.id} to={`${navObject.link}`} className={(page === navObject.link) || (navObject.link === "" && page === undefined) ?
                    "statement__nav__button statement__nav__button--selected"
                    :
                    "statement__nav__button"}>
                   
                        {navObject.name}
                   
                </Link>)}

        </nav>
    )
}

export default StatementNav;