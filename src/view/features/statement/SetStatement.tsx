import React from 'react'
import { Statement, StatementSchema } from '../../../model/statementModel';
import { setStatment } from '../../../functions/db/statements/setStatments';
import { Link } from 'react-router-dom';

const SetStatement = () => {
    function handleSetStatment(ev: React.FormEvent<HTMLFormElement>) {
        try {
            
            ev.preventDefault();
            const data = new FormData(ev.currentTarget);
           
            const newStatement:any = Object.fromEntries(data.entries());
           
            StatementSchema.parse(newStatement)

            setStatment(newStatement);
            ev.currentTarget.reset();
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <Link to={"/home"}> <button>Back</button></Link>
            <form onSubmit={handleSetStatment}>
                <input type="text" name="statement" placeholder='title' />
                <input type="submit" value="ADD" />
            </form>
        </div>
    )
}

export default SetStatement