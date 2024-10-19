// English states

export const STATES = {
    MAIN_MENU: "main_menu",
    BANKING: "banking",
    MOBILE_MONEY: "mobile_money",
    CASH: "cash",
    STANBIC: "Stanbic",
    ZANACO: "Zanaco",
    IDB: "IDB",
    FNB: "FNB",
    MTN: "MTN",
    AIRTEL: "Airtel",
    ZAMTEL: "Zamtel",
    ZED_MOBILE: "Zed Mobile",
}

export default {
    default_state: STATES.MAIN_MENU,
    states: {
        [STATES.MAIN_MENU]: {
            text: "Welcome to the Main Menu:\n\n1. Banking \n2. Mobile Money \n3. Cash",

            forwardStates: [
                STATES.BANKING,
                STATES.MOBILE_MONEY,
                STATES.CASH,
            ]
        },

        [STATES.BANKING]: {
            text: "Banking\n\n1. Stanbic \n2. Zanaco \n3. IDB \n4. FNB ",
            forwardStates: [
                STATES.STANBIC,
                STATES.ZANACO,
                STATES.IDB,
                STATES.FNB,
            ]
        },

        [STATES.MOBILE_MONEY]: {
            text: "Mobile Money \n\n1. MTN \n2. Airtel \n3. Zamtel \n4. Zed Mobile ",
            forwardStates: [
                STATES.MTN,
                STATES.AIRTEL,
                STATES.ZAMTEL,
                STATES.ZED_MOBILE,
            ]
        },
        [STATES.CASH]: {
            text: `${STATES.CASH.toUpperCase()}`,
            forwardStates: [],
        },
        [STATES.STANBIC]: {
            text: `${STATES.STANBIC.toUpperCase()}`,
            forwardStates: [],
        },
        [STATES.ZANACO]: {
            text: `${STATES.ZANACO.toUpperCase()}`,
            forwardStates: [],
        },
        [STATES.IDB]: {
            text: `${STATES.IDB.toUpperCase()}`,
            forwardStates: [],
        },
        [STATES.FNB]: {
            text: `${STATES.FNB.toUpperCase()}`,
            forwardStates: [],
        },
        [STATES.MTN]: {
            text: `${STATES.MTN.toUpperCase()}`,
            forwardStates: [],
        },
        [STATES.AIRTEL]: {
            text: `${STATES.AIRTEL.toUpperCase()}`,
            forwardStates: [],
        },
        [STATES.ZAMTEL]: {
            text: `${STATES.ZAMTEL.toUpperCase()}`,
            forwardStates: [],
        },
        [STATES.ZED_MOBILE]: {
            text: `${STATES.ZED_MOBILE.toUpperCase()}`,
            forwardStates: [],
        },
    }
}