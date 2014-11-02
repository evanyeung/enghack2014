instruments = {
    edm: function(pitch){
        var synth = T('SynthDef').play();

        synth.def = function(opts) {
            var osc1, osc2, env;
            osc1 = T("saw", {freq:opts.freq         , mul:0.75});
            osc2 = T("saw", {freq:opts.freq * 1.6818, mul:0.6});
            //var env = T("perc", {a:5, r:50, lv:1}, T("saw"));
            //env = T("adsr", {a:100,d:250,s:0.6,r:500}, T("sin"));
            env  = T("linen", {a:10, s:50, r:50, lv:0.5}, osc1, osc2);
            return env.on("ended", opts.doneAction).bang();
        };

        synth.noteOnWithFreq(pitch, 60);
        return synth;
    },

    clarinet: function(pitch){

        var synth = T('SynthDef').play();

        synth.def = function(opts) {
            var osc = T('sin', {freq: opts.freq, mul: 1});
            var osc1 = T('sin', {freq: opts.freq*3, mul: 0.75});
            var osc2 = T('sin', {freq: opts.freq*5, mul: 0.5});
            var osc3 = T('sin', {freq: opts.freq*7, mul: 0.14});
            var osc4 = T('sin', {freq: opts.freq*9, mul: 0.5});
            var osc5 = T('sin', {freq: opts.freq*11, mul: 0.12});
            var osc6 = T('sin', {freq: opts.freq*16, mul: 0.17});

            var env  = T("linen", {a:500, s:100, r:500, lv:0.5},
                osc1, osc2, osc3, osc4, osc5, osc6);
            return env.on("ended", opts.doneAction).bang();
        };

        synth.noteOnWithFreq(pitch, 60);
        return synth;
    },

    violin: function(pitch){

        var synth = T('SynthDef').play();

        synth.def = function(opts) {
            var osc = T('sin', {freq: opts.freq, mul: 1});
            var osc1 = T('sin', {freq: opts.freq*2, mul: 0.5});
            var osc2 = T('sin', {freq: opts.freq*3, mul: 0.33});
            var osc3 = T('sin', {freq: opts.freq*4, mul: 0.25});
            var osc4 = T('sin', {freq: opts.freq*5, mul: 0.2});
            var osc5 = T('sin', {freq: opts.freq*6, mul: 0.16});
            var osc6 = T('sin', {freq: opts.freq*7, mul: 0.142});

            var env  = T("linen", {a:500, s:100, r:500, lv:0.5},
                osc1, osc2, osc3, osc4, osc5, osc6);
            return env.on("ended", opts.doneAction).bang();
        };

        synth.noteOnWithFreq(pitch, 60);
        return synth;
    }

};
