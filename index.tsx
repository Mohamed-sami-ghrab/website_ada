import React, { useEffect, useRef, useState } from 'react';
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

const Opening = () => {
  const [quizChoice, setQuizChoice] = useState<string | null>(null);

  return (
    <div id="opening" className="space-y-8">
      {/* Hero Section */}
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
            <p className="font-semibold text-[#101828]">~500K+ posts and comments</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#94a3b8]">Period</p>
            <p className="font-semibold text-[#101828]">2014–2017</p>
          </div>
        </div>
      </section>

      {/* Interactive Opening Quiz */}
      <section className="rounded-3xl border border-dashed border-[#f97316] bg-gradient-to-br from-[#fff7ef] to-white p-8 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#101828]">Opening - When Anger Sounds Intelligent</h2>
          <p className="text-lg leading-relaxed text-[#475467]">
            Picture this: It's 2015. Somewhere on Reddit, someone is furious. Not mildly annoyed. Furious. They're about to write the angriest comment of their online life. 
            <span className="block mt-2 font-medium text-[#101828]">Which of these do you think is the "toxic" comment?</span>
          </p>
        </div>

        {/* Quiz Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setQuizChoice('A')}
            className={`p-6 rounded-2xl border-2 text-left transition-all ${
              quizChoice === 'A' 
              ? 'border-[#f97316] bg-white shadow-md' 
              : 'border-[#ecebe7] bg-white/50 hover:border-[#f97316]/50'
            }`}
          >
            <p className="text-xs font-bold text-[#f97316] uppercase mb-2">Option A</p>
            <p className="text-lg font-bold text-[#101828]">"THIS IS COMPLETE GARBAGE!!!"</p>
          </button>

          <button
            onClick={() => setQuizChoice('B')}
            className={`p-6 rounded-2xl border-2 text-left transition-all ${
              quizChoice === 'B' 
              ? 'border-[#f97316] bg-white shadow-md' 
              : 'border-[#ecebe7] bg-white/50 hover:border-[#f97316]/50'
            }`}
          >
            <p className="text-xs font-bold text-[#f97316] uppercase mb-2">Option B</p>
            <p className="text-lg font-medium text-[#101828]">
              "I find your methodology profoundly inadequate and your conclusions demonstrably erroneous."
            </p>
          </button>
        </div>

        {/* Revealed Answer */}
        {quizChoice && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500 mt-6 p-6 rounded-2xl bg-[#101828] text-white">
            <p className="text-lg leading-relaxed">
              {quizChoice === 'A' ? (
                <>
                  If you picked A, <span className="text-[#f97316] font-bold">you're not alone.</span> The internet troll in our imagination is a keyboard-smashing caveman.
                </>
              ) : (
                <>
                  You recognized the paradox. While Option A looks like the stereotype, the data revealed something much more complex.
                </>
              )}
            </p>
            <p className="mt-4 text-base text-[#94a3b8]">
              But the data told another tale: anger delivered in paragraphs, with perfect grammar. That's the mystery we unpack in this exploration.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[#f97316] font-bold text-sm uppercase tracking-widest">
              <span>Scroll to begin the investigation</span>
              <span className="animate-bounce">↓</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

const Introduction = () => (
  <section id="opening" className="rounded-3xl border border-[#e3e1dd] bg-white p-8 space-y-6">
    <h2 className="text-3xl font-semibold text-[#101828]">Introduction: Decoding Reddit's Linguistic Landscape</h2>

    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-[#101828]">A City Made of Words</h3>
      <p className="text-[#475467] leading-relaxed">
        Reddit is often described as the front page of the internet. In reality, it looks more like a vast digital city.
        Thousands of communities coexist there, each built around a topic, a passion, a question, or sometimes just a shared sense of humor.
        Every day, millions of users post, reply, argue, explain, praise, mock, support, and contradict each other.
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
        If online discourse has a pulse, Reddit is where you can feel it. But beneath the surface lies a fascinating question: 
        <span className="font-medium text-[#101828]"> Does the way we write reveal how we interact?</span>
      </p>
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-[#101828]">A Familiar Assumption - And a Doubt</h3>
      <p className="text-[#475467] leading-relaxed">
        Toxic messages are often assumed to be short, messy, poorly written bursts of frustration.
        But what if negativity hides behind long sentences, complex vocabulary, and carefully structured reasoning?
      </p>
      <p className="text-[#475467] leading-relaxed font-medium italic">
        In other words: does being negative mean being linguistically simple?
      </p>
    </div>

    <div className="space-y-6 pt-6 border-t border-[#f2f0eb]">
      <h3 className="text-2xl font-semibold text-[#101828]">How the Story Unfolds</h3>
      <p className="text-[#475467] leading-relaxed">
        Our investigation unfolds in three steps.
      </p>

      <div className="space-y-8">
        {/* Step 1 */}
        <div className="flex gap-6">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#f97316] text-white flex items-center justify-center font-bold shadow-sm">01</div>
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-[#101828]">Linguistic Styles</h4>
            <p className="text-[#475467] leading-relaxed">
              We begin by looking at how people write on Reddit. Using a broad set of linguistic features, we let an unsupervised model cluster hundreds of thousands of posts and uncover five distinct language styles. We then examine whether these styles correspond to real community norms and whether subreddits tend to specialize in a single register or mix multiple ones depending on context.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-6">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#f97316] text-white flex items-center justify-center font-bold shadow-sm">02</div>
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-[#101828]">Predicting Interaction</h4>
            <p className="text-[#475467] leading-relaxed">
              Next, we move from language to behavior. By combining each subreddit’s language profile with network metrics, we ask whether the way communities write predicts how they interact with others. Do some styles link out more? Do others engage more positively or negatively? This step reveals that language style is not just expressive, it is structural.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-6">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#f97316] text-white flex items-center justify-center font-bold shadow-sm">03</div>
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-[#101828]">The Complexity Test</h4>
            <p className="text-[#475467] leading-relaxed">
              Finally, we isolate linguistic complexity and put a common intuition to the test. By deliberately removing emotional features, we examine whether grammar, vocabulary, and sentence structure alone can explain sentiment. We test this both descriptively and predictively, using multiple complexity scores and a Random Forest classifier.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
        <p className="text-[#101828] leading-relaxed">
          What emerges is not a story about simple versus complex language, but about the limits of sophistication. 
          <span className="block mt-2 font-medium">On Reddit, hostility is not a failure of grammar, it is an expression of emotion. And negativity, far from being crude or inarticulate, often comes wrapped in perfectly well-formed sentences.</span>
        </p>
      </div>
    </div>
  </section>
);


const PartOne = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tribes = [
    {
      title: "Cluster 0 - Toxic / Satirical",
      meta: "16.8% of posts",
      content: "This cluster is impossible to miss. Its linguistic signature is extreme: very high levels of anger, profanity, and negative emotion, paired with strongly negative sentiment. Everything about it leans toward confrontation. Reading posts from this cluster feels like stepping into an argument already in progress. The tone is hostile, sharp, often mocking. Criticism dominates, but not always in a straightforward way. What makes this cluster particularly interesting is where it appears. Communities like profanitywatch, shitliberalsay, or bestofoutrageculture are heavily dominated by this style. These are not random outbursts, they are spaces built around critique, satire, and parody.",
      insight: "The key insight here is subtle but important: this is not just the language of “angry trolls.” It is also the language of organized mockery. Satirical communities adopt the same linguistic weapons as the behavior they criticize, creating a meta-layer of aggressive humor. Negativity, in this case, is deliberate, performative, and often rhetorically sophisticated."
    },
    {
      title: "Cluster 1 - Extreme Sentence Length Outliers",
      meta: "0.2% of posts",
      content: "This cluster looks strange from the start. Its defining feature is sentence length, not just long, but extremely long. More than fourteen standard deviations above the average. Grammar markers are scarce. Structure breaks down. In practice, these posts resemble walls of text, run-on sentences, or oddly formatted content. They appear almost exclusively in obscure, low-traffic subreddits with very small sample sizes.",
      insight: "The conclusion here is straightforward: this cluster is not a meaningful language style. It is best explained by statistical noise, formatting artifacts, or edge cases in the data. With only 670 posts, it lacks both scale and coherence. For the rest of the analysis, we set this cluster aside."
    },
    {
      title: "Cluster 2 - Casual / Informal",
      meta: "25.6% of posts",
      content: "If Cluster 0 shouts, Cluster 2 shrugs. This style is defined not by what it adds, but by what it leaves out. Articles, prepositions, conjunctions, all the hallmarks of formal grammar, are consistently underused. The language is sparse, elliptical, and efficient. Posts in this cluster sound like quick reactions: “lol same”, “this”, short phrases, emojis, inside jokes. Communities like newsokunomoral, reddoge, or colloquial political subreddits overwhelmingly fall into this category. This is Reddit’s meme culture in linguistic form.",
      insight: "The key insight is that casual language is not simply shorter language. It is language that deliberately omits structure. “Cat cute” instead of “The cat is cute.” Meaning is preserved, but grammar is optional."
    },
    {
      title: "Cluster 3 - Long-Form / Structured Content",
      meta: "3.6% of posts",
      content: "This cluster slows everything down. Posts here are long… very long with high word counts, clear structure, and proper grammar. They read like essays, narratives, or detailed explanations. Sentiment is slightly negative on average, but emotion is not the defining trait. Interestingly, many of the communities dominated by this cluster are not purely human. Subreddits used for bot testing, automated statistics, or archival reposts appear prominently. Alongside them are genuine long-form contributions: detailed guides, personal stories, or in-depth analyses.",
      insight: "The insight here is that verbosity alone does not imply personal expression. Long-form content on Reddit includes both human storytelling and machine-generated text. This cluster captures a mode of communication, not an author type."
    },
    {
      title: "Cluster 4 - Standard Structured",
      meta: "53.7% of posts - the majority",
      content: "This is Reddit’s default voice. Posts in this cluster score moderately above average on all formal grammar features. Sentences are complete. Structure is clear. Sentiment leans slightly positive. This is the language of people who want to be understood. Communities like askhistorians, techsupport, buildapc, or legaladvice overwhelmingly use this style. Questions are clearly framed. Context is provided. Grammar does its job quietly.",
      insight: "The key insight is that this cluster is not “boring” or neutral. It is intentional. This is the register Reddit users adopt when clarity matters, when they are asking for help, giving advice, or explaining something complex. It is the backbone of productive interaction on the platform."
    }
  ];

  return (
    <section id="part1" className="rounded-3xl border border-[#ecebe7] bg-white p-8 space-y-10">
      {/* Narrative Section */}
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.5em] text-[#f97316] font-semibold">Part 1</p>
        <h2 className="text-3xl font-semibold text-[#101828]">Discovering Reddit’s Five Language Styles</h2>
        <p className="text-[#475467] leading-relaxed text-lg">
          Before asking whether negativity is simple or complex, we had to answer a more fundamental question: How do people actually write on Reddit? Not what they talk about. Not who they are. Not which subreddit they belong to. Just the language.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#101828]">Letting the Language Speak for Itself</h3>
        <p className="text-[#475467] leading-relaxed">
          At first, we stripped Reddit down to its bare essentials. We ignored topics, usernames, and community labels entirely. A post about politics was treated the same as a post about video games or cooking. If two messages were written in a similar way, we wanted the data to notice, regardless of where they came from.
        </p>
        <p className="text-[#475467] leading-relaxed">
          The idea was simple: if distinct writing styles truly exist on Reddit, they should emerge on their own. Would casual, meme-like language cluster together? Would emotional rants form a recognizable pattern? Would analytical, carefully argued messages stand apart? Instead of defining these styles ourselves, we let the data decide.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#101828]">Measuring How Reddit Writes</h3>
        <p className="text-[#475467] leading-relaxed">
          To do this, we translated each post into a set of linguistic fingerprints. For every message, we measured 32 features designed to capture how something is written, not what is being said. These features fall into four broad families:
        </p>
        <ul className="space-y-3 text-[#475467] ml-4 list-disc">
          <li><strong>Emotional signals</strong>, such as expressions of anger, anxiety, sadness, or positive emotion, extracted using LIWC categories and VADER sentiment scores.</li>
          <li><strong>Grammatical structure</strong>, including the use of articles, conjunctions, prepositions, and auxiliary verbs, the building blocks of sentence construction.</li>
          <li><strong>Cognitive markers</strong>, like certainty, tentativeness, and words associated with reasoning or reflection.</li>
          <li><strong>Structural properties</strong>, such as word count, sentence length, and readability metrics that reflect how dense or elaborate a message is.</li>
        </ul>
        <p className="text-[#475467]">Each post became a point in a 32-dimensional space, a compact summary of its writing style.</p>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-[#101828]">When the Data Organizes Itself</h3>
        <p className="text-[#475467] leading-relaxed">
          With these representations in hand, we applied an unsupervised learning approach. No labels. No predefined categories. No assumptions about how many styles should exist. We used K-Means clustering to ask a single question: If Reddit messages are grouped solely by how they are written, what patterns naturally emerge?
        </p>
        <p className="text-[#475467] leading-relaxed">
          The answer was surprisingly clear. The algorithm consistently converged to five distinct clusters, five recurring ways of writing that cut across topics, communities, and users. These clusters do not represent opinions or ideologies. They represent modes of expression. In the next section, we meet these five language styles and discover that some of them challenge our most intuitive ideas about negativity online.
        </p>
        
        <div className="my-8">
          <figure className="overflow-hidden rounded-2xl border border-[#d6d3cd] bg-[#f8fafc] shadow-sm p-4">
            <iframe
              src={`${assetBase}pca_projection.html`}
              title="PCA Map"
              className="h-[520px] w-full border-0 rounded-xl bg-white"
            />
          </figure>
          <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400 text-sm text-blue-800 mt-4">
            <strong>Note:</strong> We did PCA (Principal Component Analysis) for visualization only—that is why clusters appear on top of each other.
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-[#101828]">How We Made Sense of the Clusters</h3>
        <p className="text-[#475467] leading-relaxed">
          Finding clusters is only half the story. Understanding them is where things get interesting. Once the algorithm grouped posts into five language clusters, we needed a way to <strong>translate numbers into meaning </strong>. What makes one cluster different from another? Which linguistic features truly define a style, and which are just noise?
        </p>
        <p className="text-[#475467] leading-relaxed">
          To answer this, we stepped back and looked at the clusters <strong>relative to Reddit as a whole</strong>. For each linguistic feature, we computed a <strong>z-score</strong>: how much a cluster deviates from the global average, measured in standard deviations. Positive z-scores indicate features that appear more often than usual; negative ones signal features that are underrepresented.
        </p>
        <p className="text-[#475467] leading-relaxed">
          Rather than drowning in dozens of numbers, we focused on what matters most. For each cluster, we selected the features with <strong>the largest absolute z-scores</strong>, the traits that most strongly distinguish it from the rest. We then visualized these signatures using <strong>radar (spider) plots</strong>, where each axis represents a linguistic feature and the distance from the center reflects its strength. These plots don’t just show differences, they reveal personalities. With that lens in place, we met Reddit’s five language tribes.
        </p>
        <div className="rounded-2xl border border-[#e3e1dd] bg-white p-6 shadow-sm">
          <SpiderPlot />
        </div>
      </div>

      {/* The Five Tribes Interactive Section */}
      <div className="space-y-6 pt-6 border-t border-[#ecebe7]">
        <h3 className="text-2xl font-semibold text-[#101828]">The Five Language Tribes</h3>
        <div className="flex flex-wrap gap-2">
        {tribes.map((tribe, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === i 
                ? 'bg-[#f97316] text-white shadow-md' 
                : 'bg-[#f2f0eb] text-[#475467] hover:bg-[#e3e1dd]'
            }`}
          >
            Cluster {i} 
          </button>
        ))}
      </div>
        <div className="p-8 rounded-2xl border border-[#f97316]/20 bg-[#fcfcfb]">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-xl font-bold text-[#101828]">{tribes[activeTab].title}</h4>
            <span className="text-sm font-bold text-[#f97316] bg-[#fff7ef] px-2 py-1 rounded">{tribes[activeTab].meta}</span>
          </div>
          <p className="text-[#475467] mb-6 leading-relaxed">{tribes[activeTab].content}</p>
          <div className="bg-white p-5 rounded-xl border border-[#ecebe7] shadow-sm italic text-[#101828]">
            <span className="font-bold text-[#f97316]">Key Insight: </span>{tribes[activeTab].insight}
          </div>
        </div>
      </div>

      {/* Dimensions & Axes Section */}
      <div className="space-y-8 pt-8 border-t border-[#ecebe7]">
        <h3 className="text-2xl font-semibold text-[#101828]">What These Clusters Really Reveal</h3>
        <p className="text-[#475467] leading-relaxed">
          Once we stepped back and looked at the five clusters together, a clearer picture emerged. These clusters are not five unrelated personalities scattered at random across Reddit. They organize themselves along two independent dimensions: two axes that structure how people write online.
        </p>

        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-[#101828]">A First Axis: The Formality Spectrum</h4>
          <p className="text-[#475467] leading-relaxed">
            The most striking pattern is a clean, almost textbook opposition between two styles we had already met: Casual and Standard Structured language. On one end of the spectrum sits Cluster 2, the casual register. On the other, Cluster 4, the formal one.
          </p>
          <ul className="list-disc ml-8 text-[#475467] space-y-2">
            <li>Informal language strips grammar down to its minimum.</li>
            <li>Formal language builds sentences carefully, piece by piece.</li>
          </ul>
          <p className="text-[#475467] leading-relaxed">
            You can almost hear the contrast: <strong>“lol same”</strong> versus <strong>“I agree with your analysis.”</strong>
          </p>
          <p className="text-[#475467] leading-relaxed">
            This is not just an intuitive distinction, it is a measurable one. Across subreddits, the proportion of casual language and the proportion of formal language are strongly negatively correlated (r = −0.74). In other words: communities that write formally almost never write casually, and vice versa.
          </p>
          <p className="text-[#475467] leading-relaxed">
            This matters because nothing forces a subreddit to choose. A community could mix both styles evenly. Yet most do not. Instead, they converge toward a norm:
          </p>
          <ul className="list-disc ml-8 text-[#475467] space-y-2">
            <li>meme and joke communities favor minimal grammar and quick reactions,</li>
            <li>expertise- and help-oriented communities favor clarity, structure, and precision.</li>
          </ul>
          <p className="text-[#475467] leading-relaxed">
            The implication is simple but powerful: these clusters reflect real stylistic choices, not random fluctuations. Reddit communities actively decide how they speak.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-[#101828]">A Second Axis: Emotional Intensity</h4>
          <p className="text-[#475467] leading-relaxed">
            But formality does not explain everything. One cluster refuses to align neatly with this spectrum: Cluster 0, the toxic/satirical style. This cluster does not sit at either end of the casual–formal axis. Instead, it drifts away from it. Its correlations with both casual and formal styles are only moderate. That distance signals something important.
          </p>
          <p className="text-[#101828] font-bold">Toxic language is not about grammar. It is about emotional intensity.</p>
          <p className="text-[#475467] leading-relaxed">
            You can be hostile in perfect sentences. You can be aggressive in slang. You can be sarcastic with impeccable punctuation or with none at all. Emotion operates on a different axis: orthogonal to formality. This is where our initial assumption quietly collapses. Negativity is not the opposite of structure. It is something else entirely.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-[#101828]">Language as a Situational Choice</h4>
          <p className="text-[#475467] leading-relaxed">
            Taken together, these two dimensions tell a deeper story. Reddit users do not belong to fixed linguistic “types.” They code-switch. The same person may:
          </p>
          <ul className="list-disc ml-8 text-[#475467] space-y-2">
            <li>write casually in a meme subreddit,</li>
            <li>switch to formal language when asking for advice,</li>
            <li>and slip into toxic or satirical tone during a heated argument.</li>
          </ul>
          <p className="text-[#475467] leading-relaxed">
            Language style is not identity. It is context. People adapt how they write depending on where they are, who they address, and what is at stake. Reddit, in that sense, behaves less like a collection of personalities and more like a collection of situations.
          </p>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 font-medium text-orange-900">
            And this realization sets the stage for the next question: If language style and emotional tone are independent… can linguistic complexity really explain why a message turns negative? That is what we explore next.
          </div>
        </div>
      </div>

      {/* Community Behavior Section */}
      <div className="space-y-8 pt-8 border-t border-[#ecebe7]">
        <h3 className="text-2xl font-semibold text-[#101828]">Do Real Communities Actually Speak Like This?</h3>
        <p className="text-[#475467] leading-relaxed">
          Up to this point, everything we have shown lives at the level of individual posts. Clusters emerge. Correlations appear. Dimensions take shape. But one question remains unavoidable: Do real Reddit communities actually follow these language styles, or are we just clustering noise? To answer this, we turned to the communities themselves.
        </p>

        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-[#101828]">When a Community Speaks With One Voice</h4>
          <p className="text-[#475467] leading-relaxed">
            We started by measuring subreddit homogeneity: for each community, what percentage of its posts belong to a single language cluster? Some results were immediately striking. A subset of subreddits shows extreme linguistic consistency. In these spaces, nearly every post follows the same writing style, not by accident, but by norm.
          </p>
          <p className="text-[#475467] leading-relaxed">
            Among the most homogeneous communities (90% or more in a single cluster), clear patterns emerge:
          </p>
          <ul className="list-disc ml-8 text-[#475467] space-y-3">
            <li><strong>Toxic / Satirical</strong> communities overwhelmingly speak the language of confrontation and mockery. Subreddits like redditvoidcoc or profanitywatch barely deviate from this tone.</li>
            <li><strong>Casual</strong> communities show absolute commitment to informality. In places like newsokunomoral or reddoge, virtually every post uses minimal grammar and meme-driven expression.</li>
            <li><strong>Standard Structured</strong> communities adopt clarity as a rule. In technical or advice-oriented subreddits, every message follows the same careful, well-formed register.</li>
          </ul>
          <p className="text-[#475467] leading-relaxed">
            These are not soft tendencies. They are linguistic identities enforced collectively. At this point, the validation is clear: the clusters are not abstract statistical groupings. They map directly onto community-level writing norms.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-[#101828]">When Scale Brings Diversity</h4>
          <p className="text-[#475467] leading-relaxed">
            But Reddit is not only made of niche spaces. What happens when we look at large, high-traffic communities, the places where thousands of users collide every day? The answer is almost the opposite. Take a subreddit like <strong>r/nfl</strong>, a massive hub for sports discussion. Its language profile is anything but uniform:
          </p>
          <ul className="list-disc ml-8 text-[#475467] space-y-2">
            <li>casual language dominates live reactions, memes, and trash talk,</li>
            <li>structured language appears in statistical breakdowns and serious analysis,</li>
            <li>toxic language surfaces during heated debates or disappointing games,</li>
            <li>smaller traces of other styles coexist in the background.</li>
          </ul>
          <p className="text-[#475467] leading-relaxed">
            No single cluster defines the community. Instead, users switch styles within the same space, depending on the thread, the moment, and the emotional stakes. A joke invites casual language. A serious question invites structure. A loss invites frustration.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-[#101828]">From Language Styles to Network Behavior</h4>
          <p className="text-[#475467] leading-relaxed">
            Up to now, we have looked inward. We discovered that Reddit messages fall into a small number of recurring language styles. We saw that some communities speak with one dominant voice, while others mix registers depending on context. We learned that formality and emotional intensity are independent dimensions of expression.
          </p>
          <p className="text-[#475467] leading-relaxed">
            But Reddit is not just a collection of isolated communities. It is a network. Subreddits constantly point to each other: quoting, criticizing, recommending, mocking, or explaining. Every link is an action — a choice to engage with another community.
          </p>
          <p className="text-[#101828] font-bold">So the next question becomes unavoidable: Do language styles predict how communities behave in the Reddit network?</p>
        </div>
      </div>
    </section>
  );
};


const PartTwo = () => {
  const [activeFinding, setActiveFinding] = useState(0);

  const findings = [
    {
      title: "Finding 1 - Toxic Communities Are Highly Active Linkers",
      content: (
        <p className="italic leading-relaxed text-[#475467] text-lg">
          The first pattern emerges immediately. Communities that use more <strong>toxic/satirical language</strong> tend to post more outgoing links to other subreddits. The correlation is moderate but robust <strong>(r ≈ +0.25)</strong>. This matters because it breaks a common assumption. Toxic communities are not isolated echo chambers. They are outward-facing. Subreddits built around mockery, outrage, or satire constantly reference other communities: 
          <span className="block mt-2">● to criticize their posts,</span>
          <span className="block">● to document drama,</span>
          <span className="block">● to showcase “bad takes.”</span>
          In this sense, they act as meta-commentary hubs. They don’t just talk among themselves, they actively weave other communities into their discourse. Structurally, they sit at the edges of conflict, pulling content from across Reddit and reframing it through a hostile lens.
        </p>
      ),
      insight: "Language style predicts agency: Toxic clusters aren't just loud; they are the primary architects of cross-community conflict."
    },
    {
      title: "Finding 2 - Toxic Language Predicts Negative Linking (Very Strongly)",
      content: (
        <p className="italic leading-relaxed text-[#475467] text-lg">
          If the first result is interesting, the second is decisive. The proportion of toxic/satirical language in a subreddit is <strong>strongly and negatively correlated</strong> with the sentiment of its outgoing links <strong>(r ≈ −0.72)</strong>. This is the strongest relationship in the entire analysis. In practical terms, this means that knowing a community’s language style allows you to predict, with high confidence, whether its links will be hostile or neutral. Why does this happen? Because in these communities, links are <strong>not neutral references. They are weapons.</strong> A link is framed as:
          <span className="block mt-2">● “Look at this terrible take from [subreddit]”</span>
          <span className="block">● “Can you believe what they’re saying over there?”</span>
          The act of linking becomes an act of attack. This is a crucial insight: linguistic style does not stay inside a community. It shapes how that community engages with the rest of Reddit. Toxic language communities are not just negative internally, they export negativity through the network.
        </p>
      ),
      insight: "Toxic language communities don't just stay negative internally; they export negativity through the network."
    },
    {
      title: "Finding 3 - Formal Language Predicts Constructive Linking",
      content: (
        <p className="italic leading-relaxed text-[#475467] text-lg">
          On the other end of the spectrum, a quieter pattern appears. Subreddits that use more standard, structured language tend to post links with <strong>more positive or neutral sentiment (r ≈ +0.27)</strong>. The effect is weaker than the toxic one but it is consistent. Communities focused on expertise and problem-solving link outward to:
          <span className="block mt-2">● documentation,</span>
          <span className="block">● tutorials,</span>
          <span className="block">● external resources,</span>
          <span className="block">● clarifying explanations.</span>
          Think of <strong>techsupport, buildapc, or legaladvice</strong>. Here, links are not commentary, <strong>they are tools.</strong> These communities act as information brokers in Reddit’s network. They connect users to useful content rather than amplifying conflict. This validates the idea that Cluster 4 is not just grammatically structured, but socially constructive.
        </p>
      ),
      insight: "Formal structure is the language of utility. These communities build the network's knowledge base."
    },
    {
      title: "A Non-Finding That Matters - Popularity Is Unrelated",
      content: (
        <p className="italic leading-relaxed text-[#475467] text-lg">
          One might expect language style to influence popularity. <strong>It doesn’t.</strong> Across all clusters, correlations with in-degree (how often a community is linked to) are weak or nonexistent. Toxic communities are not more talked about. Formal communities are not inherently more referenced. Casual communities are not ignored. What determines popularity is <strong>largely topic, not tone.</strong> This reveals an asymmetry in Reddit’s network:
          <span className="block mt-2">● communities control how they act (who they link to, how they frame it),</span>
          <span className="block">● but they have little control over how much attention they receive.</span>
          <strong>Language style predicts agency, not reputation.</strong>
        </p>
      ),
      insight: "You can choose how you speak, but the network decides if it listens."
    }
  ];

  return (
    <section id="part2" className="rounded-3xl border border-[#ecebe7] bg-white p-8 space-y-10">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.5em] text-[#f97316] font-semibold">Part 2</p>
        <h2 className="text-3xl font-semibold text-[#101828]">How Language Style Shapes Interaction</h2>
        <p className="text-[#475467] leading-relaxed text-lg">
          To answer this, we stepped up one level: from posts to communities. For each of 444 active subreddits, we built a language profile: <strong>what fraction of its posts belong to each cluster.</strong>
        </p>
      </div>

      {/* Correlation Matrix Section */}
      <div className="space-y-6">
    <h3 className="text-xl font-semibold text-[#101828]">The Correlation Matrix</h3>
    <p className="text-[#475467] leading-relaxed text-lg">
      The result is summarized in the correlation matrix shown above. And while many values are small, a few stand out sharply and tell a compelling story.
      </p>
      <div className="my-8">
        <figure className="overflow-hidden rounded-2xl border border-[#d6d3cd] bg-[#f8fafc] shadow-sm p-4">
          {/* Updated to use the .png file found in your assets */}
          <img 
            src={`${assetBase}Correlation_Matrix_Language_Cluster_composition_vs_networkInteraction.png`} 
            alt="Correlation Matrix showing language cluster composition and network behavior" 
            className="w-full h-auto rounded-xl bg-white"
          />
        </figure>
        <p className="text-sm text-[#475467] mt-4 italic text-center">
          The matrix reveals how different language styles correlate with linking behavior across the network.
        </p>
      </div>
    </div>

      {/* Findings Section */}
      <div className="space-y-6 pt-6 border-t border-[#ecebe7]">
        <h3 className="text-2xl font-semibold text-[#101828]">The Story the Data Tells</h3>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 flex flex-col gap-2">
            {findings.map((f, i) => (
              <button
                key={i}
                onClick={() => setActiveFinding(i)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  activeFinding === i 
                  ? 'border-[#f97316] bg-[#fff7ef] text-[#101828] shadow-sm' 
                  : 'border-[#ecebe7] bg-white text-[#475467] hover:border-[#f97316]/30'
                }`}
              >
                <p className="text-xs font-bold text-[#f97316] uppercase mb-1">Observation {i + 1}</p>
                <p className="text-sm font-bold uppercase">{f.title.split(' - ')[1] || f.title}</p>
              </button>
            ))}
          </div>

          <div className="md:w-2/3 p-8 rounded-2xl border border-[#ecebe7] bg-[#fcfcfb] min-h-[400px]">
            <h4 className="text-xl font-bold text-[#101828] mb-4">{findings[activeFinding].title}</h4>
            <div className="mb-6">
              {findings[activeFinding].content}
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#ecebe7] shadow-sm italic text-[#101828]">
              <span className="font-bold text-[#f97316] not-italic uppercase tracking-tighter mr-2">Key Insight:</span> 
              {findings[activeFinding].insight}
            </div>
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="space-y-8 pt-10 border-t border-[#ecebe7]">
        <h3 className="text-2xl font-semibold text-[#101828]">The Big Picture</h3>
        <p className="text-[#475467] leading-relaxed text-lg">
          Taken together, these findings paint a coherent picture:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-base italic">
          <li className="p-6 rounded-2xl bg-red-50 border border-red-100 text-red-900">
            ● <strong>Toxic/satirical communities</strong> are active linkers and powerful amplifiers of negativity.
          </li>
          <li className="p-6 rounded-2xl bg-green-50 border border-green-100 text-green-900">
            ● <strong>Formal/expertise communities</strong> link outward in constructive, information-sharing ways.
          </li>
          <li className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700">
            ● <strong>Casual communities</strong> are largely inward-focused, oriented toward entertainment rather than cross-community engagement.
          </li>
        </ul>
         
        <div className="mt-8 p-10 bg-[#101828] text-white rounded-3xl border-l-8 border-[#f97316]">
          <p className="text-xl font-light leading-relaxed italic">
            "Language style, in other words, is not just a way of speaking. It is a way of interacting with the network. And with this in mind, we are ready to tackle the next question: If language style shapes behavior so strongly, does linguistic complexity itself explain negativity?"
          </p>
        </div>
      </div>
    </section>
  );
};



const PartThree = () => {
  return (
    <section id="part3" className="rounded-3xl border border-[#ecebe7] bg-white p-8 space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.5em] text-[#f97316] font-semibold">Part 3</p>
        <h2 className="text-3xl font-semibold text-[#101828]">The Complexity Paradox</h2>
        <h3 className="text-xl font-medium text-[#475467]">Why Grammar Doesn’t Predict Sentiment</h3>
        <p className="text-[#475467] leading-relaxed text-lg">
          By this point in the story, a pattern has become hard to ignore. In Parts 1 and 2, the same signals kept resurfacing. 
          <strong> Anger. Negativity. Emotional intensity.</strong> They dominated the clustering. They shaped network behavior. 
          They predicted whether links would attack or inform.
        </p>
        <p className="text-[#101828] font-semibold italic text-lg">
          Which raised an uncomfortable question. If emotion explains so much… does linguistic complexity explain anything at all?
        </p>
      </div>

      {/* A Suspicion Worth Testing */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-[#101828]">A Suspicion Worth Testing</h3>
        <p className="text-[#475467] leading-relaxed text-lg">
          Intuitively, we often associate complex language with restraint, nuance, and calm reasoning. Long sentences. Sophisticated vocabulary. Careful syntax. 
          <strong> But intuition is not evidence.</strong>
        </p>
        <p className="text-[#475467] leading-relaxed text-lg">
          So we asked a precise question: <em>If we strip away emotion entirely, does structural complexity still predict whether a message is positive or negative?</em> To answer that, we had to change how we looked at the data.
        </p>
      </div>

      {/* Methodological Shift */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-[#101828]">A Deliberate Methodological Shift</h3>
        <p className="text-[#475467] leading-relaxed text-lg">
          In Part 1, we intentionally mixed everything together. We used 32 features spanning:
        </p>
        <ul className="list-disc ml-8 text-[#475467] text-lg space-y-2">
          <li>emotional signals (anger, anxiety, positive emotion),</li>
          <li>grammatical markers (articles, conjunctions, prepositions),</li>
          <li>cognitive cues (certainty, tentativeness),</li>
          <li>and structural traits (sentence length, readability).</li>
        </ul>
        <p className="text-[#475467] leading-relaxed text-lg">
          That was the right choice for discovering styles. But it came with a cost. <strong>Emotion overwhelmed everything else.</strong> 
          So for Part 3, we did something counterintuitive but necessary: <strong>we removed emotion from the equation entirely.</strong> 
          No anger. No positivity. No sentiment scores. Only structure.
        </p>
      </div>

      {/* The Five Metrics */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-[#101828]">Measuring Complexity Without Emotion</h3>
        <p className="text-[#475467] leading-relaxed text-lg">
          To do this, we reduced language to five carefully chosen complexity metrics. Each captures a different aspect of sophistication without referencing emotional content.
        </p>
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#fcfcfb] border border-[#ecebe7]">
            <h4 className="font-bold text-[#101828]">1. Lexical Diversity</h4>
            <p className="text-[#475467] italic">How varied is the vocabulary? Repetition lowers complexity. Variety increases it. A post that reuses the same words again and again scores low. One that draws from a broad vocabulary scores high.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#fcfcfb] border border-[#ecebe7]">
            <h4 className="font-bold text-[#101828]">2. Long Word Ratio</h4>
            <p className="text-[#475467] italic">How often does a writer use long words? Short, common words keep language simple. Longer words usually signal more specialized or formal expression.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#fcfcfb] border border-[#ecebe7]">
            <h4 className="font-bold text-[#101828]">3. Readability (ARI)</h4>
            <p className="text-[#475467] italic">How hard is the text to read? The Automated Readability Index estimates the education level required to understand a message. Lower scores correspond to simple prose; higher scores indicate denser, more academic writing.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#fcfcfb] border border-[#ecebe7]">
            <h4 className="font-bold text-[#101828]">4. Vocabulary Sophistication</h4>
            <p className="text-[#475467] italic">What is the average word length? This captures nuance not visible through counts alone. Two posts can be the same length, but one may rely on short, common words while the other uses longer, more specialized terms.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#fcfcfb] border border-[#ecebe7]">
            <h4 className="font-bold text-[#101828]">5. Syntactic Complexity</h4>
            <p className="text-[#475467] italic">How elaborate are the sentences? Short sentences convey information efficiently. Longer ones allow for qualification, nuance, and structure. This metric captures how much grammatical machinery a writer deploys.</p>
          </div>
        </div>
      </div>

      {/* Two Ways to Measure */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-[#101828]">Two Ways to Measure Complexity</h3>
        <p className="text-[#475467] leading-relaxed text-lg">
          To avoid building our conclusions on a fragile choice, we deliberately took two complementary approaches:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl border border-[#ecebe7]">
            <p className="font-bold text-[#101828] mb-2">Method 1 - The Simple Average</p>
            <p className="text-[#475467] text-lg italic leading-relaxed">Normalized metrics to the same scale and computed their simple average. Every feature contributed equally for maximum transparency.</p>
          </div>
          <div className="p-6 rounded-2xl border border-[#ecebe7]">
            <p className="font-bold text-[#101828] mb-2">Method 2 - Principal Component Analysis (PCA)</p>
            <p className="text-[#475467] text-lg italic leading-relaxed">Used PCA to extract orthogonal components: independent dimensions of complexity that remove overlap and double-counting of signals.</p>
          </div>
        </div>
      </div>

      {/* Results - Cohen's d */}
      <div className="space-y-6 pt-6 border-t border-[#ecebe7]">
        <h3 className="text-2xl font-semibold text-[#101828]">Do Positive and Negative Messages Differ in Complexity?</h3>
        <p className="text-[#475467] leading-relaxed text-lg">
          We split our dataset of over half a million posts into two groups: messages containing <strong>positive hyperlinks</strong> and messages containing <strong>negative hyperlinks</strong>.
        </p>
        <div className="my-8">
          <p className="text-sm font-bold text-[#f97316] uppercase mb-4 text-center">Plot: Tableau of Biggest Cohen d Coefficients</p>
          <div className="h-64 flex items-center justify-center border border-dashed border-[#d6d3cd] rounded-2xl bg-[#fcfcfb]">
            [PLOT : TABLEAU OF BIGGEST COHEN D COEFF]
          </div>
          
        </div>
        <p className="text-[#475467] leading-relaxed text-lg">
          This is where the story takes a turn. When we compare emotional features, the difference is clear. <strong>But when we look at complexity, everything collapses.</strong> 
          Across all seven complexity measures, effect sizes stay below the threshold of meaningful difference (|d| &lt; 0.2).
        </p>
      </div>

      {/* Violin Plot */}
<div className="space-y-6">
  <h3 className="text-2xl font-semibold text-[#101828]">Seeing the Absence: When the Data Looks Flat</h3>
  <div className="my-8 space-y-4">
    <figure className="overflow-hidden rounded-2xl border border-[#d6d3cd] bg-white shadow-sm p-4">
      <div className="flex items-center justify-center bg-[#f8fafc] rounded-xl overflow-hidden">
        {/* Updated with consistent asset name from image_c12e63.png */}
        <img 
          src={`${assetBase}Emotional_vs_Complexity_Features_Direct_Visual_Comparison.png`} 
          alt="Violin Plot: Emotional Language vs Complexity comparison" 
          className="w-full h-auto max-h-[600px] object-contain"
        />
      </div>
    </figure>
    
      <p className="text-sm text-[#475467] text-center italic">
        The difference is immediate. In Emotional Language (left), the curves barely touch. In Complexity (right), they overlap almost perfectly.
      </p>
    </div>
    
    <p className="text-[#475467] leading-relaxed text-lg">
      This is not a weak effect. <strong>It is the absence of an effect.</strong> Positive and negative posts are written with similar levels of sophistication. 
      What differs is not <em>how</em> people write—it is <em>which words</em> they choose. Anger versus support. Criticism versus approval.
    </p>
  </div>

      {/* Conclusion */}
      <div className="space-y-8 pt-10 border-t border-[#ecebe7]">
        <h3 className="text-2xl font-semibold text-[#101828]">The Complexity Paradox</h3>
        <div className="p-10 bg-[#101828] text-white rounded-3xl space-y-6 shadow-2xl">
          <p className="text-2xl font-light leading-relaxed italic">
            "Linguistic sophistication does not temper negativity. Long sentences do not calm hostility. Advanced vocabulary does not signal positivity. 
            The paradox is now clear: complexity feels meaningful to us as readers, but in aggregate, it explains almost nothing about sentiment."
          </p>
          <p className="text-sm uppercase tracking-[0.2em] text-[#f97316] font-bold border-t border-white/10 pt-6">
            Final Question: If complexity alone cannot predict negativity… can any structure-based model do better or does sentiment always win?
          </p>
        </div>
      </div>
    </section>
  );
};


const PartFour = () => {
  return (
    <section className="rounded-3xl border border-[#ecebe7] bg-white p-8 space-y-10" id="part4">
      {/* Header */}
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.5em] text-[#f97316] font-semibold">Part 4</p>
        <h2 className="text-3xl font-semibold text-[#101828]">A Final Test — Letting a Model Decide</h2>
        <p className="text-[#475467] leading-relaxed text-lg">
          At this point, the pattern is clear. But before closing the story, we ran one last check.
        </p>
      </div>

      {/* Methodology Section */}
      <div className="space-y-4">
        <p className="text-[#475467] leading-relaxed">
          Instead of asking whether complexity matters, we asked a model to tell us what matters most. 
          We trained a <span className="font-semibold text-[#101828]">Random Forest classifier</span> to predict whether a post contains a positive or negative hyperlink. 
          Unlike linear models, Random Forests can capture non-linear effects and interactions between features. More importantly, they provide a natural ranking of feature importance.
        </p>
        <p className="text-[#475467] leading-relaxed italic border-l-4 border-[#f97316] pl-4 bg-[#fff7ef] py-2">
          The idea was simple: if complexity truly plays a role, it should appear among the most influential features.
        </p>
      </div>

      {/* Feature Importance Plot */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-[#101828]">What the Model Cares About</h3>
        <p className="text-[#475467] leading-relaxed">
          Below, we display the 20 most important features identified by the Random Forest.
        </p>
        
        <div className="my-8 space-y-3">
        <figure className="overflow-hidden rounded-2xl border border-[#d6d3cd] bg-[#f8fafc] shadow-sm p-4">
          <img
            src={`${assetBase}3_Top20FeaturesRandomForestImportances.png`}
            alt="Top 20 feature importances from Random Forest model"
            className="w-full rounded-xl bg-white"
            loading="lazy"
          />
        </figure>
        <p className="text-sm text-[#475467] text-center italic">
          Top 20 feature importances according to the Random Forest model.
        </p>
      </div>

      </div>

      {/* The Verdict */}
      <div className="space-y-6">
        <p className="text-[#475467] leading-relaxed">
          The result is unambiguous. At the top of the list, we find the usual suspects:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-red-100 bg-red-50 text-red-900 font-medium">
            ● Negative sentiment scores
          </div>
          <div className="p-4 rounded-xl border border-red-100 bg-red-50 text-red-900 font-medium">
            ● Anger-related LIWC categories
          </div>
          <div className="p-4 rounded-xl border border-red-100 bg-red-50 text-red-900 font-medium">
            ● Emotional polarity indicators
          </div>
        </div>

        <div className="rounded-2xl border border-[#ecebe7] bg-[#fcfcfb] p-8 text-center">
          <p className="text-lg text-[#101828] leading-relaxed">
            Complexity features (<span className="italic">readability, vocabulary sophistication, sentence structure</span>) appear much lower, with marginal influence.
          </p>
        </div>
      </div>
    </section>
  );
};

const Conclusion = () => {
  const conclusionHighlights = [
    {
      label: "Interactions",
      text: "Who links out aggressively, who shares constructively, and who stays mostly inward-focused."
    },
    {
      label: "Popularity",
      text: "Attention is driven by topic, not tone. Being toxic, casual, or formal does not make a community more visible."
    },
    {
      label: "Sophistication",
      text: "Positive and negative messages share the same level of linguistic sophistication. Long sentences do not soften hostility."
    }
  ];

  return (
    <section id="conclusion" className="rounded-3xl border border-[#ecebe7] bg-white p-8 space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.5em] text-[#f97316] font-semibold">Final Summary</p>
        <h2 className="text-3xl font-semibold text-[#101828]">Conclusion — What Reddit Taught Us About Language</h2>
        <div className="space-y-4 text-[#475467] leading-relaxed text-lg">
          <p>
            At first glance, Reddit looks chaotic. Millions of posts, countless communities, endless arguments. 
            <span className="font-medium text-[#101828]"> But beneath the noise, a structure emerges.</span>
          </p>
          <p>
            We found that Reddit is organized around a small number of recurring language styles, from casual meme talk to formal expertise, from long-form narratives to sharp satire. These styles are not abstract labels: they correspond to real community norms and shape how subreddits behave in the network.
          </p>
        </div>
      </div>

      {/* Impact Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-[#101828]">Language Style Matters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {conclusionHighlights.map((item, i) => (
            <div key={i} className="p-5 rounded-xl border border-[#ecebe7] bg-[#fcfcfb] shadow-sm">
              <p className="text-[#f97316] font-bold text-xs uppercase tracking-wider mb-2">{item.label}</p>
              <p className="text-sm text-[#475467] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The Core Finding */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#101828]">Overturning Intuition</h3>
        <p className="text-[#475467] leading-relaxed">
          Most importantly, our analysis overturns a common intuition. <span className="text-[#101828] font-medium">Negativity is not a matter of complexity.</span>
        </p>
        <p className="text-[#475467] leading-relaxed italic border-l-4 border-[#f97316] pl-4 bg-[#fff7ef] py-3">
          Rich vocabulary does not imply kindness. What separates constructive discourse from toxic discourse is not grammar, it is emotion. Anger, negativity, and affective word choice dominate at every level: clusters, communities, individual posts, and predictive models.
        </p>
      </div>

      {/* Final Visual/Diagram Placeholder */}
      <div className="my-10">
        <div className="rounded-2xl border border-[#d6d3cd] bg-[#f8fafc] p-8 text-center">
          <p className="text-[#475467] mb-4 font-medium italic text-lg">
            "Reddit is not a battlefield between ‘smart’ and ‘stupid’ language. It is a place where people choose how to express emotion depending on context."
          </p>
          
        </div>
      </div>

      {/* Closing Statement */}
      <div className="space-y-6 pt-6 border-t border-[#ecebe7]">
        <div className="bg-[#101828] text-white p-8 rounded-2xl shadow-xl">
          <h4 className="text-xl font-bold mb-4 text-[#f97316]">The Last Word</h4>
          <p className="text-gray-300 leading-relaxed text-lg">
            How you write matters but <span className="text-white font-semibold">what you feel matters more.</span> In Reddit’s vast linguistic ecosystem, that emotional signal travels far beyond a single post, shaping interactions across the entire network.
          </p>
        </div>
      </div>
    </section>
  );
};


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


const Navbar = () => {
  // Function to handle smooth scrolling with an offset for the sticky header
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // This ensures the header doesn't cover the section title
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Function to handle native sharing or clipboard fallback
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "The Language Paradox of Reddit",
        text: "Explore how linguistic styles shape interaction and toxicity on Reddit.",
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#ebe9e4] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        {/* Left Side: Branding */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-[#f97316] text-white flex items-center justify-center font-bold">R</div>
          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-[0.4em] text-[#f97316]">Hivemind Labs</p>
            <p className="text-sm font-semibold text-[#101828]">The Language Paradox</p>
          </div>
        </div>

        {/* Center: Interactive Navigation Parts */}
        <div className="flex gap-1 md:gap-2 bg-[#f2f0eb]/50 p-1 rounded-full">
          {/* Intro Button */}
          <button
            onClick={() => scrollToSection('opening')}
            className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#475467] hover:text-[#f97316] hover:bg-white rounded-full transition-all"
          >
            Introduction
          </button>
          
          {/* Parts 1-4 Mapping */}
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => scrollToSection(`part${num}`)}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#475467] hover:text-[#f97316] hover:bg-white rounded-full transition-all"
            >
              Part{num}
            </button>
          ))}

          {/* End/Conclusion Button */}
          <button
            onClick={() => scrollToSection('conclusion')}
            className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#475467] hover:text-[#f97316] hover:bg-white rounded-full transition-all"
          >
            Conclusion
          </button>
        </div>

        {/* Right Side: Social Icons & Repository Link */}
        <div className="flex items-center gap-4 text-sm text-[#475467]">
          {/* Active Share Link */}
          <button 
            onClick={handleShare}
            className="hover:text-[#f97316] transition-colors p-1"
            aria-label="Share this story"
          >
            <Share2 className="h-5 w-5 cursor-pointer" />
          </button>

          {/* Active GitHub Link to specific ADA repo */}
          <a 
            href="https://github.com/epfl-ada/ada-2025-project-apesstrongtogether2025" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#f97316] transition-colors p-1"
            aria-label="View project on GitHub"
          >
            <Github className="h-5 w-5 cursor-pointer" />
          </a>
        </div>
        
      </div>
    </nav>
  );
};

const App = () => {

    return (
      <div className="min-h-screen bg-[#fbfbfa] text-[#101828] text-[20px]">
        <Navbar />
        <main className="mx-auto max-w-4xl space-y-12 py-12 px-6">
          <Opening />
          <Introduction />
          <PartOne />
          <PartTwo />
          <PartThree />
          <PartFour />
          <Conclusion />
          <footer className="border-t border-[#ebe9e4] bg-white py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-sm text-[#475467] md:flex-row md:justify-between">
        <p>© 2025 ApesStrongTogether Team </p>
        <div className="flex items-center gap-4">
          <Github className="h-5 w-5 cursor-pointer" />
          <Share2 className="h-5 w-5 cursor-pointer" />
          <BookOpen className="h-5 w-5 cursor-pointer" />
        </div>
      </div>
    </footer>
        </main>
      </div>
    );


  // </div>
  };

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
