import { FC } from 'react';
import { Statement } from '../../../model/statements/statementModel';
import StatementChat from '../../features/statement/StatementChat';

interface Props {
    statement: Statement;
    subStatements: Statement[];
    handleShowTalker: Function;
}

const StatementOptions: FC<Props> = ({ statement, subStatements, handleShowTalker }) => {
    try {
        const _subStatements = subStatements.filter(subStatement => subStatement.isOption);

    return (
        <div className="page__main">

            <div className="wrapper wrapper--chat">
                {_subStatements?.map((statementSub: Statement) => (
                    <div key={statementSub.statementId} >
                        <StatementChat statement={statementSub} showImage={handleShowTalker} />
                    </div>
                ))
                }

            </div>
        </div>
    )
    } catch (error) {
        console.error(error);
        return null;
    }
    
}

export default StatementOptions