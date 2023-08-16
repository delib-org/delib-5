import { FC, useEffect } from 'react';
import { Statement } from '../../../model/statements/statementModel';
import StatementOptionsNav from './StatementOptionsNav';
import { useParams } from 'react-router';
import { Screen } from '../../../model/system';
import StatementOptionCard from './StatementOptionCard';
import { useAppDispatch } from '../../../functions/hooks/reduxHooks';
import { setStatementOrder } from '../../../model/statements/statementsSlice';


interface Props {
    statement: Statement;
    subStatements: Statement[];
    handleShowTalker: Function;
}

const StatementOptions: FC<Props> = ({ statement, subStatements, handleShowTalker }) => {
    try {
        const dispatch = useAppDispatch();
        const { sort } = useParams();
        const __substatements = subStatements.filter((subStatement: Statement) => subStatement.isOption);
        const _subStatements = sortSubStatements(__substatements, sort);

        function dispatchCB(statement: Statement, order: number) {
            dispatch(setStatementOrder({ statementId: statement.statementId, order: order }))
        }

        useEffect(() => {
            _subStatements.forEach((statement: Statement, i: number) => {
                dispatchCB(statement, i);
            })
        }, [sort])

        let topSum = 0;
        let tops: number[] = [0];

        return (
            <div className="page__main statement__options">

                <div className="wrapper wrapper--chat statement__options__main">
                    {_subStatements?.map((statementSub: Statement, i: number) => {

                        //get the top of the element
                        if (statementSub.elementHight) {
                            topSum += ((statementSub.elementHight) + 10);
                            tops.push(topSum)
                            console.log(tops)
                        }

                        return <StatementOptionCard key={statementSub.statementId} statement={statementSub} showImage={handleShowTalker} top={tops[i]} />
                    })}

                </div>
                <StatementOptionsNav statement={statement} />
            </div>
        )
    } catch (error) {
        console.error(error);
        return null;
    }



}

export default StatementOptions;

function sortSubStatements(subStatements: Statement[], sort: string | undefined) {
    try {
        let _subStatements = [...subStatements];
        switch (sort) {
            case Screen.OPTIONS_CONSENSUS:
                _subStatements = subStatements.sort((a: Statement, b: Statement) => b.consensus - a.consensus);
                break;
            case Screen.OPTIONS_NEW:
                _subStatements = subStatements.sort((a: Statement, b: Statement) => b.createdAt - a.createdAt);
                break;
            case Screen.OPTIONS_RANDOM:
                _subStatements = subStatements.sort(() => Math.random() - 0.5);
                break;
            case Screen.OPTIONS_UPDATED:
                _subStatements = subStatements.sort((a: Statement, b: Statement) => b.lastUpdate - a.lastUpdate);
                break;
            default:
                return _subStatements;
        }
        // _subStatements.forEach((statement: Statement, i: number) => {
        //     dispatchCB(statement, i);
        // })

        return _subStatements;
    } catch (error) {
        console.error(error);
        return subStatements
    }
}

