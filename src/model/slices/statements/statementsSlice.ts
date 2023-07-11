import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { Statement, StatementSchema, StatementSubscription, StatementSubscriptionSchema } from '../../statementModel'
import { updateArray } from '../../../functions/general/helpers';

// Define a type for the slice state
interface StatementsState {
  statements: Statement[];
  statementSubscription: StatementSubscription[]
}

// Define the initial state using that type
const initialState: StatementsState = {
  statements: [],
  statementSubscription: []
}

export const statementsSlicer = createSlice({
  name: 'statements',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setStatement: (state, action: PayloadAction<Statement>) => {
      try {
        StatementSchema.parse(action.payload);
        state.statements = updateArray(state.statements, action.payload, "statementId");
      } catch (error) {
        console.error(error);
      }
    },
    setStatementSubscription: (state, action: PayloadAction<StatementSubscription>) => {
      try {
    
        StatementSubscriptionSchema.parse(action.payload);
        state.statementSubscription = updateArray(state.statementSubscription, action.payload, "statementsSubscribeId");
      } catch (error) {
        console.error(error);
      }
    }
  },
})

export const { setStatement, setStatementSubscription } = statementsSlicer.actions

// Other code such as selectors can use the imported `RootState` type
export const statementsSelector = (state: RootState) => state.statements.statements;
export const statementSubscriptionSelector = (state: RootState) => state.statements.statementSubscription
export const statementSelector = (statementId: string|undefined) => (state: RootState) => state.statements.statements.find(statement => statement.statementId === statementId);
export const statementSubsSelector = (statementId: string|undefined) => (state: RootState) => state.statements.statements.filter(statementSub => statementSub.parentId === statementId);

export default statementsSlicer.reducer