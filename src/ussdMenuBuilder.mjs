import lang from "./lang/index.mjs";
import { sessions } from "./server.mjs";
import { STATES } from "./states/en.mjs";
import stateManager from "./states/index.mjs";

const ussdMenuBuilder = async (body) => {
    const currentSession = sessions.get(body.sessionID);

    if (currentSession) {
        const currentState = currentSession.state;
        const statesLocale = stateManager.en.states;
        const langTextLocale = lang.en;

        const state = statesLocale[currentState];

        const option = body.userData.trim();

        if (option == 'b' && currentState !== STATES.MAIN_MENU) {
            // Get the last state
            currentSession.statePath.pop();
            const lastState = currentSession.statePath[currentSession.statePath.length - 1];

            console.log('Last state:', lastState);

            currentSession.state = lastState;

            return {
                userID: body.userID,
                sessionID: body.sessionID,
                continueSession: true,
                msisdn: body.msisdn,
                message: statesLocale[lastState].text,
            };
        }

        if (isNaN(+option)) {
            sessions.delete(body.sessionID);

            return {
                userID: body.userID,
                sessionID: body.sessionID,
                continueSession: false,
                msisdn: body.msisdn,
                message: langTextLocale.generic.input_violation,
            };
        }

        const ix = (+option) - 1;

        console.log('ix:', ix);

        const newState = state.forwardStates[ix];
        console.log('state.forwardStates:', state.forwardStates);

        const stateData = statesLocale[newState];

        if (!stateData) {
            sessions.delete(body.sessionID);

            return {
                userID: body.userID,
                sessionID: body.sessionID,
                continueSession: false,
                msisdn: body.msisdn,
                message: langTextLocale.generic.bad_input,
            };
        }

        currentSession.state = newState;

        const continueSession = !!stateData.forwardStates.length;

        if (continueSession) {
            currentSession.statePath.push(newState);
        } else {
            sessions.delete(body.sessionID);
        }

        return {
            userID: body.userID,
            sessionID: body.sessionID,
            continueSession,
            msisdn: body.msisdn,
            message: stateData.text,
        };
    } else {
        const current_state = stateManager.en.default_state;
        const state = stateManager.en.states[current_state];

        sessions.set(body.sessionID, {
            state: current_state,
            userID: body.userID,
            continueSession: true,
            msisdn: body.msisdn,
            statePath: [current_state],
        });

        return {
            userID: body.userID,
            sessionID: body.sessionID,
            continueSession: true,
            msisdn: body.msisdn,
            message: state.text,
        };
    }

}

export default ussdMenuBuilder;