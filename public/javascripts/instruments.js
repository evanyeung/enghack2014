instruments = {
    edm: function(pitch){
        var synth = T('SynthDef').play();

        synth.def = function(opts) {
            var osc1, osc2, env;
            osc1 = T("saw", {freq:opts.freq         , mul:1});
            osc2 = T("saw", {freq:opts.freq * 1.6818, mul:0.8});
            //var env = T("perc", {a:5, r:50, lv:1}, T("saw"));
            //env = T("adsr", {a:100,d:250,s:0.6,r:500}, T("sin"));
            env  = T("linen", {a:10, s:200, r:50, lv:0.5}, osc1, osc2);
            return env.on("ended", opts.doneAction).bang();
        };

        synth.noteOnWithFreq(pitch, 60);
        return synth;
    },

    clarinet: function(pitch){
        var synth = T('SynthDef').play();

        synth.def = function(opts) {
            var osc = T('tri', {freq: opts.freq, mul: 1});
            var osc1 = T('tri', {freq: opts.freq*3, mul: 0.75});
            var osc2 = T('tri', {freq: opts.freq*5, mul: 0.5});
            var osc3 = T('tri', {freq: opts.freq*7, mul: 0.14});
            var osc4 = T('tri', {freq: opts.freq*9, mul: 0.3});
            var osc5 = T('tri', {freq: opts.freq*11, mul: 0.12});
            var osc6 = T('tri', {freq: opts.freq*16, mul: 0.17});

            var env  = T("linen", {a:400, s:100, r:500, lv:0.5},
                osc, osc1, osc2, osc3, osc4, osc5, osc6);
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
                osc, osc1, osc2, osc3, osc4, osc5, osc6);
            return env.on("ended", opts.doneAction).bang();
        };

        synth.noteOnWithFreq(pitch*2, 60);
        return synth;
    },

    chimes: function(pitch){
        var synth = T('SynthDef').play();

        synth.def = function(opts) {
            var osc = T('sin', {freq: opts.freq, mul: 1});
            var osc1 = T('sin', {freq: opts.freq*3.5, mul: 0.75});
            var osc2 = T('sin', {freq: opts.freq*5.5, mul: 0.5});
            var osc3 = T('sin', {freq: opts.freq*7.5, mul: 0.14});
            var osc4 = T('sin', {freq: opts.freq*9.5, mul: 0.5});
            var osc5 = T('sin', {freq: opts.freq*11.5, mul: 0.12});
            var osc6 = T('sin', {freq: opts.freq*16.5, mul: 0.17});

            var env  = T("linen", {a:100, s:100, r:1000, lv:0.5},
                osc, osc1, osc2, osc3, osc4, osc5, osc6);
            return env.on("ended", opts.doneAction).bang();
        };

        synth.noteOnWithFreq(pitch, 60);
        return synth;
    },
    kick: function(pitch){
        var synth = T('SynthDef').play();

        synth.def = function(opts) {
            var osc = T('tri', {freq: opts.freq, mul: 40});

            var env  = T('perc', {a:10, r:400},
                osc);
            return env.on('ended', opts.doneAction).bang();
        };

        synth.noteOnWithFreq(Math.floor(pitch*0.1), 60);
        return synth;
    },

};
