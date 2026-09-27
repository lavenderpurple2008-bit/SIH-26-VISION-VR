var ClassroomBot = pc.createScript('classroomBot');

ClassroomBot.attributes.add('autoStart', { type: 'boolean', default: true });


// Offline Q&A knowledge base — no external API. Keyword-matched, same approach
// as the reference lesson page (falls back to this when no API is configured).
var CLASSROOM_KB = [
 {k:["moderator","slow","graphite","thermal neutron","heavy water","d2o"],
  a:"The moderator slows fast neutrons down to thermal speed. Neutrons are born from fission at about 2 MeV, but Uranium-235 fissions most readily with neutrons of about 0.025 eV. The moderator, such as graphite, light water, heavy water or beryllium, slows them by repeated elastic collisions while absorbing very few of them. Light nuclei work best, because in a head-on collision a neutron loses the most energy to a nucleus of similar mass."},
 {k:["control rod","boron","cadmium","hafnium","scram","shutdown","regulate"],
  a:"Control rods are made of boron, cadmium or hafnium, which absorb neutrons strongly. Pushing them in absorbs more neutrons and reduces power, pulling them out raises power. In an emergency they drop fully into the core under gravity within about two seconds, and that is called a scram. Remember the distinction: the moderator slows neutrons, the control rods absorb them."},
 {k:["critical","k factor","multiplication","supercritical","subcritical"],
  a:"The multiplication factor k is the ratio of neutrons in one generation to the previous generation. k equal to 1 is critical, the steady operating state. k greater than 1 is supercritical, power rising. k less than 1 is subcritical, power falling. A reactor is deliberately held at exactly k equal to 1 during normal running."},
 {k:["u-235","u235","uranium","fuel rod","enrich","fissile","u-238","pellet","cladding"],
  a:"Natural uranium contains only about 0.7 percent Uranium-235, the fissile isotope, the rest is Uranium-238. Reactor fuel is enriched to roughly 3 percent, made into uranium dioxide ceramic pellets, and sealed into metal cladding tubes. Each fission of Uranium-235 releases about 200 MeV, and 1 gram of Uranium-235 gives roughly 1 megawatt-day of heat."},
 {k:["chain reaction","fission","split atom","neutron release","200 mev"],
  a:"A slow neutron is absorbed by a Uranium-235 nucleus, which becomes unstable and splits into two lighter fragments, releasing about 200 MeV of energy and 2 to 3 fresh neutrons. Those neutrons cause further fissions, so the reaction sustains itself. Almost all the energy appears immediately as kinetic energy of the fragments, which is simply heat."},
 {k:["bomb","explode","explosion","hiroshima","atomic bomb"],
  a:"A power reactor cannot explode like a nuclear bomb. A bomb needs uranium enriched to over 90 percent and an extremely fast assembly, reactor fuel is only about 3 percent enriched and is moderated, which makes such a runaway physically impossible. The real hazards are overheating, loss of coolant and release of radioactivity, not detonation."},
 {k:["heat exchanger","steam generator","mix","two loop","primary secondary","never mix"],
  a:"In the heat exchanger, hot radioactive primary coolant flows through tubes while clean feed water surrounds them. Heat crosses the tube walls and boils the feed water into steam, but the two fluids never mix. That is what keeps the turbine hall free of radioactivity, so maintenance staff can work there safely."},
 {k:["coolant","primary circuit","pressuris","150 bar","sodium","co2","carbon dioxide"],
  a:"The coolant carries heat out of the core to the heat exchanger. It may be pressurised light water at about 150 bar, heavy water, carbon dioxide gas, or liquid sodium in fast breeder reactors. Water is kept at high pressure so it does not boil inside the core. This primary coolant becomes radioactive and therefore stays in a sealed, shielded loop."},
 {k:["turbine","blade","expand","expanded steam","stage","mechanical"],
  a:"In the turbine, high pressure steam expands through nozzles and blades. Its pressure and temperature fall, and that lost thermal energy becomes kinetic energy that pushes the blades and rotates the shaft, heat energy converted into mechanical energy. Large units use high, intermediate and low pressure stages so the steam gives up its energy gradually."},
 {k:["alternator","generator","faraday","emf","synchronous","3000 rpm","1500","frequency","120f"],
  a:"The alternator is a synchronous generator. Its rotor is a DC-excited electromagnet driven by the turbine, as the field sweeps past the stator windings, Faraday's law induces an alternating e m f. Speed and frequency are locked by N equals 120 f over P, so a 2-pole machine on a 50 Hertz grid must run at exactly 3000 rpm, a 4-pole machine runs at 1500 rpm."},
 {k:["condenser","vacuum","latent","why condense","exhaust steam"],
  a:"The condenser turns exhaust steam back into water by removing its latent heat. It does two jobs. First, condensation creates a vacuum of about 0.05 bar at the turbine exhaust, which increases the pressure drop across the turbine and so increases the work obtained. Second, it recovers the expensive demineralised feed water for reuse."},
 {k:["cooling tower","evaporat","plume","smoke","draught","hyperbolic"],
  a:"The cooling tower rejects waste heat from the condenser cooling water. Warm water is sprayed and falls through rising air in the tall hyperbolic shell, a small fraction evaporates and carries away a large amount of heat. What you see rising is water vapour, not smoke, and it is not radioactive."},
 {k:["efficiency","33","35","carnot","second law","waste heat","why so low"],
  a:"Overall efficiency is only about 30 to 35 percent, limited by the second law of thermodynamics through the Carnot expression, efficiency equals 1 minus cold temperature over hot temperature. Steam temperatures in a water-cooled reactor are modest, so roughly two thirds of the heat produced must be rejected at the condenser and cooling tower."},
 {k:["rankine","cycle","closed loop","feed water pump","feed pump"],
  a:"The secondary side follows the Rankine cycle: the feed water pump raises the condensate pressure, the heat exchanger boils it into steam, the turbine expands it, the condenser turns it back to water, and the pump sends it round again. It is a closed loop, so the same treated water circulates continuously."},
 {k:["shield","concrete","radiation","biological","protect"],
  a:"The reactor is surrounded by a biological shield, typically two to two and a half metres of high density concrete, often with a steel liner and a lead or water thermal shield inside it. This absorbs gamma rays and neutrons so that people outside the containment receive negligible dose."},
 {k:["waste","disposal","spent fuel","radioactive waste","storage"],
  a:"Spent fuel is intensely radioactive and stays so for thousands of years. It is first cooled in water pools at the site for several years, then either reprocessed to recover usable uranium and plutonium, or vitrified into glass and stored in shielded casks pending deep geological disposal. Waste management is the biggest long-term objection to nuclear power."},
 {k:["advantage","disadvantage","merit","demerit","pros","cons","compare coal","thermal station"],
  a:"Advantages: very small fuel quantity and transport, no carbon dioxide or ash, small land area, and good performance as a base load station. Disadvantages: very high capital cost, long construction time, radioactive waste disposal, need for highly trained staff, and severe consequences if an accident does occur."},
 {k:["pwr","bwr","types of reactor","candu","fast breeder","boiling water","pressurised water"],
  a:"Common types are: PWR, where pressurised water is both coolant and moderator and steam is raised in a separate steam generator, that is the layout in this model. BWR, where water boils directly in the core so there is no separate heat exchanger. PHWR or CANDU, which uses heavy water and natural uranium, widely used in India. Gas-cooled reactors using carbon dioxide and graphite. And fast breeder reactors using liquid sodium with no moderator."},
 {k:["breeder","plutonium","pu-239","thorium","u-233","three stage"],
  a:"A breeder reactor produces more fissile material than it consumes. Fast neutrons convert fertile Uranium-238 into fissile Plutonium-239, or fertile Thorium-232 into fissile Uranium-233. India's three-stage nuclear programme is built on this idea, ending with thorium-based reactors, because India has large thorium reserves and limited uranium."},
 {k:["decay heat","after shutdown","loss of coolant","meltdown","fukushima","chernobyl","accident"],
  a:"Even after the control rods are fully inserted, radioactive fission products continue to generate decay heat, a few percent of full power initially. If cooling stops, that heat alone can melt the core. This is why emergency core cooling systems exist, and why the Fukushima accident happened even though the reactors had shut down correctly."},
 {k:["site","selection","location","where build","away from city"],
  a:"Site selection considers: availability of large quantities of cooling water such as a river or coast, distance from densely populated areas, a geologically stable, non-seismic foundation, ease of radioactive waste disposal, good transport access, and reasonable proximity to the load centre."},
 {k:["base load","peak load","load factor","grid","why base"],
  a:"Nuclear stations run as base load plants. Their fuel cost is a small part of total cost while capital cost is enormous, so they are most economical when run continuously at high load factor. They also cannot change output quickly, which makes them unsuitable for meeting peak demand."},
 {k:["reflector","escape neutron","leak"],
  a:"A reflector surrounds the core and bounces escaping neutrons back into it, reducing leakage and therefore the amount of fuel needed to stay critical. Graphite and beryllium are commonly used, and often the same material serves as both moderator and reflector."},
 {k:["cost","economics","capital","expensive"],
  a:"Nuclear plants have very high capital cost and long construction time, but very low fuel cost per unit generated. So the cost per unit falls sharply the more continuously the plant runs, another reason they are used for base load rather than peaking duty."},
 {k:["coolant pump","circulating pump","pump","why pump"],
  a:"There are three pumps in this model. The primary coolant pump circulates coolant through the core continuously and must keep running even after shutdown because of decay heat. The feed water pump raises condensate pressure and returns it to the heat exchanger. The circulating water pump sends condenser cooling water to the cooling tower."},
 {k:["river","heat sink","make up water","environment","thermal pollution"],
  a:"The river is the ultimate heat sink and supplies make-up water for whatever evaporates in the cooling tower. The main environmental concern is thermal pollution, returning warm water raises the local temperature and lowers dissolved oxygen, which is why cooling towers are used to cut the heat load before discharge."},
 {k:["steam pressure","temperature","dry steam","wet steam","superheat"],
  a:"Steam leaving the generator in a typical PWR is around 60 to 70 bar and roughly 280 degrees Celsius, saturated rather than strongly superheated, which is why nuclear steam cycles are less efficient than modern coal-fired ones. Moisture separators are used between stages because wet steam erodes the turbine blades."},
 {k:["transformer","transmission","step up","400 kv","220 kv","voltage","grid"],
  a:"The alternator generates at about 11 to 25 kilovolts. A generating transformer steps this up to 220 or 400 kilovolts for transmission, because for the same power a higher voltage means a lower current, and line losses fall with the square of the current."},
 {k:["how are you","hello","hi teacher","who are you","your name"],
  a:"I am your guide for this nuclear power station tour. Ask me about any part you see, the reactor, the fuel rods, the moderator, the control rods, the coolant loop, the turbine, the alternator, the condenser, the cooling tower, or how the electricity finally reaches the grid."}
];

ClassroomBot.prototype.initialize = function () {
    var app = this.app;

    this.LESSON = [
        { title: 'Welcome', text: "Welcome to the Nuclear Power Station! I'm your guide today. Let's discover how splitting a single uranium atom can light up an entire city. Look around, and I'll walk you through every stage of the journey from fuel to electricity.", target: [0.04, 1.6, -1.82] },
        { title: 'Fuel Rods', text: "These are the Uranium-235 fuel rods. Inside each one, uranium atoms are split apart in a process called nuclear fission, releasing an enormous burst of heat energy from a very small amount of fuel.", target: [-0.69, 1.2, -1.94] },
        { title: 'Moderator', text: "Surrounding the fuel is the graphite moderator. It slows down the fast neutrons released by fission so they are more likely to split the next uranium atom, keeping the chain reaction going steadily.", target: [-0.7, 1.04, -1.94] },
        { title: 'Control Rods', text: "These control rods absorb neutrons. Operators raise or lower them to speed up, slow down, or completely shut down the nuclear reaction, keeping the reactor safe and stable.", target: [-1.06, 1.66, -1.8] },
        { title: 'The Reactor Core', text: "Together, the fuel, moderator, and control rods make up the reactor core, where nuclear fission produces intense heat, hot enough to boil water into high pressure steam.", target: [-1.06, 0.76, -1.69] },
        { title: 'Primary Coolant Loop', text: "A coolant pump circulates hot coolant away from the reactor core, carrying that heat energy toward the heat exchanger without ever mixing with the water that will become steam.", target: [-0.73, 1.57, -2.03] },
        { title: 'Heat Exchanger', text: "In the heat exchanger, heat from the primary coolant boils separate water into steam, just like a giant kettle. This creates the high pressure steam that will drive the turbine.", target: [-0.16, 0.78, -1.82] },
        { title: 'Turbine', text: "High pressure steam rushes through the turbine, spinning its blades at tremendous speed. This converts the steam's thermal energy into mechanical, spinning energy.", target: [0.89, 1.23, -2.4] },
        { title: 'Alternator', text: "The spinning turbine shaft turns the alternator, which uses electromagnetic induction to generate electricity. A smaller exciter alongside it supplies the magnetic field the alternator needs.", target: [1.21, 1.23, -2.42] },
        { title: 'Condenser', text: "After passing through the turbine, the spent exhaust steam flows into the condenser, where it is cooled back into liquid water so it can be pumped around the loop again.", target: [0.89, 0.92, -1.29] },
        { title: 'Cooling System', text: "Cold coolant is pumped by the circulating water pump through the cooling tower, where waste heat escapes into the air as vapor. Water drawn from the river tops up the system, and the feed water pump sends condensed water back toward the heat exchanger.", target: [1.54, 0.8, -1.32] },
        { title: 'To the Grid', text: "The electricity generated by the alternator passes through bus bars, circuit breakers, and isolators for protection, then through the transformer, which steps up the voltage so it can travel efficiently along power lines to homes and businesses.", target: [3.19, 1.23, -2.29] },
        { title: 'Full Circle', text: "And that completes the cycle! Fission heats the coolant, the coolant boils water into steam, steam spins the turbine, the turbine drives the alternator, and clean electricity flows out to the grid, while every drop of water is cooled and used again. Great work completing the tour! Use the buttons in front of you to replay any stage.", target: [0.04, 1.25, -2.12] }
    ];

    this.stageIndex = -1;
    this.muted = false;
    this.speaking = false;
    this.voice = null;
    this.synth = window.speechSynthesis || null;

    this.spotlight = app.root.findByName('TeacherSpotlight');
    this.captionEntity = app.root.findByName('Text_Caption');

    this.aimTarget = new pc.Vec3(0.2, 1.25, -4);
    this.aimCurrent = new pc.Vec3(0.2, 1.25, -4);

    this.pickVoice();
    if (this.synth) {
        this.synth.onvoiceschanged = this.pickVoice.bind(this);
    }

    this.wireButton('Btn_Next', this.next.bind(this));
    this.wireButton('Btn_Prev', this.prev.bind(this));
    this.wireButton('Btn_Replay', this.replay.bind(this));
    this.wireButton('Btn_Mute', this.toggleMute.bind(this));
    this.wireButton('Btn_Ask', this.askQuestion.bind(this));

    this.qaBusy = false;
    this.pendingAdvanceTimer = null;
    this.activeRecognition = null;

    this.wireAnimations();

    // expose for debugging / external testing
    app.classroomBot = this;

    if (this.autoStart) {
        var self = this;
        setTimeout(function () { self.goto(0); }, 1200);
    }
};

ClassroomBot.prototype.wireAnimations = function () {
    var app = this.app;
    var plant = app.root.findByName('NuclearPowerPlant_NewBuild');
    if (!plant) return;

    if (!plant.anim) {
        plant.addComponent('anim', { activate: true, speed: 1 });
    }

    var animAssets = app.assets.filter(function (a) { return a.type === 'animation'; });

    function wireOne(asset) {
        var track = asset.resource;
        if (!track || !track._curves || !track._curves.length) return;
        var paths = track._curves[0].paths;
        if (!paths || !paths.length) return;
        var entityPath = paths[0].entityPath;
        var targetName = entityPath[entityPath.length - 1];
        if (!targetName) return;
        plant.anim.addLayer(targetName);
        plant.anim.assignAnimation(targetName, track, targetName, 1, true);
        var layer = plant.anim.findAnimationLayer(targetName);
        if (layer) layer.play(targetName);
    }

    animAssets.forEach(function (asset) {
        if (asset.resource) {
            wireOne(asset);
        } else {
            app.assets.load(asset);
            asset.once('load', function () { wireOne(asset); });
        }
    });
};

ClassroomBot.prototype.wireButton = function (name, handler) {
    var entity = this.app.root.findByName(name);
    if (!entity) return;
    entity.on('picker:select', handler);
};

// Voice selection logic matches the reference HTML lesson exactly:
// prefer en-IN / India / "UK English Male" / Daniel / Ravi among English voices,
// falling back to the first available English voice.
ClassroomBot.prototype.pickVoice = function () {
    if (!this.synth) return;
    var voices = this.synth.getVoices().filter(function (v) { return v.lang.startsWith('en'); });
    if (!voices.length) return;
    var neerjaIndex = voices.findIndex(function (v) { return /Neerja/i.test(v.name); });
    if (neerjaIndex > -1) { this.voice = voices[neerjaIndex]; return; }
    var prefIndex = voices.findIndex(function (v) { return /en-IN|India|UK English Male|Daniel|Ravi/i.test(v.name + v.lang); });
    this.voice = voices[prefIndex > -1 ? prefIndex : 0];
};

ClassroomBot.prototype.speak = function (text, onDone) {
    if (this.muted || !this.synth) { if (onDone) onDone(); return; }
    this.synth.cancel();
    var u = new SpeechSynthesisUtterance(text);
    if (this.voice) u.voice = this.voice;
    u.rate = 0.98;
    u.pitch = 1;
    u.volume = 1;
    var self = this;
    this.speaking = true;
    u.onend = function () { self.speaking = false; if (onDone) onDone(); };
    u.onerror = function () { self.speaking = false; if (onDone) onDone(); };
    this.synth.speak(u);
};

ClassroomBot.prototype.setCaption = function (text) {
    if (this.captionEntity && this.captionEntity.element) {
        this.captionEntity.element.text = text;
    }
};

ClassroomBot.prototype.aimSpotlight = function (target) {
    this.aimTarget.set(target[0], target[1], target[2]);
};

ClassroomBot.prototype.goto = function (index) {
    if (index < 0 || index >= this.LESSON.length) return;
    if (this.pendingAdvanceTimer) { clearTimeout(this.pendingAdvanceTimer); this.pendingAdvanceTimer = null; }
    if (this.activeRecognition) { try { this.activeRecognition.abort(); } catch (e) {} this.activeRecognition = null; }
    this.qaBusy = false;
    this.stageIndex = index;
    var stage = this.LESSON[index];
    this.setCaption(stage.title + ': ' + stage.text);
    this.aimSpotlight(stage.target);
    var self = this;
    this.speak(stage.text, function () {
        if (!self.qaBusy && self.stageIndex === index && index < self.LESSON.length - 1) {
            self.pendingAdvanceTimer = setTimeout(function () {
                if (!self.qaBusy && self.stageIndex === index) self.goto(index + 1);
            }, 900);
        }
    });
};

ClassroomBot.prototype.next = function () {
    var n = Math.min(this.stageIndex + 1, this.LESSON.length - 1);
    this.goto(n);
};

ClassroomBot.prototype.prev = function () {
    var n = Math.max(this.stageIndex - 1, 0);
    this.goto(n);
};

ClassroomBot.prototype.replay = function () {
    if (this.stageIndex >= 0) this.goto(this.stageIndex);
};

ClassroomBot.prototype.toggleMute = function () {
    this.muted = !this.muted;
    if (this.muted && this.synth) this.synth.cancel();
};

// ---------- interactive Q&A: tap Btn_Ask, speak your question, get an answer,
// then the lesson resumes automatically. Offline keyword-matched answers only —
// no external API calls.
ClassroomBot.prototype.askQuestion = function () {
    if (this.qaBusy) return;
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
        this.setCaption('Voice questions need a browser with speech recognition support, like Chrome.');
        return;
    }
    if (this.pendingAdvanceTimer) { clearTimeout(this.pendingAdvanceTimer); this.pendingAdvanceTimer = null; }
    this.qaBusy = true;
    if (this.synth) this.synth.cancel();
    this.setCaption('Listening... go ahead and ask your question.');

    var self = this;
    var rec = new SR();
    this.activeRecognition = rec;
    rec.lang = 'en-IN';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    var handled = false;

    rec.onresult = function (e) {
        handled = true;
        var transcript = e.results[0][0].transcript;
        self.activeRecognition = null;
        self.handleQuestion(transcript);
    };
    rec.onerror = function (e) {
        if (handled) return;
        self.activeRecognition = null;
        self.qaBusy = false;
        if (e && e.error === 'not-allowed') {
            self.setCaption('Microphone access was blocked. Please allow the microphone and tap Ask again.');
        } else {
            self.setCaption("Sorry, I didn't catch that. Tap Ask to try again.");
        }
    };
    rec.onend = function () {
        if (!handled) {
            self.activeRecognition = null;
            self.qaBusy = false;
        }
    };
    try {
        rec.start();
    } catch (e) {
        this.qaBusy = false;
        this.activeRecognition = null;
        this.setCaption('Could not start the microphone. Please allow microphone access and try again.');
    }
};

ClassroomBot.prototype.handleQuestion = function (transcript) {
    var self = this;
    this.setCaption('You asked: ' + transcript);
    var answer = this.localAnswer(transcript);
    setTimeout(function () {
        if (!self.qaBusy) return;
        self.setCaption(answer);
        self.speak(answer, function () {
            self.qaBusy = false;
            var resumeIndex = self.stageIndex >= 0 ? self.stageIndex : 0;
            self.goto(resumeIndex);
        });
    }, 500);
};

ClassroomBot.prototype.localAnswer = function (q) {
    var t = (q || '').toLowerCase();
    var best = null, score = 0;
    for (var i = 0; i < CLASSROOM_KB.length; i++) {
        var entry = CLASSROOM_KB[i];
        var s = 0;
        for (var j = 0; j < entry.k.length; j++) {
            if (t.indexOf(entry.k[j]) > -1) s += entry.k[j].length;
        }
        if (s > score) { score = s; best = entry; }
    }
    if (best) return best.a;
    return "That's not in my notes for this tour, but try asking about the fuel rods, the moderator, the control rods, the coolant loop, the turbine, the alternator, the condenser, the cooling tower, efficiency, or how electricity reaches the grid.";
};

ClassroomBot.prototype.update = function (dt) {
    if (this.spotlight) {
        this.aimCurrent.lerp(this.aimCurrent, this.aimTarget, Math.min(1, dt * 3));
        this.spotlight.lookAt(this.aimCurrent);
    }
};