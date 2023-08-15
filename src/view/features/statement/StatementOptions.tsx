import { FC } from 'react';
import { Statement } from '../../../model/statements/statementModel';
import StatementChat from './StatementChat';
import StatementOptionsNav from './StatementOptionsNav';
import { useParams } from 'react-router';
import { Screen } from '../../../model/system';

interface Props {
    statement: Statement;
    subStatements: Statement[];
    handleShowTalker: Function;
}

const StatementOptions: FC<Props> = ({ statement, subStatements, handleShowTalker }) => {
    try {
        const { sort } = useParams();
        const _subStatements = sortSubStatements(subStatements.filter(subStatement => subStatement.isOption),sort);
        

        return (
            <div className="page__main statement__options">

                <div className="wrapper wrapper--chat statement__options__main">
                    {_subStatements?.map((statementSub: Statement) => (
                        <div key={statementSub.statementId} >
                            <StatementChat statement={statementSub} showImage={handleShowTalker} />
                        </div>
                    ))
                    }

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
        switch (sort) {
            case Screen.OPTIONS_CONSENSUS:
                return subStatements.sort((a: Statement, b: Statement) => b.consensus - a.consensus);
            case Screen.OPTIONS_NEW:
                return subStatements.sort((a: Statement, b: Statement) => b.createdAt - a.createdAt);
            case Screen.OPTIONS_RANDOM:
                return subStatements.sort(() => Math.random() - 0.5);
                case Screen.OPTIONS_UPDATED:
                    return subStatements.sort((a: Statement, b: Statement) => b.lsetUpdate - a.lsetUpdate);
            default:
                return subStatements;
        }
    } catch (error) {
        console.error(error);
        return subStatements
    }
}