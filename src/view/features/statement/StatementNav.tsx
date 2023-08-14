import { FC } from "react"
import { Link, useParams } from "react-router-dom"
import { Statement } from "../../../model/statements/statementModel"


interface Props {
    statement: Statement

}

interface NavObject {
    link: string;
    name: string;
}

const navArray: NavObject[] = [
    { link: "options", name: "Options" },
    { link: "", name: "Chat" },
]


const StatementNav: FC<Props> = () => {

    const { statementId, page } = useParams();

    console.log(statementId, page)

    return (
        <nav className="statement__nav">
            {navArray.map((navObject: NavObject) =>
                <Link to={`${navObject.link}`} className={(page === navObject.link) || (navObject.link === "" && page === undefined) ?
                    "statement__nav__button statement__nav__button--selected"
                    :
                    "statement__nav__button"}>
                   
                        {navObject.name}
                   
                </Link>)}

        </nav>
    )
}

export default StatementNav;