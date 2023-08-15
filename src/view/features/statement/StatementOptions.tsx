import { FC } from 'react';
import { Statement } from '../../../model/statements/statementModel';
import StatementChat from './StatementChat';
import StatementOptionsNav from './StatementOptionsNav';
import { useParams } from 'react-router';

interface Props {
    statement: Statement;
    subStatements: Statement[];
    handleShowTalker: Function;
}

const StatementOptions: FC<Props> = ({ statement, subStatements, handleShowTalker }) => {
    try {
        const _subStatements = subStatements.filter(subStatement => subStatement.isOption);
        const { page, subPage } = useParams();

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

export default StatementOptions