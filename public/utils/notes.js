export const OCTAVE_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const START_OCTAVE = 3;

export let noteToPitch = note => {
    let pureNote = note.slice(0, -1);
    let octave = note.slice(-1);
    let octaveLength = OCTAVE_NOTES.length;
    let noteIndex = OCTAVE_NOTES.indexOf(pureNote);

    let octavesOffset = octave - START_OCTAVE; 
    let pitch = (octavesOffset * octaveLength) + noteIndex;

    return pitch;
}

export let getFrequencyOfNote = note => {
    let notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    let octave = note.slice(-1);
    let key_number = notes.indexOf(note.slice(0, -1));

    if (key_number < 3) {
        key_number = key_number + 12 + ((octave - 1) * 12) + 1;
    } else {
        key_number = key_number + ((octave - 1) * 12) + 1;
    }

    return 440 * Math.pow(2, (key_number - 49) / 12);
}

export let volumeToDecibels = volume => {
        return -40 + ((40 / 100) * volume);
    }