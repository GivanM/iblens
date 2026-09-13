import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

/**
 * Production output, copied from the stored reports without editing: three demonstration
 * essays run through the anonymous grader path as TOK essays on 13 September 2026
 * (after the TOK marking rules were tightened; the page says so, and flags the one judgement
 * we disagree with in a note that is marked as ours). The essays
 * are ours. Regenerate the whole block rather than touching any sentence in it: the page
 * tells readers that every word under an essay came from the grader.
 */
const REPORTS = [
  {
    "tier": "weak",
    "bandLabel": "Band 1-2 · Rudimentary",
    "heading": "What a weak essay looks like",
    "designNote": "Opinion and anecdote in place of argument (a teacher's view, a class experiment, Pluto), counterclaims raised and dropped in a sentence, no definition of certainty, and a detour into history.",
    "paragraphs": [
      "Can we ever be certain about anything in science and math?",
      "This is a really interesting question that people have been asking for a long time. In my opinion, certainty is possible in math but not really in science, and in this essay I will explain why I think this.",
      "First of all, math is certain because it is based on numbers and numbers do not lie. Everyone agrees that 2 + 2 = 4, and it does not matter what country you are from or what language you speak, it will always be 4. My math teacher always says that math is the only subject where you can be 100% sure that you are right, and I agree with her. When I do a math test and check my answers, I know that if I followed the steps correctly then my answer is correct. You cannot really argue with a math answer like you can with an answer in English or history.",
      "Also, math has been around for thousands of years. The ancient Greeks and Egyptians used math to build things like the pyramids, and the math they used is still the same math that we use today. If math was not certain, then things like bridges and buildings would fall down all the time. The fact that they do not fall down proves that math is certain.",
      "Some people might say that math is not certain because there are some things in math that are confusing, like imaginary numbers. When I first learned about imaginary numbers I thought they made no sense, because how can you have the square root of a negative number? But my teacher explained that they are just another tool that mathematicians use, so this does not really mean that math is uncertain. It just means that some math is hard to understand.",
      "Science is different from math because science changes all the time. Scientists are always discovering new things and changing their minds about old things. For example, when my parents were at school they learned that Pluto was a planet, but now scientists say that Pluto is not a planet anymore. This shows that science is not certain, because something that everyone thought was true turned out to be wrong.",
      "Another example is that people used to think that smoking was not bad for you. In old advertisements, doctors even appeared promoting cigarettes. Now we know that smoking causes cancer and lots of other diseases. So what scientists say can change a lot, and we can never be sure that what they are telling us now is actually true. Maybe in fifty years scientists will say that something we think is healthy now is actually really bad for us.",
      "Also, in science experiments things can go wrong. In my chemistry class we did an experiment to find out the rate of a reaction and everyone in the class got different results, even though we all followed the same method. Some groups made mistakes with measuring and some groups had equipment that was not very accurate. This shows that science cannot be certain, because experiments do not always give the same answer.",
      "However, some people might argue that science can be certain about some things. For example, we know for sure that gravity exists because if you drop something it falls down. Nobody can argue that gravity is not real. But even with gravity, scientists like Newton and Einstein had different ideas about how it works, so we are still not completely certain.",
      "I think the main difference between math and science is that math is in our heads and science is about the real world. The real world is complicated and there are lots of things that can affect it, but math is simple and logical. That is why math can be certain and science cannot.",
      "Other subjects like history are even less certain than science, because historians were not there when things happened and people in the past sometimes lied. For example, we cannot be certain about what really happened in ancient times because there were no cameras. So science is more certain than history but less certain than math. I also think that sometimes people are certain about things just because they feel it, like when you are certain that your friend is telling the truth. But this is not the same as being certain in math.",
      "There is also the question of whether we should even want certainty. If scientists were completely certain about everything, they would stop doing research and we would never discover anything new. So maybe it is good that science is not certain. On the other hand, it would be nice to be certain about things like medicine, because people need to know if a medicine is safe before they take it.",
      "In conclusion, I believe that certainty is attainable in mathematics because numbers are always the same and math answers can be checked. In the natural sciences, certainty is not really attainable because scientists change their minds, experiments can go wrong and the real world is complicated. Overall, math is more certain than science, but both of them are important and we need both of them in our lives."
    ],
    "excerpt": "This is a really interesting question that people have been asking for a long time. In my opinion, certainty is possible in math but not really in science, and in this essay I will explain why I think this. First of all, math is certain because it is…",
    "wordCount": 873,
    "score": 2,
    "max": 10,
    "band": "1-2",
    "criterionName": "Holistic assessment, global impression",
    "criterionComment": "The essay sits at the top of the Rudimentary band (1-2). The discussion is weakly connected to the title in any critical sense: it touches on natural science and mathematics but does so through assertion and personal experience rather than argument. Relevant points are present (science revises its claims; mathematical reasoning is deductive) but they are expressed only as unsupported statements.\n\nThere is no awareness of different points of view in any meaningful sense. The 'however, some people might argue' paragraph raises the idea that science can be certain about gravity and then dismisses it in two sentences. That is not evaluation of a point of view; it is a token concession. The descriptors for the Satisfactory band (5-6) require that arguments be offered and supported by examples, and that there be some awareness of different points of view: this essay does not consistently meet even that threshold, because the examples function as illustrations of a pre-formed opinion rather than as evidence tested against a claim.\n\nThe discussion of mathematics is particularly weak. The claim that 'numbers do not lie' and that a math teacher's statement constitutes justification does not meet the standard of argument the instrument expects. The imaginary numbers paragraph actually works against the essay's own position without the essay recognising this, since the existence of non-intuitive mathematical objects is precisely the kind of case where certainty is philosophically interesting.\n\nThe closing paragraph about whether certainty is even desirable is the essay's most exploratory moment, but it is one short paragraph at the end and is not developed. Awarding 2 rather than 1 reflects that the essay does engage with both areas named in the title and does gesture toward a counterargument, even if those gestures are superficial.",
    "overall": "This essay addresses a question that does not appear to be one of the IB prescribed titles for the TOK essay. If it was submitted as a TOK essay for an examined session without being one of the six prescribed titles, it would receive 0 marks. The feedback below is offered as if it were a valid TOK essay so you can understand what needs to improve.\n\nReading the essay as a whole against the holistic instrument, it falls within the Rudimentary band (1-2). The discussion is weakly connected to the kind of critical exploration the title demands: it consists almost entirely of unsupported assertions and personal anecdote rather than argument. There is no sustained engagement with what certainty actually means, no exploration of different points of view at any real depth, and no meaningful link to areas of knowledge in the way the descriptors require.\n\nThe essay's central claim, that mathematics is certain and natural science is not, is stated but never substantiated through reasoning. The examples offered (2 + 2 = 4, Pluto's reclassification, a chemistry class experiment) are used descriptively to illustrate the conclusion the essay has already reached, not to test or complicate it. The brief mention of Newton and Einstein on gravity is the closest the essay comes to genuine counterargument, but it is dropped after one sentence.\n\nThere is no exploration of what 'certainty' means as a concept. Is it psychological confidence? Logical necessity? Empirical verification? Without defining the key term in the title, the whole discussion rests on an unstated and unexamined assumption. This is the single most important gap in the essay.",
    "risks": [
      {
        "title": "No analysis of what 'certainty' means",
        "description": "The entire essay rests on a term it never examines. You use 'certain' and 'certainty' throughout as if their meaning is obvious, but the question is philosophically loaded. Logical certainty (a proof that cannot be otherwise) is different from empirical certainty (high confidence based on evidence) and from psychological certainty (feeling sure). Because you never distinguish these, your comparison of mathematics and science conflates different kinds of claims. This is the most costly gap because it means the discussion never truly engages with the title."
      },
      {
        "title": "Examples are used descriptively, not analytically",
        "description": "Every example in the essay, from Pluto to the smoking advertisements to your chemistry experiment, is introduced to confirm a point you have already made. None of them is used to test an argument, reveal a complication, or lead to a new insight. The descriptors from the Satisfactory band upward require examples that support arguments; at the Good and Excellent bands they must be specific and do genuine analytical work. As they stand, your examples function as illustrations in a personal account rather than as evidence in a reasoned discussion."
      },
      {
        "title": "No real engagement with counterarguments or alternative perspectives",
        "description": "Both 'however' paragraphs (on imaginary numbers and on gravity) raise a possible challenge and then dismiss it without reasoning. Saying imaginary numbers are 'just a tool' does not address whether their existence complicates the certainty of mathematics. Saying Newton and Einstein disagreed about gravity and then stopping does not explore what this means for scientific knowledge. The Satisfactory band requires some awareness and evaluation of different points of view; yours shows awareness but no evaluation."
      },
      {
        "title": "The argument about mathematics is based on authority and practicality rather than reasoning",
        "description": "You justify the certainty of mathematics by citing your teacher's opinion, the longevity of Egyptian mathematics, and the fact that buildings do not fall down. None of these constitutes a logical reason for mathematical certainty. The real basis for mathematical certainty, that mathematical truths follow necessarily from axioms and definitions by deductive proof, is never identified. Without this, your claim that mathematics is certain has no foundation the essay actually provides."
      },
      {
        "title": "Digressions that do not connect to the title",
        "description": "The paragraphs about history and about personal certainty (being certain your friend is telling the truth) are not linked back to the title in any way. They appear as loosely associated thoughts rather than as part of a coherent argument. The descriptors at every band above Rudimentary require that the discussion be coherent; material that is not connected to the central argument weakens coherence."
      }
    ],
    "leverage": [
      {
        "title": "Define and interrogate the concept of certainty at the start",
        "description": "Before comparing mathematics and science, spend a paragraph unpacking what 'certainty' could mean. You might distinguish between the kind of certainty that comes from logical proof (where the conclusion cannot be otherwise given the premises) and the kind that comes from empirical evidence (which is always in principle revisable). This single move would immediately lift the discussion because every subsequent example and argument could then be measured against a clear standard rather than a vague intuition."
      },
      {
        "title": "Develop your best example into genuine analysis",
        "description": "Your example of scientists revising the status of Pluto is potentially interesting, but you use it only to say 'science changes.' You could push it much further: what does it tell us that the change was made by a formal vote of the International Astronomical Union rather than by new observational data? Does that make the original claim less certain, or does it show that scientific categories are conventional rather than discovered? Asking this kind of follow-up question transforms a descriptive example into an analytical one."
      },
      {
        "title": "Develop the paragraph on whether certainty is desirable into a genuine counterposition",
        "description": "Your closing reflection on whether complete certainty in science would halt discovery is the most exploratory moment in the essay. If you moved this earlier and developed it, it could become a real alternative perspective: perhaps the revisability of scientific knowledge is not a weakness but a defining strength, making science more reliable over time precisely because it does not claim finality. Contrasting this with the deductive finality of mathematics could give your essay a much more nuanced structure."
      },
      {
        "title": "Use your chemistry experiment example more carefully",
        "description": "The account of different groups getting different results is potentially useful, but you conclude from it that science cannot be certain. A more analytical treatment would ask: does variation in experimental results mean the underlying phenomenon is uncertain, or does it mean that measurement and procedure are imperfect? Scientists would say the rate of reaction has a true value; the variation reflects limitations in the experiment, not in the science. Exploring this distinction would show much greater critical awareness."
      },
      {
        "title": "Strengthen the structure so each paragraph advances the argument",
        "description": "At present the essay reads as a list of points rather than a developing argument. Each paragraph should do something to move the discussion forward: introduce a claim, test it with an example, consider a challenge, and draw a provisional conclusion. If you map out what each paragraph is meant to establish before you write it, the coherence of the whole essay will improve significantly, which is central to the descriptors at the Good and Excellent bands."
      }
    ],
    "nextSteps": [
      "Write a new opening section, no more than two short paragraphs, that defines at least two distinct senses of 'certainty' (for example, logical necessity versus empirical confidence) and explains why this distinction matters for comparing mathematics and natural science. Every argument that follows should refer back to this definition.",
      "Take your two strongest examples, one from mathematics and one from natural science, and rewrite each one so that it tests your argument rather than simply illustrating it. For the mathematics example, consider whether the existence of results mathematicians cannot prove (such as unprovable propositions) complicates your certainty claim. For the science example, push beyond 'science changes' to ask what the process of revision tells us about the nature of scientific knowledge.",
      "Write a genuine counterargument section that presents the strongest possible case against your main thesis, engage with it seriously for at least one full paragraph, and then explain specifically why you find your original position more convincing despite that challenge. This alone could move the essay from the Rudimentary band toward the Satisfactory band by demonstrating real awareness and evaluation of different points of view."
    ],
    "editorNote": "In its risks and next steps it says the Satisfactory level needs some evaluation of other points of view; the TOK descriptor for Satisfactory asks only for some awareness of them. It says examples must be specific at the Good level; \"specific\" appears only in the Excellent descriptor. It also says every level above Rudimentary needs a coherent discussion, while \"clear, coherent\" arguments are described only at Good and Excellent. As its overall comment says, the title is not one of the IB's prescribed titles, so an essay submitted on it would score 0, unless it were clearly a modified version of one of that session's prescribed titles."
  },
  {
    "tier": "developing",
    "bandLabel": "Band 3-4 · Basic",
    "heading": "What a developing essay looks like",
    "designNote": "A clear structure, defined terms and the standard examples (Pythagoras, Popper, Newton and Einstein, Gödel), but examples that illustrate rather than argue, and counterclaims that are dismissed rather than weighed.",
    "paragraphs": [
      "To what extent is certainty attainable in the natural sciences and mathematics?",
      "Certainty is an important idea in Theory of Knowledge. In this essay, certainty means knowledge that cannot be doubted. Mathematics and the natural sciences are two areas of knowledge that are often seen as the most reliable, so they are good areas to use to explore this question. I will argue that certainty is attainable in mathematics but not in the natural sciences, although both areas give us very reliable knowledge.",
      "Mathematics is based on proofs. A proof starts with axioms, which are statements that are accepted as true, and then uses logical steps to reach a conclusion. Once something has been proven, it stays proven. For example, Pythagoras' theorem says that in a right-angled triangle the square of the hypotenuse is equal to the sum of the squares of the other two sides. This was proven thousands of years ago and it is still true today. It does not matter who you are or where you live, the theorem will always work. This shows that mathematics can give us certainty.",
      "Another example is the proof that the square root of two is irrational. The proof works by assuming the opposite and showing that this leads to a contradiction. Because the logic is valid, mathematicians are certain that the square root of two cannot be written as a fraction. This kind of reasoning is called deductive reasoning, and it is different from the kind of reasoning used in the sciences.",
      "However, some people argue that mathematics is not completely certain. One reason is that axioms are only assumed to be true. For example, Euclidean geometry is based on axioms that were thought to be obviously true, but in the nineteenth century mathematicians developed non-Euclidean geometries where some of these axioms do not apply. This shows that mathematical knowledge depends on the axioms that are chosen. Another reason is that mathematicians are human and can make mistakes in proofs. Some proofs are so long and complicated that very few people can check them. Also, Kurt Gödel showed that there are limits to what can be proven in mathematics.",
      "Another point is that mathematics is also used to describe the real world. For example, engineers use mathematics to design bridges and scientists use it to make predictions. When mathematics is applied to the real world, the results are not always certain, because the real world is more complicated than the mathematical model. This shows that mathematics is most certain when it stays abstract.",
      "There are also different perspectives on what mathematics is. Some people believe that mathematics is discovered, because mathematical truths exist before humans find them, while others believe that mathematics is invented by humans. If mathematics is invented, it might seem less certain, because humans could have invented it differently. However, even if mathematics is invented, the rules still have to be followed once they are chosen.",
      "Even so, I think mathematics is still certain, because a proof that is valid cannot be wrong. If a mistake is found, the proof was not really a proof in the first place. Non-Euclidean geometry did not show that Euclid was wrong, only that there are other kinds of geometry. So overall mathematics can give us certainty.",
      "The natural sciences are different because they are based on observation and experiment rather than proof. Scientists use the scientific method: they make a hypothesis, test it with experiments, and then draw conclusions. This is inductive reasoning, because it goes from specific observations to general laws. The problem with inductive reasoning is that we can never be sure that the next observation will be the same as the previous ones. For example, people in Europe believed that all swans were white until black swans were found in Australia.",
      "The philosopher Karl Popper argued that scientific theories can never be proven true, they can only be falsified. A good scientific theory makes predictions that could be shown to be false. If the predictions keep being confirmed, we can have more confidence in the theory, but we can never be completely certain. This means that certainty is not attainable in the natural sciences.",
      "A famous example of this is Newtonian physics. Isaac Newton's laws of motion and gravity were accepted for more than two hundred years and they explained a huge number of observations. However, in the early twentieth century Albert Einstein developed the theory of relativity, which showed that Newton's laws do not work in every situation, for example at very high speeds or in very strong gravity. This shows that even a very successful scientific theory can be replaced, so scientific knowledge is not certain.",
      "On the other hand, some scientific knowledge seems certain. For example, it is certain that the Earth orbits the Sun and that water is made of hydrogen and oxygen. Some people would say that it would be unreasonable to doubt these facts. Scientists also use statistics to show how confident they are in their results. However, even these facts are based on evidence, and in theory new evidence could change them. So I still think that certainty is not really attainable in the natural sciences.",
      "Another way scientists try to become more certain is peer review. Before a scientific paper is published, other scientists in the same field read it and check whether the methods and conclusions are sound. Experiments are also repeated by other scientists to see if they get the same results. If many different scientists get the same result, then we can be more confident that the result is correct. However, peer review is done by humans, and sometimes mistakes are not noticed, so this does not make scientific knowledge completely certain either.",
      "When we compare the two areas of knowledge, we can see that they use different methods. Mathematics uses deductive reasoning and proofs, which can give certainty. The natural sciences use inductive reasoning and experiments, which cannot give certainty but can give very reliable knowledge. Both areas of knowledge are important and both help us understand the world in different ways. Scientists also use mathematics in their work, for example when they use equations to describe motion, so the two areas are connected.",
      "In conclusion, certainty is attainable to a large extent in mathematics, because proofs cannot be wrong once they are valid, although mathematics depends on axioms. In the natural sciences, certainty is not attainable, because scientific knowledge is based on evidence and can always change, as the example of Newton and Einstein shows. However, scientific knowledge is still very reliable. Therefore, the answer to the question depends on which area of knowledge we are talking about."
    ],
    "excerpt": "Certainty is an important idea in Theory of Knowledge. In this essay, certainty means knowledge that cannot be doubted. Mathematics and the natural sciences are two areas of knowledge that are often seen as the most reliable, so they are good areas to use to explore this question…",
    "wordCount": 1114,
    "score": 4,
    "max": 10,
    "band": "3-4",
    "criterionName": "Holistic assessment, global impression",
    "criterionComment": "The essay sits at the upper end of the Basic band (3-4). It is consistently connected to the title and makes recognisable links to both mathematics and the natural sciences as areas of knowledge. However, the discussion is predominantly descriptive: you present examples (Pythagoras, Newton and Einstein, the black swan) and name relevant ideas (deductive versus inductive reasoning, Popper's falsifiability, Gödel's incompleteness) without analysing what they show about the attainability of certainty. The counter-perspectives introduced, such as the invented versus discovered debate and the apparent certainty of some scientific facts, are noted but not evaluated; they are set aside with a brief rejoinder rather than used to deepen the argument. Arguments are present but unclear in the sense that the reasoning linking evidence to claim is often missing. The work does not yet reach the Satisfactory band (5-6) because it lacks even the moderate degree of critical analysis, developed argument, and genuine engagement with different viewpoints that band requires. The upper mark of 4 is awarded rather than 3 because the essay is coherently organised, stays on the title throughout, and uses broadly appropriate examples, showing Basic qualities to a reasonable extent.",
    "overall": "This essay addresses the prescribed title directly and maintains a consistent thread throughout, which keeps it connected to the question. The structure is logical: mathematics is treated first, then the natural sciences, then a comparison. However, read as a whole against the driving question, the work sits most accurately in the Basic band (3-4). The discussion is largely descriptive rather than analytical. Each point is stated and illustrated rather than interrogated: you tell the reader what Popper said, what Gödel showed, what happened with Euclidean geometry, but you rarely push into the implications of these claims for knowledge itself. Arguments are present but they remain surface-level, and the examples, while appropriate, are not developed in a way that generates genuine insight. There is some awareness of different points of view (discovered versus invented mathematics, the apparent certainty of some scientific facts) but these counter-perspectives are acknowledged and then quickly set aside rather than evaluated. The essay does not reach the Satisfactory band because the links to areas of knowledge as ways of thinking and knowing, rather than as catalogues of facts, are too thin, and the critical reflection needed to move beyond description is largely absent. The Good and Excellent bands are not in reach at this stage because arguments are not effectively supported in the sense of being developed and tested, and the implications of the central claims are not followed through. The conclusion restates the opening argument without having significantly deepened it through the body of the essay.",
    "risks": [
      {
        "title": "Descriptive rather than analytical treatment of examples and ideas",
        "description": "Throughout the essay, examples are used to illustrate a point rather than to test or complicate it. The Newton-Einstein case is presented as straightforward evidence that science is not certain, but you do not explore what it means for knowledge that a theory can be so successful for two centuries and still be incomplete, or what that implies about the relationship between evidence and certainty. Pythagoras's theorem is cited as proof of certainty without asking what kind of certainty it is, or whether certainty within an axiomatic system is the same as certainty about the world. This pattern of statement plus example, without interrogation, is the single biggest factor placing the essay in the Basic band."
      },
      {
        "title": "Counter-perspectives are acknowledged but not evaluated",
        "description": "You introduce opposing views at several points: that axioms may not be self-evidently true, that some scientific facts seem beyond doubt, that mathematics might be invented rather than discovered. In each case the counter-view is raised and then closed down in a sentence or two. For example, you note that if mathematics is invented it might seem less certain, then immediately concede the point by saying the rules still have to be followed. This is not evaluation; it is dismissal. Genuine evaluation would mean following the implication further: if the axioms are chosen rather than given, in what sense is the certainty derived from them unconditional? The absence of real engagement with opposing views is a defining feature of Basic-level work."
      },
      {
        "title": "Implications of arguments are not considered",
        "description": "The essay arrives at its conclusion in the introduction and does not meaningfully revise or deepen that conclusion through the body. For instance, you note that Gödel showed there are limits to what can be proven in mathematics, but this point is listed alongside two others and never developed. The implication that certainty in mathematics might be bounded in a structural, unavoidable way, not just because humans make mistakes, is significant and would substantially strengthen the analysis if pursued. Similarly, the observation that applied mathematics is less certain than pure mathematics raises interesting questions about what kind of certainty is actually useful, but the point is dropped after one sentence."
      },
      {
        "title": "The opening definition of certainty does not do enough work",
        "description": "You define certainty as knowledge that cannot be doubted, which is a reasonable starting point. However, this definition is not revisited or tested as the essay progresses. A stronger essay would ask whether mathematical certainty and the kind of certainty we might want from science are even the same concept, or whether the definition itself shifts depending on the area of knowledge. As it stands, the definition is introduced and then applied uniformly, which limits the depth of the discussion."
      }
    ],
    "leverage": [
      {
        "title": "Develop examples into genuine analysis rather than illustration",
        "description": "When you use an example, ask yourself what it shows about certainty that is not already obvious. Take the Newton-Einstein case: rather than concluding simply that science is not certain, you could ask what kind of epistemic status Newton's laws had during those two centuries. Were they believed to be certain, and if so, what does that tell us about how certainty functions in scientific communities? Does the fact that Newton's laws remain useful in everyday engineering contexts complicate the idea that they were simply replaced? Working through these questions with one example in depth will add far more analytical weight than listing several examples at the same level of detail."
      },
      {
        "title": "Engage seriously with the strongest version of each counter-perspective",
        "description": "Instead of raising an opposing view and then quickly setting it aside, spend more time with the position before responding to it. On the question of whether some scientific facts are beyond reasonable doubt, you could explore what it would actually take for the evidence that water is H2O to be overturned, and what that thought experiment reveals about the concept of certainty. This kind of engagement is what distinguishes evaluation from acknowledgement, and it is precisely what the higher bands require."
      },
      {
        "title": "Follow the implications of your most interesting claims",
        "description": "The point about Gödel and the point about applied mathematics are both potentially significant, but each is dropped after a sentence. Choose one of these and develop it properly: what does it mean for certainty in mathematics that there will always be true statements that cannot be proven within a given system? Does this make mathematical certainty conditional in a way that is structurally similar to, or fundamentally different from, the conditionality of scientific knowledge? Following one implication all the way through is more valuable than noting several implications superficially."
      },
      {
        "title": "Let the conclusion reflect genuine movement in the argument",
        "description": "Your conclusion largely restates the introduction. A more effective conclusion would show how the exploration of the title has refined, complicated, or qualified the initial position. For example, if the body of the essay has revealed that mathematical certainty is always certainty within a chosen axiomatic system, the conclusion could acknowledge that this makes the difference between the two areas of knowledge a matter of degree rather than kind, which is a more interesting and defensible claim than simply saying one is certain and the other is not."
      }
    ],
    "nextSteps": [
      "Select your two strongest examples, one from each area of knowledge, and rewrite the paragraphs dealing with them so that each example is interrogated rather than described: ask what the example shows, what it does not show, and what a sceptic of your argument would say about it.",
      "Revisit each paragraph where you raise a counter-perspective and expand it to at least three sentences of genuine engagement before offering your response, so that the opposing view is presented at its strongest rather than in a weakened form that is easy to dismiss.",
      "Write a new conclusion that identifies one thing you now think differently about, or one way your initial claim has been qualified by the discussion, so that the ending reflects real intellectual movement rather than a summary of the opening position."
    ],
    "editorNote": "Its overall comment calls the title prescribed (it is not, see above) and says the essay misses Satisfactory for lack of \"critical reflection\" and of links to areas of knowledge \"as ways of thinking\": neither phrase is in the TOK descriptors, and Satisfactory describes a discussion focused on the title, with some links to areas of knowledge, arguments supported by examples and some awareness of other points of view. It says Good is out of reach partly because implications are not followed through, but implications appear only in the Excellent descriptor, and one risk calls missing engagement with opposing views a defining feature of Basic, which the Basic descriptor does not mention. Read as a whole, this essay could reasonably receive 5 rather than 4. It also says the Satisfactory band requires a moderate degree of critical analysis and genuine engagement with different viewpoints; the Satisfactory descriptor asks only for some awareness of different points of view."
  },
  {
    "tier": "strong",
    "bandLabel": "Band 9-10 · Excellent",
    "heading": "What a strong essay looks like",
    "designNote": "A conditional thesis, examples that carry the argument (non-Euclidean geometry, Gödel, the OPERA anomaly against the Higgs result), counterclaims taken seriously, and a link between the two areas of knowledge.",
    "paragraphs": [
      "To what extent is certainty attainable in the natural sciences and mathematics?",
      "A claim is certain, in the sense that matters here, when the method used to justify it leaves no room for it to be overturned. That is different from feeling sure. People have felt sure of many things that turned out to be false, so the feeling cannot be the test. The question is whether the methods of mathematics and the natural sciences can produce knowledge that no further evidence or argument could revise. This essay argues that mathematics can reach certainty, but only a conditional kind: certainty that a conclusion follows from its starting points, not that the starting points are true. The natural sciences cannot reach certainty about the world, and their reliability comes from giving up the attempt and measuring their uncertainty instead.",
      "Mathematics seems the strongest candidate because its method is proof. Euclid's proof that there are infinitely many prime numbers is more than two thousand years old and has never needed revision. Suppose there were a largest prime. Multiply all the primes together and add one: the new number is either prime itself or divisible by a prime missing from the list. Either way the supposition collapses. Anyone who follows the steps can check the argument without trusting Euclid, a textbook or an institution, and no experiment could weaken it, because it makes no claim about experience. Here certainty is not a matter of confidence at all. It is a matter of each step being valid.",
      "The history of geometry shows what this certainty covers and what it does not. For about two thousand years Euclid's parallel postulate, which says that through a point outside a line exactly one parallel line can be drawn, looked like a self-evident truth about space. In the nineteenth century Lobachevsky, Bolyai and later Riemann built consistent geometries in which it is false. Einstein's general theory of relativity (1915) then described gravity using curved, non-Euclidean geometry, and observations have supported it. None of Euclid's proofs became invalid. What was lost was the belief that his axioms described physical space. Mathematical certainty survived, but only as certainty of implication: if these axioms hold, these theorems follow. Which axioms describe the world is not something proof can settle.",
      "A stronger objection comes from inside mathematics. In 1931 Kurt Gödel proved that any consistent formal system able to express basic arithmetic contains true statements it cannot prove, and cannot prove its own consistency. Mathematicians therefore cannot be certain, from within such a system, that it will never produce a contradiction. There is a practical limit too. The four colour theorem was proved in 1976 by Appel and Haken with a computer checking well over a thousand cases that no person could check by hand. The proof of the Kepler conjecture that Thomas Hales announced in 1998 was so long that its reviewers said they could not be completely certain it was correct, and a computer-checked formal version was only completed in 2014. In cases like these, mathematical certainty rests partly on trust in machines and in other people.",
      "These objections limit mathematical certainty without removing it. Gödel's theorems were themselves established by proof, so they show the precision of the method as much as its limits: we know exactly which kind of certainty is unavailable. The uncertainty around long computer-assisted proofs concerns human and machine error, not the logic of deduction, and it shrinks as proofs are checked independently. A Platonist, who holds that mathematical objects exist independently of us, would say mathematics gives certain knowledge of that abstract reality. A formalist would say it gives certainty only about what follows from rules we chose. On either view the certainty is internal to mathematics. It is high, but it is conditional.",
      "The natural sciences are in a different position, because their claims are about the world and rest on observation. No number of observations can prove a general law, since the next one might contradict it. Newtonian mechanics is the clearest case. For two centuries it predicted the motion of planets, projectiles and tides with extraordinary success. Yet the orbit of Mercury precessed by about 43 arcseconds per century more than Newton's theory could explain. General relativity accounted for the difference, and observations of starlight during the 1919 solar eclipse supported Einstein's prediction. Newton's laws are still used to plan spacecraft trajectories, so they were not simply wrong, but their claim to be the final description of motion did not survive. If a theory that successful could be revised, success alone cannot deliver certainty.",
      "It could be argued that this sets the bar unreasonably high. Nobody seriously doubts that the Earth orbits the Sun, and treating such claims as uncertain seems perverse. Science also measures its uncertainty precisely. When CERN announced a particle consistent with the Higgs boson in July 2012, the ATLAS and CMS experiments had each reached about five sigma: a random fluctuation of the background at least that strong would be expected roughly once in three and a half million trials. That looks close enough to certainty for any practical purpose.",
      "The OPERA experiment shows why it is not the same thing. In 2011 its team reported neutrinos that appeared to travel faster than light, with a statistical significance of about six sigma, higher than the Higgs announcement. In 2012 the result was traced to a badly connected fibre-optic cable and a timing fault. The statistics had been calculated correctly, but they described only random error, and the error was systematic. Confidence, however carefully measured, is confidence relative to the assumptions built into the measurement. What made the episode a success for science is that the team published the anomaly, asked others to check it and withdrew it when the fault was found. The method works because no result is placed beyond revision.",
      "This is also why the Higgs result deserves more trust than OPERA's, even though its statistical significance was lower. ATLAS and CMS were built by separate teams with different detector designs, so a systematic fault in one would be unlikely to produce the same signal in the other. The confidence placed in the result came less from any single number than from agreement between independent methods, and later measurements of the particle's properties have continued to fit. Scientific knowledge can become so well supported that doubting it would be unreasonable, and a knower is justified in acting on it. That is a kind of practical certainty. But it is a judgment made by a community about the weight of evidence, and it remains open in principle, which is exactly what logical certainty is not.",
      "The two areas of knowledge therefore relate to certainty in opposite ways. Mathematics can achieve certainty, but it is certainty about what follows from chosen starting points, bounded by Gödel's results and by the practical limits of checking long proofs. The natural sciences cannot achieve certainty about the world, but they produce knowledge reliable enough to act on and can state how reliable it is. For a knower, a claim of certainty should always prompt a further question: certain relative to what? A theorem is certain relative to its axioms. A scientific result is well supported relative to its evidence and its assumptions about error. The two areas also meet. The mathematics behind satellite navigation is certain as mathematics, but whether it describes the clocks on the satellites is a scientific question, and the system works only because corrections for relativistic effects, established by measurement rather than proof, are applied to those clocks.",
      "To a large extent, then, certainty is attainable in mathematics, though it is conditional and internal to the system. In the natural sciences it is attainable to a small extent at most, and pursuing it would damage what makes science reliable: its readiness to change its mind. This is not a weakness of science. It reflects the difference between knowing what follows from what and knowing what the world is like.",
      "References\nCERN (2012) CERN experiments observe particle consistent with long-sought Higgs boson. Press release, 4 July.\nGödel, K. (1931) Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I. Monatshefte für Mathematik und Physik, 38, 173-198.\nHales, T. et al. (2017) A formal proof of the Kepler conjecture. Forum of Mathematics, Pi, 5, e2."
    ],
    "excerpt": "A claim is certain, in the sense that matters here, when the method used to justify it leaves no room for it to be overturned. That is different from feeling sure. People have felt sure of many things that turned out to be false, so the feeling cannot…",
    "wordCount": 1388,
    "score": 9,
    "max": 10,
    "band": "9-10",
    "criterionName": "Holistic assessment, global impression",
    "criterionComment": "The work sits firmly in the 'excellent' band (9-10). The discussion has a sustained and unbroken focus on the title: every paragraph advances the central argument rather than digressing, and the essay's organising distinction (conditional certainty versus certainty about the world) is maintained from the opening definition to the final sentence. Arguments are clear and coherent: each claim is followed by a supporting example and then by consideration of what the example does and does not establish. Different points of view, including Platonism versus formalism in mathematics and the science-community's own self-assessment of uncertainty through sigma values, are brought in and evaluated rather than merely acknowledged. The implications of arguments are considered throughout: the observation that Godel's theorems were themselves proved by rigorous deduction is a genuine implication, as is the observation that the OPERA result's six-sigma significance was higher than the Higgs announcement's yet the former was wrong. The essay is awarded the lower mark of the band (9 rather than 10) because two moments show the qualities of the excellent band to a lesser extent: the Platonist-formalist distinction is not resolved, and the 'practical certainty' concept in the sciences is stated more than it is argued. These are minor relative to the overall achievement, but they prevent the complete and sustained excellence the top mark requires.",
    "overall": "This is a excellent TOK essay that sustains analytical focus on the prescribed title throughout. The central distinction you draw, between certainty of implication internal to a formal system and certainty about the world, is clearly articulated in the introduction and then developed with precision and consistency across every body paragraph. This is not a decorative thesis: it does real explanatory work, and you return to it at each stage rather than abandoning it mid-essay. The discussion meets the 'excellent' band descriptor convincingly on its two most demanding requirements: the implications of arguments are considered at every turn, and different points of view are both identified and evaluated rather than merely listed.\n\nThe examples are specific, accurate and well-chosen. Euclid's prime-number proof is not just named but reconstructed in enough detail to show why it is logically certain. The non-Euclidean geometry episode correctly distinguishes between the validity of proofs and the empirical status of axioms. Godel's incompleteness results are handled with admirable care: you note that the theorems were themselves proved, which is an implication that many essays at this level miss entirely. The OPERA/Higgs comparison is the most analytically sophisticated moment in the essay: you use it to separate statistical confidence from systematic error, which is a epistemological point rather than a piece of science journalism.\n\nThe two areas of knowledge are not treated in isolation. The satellite navigation example in the penultimate paragraph is a neat and original way to show that the conditional certainty of mathematics and the revisable reliability of science interact in practice, and it prevents the essay from ending as two parallel but unconnected discussions.\n\nWhat keeps the mark at the lower end of the excellent band rather than a 10 is a small number of places where the argument could be pushed further. The formalist versus Platonist contrast in paragraph five is introduced and dropped rather than resolved: you note that on either view certainty is 'internal to mathematics', but the implications of that for the title's question differ between the two positions and deserve a sentence more. The discussion of practical certainty in the sciences, particularly the argument that a sufficiently well-supported claim justifies action, is philosophically the most contested move in the essay, yet it is made with slightly less rigour than the rest: the distinction between being justified in acting on a claim and the claim being certain could be drawn more sharply. These are refinements rather than deficiencies, and they do not undermine the overall impression of a sustained, coherent and critical exploration.",
    "risks": [
      {
        "title": "Unresolved Platonist versus formalist contrast",
        "description": "In paragraph five you introduce the Platonist and formalist positions and then conclude that on either view certainty is 'internal to mathematics'. That closure is too quick. A Platonist would say mathematical certainty tracks mind-independent facts, which is a stronger epistemological claim than the formalist's view that it tracks the consequences of chosen rules. The implication for the title's question, about the extent to which certainty is attainable, differs between them: on a Platonist reading, conditional certainty is still certainty about something real; on a formalist reading it is not. By collapsing the distinction without argument, you miss an opportunity to show the kind of evaluative engagement with different points of view that separates a 10 from a 9."
      },
      {
        "title": "Practical certainty left underargued",
        "description": "In paragraphs seven and nine you introduce 'practical certainty', arguing that a scientific claim can become so well supported that doubting it would be unreasonable and a knower is justified in acting on it. This is the most philosophically loaded move in the essay and it is made assertively rather than argued. You note that practical certainty 'remains open in principle, which is exactly what logical certainty is not', which is the right observation, but you do not examine whether being open in principle but closed in practice is enough to meet the title's question about attainability. A sentence engaging with the tension between pragmatic and logical senses of certainty here would strengthen the argument and reduce the risk that a reader sees the conclusion as understated."
      },
      {
        "title": "The conditional character of mathematical certainty is stated but not deeply examined",
        "description": "Your key claim is that mathematical certainty is certainty of implication, not certainty that the axioms hold. You demonstrate this well with the non-Euclidean geometry example. However, you do not explicitly address whether a certainty that depends entirely on the truth of its starting points should count as certainty in the sense your introduction defines, which is that the method 'leaves no room for it to be overturned'. If the axioms can be replaced, as they were in geometry, the conditional theorem is technically safe but the claim it encodes about any real domain can be overturned. Making this tension explicit and resolving it would tighten the argument."
      }
    ],
    "leverage": [
      {
        "title": "Resolve the Platonist-formalist distinction rather than bypassing it",
        "description": "Instead of concluding that both views agree certainty is 'internal to mathematics', you could ask which view better explains the unreasonable effectiveness of mathematics in science, a question your satellite-navigation example almost raises. Engaging with what each position implies for the title's question about attainability would demonstrate the evaluative depth the top mark requires, without needing additional examples or significant restructuring."
      },
      {
        "title": "Sharpen the argument for practical certainty in the sciences",
        "description": "The distinction between being epistemically justified in acting on a claim and the claim being certain is a real philosophical one, and you gesture at it without pressing it. You could briefly clarify whether you are redefining certainty in pragmatic terms or arguing that, given the title's question, partial attainability counts. Either move would make the conclusion more analytically satisfying and would demonstrate that the implications of your own argument have been followed through."
      },
      {
        "title": "Make the tension in conditional certainty explicit and resolve it",
        "description": "Your introduction defines certainty as what the method leaves no room to overturn. You could add a sentence in the conclusion or in paragraph three explicitly asking whether conditional certainty meets that definition, and then argue your answer. This would show that you have tested your own thesis against your own criterion, which is the kind of reflexive critical engagement characteristic of the highest-scoring essays."
      }
    ],
    "nextSteps": [
      "Return to paragraph five and extend the Platonist-formalist contrast by one or two sentences: ask what each view implies for the attainability of certainty in the sense defined in your introduction, and take a position rather than treating the two views as equivalent.",
      "In paragraph nine, add a sentence that explicitly distinguishes between pragmatic justification (being warranted in acting on a claim) and logical certainty (the method leaves no room for revision), and state clearly which of these you are claiming the natural sciences can achieve and to what extent.",
      "In the conclusion or in paragraph three, revisit your opening definition of certainty against the conditional certainty of mathematics: ask explicitly whether a certainty that depends on chosen axioms leaves room for the claim to be overturned when applied to the world, and give a direct answer, so the thesis is tested by its own criterion."
    ],
    "editorNote": "It calls the title prescribed (it is not, see above). In the explanation of the mark and in its risks it says a 10 needs complete and sustained excellence or more evaluative depth. The TOK guide says the highest level does not imply faultless performance, and that examiners should not hesitate to use the extremes when they are appropriate descriptions of the work."
  }
] as const;

const card = { border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, margin: "28px 0" };
const small = { fontSize: "0.85rem", color: "#4b5563", lineHeight: 1.6 };

export default function SampleReports() {
  return (
    <ResourceArticle
      title="Sample IBLens Reports: Three TOK Essays, Marked and Unedited | IBLens"
      description="Real, unedited IBLens output: three demonstration TOK essays on one title, written at three levels of quality and marked 2/10, 4/10 and 9/10 on the holistic instrument, each with its full report."
      canonical="/resources/sample-reports"
      datePublished="2026-07-03"
      dateModified="2026-09-13"
    >
      <h1>Three TOK essays, marked and unedited.</h1>

      <p>
        A grader is only useful if the mark moves when the quality of the work moves. To show how IBLens behaves, we wrote three
        demonstration essays on one TOK-style title, <em>To what extent is certainty attainable in the natural sciences and
        mathematics?</em> (the weak essay words it slightly differently), at deliberately different levels of quality, and ran each one through the grader's own marking path, the one the form
        uses, then copied each full report exactly as the grader wrote it.
      </p>
      <p>
        A TOK essay has no separate criteria. It is marked out of 10 against one holistic instrument, so each report places the
        essay in a band, explains the placement, and ranks the risks and the next steps.
      </p>
      <p>
        <strong>The three reports below are real, unedited IBLens output</strong>, produced on 13 September 2026. The essays are
        ours, written for this page rather than by students, so we can show them in full. Everything under each essay, from the
        mark to the last next step, came from the grader.
      </p>
      <p>
        The title is TOK-style, not one of the IB's prescribed titles, so an essay submitted on it for a session would
        receive 0, unless it were clearly a modified version of one of that session's prescribed titles; the weak report says so. Before publishing, we read every report against the TOK instrument. Earlier runs
        asked for things the instrument does not, such as a named thinker, and one placed essays by checklist, which the TOK
        guide rules out. We changed the grader's TOK instructions to the guide's own whole-essay method and ran all
        three essays again on 13 September 2026. Since then the grader has also been instructed not to write marks, or where a mark
        sits within its level, inside its comments. That is an instruction to a language model, not a guarantee, so a
        report made today can still stray from the descriptor's words. Each report carries a note on the clearest places where its
        explanation describes a level in words its descriptor does not use; the reports are otherwise left exactly as the
        grader wrote them.
      </p>

      {REPORTS.map((r) => (
        <div key={r.tier} style={card}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7B1D2E", marginBottom: 6 }}>{r.bandLabel}</p>
          <h2 style={{ ...SERIF, fontSize: "1.5rem", fontWeight: 700, marginTop: 0 }}>{r.heading}</h2>
          <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: 16 }}><strong>How we wrote it:</strong> {r.designNote}</p>

          <div style={{ background: "#faf7f5", borderRadius: 8, padding: 16, fontSize: "0.9rem", color: "#4b5563", marginBottom: 20 }}>
            <p style={{ fontStyle: "italic", margin: 0 }}>"{r.excerpt}"</p>
            <details style={{ marginTop: 10 }}>
              <summary style={{ fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", color: "#7B1D2E", padding: "10px 0" }}>Read the full essay ({r.wordCount.toLocaleString("en-GB")} words, as IBLens counted them)</summary>
              {r.paragraphs.map((p, i) => (
                <p key={i} style={{ marginTop: 10, lineHeight: 1.7, fontWeight: i === 0 ? 600 : 400 }}>{p}</p>
              ))}
            </details>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
            <span style={{ ...SERIF, fontSize: "2.5rem", fontWeight: 700, color: "#7B1D2E" }}>{r.score}<span style={{ fontSize: "1.2rem", color: "#9ca3af" }}> / {r.max}</span></span>
            <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>estimated · band {r.band}</span>
          </div>
          <div style={{ height: 6, background: "#f3f4f6", borderRadius: 3, overflow: "hidden", marginBottom: 12 }}>
            <div style={{ height: "100%", width: (r.score / r.max) * 100 + "%", background: "#7B1D2E", borderRadius: 3 }} />
          </div>
          {r.editorNote && (
            <p style={{ fontSize: "0.9rem", lineHeight: 1.6, background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 8, padding: 12, color: "#7c2d12" }}>
              <strong>Where we disagree with this report</strong> (our note, not grader output): {r.editorNote}
            </p>
          )}
          {/* The sections in the order and under the names the live report uses. */}
          <h3 style={{ fontSize: "1rem", marginTop: 20 }}>Overall comment</h3>
          <p style={{ ...small, marginTop: 0, whiteSpace: "pre-line" }}>{r.overall}</p>

          <h3 style={{ fontSize: "1rem", marginTop: 20 }}>The mark and its explanation</h3>
          <p style={{ ...small, marginTop: 0, whiteSpace: "pre-line" }}>{r.criterionComment}</p>

          <h3 style={{ fontSize: "1rem", marginTop: 20 }}>What is losing marks</h3>
          <ol style={{ ...small, paddingLeft: 20 }}>
            {r.risks.map((x) => (
              <li key={x.title} style={{ marginBottom: 8 }}><strong>{x.title}.</strong> {x.description}</li>
            ))}
          </ol>

          <h3 style={{ fontSize: "1rem", marginTop: 20 }}>Where marks are recoverable</h3>
          <ol style={{ ...small, paddingLeft: 20 }}>
            {r.leverage.map((x) => (
              <li key={x.title} style={{ marginBottom: 8 }}><strong>{x.title}.</strong> {x.description}</li>
            ))}
          </ol>

          <h3 style={{ fontSize: "1rem", marginTop: 20 }}>What to fix first</h3>
          <ol style={{ ...small, paddingLeft: 20 }}>
            {r.nextSteps.map((x) => (
              <li key={x} style={{ marginBottom: 8 }}>{x}</li>
            ))}
          </ol>

        </div>
      ))}

      <h2>Why the spread matters</h2>
      <p>
        The weak essay scored 2, the developing essay 4 and the strong essay 9, in three different bands: Rudimentary, Basic
        and Excellent. The mark moved with the quality, and every report, the strong one included, says what would move it
        further. IBLens is instructed to apply the criteria as written, and the notes above show where its explanations still
        stray from them.
      </p>
      <p>
        Each mark is an estimate from a language model applying the published instrument, not an IB mark.
      </p>

      <p>
        <Link href="/essay?type=TOK">Get a report like these for your own TOK essay</Link>
      </p>
    </ResourceArticle>
  );
}
