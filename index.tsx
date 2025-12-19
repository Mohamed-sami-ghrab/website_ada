import React from 'react';
import { createRoot } from 'react-dom/client';
import { Share2, Github, BookOpen } from 'lucide-react';

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

const App = () => (
  <div className="min-h-screen bg-[#fbfbfa] text-[#101828]">
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
        <h2 className="text-2xl font-semibold text-[#101828]">Introduction — A Crime Scene Made of Words</h2>
        <p className="text-[#475467]">
          Our crime scene is Reddit: over 850,000 connections where one subreddit links to another. Each link carries language, tone, intent. We expected a comforting correlation: negativity equals linguistic simplicity. It didn't hold. Being articulate does not make you kind. Toxic communities don't speak worse—they speak differently. And the way communities interact might matter more than how long their sentences are.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#ebe9e4] bg-[#f8fafc] p-4 text-sm text-[#475467] shadow-inner">
            <p className="font-semibold text-[#101828]">Interlude — Reddit Is Not a Collection of Islands</p>
            <p className="mt-2">Silos leak, communities quote each other, argue, link. The graph proved constant movement—interaction is the default.</p>
          </div>
          <div className="rounded-2xl border border-[#ebe9e4] bg-[#f8fafc] p-4 text-sm text-[#475467] shadow-inner">
            <p className="font-semibold text-[#101828]">Narrative Hook</p>
            <p className="mt-2">Being smart doesn't make you nice. Toxicity is not dumbness. Complexity alone is silent. The paradox begins.</p>
          </div>
        </div>
      </section>

      {acts.map(act => (
        <section key={act.title} className="rounded-3xl border border-[#ecebe7] bg-white p-8 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-[#94a3b8]">{act.title}</p>
            <h3 className="mt-2 text-2xl font-semibold text-[#101828]">{act.subtitle}</h3>
          </div>
          <div className="space-y-3 text-[#475467]">
            {act.body.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {act.hook && (
              <p className="rounded-2xl border border-[#f97316] bg-[#fff7ef] px-4 py-3 text-sm font-semibold text-[#ae3415]">
                {act.hook}
              </p>
            )}
          </div>
        </section>
      ))}

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
