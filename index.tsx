import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import Plotly from 'plotly.js-dist-min';
import { Share2, Github, BookOpen } from 'lucide-react';

const assetBase = import.meta.env.BASE_URL ?? '/';

const personalities = [
  {
    name: 'The Storytellers',
    emoji: '📜',
    catchphrase: 'Let me tell you a story...',
    habitat: 'r/WritingPrompts, r/nosleep',
    note: 'Long, theatrical posts with structured arcs.',
    expertise: 'Complexity 8/10: immersive but deliberate.'
  },
  {
    name: 'The Tech Support',
    emoji: '🛠️',
    catchphrase: 'Have you tried turning it off and on again?',
    habitat: 'r/techsupport, r/buildapc',
    note: 'Step-by-step, cheerful instructions that everyone reads.',
    expertise: 'Complexity 5/10: optimized for clarity and calm.'
  },
  {
    name: 'The Chatterboxes',
    emoji: '🗣️',
    catchphrase: 'Well, actually...',
    habitat: 'Default subs, discussion forums',
    note: 'Socially rich exchanges with clauses stitched together.',
    expertise: 'Complexity 7/10: conversational, layered, human.'
  },
  {
    name: 'The Professors',
    emoji: '🧐',
    catchphrase: 'According to my analysis...',
    habitat: 'r/OutOfTheLoop, r/explainlikeimfive',
    note: 'Measured discourse, big words, cautious tone.',
    expertise: 'Complexity 9/10: the sharpest diction on the site.'
  },
  {
    name: 'The Firestarters',
    emoji: '🔥',
    catchphrase: 'ARE YOU KIDDING ME?!',
    habitat: 'r/SubredditDrama, r/circlebroke',
    note: 'Emotional flair, swears, anxiety, but precise grammar.',
    expertise: 'Complexity 6/10: the twist is that structure stays intact.'
  },
];

const quizOptions = [
  {
    role: 'The Storyteller',
    prompt: 'I build dramatic arcs and let stories breathe; nuance matters most.'
  },
  {
    role: 'The Tech Support',
    prompt: 'I stay calm, break problems into steps, and explain them clearly.'
  },
  {
    role: 'The Firestarter',
    prompt: 'I speak bluntly, stir emotion, and rally people into the fray.'
  },
  {
    role: 'The Professors',
    prompt: 'I prefer analytical, cautious language even when emotions run high.'
  }
];

const acts = [
  {
    title: 'Act I — The Personalities of Reddit',
    subtitle: 'Who writes like whom? Clustering 32 linguistic features uncovered five distinct voices.',
    body: [
      'We stopped caring about topics and only measured how people spoke: sentence length, vocabulary diversity, emotional markers, pronoun patterns.',
      'A PCA boat plot let us see the five clusters float apart. None were better—just different linguistic worlds.',
      'Radar plots and spider charts turned each cluster into a personality with weapons, habitats, and catchphrases.',
      'Reddit is shaped by voices, not just communities. Every post sounds like one of these archetypes.'
    ]
  },
  {
    title: 'Act II — The Paradox of Complexity',
    subtitle: 'Nothing we measured in grammar predicted toxicity.',
    body: [
      'We engineered metrics for lexical diversity, readability, syntactic depth, sentence complexity, and word length.',
      'PCA projections, distributions, and hypothesis tests all returned the same conclusion: there is no meaningful gap between kind and cruel posts.',
      'The Firestarters keep structure, punctuation, and grammar intact. Their camouflage makes them sound authoritative rather than childish.'
    ],
    hook: 'We tested EVERYTHING: vocabulary sophistication ❌ sentence complexity ❌ readability scores ❌ word length ❌. None of it predicted whether someone was being kind or cruel.'
  },
  {
    title: 'Act III — What Actually Predicts Negativity',
    subtitle: 'Sentiment lives in the dictionary, not the grammar book.',
    body: [
      'We swapped the grammar microscope for a dictionary lens. Correlation metrics and a Random Forest model pointed at the same truth.',
      'Emotion words, negations, anxiety markers, and certainty terms climbed to the top of the podium.',
      'You can construct a cathedral of syntax, but if the bricks are malice, it is still a toxic structure. Complexity alone is silent.'
    ]
  },
  {
    title: 'Act IV — The Network Doesn\'t Lie',
    subtitle: 'Interaction patterns reveal how negativity flows.',
    body: [
      'We recomposed the Reddit graph by linguistic personality and marked the thread between clusters.',
      'Toxic communities are outward-facing; they mostly talk to the Helpers rather than hiding in echo chambers.',
      'Nearly 70% of toxic links target the Tech Support cluster because toxicity needs an audience, and the Helpers always answer.'
    ]
  }
];

const conclusionPoints = [
  'Anger is still complex: the internet doesn\'t make us dumb; it makes us emotional.',
  'Intelligence and kindness are not the same; polished grammar can still carry malice.',
  'Communities interact across dialects; the hivemind never settled into isolation.',
  'Moderation tools should focus on vocabulary and sentiment, not grammatical depth.'
];

type SpiderCluster = {
  title: string;
  theta: string[];
  lineR: number[];
  markerColor: string[];
  markerText: string[];
};

const spiderClusters: SpiderCluster[] = [
  {
    title: 'Language cluster (z) 0',
    theta: [
      'liwc_negemo',
      'vader_negative',
      'liwc_anger',
      'vader_compound',
      'liwc_affect',
      'liwc_swear',
      'liwc_sad',
      'liwc_anx',
      'liwc_negemo'
    ],
    lineR: [
      0.9999999999993628,
      0.9237415261816958,
      0.8534265611039502,
      0.7894069919148711,
      0.525878225379854,
      0.49798241033048934,
      0.4576589475038177,
      0.3677941991923818,
      0.9999999999993628
    ],
    markerColor: [
      '#1f77b4',
      '#1f77b4',
      '#1f77b4',
      '#d62728',
      '#1f77b4',
      '#1f77b4',
      '#1f77b4',
      '#1f77b4'
    ],
    markerText: [
      '<b>liwc_negemo</b><br>z-score: +1.570<br>|z| (norm): 1.000',
      '<b>vader_negative</b><br>z-score: +1.450<br>|z| (norm): 0.924',
      '<b>liwc_anger</b><br>z-score: +1.339<br>|z| (norm): 0.853',
      '<b>vader_compound</b><br>z-score: -1.239<br>|z| (norm): 0.789',
      '<b>liwc_affect</b><br>z-score: +0.825<br>|z| (norm): 0.526',
      '<b>liwc_swear</b><br>z-score: +0.782<br>|z| (norm): 0.498',
      '<b>liwc_sad</b><br>z-score: +0.718<br>|z| (norm): 0.458',
      '<b>liwc_anx</b><br>z-score: +0.577<br>|z| (norm): 0.368'
    ]
  },
  {
    title: 'Language cluster (z) 1',
    theta: [
      'avg_chars_per_sentence',
      'avg_words_per_sentence',
      'readability_index',
      'num_chars',
      'num_words',
      'liwc_verbs',
      'liwc_prep',
      'liwc_cogmech',
      'avg_chars_per_sentence'
    ],
    lineR: [
      0.9999999999999348,
      0.9387434856415336,
      0.9250959200607034,
      0.1329827125874277,
      0.11019224797343416,
      0.1032877958215583,
      0.09893705702256392,
      0.09710206592927384,
      0.9999999999999348
    ],
    markerColor: ['#1f77b4', '#1f77b4', '#1f77b4', '#1f77b4', '#1f77b4', '#d62728', '#d62728', '#d62728'],
    markerText: [
      '<b>avg_chars_per_sentence</b><br>z-score: +15.358<br>|z| (norm): 1.000',
      '<b>avg_words_per_sentence</b><br>z-score: +14.417<br>|z| (norm): 0.939',
      '<b>readability_index</b><br>z-score: +14.207<br>|z| (norm): 0.925',
      '<b>num_chars</b><br>z-score: +2.042<br>|z| (norm): 0.133',
      '<b>num_words</b><br>z-score: +1.692<br>|z| (norm): 0.110',
      '<b>liwc_verbs</b><br>z-score: -1.586<br>|z| (norm): 0.103',
      '<b>liwc_prep</b><br>z-score: -1.519<br>|z| (norm): 0.099',
      '<b>liwc_cogmech</b><br>z-score: -1.491<br>|z| (norm): 0.097'
    ]
  },
  {
    title: 'Language cluster (z) 2',
    theta: [
      'liwc_cogmech',
      'liwc_prep',
      'liwc_verbs',
      'liwc_conj',
      'liwc_auxvb',
      'liwc_relativ',
      'liwc_article',
      'liwc_space',
      'liwc_cogmech'
    ],
    lineR: [
      0.999999999999156,
      0.9893289209184924,
      0.9880080975524806,
      0.9285694284647933,
      0.8851223482249314,
      0.853260136964148,
      0.8251680254692079,
      0.7469458876170281,
      0.999999999999156
    ],
    markerColor: ['#d62728', '#d62728', '#d62728', '#d62728', '#d62728', '#d62728', '#d62728', '#d62728'],
    markerText: [
      '<b>liwc_cogmech</b><br>z-score: -1.185<br>|z| (norm): 1.000',
      '<b>liwc_prep</b><br>z-score: -1.172<br>|z| (norm): 0.989',
      '<b>liwc_verbs</b><br>z-score: -1.171<br>|z| (norm): 0.988',
      '<b>liwc_conj</b><br>z-score: -1.100<br>|z| (norm): 0.929',
      '<b>liwc_auxvb</b><br>z-score: -1.049<br>|z| (norm): 0.885',
      '<b>liwc_relativ</b><br>z-score: -1.011<br>|z| (norm): 0.853',
      '<b>liwc_article</b><br>z-score: -0.978<br>|z| (norm): 0.825',
      '<b>liwc_space</b><br>z-score: -0.885<br>|z| (norm): 0.747'
    ]
  },
  {
    title: 'Language cluster (z) 3',
    theta: [
      'num_words',
      'num_sentences',
      'num_chars',
      'liwc_relativ',
      'liwc_article',
      'liwc_space',
      'liwc_prep',
      'vader_negative',
      'num_words'
    ],
    lineR: [
      0.999999999999737,
      0.9718198989625441,
      0.9673930411953563,
      0.1324187286017002,
      0.12500406804400133,
      0.12441244557074321,
      0.12247421228047468,
      0.10523990897132982,
      0.999999999999737
    ],
    markerColor: ['#1f77b4', '#1f77b4', '#1f77b4', '#1f77b4', '#1f77b4', '#1f77b4', '#1f77b4', '#1f77b4'],
    markerText: [
      '<b>num_words</b><br>z-score: +3.803<br>|z| (norm): 1.000',
      '<b>num_sentences</b><br>z-score: +3.696<br>|z| (norm): 0.972',
      '<b>num_chars</b><br>z-score: +3.679<br>|z| (norm): 0.967',
      '<b>liwc_relativ</b><br>z-score: +0.504<br>|z| (norm): 0.132',
      '<b>liwc_article</b><br>z-score: +0.475<br>|z| (norm): 0.125',
      '<b>liwc_space</b><br>z-score: +0.473<br>|z| (norm): 0.124',
      '<b>liwc_prep</b><br>z-score: +0.466<br>|z| (norm): 0.122',
      '<b>vader_negative</b><br>z-score: +0.400<br>|z| (norm): 0.105'
    ]
  },
  {
    title: 'Language cluster (z) 4',
    theta: [
      'vader_compound',
      'liwc_prep',
      'liwc_cogmech',
      'liwc_verbs',
      'liwc_relativ',
      'liwc_conj',
      'liwc_auxvb',
      'liwc_article',
      'vader_compound'
    ],
    lineR: [
      0.9999999999980768,
      0.8502403607160691,
      0.8302095881960183,
      0.8104618739156569,
      0.7664257280768189,
      0.7518992217125737,
      0.726800976101065,
      0.6870113905754063,
      0.9999999999980768
    ],
    markerColor: ['#1f77b4', '#1f77b4', '#1f77b4', '#1f77b4', '#1f77b4', '#1f77b4', '#1f77b4', '#1f77b4'],
    markerText: [
      '<b>vader_compound</b><br>z-score: +0.520<br>|z| (norm): 1.000',
      '<b>liwc_prep</b><br>z-score: +0.442<br>|z| (norm): 0.850',
      '<b>liwc_cogmech</b><br>z-score: +0.432<br>|z| (norm): 0.830',
      '<b>liwc_verbs</b><br>z-score: +0.421<br>|z| (norm): 0.810',
      '<b>liwc_relativ</b><br>z-score: +0.398<br>|z| (norm): 0.766',
      '<b>liwc_conj</b><br>z-score: +0.391<br>|z| (norm): 0.752',
      '<b>liwc_auxvb</b><br>z-score: +0.378<br>|z| (norm): 0.727',
      '<b>liwc_article</b><br>z-score: +0.357<br>|z| (norm): 0.687'
    ]
  }
];

const spiderTraces = spiderClusters.flatMap((cluster, clusterIndex) => {
  const lineTrace = {
    type: 'scatterpolar' as const,
    name: cluster.title,
    theta: cluster.theta,
    r: cluster.lineR,
    mode: 'lines' as const,
    fill: 'toself' as const,
    opacity: 0.25,
    line: { width: 2 },
    hoverinfo: 'skip' as const,
    visible: clusterIndex === 0
  };
  const markerTrace = {
    type: 'scatterpolar' as const,
    name: `${cluster.title} markers`,
    theta: cluster.theta.slice(0, -1),
    r: cluster.lineR.slice(0, -1),
    mode: 'markers' as const,
    hoverinfo: 'text' as const,
    text: cluster.markerText,
    marker: { color: cluster.markerColor, size: 9 },
    showlegend: false,
    visible: clusterIndex === 0
  };
  return [lineTrace, markerTrace];
});

const sliderSteps = spiderClusters.map((cluster, clusterIndex) => {
  const visible = spiderTraces.map((_, traceIndex) =>
    traceIndex === clusterIndex * 2 || traceIndex === clusterIndex * 2 + 1
  );
  return {
    label: `${clusterIndex}`,
    method: 'update' as const,
    args: [
      { visible },
      { title: `Language cluster (z) ${clusterIndex} — |z|-normalized (top 8)` }
    ]
  };
});

const spiderLayout = {
  title: { text: 'Language cluster (z) 0 — |z|-normalized (top 8)', x: 0.05 },
  autosize: true,
  height: 650,
  margin: { l: 40, r: 40, t: 70, b: 80 },
  colorway: ['#636efa', '#EF553B', '#00cc96', '#ab63fa', '#FFA15A', '#19d3f3', '#FF6692', '#B6E880', '#FF97FF', '#FECB52'],
  font: { color: '#2a3f5f' },
  hovermode: 'closest' as const,
  hoverlabel: { align: 'left' },
  paper_bgcolor: 'white',
  plot_bgcolor: '#E5ECF6',
  polar: {
    bgcolor: '#E5ECF6',
    angularaxis: { gridcolor: 'white', linecolor: 'white', ticks: '' },
    radialaxis: {
      gridcolor: 'white',
      linecolor: 'white',
      ticks: '',
      range: [0, 1.05],
      tickvals: [0.25, 0.5, 0.75, 1.0],
      ticktext: ['weak', 'moderate', 'strong', 'very strong']
    }
  },
  annotations: [
    {
      align: 'left',
      showarrow: false,
      text: "<span style='color:#1f77b4'>●</span> z ≥ 0   <span style='color:#d62728'>●</span> z < 0",
      x: 1.02,
      xref: 'paper' as const,
      y: 1.02,
      yref: 'paper' as const
    }
  ],
  sliders: [
    {
      active: 0,
      len: 0.85,
      x: 0.08,
      y: -0.05,
      steps: sliderSteps
    }
  ]
};

const spiderConfig = { responsive: true };

const SpiderPlot = () => {
  const plotRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const plotNode = plotRef.current;
    if (!plotNode) return;
    const handleResize = () => Plotly.Plots.resize(plotNode);
    Plotly.newPlot(plotNode, spiderTraces, spiderLayout, spiderConfig);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      Plotly.purge(plotNode);
    };
  }, []);
  return (
    <div
      ref={plotRef}
      className="w-full"
      style={{ minHeight: spiderLayout.height, maxWidth: '100%' }}
    />
  );
};

const App = () => (
  <div className="min-h-screen bg-[#fbfbfa] text-[#101828] text-lg">
    <nav className="sticky top-0 z-50 border-b border-[#ebe9e4] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-[#f97316] text-white flex items-center justify-center font-bold">R</div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#f97316]">Hivemind Labs</p>
            <p className="text-sm font-semibold text-[#101828]">The Language Paradox of Reddit</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-[#475467]">
          <Share2 className="h-5 w-5 cursor-pointer" />
          <Github className="h-5 w-5 cursor-pointer" />
        </div>
      </div>
    </nav>

    <main className="mx-auto max-w-6xl px-6 py-12 space-y-16">
      <section className="rounded-3xl border border-[#ebe9e4] bg-white p-10 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.25)]">
        <p className="text-xs uppercase tracking-[0.6em] text-[#f97316]">2024 data journalism | Reddit</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#101828] md:text-5xl">The Language Paradox of Reddit</h1>
        <p className="mt-6 text-lg leading-relaxed text-[#475467]">
          We expected angry Redditors to sound dumb. Instead we found structured sentences, careful grammar, and intentional vocabulary. This narrative explains how complexity failed to account for toxicity—and what actually does.
        </p>
        <div className="mt-8 grid gap-4 text-sm text-[#475467] md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#94a3b8]">Scope</p>
            <p className="font-semibold text-[#101828]">850K+ subreddit links</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#94a3b8]">Interactions</p>
            <p className="font-semibold text-[#101828]">~1M posts and comments</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#94a3b8]">Period</p>
            <p className="font-semibold text-[#101828]">2013–2016</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-dashed border-[#f97316] bg-gradient-to-br from-[#fff7ef] to-white p-8">
        <h2 className="text-2xl font-semibold text-[#101828]">Opening — When Anger Sounds Intelligent</h2>
        <p className="mt-4 text-lg leading-relaxed text-[#475467]">
          Picture this: It's 2015. Somewhere on Reddit, someone is furious. Not mildly annoyed. Furious. They're about to write the angriest comment of their online life.
        </p>
        <p className="mt-2 text-lg font-semibold text-[#101828]">
          A) "THIS IS COMPLETE GARBAGE!!!"<br />
          B) "I find your methodology profoundly inadequate and your conclusions demonstrably erroneous."
        </p>
        <p className="mt-4 text-base text-[#475467]">
          If you picked A, you're not alone. The internet troll in our imagination is a keyboard-smashing caveman. But the data told another tale: anger delivered in paragraphs, with perfect grammar. That's the mystery we unpack in this exploration.
        </p>
      </section>

      <section className="rounded-3xl border border-[#e3e1dd] bg-white p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-[#101828]">Introduction: Decoding Reddit's Linguistic Landscape</h2>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#101828]">A City Made of Words</h3>
          <p className="text-[#475467] leading-relaxed">
            Reddit is often described as the front page of the internet. In reality, it looks more like a vast digital city.
            Thousands of communities coexist there, each built around a topic, a passion, a question, or sometimes just a shared sense of humor.
            Every day, millions of users post, reply, argue, explain, praise, mock, support, and contradict each other. Some conversations are friendly. Others are tense. Many are openly hostile.
          </p>
          <p className="text-[#475467] leading-relaxed">
            Reddit is noisy. Reddit is alive. And Reddit is opinionated.
          </p>
          <p className="text-[#475467] leading-relaxed">
            Between 2014 and 2017 alone, hundreds of thousands of interactions connected communities to one another. Links were shared, references were made, disagreements spilled across subreddit borders. Some of these interactions were clearly positive: expressions of agreement, endorsement, or support. Others were unmistakably negative: criticism, dismissal, or outright hostility.
          </p>
          
          <div className="my-8 space-y-3">
              <figure className="overflow-hidden rounded-2xl border border-[#d6d3cd] bg-white shadow-sm">
              <iframe
                  src={`${assetBase}activity.html`}
                  title="Community activity over time"
                  className="h-[580px] w-full min-h-[420px] border-0"
                  loading="lazy"
              />
              </figure>
              <p className="text-sm text-[#475467]">
              The activity graph shows how threads ripple across subreddits; every jump is another community talking to someone else.
              </p>
          </div>

          <p className="text-[#475467] leading-relaxed">
            If online discourse has a pulse, Reddit is where you can feel it. But beneath the surface of memes, arguments, and advice threads lies a fascinating question: 
            <span className="font-medium text-[#101828]"> Does the way we write reveal how we interact?</span>
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#101828]">A Familiar Assumption — And a Doubt</h3>
          <p className="text-[#475467] leading-relaxed">
            When we think about negativity online, we tend to picture it in a very specific way. Anger is loud. Negativity is blunt. Toxic messages are short, messy, poorly written bursts of frustration.
          </p>
          <p className="text-[#475467] leading-relaxed">
            But is that actually true? What if negativity doesn’t always shout? What if it argues calmly? What if it hides behind long sentences, complex vocabulary, and carefully structured reasoning?
          </p>
          <p className="text-[#475467] leading-relaxed font-medium italic">
            In other words: does being negative mean being linguistically simple?
          </p>
          <p className="text-[#475467] leading-relaxed">
            This question became the starting point of our exploration.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#101828]">Our Guiding Question - How Does Negativity Really Work?</h3>
          <p className="text-[#475467] leading-relaxed">
            Rather than asking what people talk about on Reddit, we decided to focus on how they talk. We wanted to understand:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#475467] ml-4">
              <li>Whether different language styles exist across Reddit,</li>
              <li>Whether communities tend to specialize in one dominant style or mix many,</li>
              <li>And whether linguistic complexity has anything to do with how positive or negative a message is.</li>
          </ul>
          <p className="text-[#475467] leading-relaxed">
            To answer this, we followed a simple idea: <span className="text-[#101828] font-medium">instead of assuming how negativity looks, we let the data describe it.</span>
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#101828]">How the Story Unfolds</h3>
          <p className="text-[#475467] leading-relaxed">
            Our investigation unfolds in three steps.
          </p>
          <p className="text-[#475467] leading-relaxed">
            <strong className="text-[#101828]">First</strong>, we look at language styles themselves. Using sentiment-related features, we cluster Reddit messages and uncover five distinct language profiles. We then ask whether subreddits behave like linguistic specialists, or whether they are melting pots of styles.
          </p>
          <p className="text-[#475467] leading-relaxed">
            <strong className="text-[#101828]">Next</strong>, we deliberately step away from sentiment altogether. We build a complexity score, based on linguistic structure alone, and test a tempting hypothesis: that more complex language might be less negative. The data has other plans.
          </p>
          <p className="text-[#475467] leading-relaxed">
            <strong className="text-[#101828]">Finally</strong>, we try to put our conclusions to the test. If complexity really matters, it should help predict whether a message is negative. We train several classifiers, from simple aggregates to dimensionality reduction and, finally, a Random Forest to see what actually drives negativity.
          </p>
          <p className="text-[#475467] leading-relaxed">
            What emerges is not a story about simple versus complex language, but about what truly signals hostility online. And along the way, we learn that negativity on Reddit is far more articulate than we expected.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-[#e3e1dd] bg-white p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-[#101828]">Interlude — Reddit Is Not a Collection of Islands</h2>
        <p className="text-[#475467]">
          Silos leak, communities quote each other, argue, link. The graph proved constant movement—interaction is the default.
        </p>
        <div className="space-y-3">
          <figure className="mt-4 overflow-hidden rounded-2xl border border-[#d6d3cd] bg-white shadow-sm">
            <iframe
              src={`${assetBase}activity.html`}
              title="Community activity over time"
              className="h-[580px] w-full min-h-[420px] border-0"
              loading="lazy"
            />
          </figure>
          <p className="text-sm text-[#475467]">
            The activity graph shows how threads ripple across subreddits; every jump is another community talking to someone else.
          </p>
        </div>
      </section>


      {acts.map((act, index) => (
        <React.Fragment key={act.title}>
          <section className="rounded-3xl border border-[#ecebe7] bg-white p-8 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-[#94a3b8]">{act.title}</p>
              <h3 className="mt-2 text-2xl font-semibold text-[#101828]">{act.subtitle}</h3>
            </div>
            {index === 2 && (
              <div className="space-y-4">
                <figure className="rounded-2xl border border-[#ecebe7] bg-[#fdfaf6] p-4">
                  <img
                    src={`${assetBase}corrolation.png`}
                    alt="Correlation of linguistic markers"
                    className="w-full max-h-[520px] rounded-2xl object-contain"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-sm text-[#475467]">
                    Correlation heatmap pairing sentiment features with negativity scores; the dark bands highlight where word choice matters.
                  </figcaption>
                </figure>
                <figure className="rounded-2xl border border-[#ecebe7] bg-white p-4">
                  <img
                    src={`${assetBase}rf.png`}
                    alt="Random forest feature importances"
                    className="w-full max-h-[520px] rounded-2xl object-contain"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-sm text-[#475467]">
                    Random Forest feature importances highlighting the vocabulary signals that actually predict negativity.
                  </figcaption>
                </figure>
              </div>
            )}
            <div className="space-y-3 text-[#475467]">
              {act.body.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {act.hook && (
                <p className="rounded-2xl border border-[#f97316] bg-[#fff7ef] px-4 py-3 text-sm font-semibold text-[#ae3415]">
                  {act.hook}
                </p>
              )}
              {index === 0 && (
                <div className="space-y-4 rounded-3xl border border-[#ecebe7] bg-[#f8fafc] p-6">
                  <p className="text-sm font-semibold text-[#101828]">Spider plot of language cluster |z|-scores</p>
                  <div className="overflow-hidden rounded-2xl border border-[#d6d3cd] bg-white shadow-sm">
                    <SpiderPlot />
                  </div>
                  <p className="text-sm text-[#475467]">
                    Each axis is a normalized |z| value for the top linguistic markers in cluster zero; the slider in the
                    embedded plot cycles through the five archetypes.
                  </p>
                  <figure className="overflow-hidden rounded-2xl border border-[#e0dcd7] bg-white shadow-sm">
                    <iframe
                      src={`${assetBase}pca_projection.html`}
                      title="PCA projection of Reddit language"
                      className="h-[520px] w-full min-h-[480px] border-0"
                      loading="lazy"
                    />
                    <figcaption className="p-4 text-sm text-[#475467]">
                      A PCA projection highlights how the linguistic clusters separate across the first two principal components.
                    </figcaption>
                  </figure>
                </div>
              )}
              {index === 1 && (
                <figure className="rounded-2xl border border-[#ecebe7] bg-[#fdfaf6] p-5">
                  <img
                    src={`${assetBase}link_sentiment.png`}
                    alt="Link sentiment repartition between clusters"
                    className="w-full max-h-[520px] rounded-2xl object-contain"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-sm text-[#475467]">
                    Every thread link now wears a sentiment score. The density of green-to-red gradients shows that kindness
                    and cruelty breathe from the same grammar but different words.
                  </figcaption>
                </figure>
              )}
            </div>
          </section>
          {index === 0 && (
            <>
              <section className="rounded-3xl border border-[#ecebe7] bg-white p-8">
                <h2 className="text-2xl font-semibold text-[#101828]">Act I Cast — Five Ways of Speaking Online</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {personalities.map(personality => (
                    <article key={personality.name} className="rounded-2xl border border-[#ecebe7] bg-[#f8fafc] p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-[#101828]">{personality.emoji} {personality.name}</h3>
                        <span className="text-xs uppercase tracking-[0.4em] text-[#94a3b8]">Complexity</span>
                      </div>
                      <p className="mt-2 text-sm text-[#475467]">{personality.catchphrase}</p>
                      <p className="mt-3 text-sm font-semibold text-[#101828]">Habitat · {personality.habitat}</p>
                      <p className="mt-1 text-sm text-[#475467]">{personality.note}</p>
                      <p className="mt-1 text-sm font-medium text-[#f97316]">{personality.expertise}</p>
                    </article>
                  ))}
                </div>
              </section>
              <section className="rounded-3xl border border-[#ecebe7] bg-[#f8fafc] p-8">
                <h2 className="text-2xl font-semibold text-[#101828]">Quick quiz — What voice do you wear online?</h2>
                <p className="mt-2 text-sm text-[#475467]">Pick the sentence that feels most natural when you write or reply.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {quizOptions.map(option => (
                    <button
                      key={option.role}
                      type="button"
                      className="rounded-2xl border border-[#ebecf0] bg-white px-4 py-4 text-left text-sm text-[#475467] shadow-sm transition hover:-translate-y-0.5"
                    >
                      <p className="text-base font-semibold text-[#101828]">{option.role}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.35em] text-[#f97316]">Reflective prompt</p>
                      <p className="mt-1 text-sm">{option.prompt}</p>
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.4em] text-[#f97316]">No answers recorded · Just reflection</p>
              </section>
            </>
          )}
        </React.Fragment>
      ))}

      <section className="rounded-3xl border border-dashed border-[#f97316] bg-gradient-to-br from-[#fff7ef] to-white p-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#101828]">Conclusion — What This Means for the Internet</h2>
        <div className="space-y-3 text-[#475467]">
          {conclusionPoints.map(point => (
            <p key={point} className="text-lg leading-relaxed">
              {point}
            </p>
          ))}
        </div>
        <p className="text-sm uppercase tracking-[0.5em] text-[#f97316]">Takeaway</p>
        <p className="text-[#101828]">
          Toxicity isn't linguistic simplicity. Sentiment arises from the words themselves. Echo chambers aren't built from grammar—they are built from how communities choose to interact.
        </p>
      </section>
    </main>

    <footer className="border-t border-[#ebe9e4] bg-white py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-sm text-[#475467] md:flex-row md:justify-between">
        <p>© 2024 ApesStrongTogether Team · Clean story updated from clean_story.txt</p>
        <div className="flex items-center gap-4">
          <Github className="h-5 w-5 cursor-pointer" />
          <Share2 className="h-5 w-5 cursor-pointer" />
          <BookOpen className="h-5 w-5 cursor-pointer" />
        </div>
      </div>
    </footer>
  </div>
);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
