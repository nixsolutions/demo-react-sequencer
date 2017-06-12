export let connect = (downFn, upFn) => {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let context = new AudioContext();

    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess({ sysex: false })
            .then(onMIDISuccess, onMIDIFailure);
    } else {
        alert("No MIDI support in your browser.");
    }

    function onMIDIMessage(event) {
        let data = event.data;
        let cmd = data[0] >> 4;
        let channel = data[0] & 0xf;
        let type = data[0] & 0xf0;
        let note = data[1];
        let velocity = data[2];

        if(velocity){
            downFn({ keyCode: note, velocity });
            return;
        }

        upFn({ keyCode: note, velocity });
    }

    function onMIDISuccess(midiAccess) {
        let midi = midiAccess;
        var inputs = midi.inputs.values();

        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            input.value.onmidimessage = onMIDIMessage;
        }

        midi.onstatechange = onStateChange;
    }

    function onMIDIFailure(e) {
        console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
    }

    function onStateChange(event) {
        var port = event.port,
            state = port.state,
            name = port.name,
            type = port.type;
        if (type == "input") console.log("name", name, "port", port, "state", state);
    }
}
