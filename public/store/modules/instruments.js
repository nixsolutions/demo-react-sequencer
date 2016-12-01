export const UPDATE_INSTRUMENTS = 'UPDATE_INSTRUMENTS';
export const TOGGLE_INSTRUMENT = 'TOGGLE_INSTRUMENT';
export const REMOVE_INSTRUMENT = 'REMOVE_INSTRUMENT';
export const TOGGLE_STEP = 'TOGGLE_STEP';
export const UPDATE_INSTRUMENT_VOLUME = 'UPDATE_INSTRUMENT_VOLUME';

const INIT = [
    {
        name: 'kick',
        volume: 60,
        active: true,
        path: './samples/hip-hop_kick.wav',
        notes: [0, 0, undefined, undefined,  undefined, 0, undefined, undefined]
    },
    {
        name: 'hip-hop_snare',
        active: true,
        volume: 36,
        path: './samples/hip-hop_snare.wav',
        notes: [undefined, undefined, undefined, 0, undefined, undefined, undefined, 0]
    },
    {
        name: 'hi-hat',
        active: true,
        volume: 96,
        path: './samples/techno_hi-hat.wav',
        notes: [0, 0, 0, 0, 0, 0, 0, 0]
    }
];

export default function instrumentsReducer(state = INIT, action){
    let {payload} = action;

    switch(action.type){
        case UPDATE_INSTRUMENTS:
            return payload;
        case TOGGLE_STEP:
            return state.map(instrument => {
                if(instrument.path === payload.path){
                    let notes = [...instrument.notes];

                    notes[payload.noteIndex] = payload.noteValue;
    
                    return {...instrument, notes};
                }

                return instrument;
            });
        case TOGGLE_INSTRUMENT:
            return state.map(instrument => {
                if(instrument === payload){
                    return {...instrument, active: !instrument.active};
                }

                return instrument;
            });
        case UPDATE_INSTRUMENT_VOLUME:
            return state.map(instrument => {
                if(instrument === payload.instrument){
                    return {...instrument, volume: payload.volume};
                }

                return instrument;
            });
        case REMOVE_INSTRUMENT:
            return state.filter(instrument => instrument !== payload);
        default:
            return state;
    }
}

export function toggleStep(note, noteIndex, instrument){
    return {
        type: TOGGLE_STEP,
        payload: {
            path: instrument.path,
            noteValue: note === undefined ? 0 : undefined,
            noteIndex
        }
    }
}

export function toggleInstrument(instrument){
    return {
        type: TOGGLE_INSTRUMENT,
        payload: instrument
    }
}

export function removeInstrument(instrument){
    return {
        type: REMOVE_INSTRUMENT,
        payload: instrument
    }
}

export function updateInstrumentVolume(instrument, volumePercents){
    return {
        type: UPDATE_INSTRUMENT_VOLUME,
        payload: {
            instrument,
            volume: volumePercents
        }
    }
}