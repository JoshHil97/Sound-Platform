# Church Source Import Notes

Phase 11 now includes the first source-backed church artifacts:

- Logic Pro template capture: `/Users/joshuahilarion/Downloads/NLS Broadcast Template/Alternatives/000/WindowImage.jpg`
- Logic Pro metadata: `/Users/joshuahilarion/Downloads/NLS Broadcast Template/Alternatives/000/MetaData.plist`
- X32 scene: `/Volumes/NO NAME/ 2ND-NLS 2026.scn`

## Logic Template Facts

Confirmed from `MetaData.plist`:

- Template name used in platform: NLS Broadcast Template
- Sample rate: 48 kHz
- Track count: 43
- Tempo: 120 BPM
- Key: C major
- Time signature: 4/4
- Impulse responses referenced:
  - 3.9s Prince Hall One
  - 1.6s Short Vocal Hall
  - 0.7s Drum Plate
  - 0.4s Snare Chamber

Observed from the mixer screenshot and binary strings:

- FabFilter Pro-Q 4
- FabFilter Pro-C 2
- Waves Tune
- Waves PSE
- Waves CLA MixHub
- Waves C1 comp-gate
- Waves SSL EQ
- Waves SSLComp
- Waves L1 Limiter
- Logic Compressor, Gate and Channel EQ

Important caveat: Logic `ProjectData` is binary/proprietary, so the platform should not claim a full Logic project parse. Use the imported data as metadata plus visible screenshot evidence until the livestream Mac is reviewed directly.

## X32 Scene Facts

Confirmed from `2ND-NLS 2026.scn`:

- Inputs: A1-8, A9-16, AN17-24, B1-8, AUX1-4
- Card routing: A1-8, A9-16, AN17-24, B1-8
- Buses include stage monitors, LiveStream L/R, P16 feeds, drum verb, vocal reverb and vocal delay
- Matrices include SIDE FILL, OVERFLOW, VICTORYLAND, LiveStream L and LiveStream R
- DCAs include BVS, LVS, BISHOP MICS, KEYS, BAND, BASS, DRUMS and GUITAR

The platform summarizes selected channels for training drills, including tracks, keys, guitar, bass, drums, vocals, Bishop mics, desk mic and talkback.

## Governance Rule

Treat these imports as source-backed training references, not final operational policy, until a Senior Engineer or Technical Director confirms them against the live console and livestream Mac.
