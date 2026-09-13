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
    "bandLabel": "Band 3-4 · Basic",
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
    "score": 4,
    "max": 10,
    "band": "3-4",
    "criterionName": "Holistic assessment, global impression",
    "criterionComment": "This essay falls in the Basic band (3-4). It is clearly connected to the title and maintains a consistent line throughout: certainty is attainable in mathematics but not in natural science. However, the band descriptors for Basic describe work that is 'largely descriptive' with 'limited or unclear arguments without effective examples', and that description fits this essay well.\n\nThe arguments do not develop beyond assertion supported by surface description. Saying that bridges do not fall down proves mathematics is certain, or that the Pluto reclassification proves science is uncertain, is descriptive reasoning: the example is noted, a conclusion is attached, but nothing is analysed. The Satisfactory band requires, among other things, some awareness of points of view. Your essay introduces opposing views in two places (imaginary numbers and gravity) but in both cases dismisses them within one or two sentences without engaging with them. A view that is named and immediately set aside is not genuinely recognised, so this descriptor is not met, and the essay cannot reach Satisfactory.\n\nThe score of 4 rather than 3 reflects that the essay does maintain focus on the title throughout, names both areas of knowledge, and makes a genuine attempt to distinguish between them. A score of 3 would apply to work that is more fragmentary or less consistently connected to the question. A score of 5 requires, at minimum, that some awareness of points of view is present, and that condition is not met here.",
    "overall": "Your essay addresses the prescribed title and maintains a consistent position throughout: mathematics is certain, natural science is not. That focus is real and deserves credit. However, the essay sits firmly in the Basic band. The arguments are largely descriptive and anecdotal rather than analytical. You describe examples (Pluto's reclassification, the chemistry experiment, old cigarette advertising) and then simply assert that they show uncertainty, without unpacking what kind of uncertainty is involved or what that means for knowledge more broadly.\n\nThe examples you use are drawn almost entirely from personal classroom experience or general knowledge presented without any depth. The treatment of mathematics is particularly weak: the claim that '2 + 2 = 4 is always true' and that 'numbers do not lie' is not an argument about the nature of mathematical certainty. It does not engage with what makes a mathematical result certain, for example the role of axioms, logical proof, or formal deduction. The brief mention of imaginary numbers is quickly dismissed rather than used to probe what certainty in mathematics actually means.\n\nYou do raise a counter-position in two places: the paragraph on gravity and the brief remark about imaginary numbers. However, in both cases the alternative view is introduced and immediately set aside in one or two sentences without any real engagement. This means the essay does not meet 'some awareness of points of view' as required by the Satisfactory band. Satisfactory requires that another view is genuinely recognised, and genuine recognition means more than naming a view and dismissing it in the same breath.\n\nThe essay also treats the areas of knowledge very loosely. Mathematics and natural science are named throughout but their specific features as ways of producing knowledge are not explored. There is no discussion of what certainty means epistemologically, no distinction between different types or degrees of certainty, and no sustained consideration of what is at stake for knowledge when certainty is or is not available. The closing sentences touch briefly on implications, but this is not developed.\n\nTo move into the Satisfactory band you need to develop at least one of those counter-positions into genuine recognition rather than instant dismissal, so that 'some awareness of points of view' is clearly met.",
    "risks": [
      {
        "title": "Opposing views are named but instantly dismissed, blocking Satisfactory",
        "description": "The single item preventing the essay from reaching Satisfactory is the failure to genuinely recognise a point of view. In the imaginary numbers paragraph you concede that 'some people might say math is not certain' and then explain it away in two sentences. In the gravity paragraph you say 'nobody can argue that gravity is not real' and move on. Neither of these constitutes awareness of a view: they are rhetorical acknowledgements followed by immediate dismissal. Until at least one counter-position is genuinely recognised, the essay cannot leave the Basic band."
      },
      {
        "title": "Descriptive reasoning instead of argument",
        "description": "Your core claims are supported by description rather than analysis. You note that Pluto was reclassified and conclude science is uncertain, or that bridges stand and conclude mathematics is certain, but you do not analyse what those examples reveal about the nature of certainty as a concept. An argument requires you to explain the connection between the evidence and the claim, not simply to assert it. This keeps the arguments 'limited or unclear' in the language of the Basic band."
      },
      {
        "title": "Superficial treatment of the areas of knowledge",
        "description": "Mathematics and natural science are named throughout, but their specific features as knowledge-producing disciplines are not explored. You do not discuss what makes mathematical proof different from scientific evidence, what falsifiability means for scientific certainty, or what role axioms play in mathematical reasoning. Without this, the links to areas of knowledge remain loose and do not support a move toward the Good band."
      },
      {
        "title": "Personal anecdote used as primary evidence",
        "description": "Several key points rest on personal classroom experiences: your chemistry experiment, your math test, what your teacher says. Personal experience can be a starting point, but when it carries the main evidential weight the argument becomes difficult to evaluate because readers cannot assess whether your experiment is representative of scientific practice in general. This weakens the examples even within the Basic band."
      },
      {
        "title": "Implications underdeveloped",
        "description": "The brief moment where you raise whether certainty is even desirable is the most intellectually promising part of the essay, but it occupies only three sentences and is not connected back to the main argument. Developed implications are a feature of the Good and Excellent bands, but even strengthening this passage would show broader thinking about the significance of your conclusion."
      }
    ],
    "leverage": [
      {
        "title": "Genuinely engage with at least one counter-position to reach Satisfactory",
        "description": "This is the single highest-priority change. In one of your existing counter-position paragraphs, instead of dismissing the opposing view in one sentence, spend three or four sentences actually working through what the view claims and why someone might find it convincing before you respond to it. For example, in the gravity paragraph you could acknowledge that Newton and Einstein held genuinely different accounts of how gravity works, explain what that disagreement implies for the certainty of scientific knowledge, and then state your own position on it. You do not need to agree with the opposing view. Simply showing that you understand why someone might hold it, and then explaining why you still disagree, is enough to meet 'some awareness of points of view' and move the essay into Satisfactory."
      },
      {
        "title": "Build analysis into your existing examples",
        "description": "Your examples (Pluto, smoking, the chemistry experiment, bridges) are all usable, but they need analytical follow-through. After describing what happened with Pluto, ask: does this show that the original claim was never certain, or that science revises provisional certainty in light of new evidence? Is revision a weakness or a strength of the scientific method? Asking and briefly answering that kind of question turns description into argument and would strengthen the case for Satisfactory."
      },
      {
        "title": "Clarify what 'certainty' means in each area of knowledge",
        "description": "The essay treats certainty as a single, self-evident concept throughout. You could strengthen the argument by distinguishing at least two senses: logical or deductive certainty (the kind mathematics might offer through proof) versus empirical confidence (the kind science aims for through evidence). Introducing that distinction early and using it to organise the essay would give your argument a clearer structure and engage more directly with what makes the two areas of knowledge different."
      },
      {
        "title": "Develop the implications passage",
        "description": "The observation that science without uncertainty would stop producing new knowledge is genuinely interesting. If you expanded it into a full paragraph that connects back to the main argument, for instance by asking what degree of certainty is actually needed for different purposes such as medicine versus theoretical physics, it would show that you have thought about the significance of your conclusion and would support the move toward the upper end of Satisfactory."
      }
    ],
    "nextSteps": [
      "Revise one of the two counter-position paragraphs (imaginary numbers or gravity) so that instead of dismissing the opposing view in one sentence, you spend at least three sentences explaining what the view claims, why someone might find it convincing, and then why you still disagree. This directly addresses the item that is currently keeping the essay in the Basic band.",
      "Add one or two analytical sentences after each descriptive example. After noting that Pluto was reclassified, write a sentence that asks what this tells us about the status of scientific claims: does it mean science was wrong, or that science corrects itself as evidence grows, and which interpretation actually supports your argument about certainty?",
      "Write a short clarification near the beginning of the essay of what you mean by 'certainty', distinguishing logical certainty from empirical confidence. Using that distinction consistently throughout the essay would make the comparison between mathematics and natural science more precise and show the examiner that you are reasoning conceptually rather than just describing."
    ],
    "editorNote": "The TOK instrument asks for some awareness of points of view at Satisfactory, and this essay names two opposing views (imaginary numbers, gravity) before dismissing them. We read that as awareness, and the grading instructions say so; the grader held that a view dismissed at once has not been recognised, and placed the essay in Basic on that point. An examiner could reasonably give this essay 5. We publish the report as the grader wrote it rather than edit it."
  },
  {
    "tier": "developing",
    "bandLabel": "Band 5-6 · Satisfactory",
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
    "score": 5,
    "max": 10,
    "band": "5-6",
    "criterionName": "Holistic assessment, global impression",
    "criterionComment": "The essay meets all four Satisfactory descriptors: it is focused on the title throughout; it links clearly to two areas of knowledge (mathematics and natural sciences); it offers arguments supported by examples (deductive proof, Pythagoras, Godel, black swans, Newton and Einstein, peer review); and it shows some awareness of points of view, noting the axiom problem, the discovered-versus-invented debate, and the position that some scientific facts seem indubitable.\n\nIt does not fully meet the Good band descriptors. The arguments are present and mostly coherent but not clearly and coherently supported in the way the Good band requires: examples are introduced but not interrogated. The Newton-to-Einstein shift is your richest example, yet you use it only to confirm your pre-stated conclusion rather than to probe what it tells us about the relationship between evidence and certainty. Similarly, Godel's results are mentioned by name but their significance for the certainty of mathematics is not explained or developed.\n\nOn evaluation of points of view, you acknowledge counterpositions (axioms are assumed, not proven; some scientific knowledge seems certain; mathematics may be invented) but in each case you move quickly to reassert your original claim without genuinely weighing the competing position. Evaluation, which is the key feature separating Good from Satisfactory, requires you to consider what is right or compelling in the opposing view before reaching a considered judgement. That step is absent here.\n\nA score of 5 is therefore appropriate: the essay is solidly Satisfactory but does not yet reach the Good band.",
    "overall": "Your essay is clearly focused on the prescribed title and maintains that focus throughout, which is a genuine strength. You correctly identify mathematics and natural sciences as the two areas of knowledge under scrutiny, and you construct a readable line of argument: certainty is attainable in mathematics through deductive proof, but not in the natural sciences because of the inductive nature of scientific reasoning. The structure is logical and the prose is clear.\n\nHowever, the essay sits at the lower end of the Satisfactory band because the arguments, while present, remain at a fairly surface level. You introduce examples such as Pythagoras' theorem, Godel's incompleteness results, the black swan case, and the Newton-to-Einstein shift, but none of them are developed beyond a brief mention. The Newton/Einstein example, for instance, is your strongest piece of evidence for the claim that scientific theories are replaceable, yet you do not explore what this replacement actually reveals about the nature of certainty: does it mean past scientific claims were never knowledge, or simply that they were provisionally held? That kind of analytical unpacking is what separates a Satisfactory essay from a Good one.\n\nOn points of view, you do register that some people argue mathematics is not completely certain (the axiom problem, Godel, human fallibility), and you note the discovered-versus-invented debate. You also acknowledge that some scientific facts seem so well-established it would be unreasonable to doubt them. These are moments of awareness rather than genuine evaluation: you raise a counterposition and then dismiss or sidestep it quickly without weighing it seriously. For example, you say 'even if mathematics is invented, the rules still have to be followed once they are chosen,' which deflects the challenge rather than engaging with it.\n\nThe essay would need to move into clearer engagement with competing positions, and to develop the implications of its examples more fully, to reach the Good band.",
    "risks": [
      {
        "title": "Counterpositions acknowledged but not evaluated",
        "description": "You raise several challenges to your argument (axioms are assumed, Godel's limits, the invented-versus-discovered debate, the apparent certainty of some scientific facts) but you dismiss each one quickly without weighing what is genuinely compelling about it. The Good band requires some evaluation of points of view, meaning you need to engage seriously with the strongest version of an opposing position before returning to your own conclusion. As it stands, the counterpositions feel like boxes being ticked rather than real intellectual engagement, and this is the primary reason the essay does not reach the Good band."
      },
      {
        "title": "Examples introduced but not analysed",
        "description": "Your examples, Pythagoras' theorem, Godel's incompleteness results, the black swan case, and the Newton-to-Einstein shift, are all mentioned at a descriptive level. For instance, you state that Godel 'showed that there are limits to what can be proven in mathematics' but you do not explain what those limits are or what they actually imply about certainty. The Good band requires examples to support arguments clearly and coherently, which means the example must be unpacked to show how and why it supports the specific claim being made."
      },
      {
        "title": "Implications of the central argument left unexplored",
        "description": "Your conclusion is that certainty is attainable in mathematics but not in natural sciences. You do not explore what follows from this. For instance: if scientific knowledge is never certain, what should we do with it? Does reliable-but-not-certain knowledge still justify policy decisions, medical treatments, or technological design? Considering implications is a feature of the Excellent band, but even at the Good level the argument benefits from being pushed further than the bare conclusion."
      },
      {
        "title": "The connection between mathematics and the natural sciences is underdeveloped",
        "description": "You note at the end that scientists use mathematics in their work, but this potentially rich intersection is dropped in a single sentence. If scientific theories are expressed mathematically (as with Newton's laws), and mathematics can be certain but the empirical application cannot, this raises an interesting question about where exactly the uncertainty enters. Leaving this connection undeveloped means a genuine opportunity to deepen the argument is missed."
      }
    ],
    "leverage": [
      {
        "title": "Develop genuine engagement with at least one counterposition",
        "description": "Choose one of the opposing views you already raise, for example the claim that axioms are merely assumed and therefore mathematical certainty rests on uncertain foundations, and spend a full paragraph actually weighing it. Explain what is strong about the objection, why it matters, and then give a reasoned response rather than a dismissal. This single change would move the essay toward the Good band by demonstrating evaluation rather than mere awareness. You already have the material; you just need to slow down and argue with it rather than past it."
      },
      {
        "title": "Unpack the Newton-to-Einstein example more fully",
        "description": "This is your strongest example and it is currently doing less work than it could. You note that Newton's laws 'do not work in every situation' and that this shows theories can be replaced. Push further: what did scientists claim about Newtonian mechanics before Einstein? Were they wrong, or were they provisionally right within a domain? Does this revision suggest that certainty was never genuinely claimed, or that it was claimed falsely? Working through these questions using this one example would significantly strengthen the argument about scientific knowledge."
      },
      {
        "title": "Explain what Godel's results actually show",
        "description": "You mention Godel by name, which is fine, but the mention currently adds very little because you do not say what his incompleteness theorems actually demonstrate. In one or two sentences, you could explain that he showed any sufficiently powerful formal system contains true statements that cannot be proven within that system. This would make the point about the limits of mathematical proof genuinely informative and would strengthen the paragraph where you explore challenges to mathematical certainty."
      },
      {
        "title": "Add a brief consideration of what follows from your conclusion",
        "description": "Your final paragraph restates the conclusion but does not consider what it means. A sentence or two asking what follows, for example whether 'reliable but uncertain' scientific knowledge is sufficient for practical purposes, or whether the difference in certainty between the two areas matters for how we should treat claims in each, would add depth and show you are thinking beyond the immediate argument."
      }
    ],
    "nextSteps": [
      "Return to the paragraph on axioms and non-Euclidean geometry and write a genuine evaluation: articulate the strongest version of the objection (that certainty in mathematics depends on choices humans make about foundations), then respond to it with a reasoned argument rather than a simple assertion that proofs still hold. This is the single change most likely to push the essay into the Good band.",
      "Expand the Newton-to-Einstein paragraph by asking what scientists believed they had established before Einstein, whether their confidence was justified given what they knew, and what the revision tells us about the nature of scientific certainty rather than simply confirming that theories can be replaced.",
      "Replace the one-line mention of Godel with a brief explanation of what his results actually show and why they matter for the question of mathematical certainty, so that the example works as evidence rather than as a name-drop."
    ],
    "editorNote": null
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
    "criterionComment": "The essay meets all the Excellent band descriptors. Focus on the title is sustained throughout: every paragraph connects back to the question of whether certainty is attainable, in what sense, and to what extent. Both areas of knowledge are effectively linked to the argument rather than surveyed separately. Arguments are supported by specific, precisely used examples, including the step-by-step Euclid proof, the Godel result stated with its correct scope, and the OPERA/Higgs comparison. Implications are considered, notably through the GPS example and the closing epistemological distinction. Points of view, including the Platonist-formalist contrast and the objection about an unreasonably high bar, are evaluated rather than merely acknowledged. The essay is withheld from a 10 because the evaluation of competing positions within mathematics is less developed than the parallel evaluation in the natural sciences, and the practical implications of Godel's result for the knower's confidence in mathematical certainty are not fully drawn out. Both gaps are matters of depth rather than absence, placing the work at the top of the band but not at the maximum.",
    "overall": "This is a genuinely impressive essay that earns placement in the Excellent band. It sustains focus on the title from the opening definition through to the final paragraph without digression. The central thesis, that mathematics achieves a conditional internal certainty while the natural sciences cannot achieve certainty about the world but produce reliable, revisable knowledge, is argued with consistency and precision throughout.\n\nThe examples are specific and well chosen. Euclid's proof of the infinitude of primes is not merely named but actually walked through in enough detail to demonstrate why it is logically compelling. The non-Euclidean geometry discussion, the Godel incompleteness result, the Appel-Haken and Hales computer-assisted proofs, the OPERA neutrino anomaly and the Higgs boson announcement are all used to do genuine argumentative work rather than to display knowledge for its own sake. The comparison between the six-sigma OPERA result and the lower-sigma Higgs result, used to distinguish statistical confidence from reliability grounded in methodological independence, is a particularly strong piece of reasoning.\n\nPoints of view are genuinely evaluated rather than merely noted. The Platonist and formalist positions in mathematics are introduced and then shown to converge on the same conclusion about the conditional nature of mathematical certainty, which is an effective move. The objection that science sets the bar unreasonably high is taken seriously, answered with the OPERA counterexample, and the answer is itself nuanced: the essay concedes that scientific knowledge can become so well supported that doubt is unreasonable, then distinguishes that practical certainty from logical certainty.\n\nImplications are considered. The GPS-satellite navigation example in the penultimate paragraph illustrates what it means for the two areas of knowledge to intersect, and the closing distinction between knowing what follows from what and knowing what the world is like draws out the broader epistemological significance of the argument.\n\nThe essay falls just short of the top mark for two related reasons. First, the evaluation of points of view in mathematics, while competent, is slightly thinner than in the sciences. The Platonist-formalist contrast is introduced and resolved quickly; a brief engagement with what the difference between those positions would mean for the knower, or whether a constructivist or intuitionist view would complicate the conditional-certainty thesis, would sharpen it. Second, the implication of Godel's theorems is stated accurately but its weight for the title question could be pushed further: if a system cannot prove its own consistency, what does that mean for the confidence a knower can place in mathematical certainty in practice, and does it change the answer the essay gives? These are relatively small gaps in an otherwise sophisticated and well-sustained exploration.",
    "risks": [
      {
        "title": "Thin evaluation of competing views within mathematics",
        "description": "The Platonist-formalist contrast is introduced and then resolved in three sentences. The essay notes that on either view the certainty is internal and conditional, which is correct, but it does not probe what would be at stake for the knower if one position were right and the other wrong. A constructivist or intuitionist would deny that non-constructive proofs such as the Euclid prime argument establish existence in any meaningful sense, which would complicate the essay's central claim about mathematical certainty. The current treatment meets the Good band descriptor for evaluation of points of view but only just reaches the Excellent level, and that slight thinness is the main reason the essay does not reach 10."
      },
      {
        "title": "Implications of Godel's results for the knower not fully pursued",
        "description": "The essay states accurately that Godel's theorems were themselves proved, and uses this to argue they show the precision of the method rather than undermining it. That is a defensible response, but the essay does not then ask what it means in practice for a mathematician or any other knower that a system cannot verify its own consistency. The practical limit around computer-assisted proofs is discussed separately, but connecting it to the Godel point, since both concern the boundaries of what a knower inside the system can be certain of, would strengthen the implications section and push the essay closer to the full Excellent descriptor."
      },
      {
        "title": "The 'practical certainty' concept introduced late and not fully integrated",
        "description": "The essay introduces the useful distinction between practical certainty and logical certainty in the paragraph discussing ATLAS and CMS. This is a strong idea, but it appears only near the end and is not tracked back through earlier examples. For instance, the claim that nobody seriously doubts the Earth orbits the Sun, raised as an objection a paragraph earlier, is exactly the kind of case where the practical-certainty concept would apply, and connecting the two would make the argument more coherent across the essay as a whole."
      }
    ],
    "leverage": [
      {
        "title": "Deepen the evaluation of mathematical positions and their consequences for the knower",
        "description": "The Platonist-formalist paragraph could be extended by asking what difference it makes to the knower which view is correct. If Platonism is right, mathematical certainty is certainty about an independent reality and the question of whether the axioms are true (not just consistent) becomes meaningful. If formalism is right, the choice of axioms is itself unjustifiable by proof, and certainty is entirely internal. Showing that these are genuinely different positions with different implications, and then explaining why the essay's conclusion holds on both, would lift the evaluation of points of view to the level the Excellent descriptors fully reward. Note that introducing an intuitionist or constructivist view here is a suggestion, not a requirement."
      },
      {
        "title": "Connect the Godel discussion to the practical-certainty distinction",
        "description": "At present the essay treats Godel's incompleteness results and computer-assisted proofs as two separate limitations. Linking them through the concept of what a knower inside a system can verify would make the implication more pointed: mathematical certainty is conditional not only on the axioms chosen but on the reliability of the tools available to check inference chains. That connection would also allow the essay to return to the practical-certainty concept, which currently appears only in the science section, and show that a version of it applies in mathematics too, giving the comparative argument a stronger symmetrical structure."
      },
      {
        "title": "Introduce the practical-certainty concept earlier and track it consistently",
        "description": "Moving the practical-certainty distinction into the paragraph that raises the objection about the Earth orbiting the Sun would allow the essay to answer the objection more directly. The response would be: yes, this is a case of practical certainty, and here is precisely what that means and why it falls short of logical certainty. The concept would then reappear in the ATLAS-CMS discussion as a fully developed tool rather than something introduced mid-argument. This would improve the coherence of the essay without adding significant length."
      }
    ],
    "nextSteps": [
      "Expand the Platonist-formalist paragraph by one or two sentences that spell out what would be different for the knower under each view, then show why the conditional-certainty conclusion holds on both. This is the single change most likely to move the essay from 9 to 10 because it directly addresses the thinnest part of the Excellent descriptor for evaluation of points of view.",
      "Write a connecting sentence or two between the Godel paragraph and the computer-assisted proof paragraph, showing that both concern the limits of what a knower inside a formal system can verify, and link this explicitly to the practical-certainty concept introduced later. This would strengthen the implications section and make the essay's structure more visibly coherent.",
      "Move the sentence defining practical certainty, currently buried in the ATLAS-CMS paragraph, to the paragraph where you raise the Earth-orbits-the-Sun objection. Then use 'practical certainty' as a named concept throughout the rest of the essay. This is a structural edit rather than a content addition, so it costs few words and repays them in clarity and coherence."
    ],
    "editorNote": null
  }
] as const;

const card = { border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, margin: "28px 0" };
const small = { fontSize: "0.85rem", color: "#4b5563", lineHeight: 1.6 };

export default function SampleReports() {
  return (
    <ResourceArticle
      title="Sample IBLens Reports: Three Essays, Three Honest Grades | IBLens"
      description="Real, unedited IBLens output: three demonstration TOK essays on one title, written at three levels of quality and marked 4/10, 5/10 and 9/10 on the holistic instrument, each with its full report."
      canonical="/resources/sample-reports"
      datePublished="2026-07-03"
      dateModified="2026-09-13"
    >
      <h1>Three essays. Three honest grades.</h1>

      <p>
        A grader is only useful if the mark moves when the quality of the work moves. To show how IBLens behaves, we wrote three
        demonstration essays on one TOK-style title, <em>To what extent is certainty attainable in the natural sciences and
        mathematics?</em>, at deliberately different levels of quality, and ran each one through the grader the way a student
        would: pasted into the grader, with no account.
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
        Before publishing, we read the reports against the TOK instrument. Earlier runs held the essays to things the
        instrument does not ask for, such as a named thinker or a separately formulated knowledge question, and one asked a
        Satisfactory essay for evaluation, which the instrument describes only from the Good band up. We tightened the
        grader&rsquo;s TOK instructions, which every TOK report uses, and ran all three essays again. One judgement in these
        reports still differs from our reading of the instrument, and a note under that report says so.
      </p>

      {REPORTS.map((r) => (
        <div key={r.tier} style={card}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7B1D2E", marginBottom: 6 }}>{r.bandLabel}</p>
          <h2 style={{ ...SERIF, fontSize: "1.5rem", fontWeight: 700, marginTop: 0 }}>{r.heading}</h2>
          <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: 16 }}><strong>How we wrote it:</strong> {r.designNote}</p>

          <div style={{ background: "#faf7f5", borderRadius: 8, padding: 16, fontSize: "0.9rem", color: "#4b5563", marginBottom: 20 }}>
            <p style={{ fontStyle: "italic", margin: 0 }}>&ldquo;{r.excerpt}&rdquo;</p>
            <details style={{ marginTop: 10 }}>
              <summary style={{ fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", color: "#7B1D2E" }}>Read the full essay ({r.wordCount} words, as IBLens counted them)</summary>
              {r.paragraphs.map((p, i) => (
                <p key={i} style={{ marginTop: 10, lineHeight: 1.7, fontWeight: i === 0 ? 600 : 400 }}>{p}</p>
              ))}
            </details>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
            <span style={{ ...SERIF, fontSize: "2.5rem", fontWeight: 700, color: "#7B1D2E" }}>{r.score}<span style={{ fontSize: "1.2rem", color: "#9ca3af" }}> / {r.max}</span></span>
            <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>predicted · band {r.band}</span>
          </div>
          <div style={{ height: 6, background: "#f3f4f6", borderRadius: 3, overflow: "hidden", marginBottom: 12 }}>
            <div style={{ height: "100%", width: (r.score / r.max) * 100 + "%", background: "#7B1D2E", borderRadius: 3 }} />
          </div>
          <p style={{ fontSize: "0.8rem", fontWeight: 600, marginBottom: 4 }}>{r.criterionName}</p>
          <p style={{ ...small, marginTop: 0, whiteSpace: "pre-line" }}>{r.criterionComment}</p>
          {r.editorNote && (
            <p style={{ fontSize: "0.85rem", lineHeight: 1.6, background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 8, padding: 12, color: "#7c2d12" }}>
              <strong>Note from IBLens, not grader output:</strong> {r.editorNote}
            </p>
          )}

          <h3 style={{ fontSize: "1rem", marginTop: 20 }}>Risks, ranked</h3>
          <ol style={{ ...small, paddingLeft: 20 }}>
            {r.risks.map((x) => (
              <li key={x.title} style={{ marginBottom: 8 }}><strong>{x.title}.</strong> {x.description}</li>
            ))}
          </ol>

          <h3 style={{ fontSize: "1rem", marginTop: 20 }}>Next steps, ranked</h3>
          <ol style={{ ...small, paddingLeft: 20 }}>
            {r.nextSteps.map((x) => (
              <li key={x} style={{ marginBottom: 8 }}>{x}</li>
            ))}
          </ol>

          <details style={{ marginTop: 12 }}>
            <summary style={{ fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", color: "#7B1D2E" }}>Where the marks are recoverable</summary>
            <ol style={{ ...small, paddingLeft: 20, marginTop: 8 }}>
              {r.leverage.map((x) => (
                <li key={x.title} style={{ marginBottom: 8 }}><strong>{x.title}.</strong> {x.description}</li>
              ))}
            </ol>
          </details>
          <details style={{ marginTop: 8 }}>
            <summary style={{ fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", color: "#7B1D2E" }}>Overall comment</summary>
            <p style={{ ...small, marginTop: 8, whiteSpace: "pre-line" }}>{r.overall}</p>
          </details>
        </div>
      ))}

      <h2>Why the spread matters</h2>
      <p>
        The weak essay scored 4, the developing essay 5 and the strong essay 9, in three different bands: Basic, Satisfactory
        and Excellent. The mark moved with the quality, though the first gap is narrower than the difference we wrote into the
        essays, for the reason given in the note under the weak report. Every report, the strong one included, says what would
        move it further. IBLens is instructed to mark strictly rather than kindly, because a low mark you see before you submit is
        one you can still change.
      </p>
      <p>
        Each mark is an estimate from a language model applying the published instrument, not an IB mark.
      </p>

      <p>
        <Link href="/essay?type=TOK">Get a report like these for your own TOK essay: the first preview is free</Link>
      </p>
    </ResourceArticle>
  );
}
