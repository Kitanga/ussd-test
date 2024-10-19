import lang from "./lang/index.mjs";
import { sessions } from "./server.mjs";
import stateManager from "./states/index.mjs";

const ussdMenuBuilder = async (body) => {
    const currentSession = sessions.get(body.sessionId);

    if (currentSession) {
        const current_state = currentSession.state;
        const statesLocale = stateManager.en.states;
        const langTextLocale = lang.en;
        
        const state = statesLocale[current_state];

        const option = body.input;

        if (isNaN(+option)) {
            return langTextLocale.generic.input_violation;
        }

        const ix = (+option) - 1;

        console.log('ix:', ix);
        
        const newState = state.forwardStates[ix];
        console.log('state.forwardStates:', state.forwardStates);
        
        const stateData = statesLocale[newState];
        
        if (!stateData)  {
            return langTextLocale.generic.bad_input;
        }

        currentSession.state = newState;

        return stateData.text;
    } else {
        const current_state = stateManager.en.default_state;
        const state = stateManager.en.states[current_state];

        sessions.set(body.sessionId, {
            state: current_state,
        });

        return state.text;
    }

}

export default ussdMenuBuilder;