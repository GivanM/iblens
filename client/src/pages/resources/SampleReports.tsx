import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

/**
 * Production output, copied from the stored reports without editing: three demonstration
 * essays run through the anonymous analyzer path as TOK essays on 13 September 2026
 * (second run, after the TOK marking rules were corrected; the page says so). The essays
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
    "criterionComment": "The essay falls in the Rudimentary band (1-2). It is weakly connected to the title's epistemological demands. The student asserts a position ('math is certain, science is not') but supports it almost entirely with descriptive personal anecdotes and superficial examples rather than developed arguments. There is no clear, coherent argument in the sense the band descriptors require: no definition of 'certainty,' no identification of the epistemological stakes, and no evaluation of different points of view beyond a brief and dismissive acknowledgment of a counterargument. Areas of Knowledge are not explicitly engaged with as TOK concepts. The imaginary-numbers paragraph gestures at a counterargument but immediately drops it without analysis. The Pluto and smoking examples describe what happened but do not analyse what this tells us about the nature of scientific knowledge. The question of whether certainty is desirable, raised in the penultimate paragraph, is an interesting TOK move but it is introduced and abandoned in two sentences. No scholar, philosopher, or theoretical framework is referenced. The essay does not reach the Satisfactory band (5-6) because it does not offer arguments supported by developed examples, nor does it demonstrate meaningful awareness of different points of view. A score of 2 reflects that the essay is a genuine attempt to engage with the topic but remains at the level of unsupported personal opinion and description.",
    "overall": "This essay is weakly connected to the prescribed title's demands. The student takes a position early and largely defends it through personal anecdote, classroom experience, and surface-level examples rather than through genuine TOK argumentation. There is no engagement with knowledge claims, knowledge questions, or the epistemological concepts that distinguish a TOK essay from a general opinion piece. The essay does not identify or name any Areas of Knowledge in a meaningful way, does not define key terms such as 'certainty,' 'proof,' or 'knowledge,' and does not evaluate different points of view with any depth. The examples used (Pluto's reclassification, the smoking-doctors advertisements, a chemistry class experiment) are anecdotal and are not connected to broader epistemological arguments. The treatment of mathematics is particularly weak: the claim that math is certain because '2+2=4' and because buildings don't fall down conflates applied mathematics with mathematical proof, and there is no awareness of Gödel's incompleteness theorems, the axiomatic foundation of mathematics, or the philosophical debate between mathematical Platonism and formalism. The treatment of science similarly lacks awareness of falsifiability, the hypothetico-deductive method, or the distinction between scientific theories and scientific facts. The essay reads as a personal opinion piece written in a conversational register that is not appropriate for a TOK essay. The conclusion restates the opening opinion without development. The work falls in the Rudimentary band (1-2) because it is descriptive, relies on unsupported assertions, and is only weakly connected to the epistemological substance the title requires.",
    "risks": [
      {
        "title": "Absence of genuine TOK argumentation and knowledge questions",
        "description": "The essay presents opinions and descriptions instead of knowledge claims and arguments. The title asks 'to what extent,' which requires the student to weigh, evaluate, and argue with nuance. Instead, the student states a binary position in the introduction and restates it in the conclusion. No knowledge question is formulated, and no epistemological concept (certainty, justification, proof, falsifiability, revisability) is defined or explored. This is the single largest reason the essay cannot rise above the Rudimentary band."
      },
      {
        "title": "No evaluation of different points of view",
        "description": "From the Good band upward, the descriptors require evaluation of points of view, and from the Satisfactory band they require at least awareness. The essay briefly notes that 'some people might say' math is uncertain (imaginary numbers) and that 'some people might argue' science can be certain (gravity), but both counterarguments are immediately dismissed without genuine engagement. This means the essay does not satisfy even the Satisfactory band's requirement of 'some awareness of points of view.'"
      },
      {
        "title": "Examples are anecdotal and not connected to epistemological arguments",
        "description": "The examples used (a chemistry class experiment with variable results, the student's math teacher's opinion, old cigarette advertisements, the Pluto reclassification) are either personal anecdotes or general knowledge facts. None of them is analysed to illuminate a knowledge claim. For example, the chemistry experiment could have been used to discuss measurement uncertainty, systematic versus random error, or the role of reproducibility in scientific knowledge, but the essay simply concludes 'experiments don't always give the same answer' without drawing any epistemological lesson."
      },
      {
        "title": "Superficial treatment of mathematics ignores the actual basis of mathematical certainty",
        "description": "The claim that math is certain because '2+2=4' or because bridges don't fall down is philosophically incoherent. Applied mathematics (engineering) is not the same as mathematical proof. The essay makes no reference to axioms, deductive proof, or the distinction between mathematical truth and empirical truth. It also ignores known challenges to mathematical certainty such as Gödel's incompleteness theorems, which are highly relevant to the title. The argument that math is certain because 'it is in our heads' is a form of naive idealism that is asserted without support."
      },
      {
        "title": "Register and style are inappropriate for a TOK essay",
        "description": "Phrases such as 'this is a really interesting question,' 'my math teacher always says,' 'when I first learned about imaginary numbers I thought they made no sense,' and 'my parents were at school' indicate a casual, conversational register. While TOK does encourage a personal voice, the essay leans entirely on personal experience and classroom memory rather than on reasoned argument. This affects the examiner's impression of the quality and depth of thinking throughout."
      }
    ],
    "leverage": [
      {
        "title": "Define 'certainty' and build the essay around a nuanced knowledge question",
        "description": "The highest-leverage change is to open by defining what 'certainty' means epistemologically (perhaps distinguishing logical certainty from empirical certainty, or psychological certainty from justified certainty) and to formulate a focused knowledge question. This immediately signals TOK thinking and allows all subsequent arguments to connect to a conceptual thread. For example, distinguishing 'certainty within a formal system' from 'certainty about the external world' would allow the student to argue that mathematics achieves the former but not the latter, and that science strives for the latter through a different epistemological method. This single structural change could lift the essay from Rudimentary into the Satisfactory or Good band."
      },
      {
        "title": "Develop genuine counterarguments and evaluate them rather than dismissing them",
        "description": "The essay already attempts counterarguments, which is a good instinct. The revision task is to take them seriously. For mathematics, the student could explore the claim that mathematical certainty depends on unprovable axioms (Euclid's parallel postulate, ZFC set theory) and that Gödel showed no sufficiently complex formal system can prove its own consistency. For science, the student could explore the argument that some scientific results are so robust and replicable that they function as near-certain knowledge (for example, the speed of light, atomic mass, or the germ theory of disease). Genuine engagement with these counterarguments and a reasoned response to each would satisfy the Good band's requirement to evaluate points of view."
      },
      {
        "title": "Replace anecdotal examples with developed, epistemologically relevant examples",
        "description": "The Pluto and smoking examples have real potential but are underdeveloped. The Pluto example could be used to illustrate how scientific knowledge is provisional and theory-laden (the definition of 'planet' changed, not the object itself), raising the question of whether scientific uncertainty is about facts or about the conceptual frameworks we use to organise them. The smoking example could support a discussion of the role of consensus, peer review, and replication in building scientific knowledge. Each example should be analysed for what it reveals about how knowledge is produced and justified, not just described as a thing that happened."
      },
      {
        "title": "Engage with at least one thinker or theoretical framework",
        "description": "Referencing Karl Popper's falsifiability criterion, Thomas Kuhn's paradigm shifts, or the philosophical distinction between a priori (mathematical) and a posteriori (empirical) knowledge would immediately demonstrate that the student is engaging with established epistemological ideas rather than reinventing them from personal intuition. Even a brief, accurate reference to Popper's argument that scientific knowledge advances precisely because it is falsifiable (and therefore revisable) would help the essay move from the Rudimentary to at least the Satisfactory band."
      },
      {
        "title": "Develop the question of whether certainty is desirable rather than dropping it",
        "description": "The student raises a genuinely interesting TOK question in the penultimate paragraph: should we want certainty in science? This is the most sophisticated moment in the essay, but it is abandoned after two sentences. Developing this into a full paragraph, with an example (for example, the precautionary principle in medicine, or the relationship between scientific uncertainty and public trust during health crises), and connecting it back to the title would add a dimension of critical reflection that the Good band requires."
      }
    ],
    "nextSteps": [
      "Rewrite the introduction to define 'certainty' with at least two distinct senses (for example, logical or deductive certainty versus empirical or inductive certainty) and use this distinction as the backbone of the entire essay, so that every argument and example connects back to it.",
      "Replace the 'my math teacher says' and chemistry-class paragraphs with two fully developed examples, one for mathematics (for example, Euclidean geometry and the role of axioms, or Gödel's incompleteness theorems as a limit on mathematical certainty) and one for natural science (for example, Popper's falsifiability criterion as the reason scientific knowledge is provisional but not arbitrary), and analyse each example to show what it reveals about the nature of certainty in that Area of Knowledge.",
      "Write a genuine counterargument paragraph for each Area of Knowledge, present the strongest version of the opposing view, and then explain why you accept or reject it with reasons, rather than dismissing the counterargument in one sentence, so that the essay meets at least the Satisfactory band's requirement of awareness of different points of view and ideally the Good band's requirement of evaluation."
    ]
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
    "criterionComment": "Placed in the Satisfactory band (5-6). The essay is focused on the title throughout and maintains a recognisable argument: mathematics can attain certainty through deductive proof; the natural sciences cannot because of inductive reasoning and falsifiability. Links to the two areas of knowledge are explicit and sustained. Examples are present and relevant: Pythagoras' theorem and the irrationality of root two for mathematics; the black swan, Popper's falsifiability principle, and the Newton-Einstein shift for science. Peer review and the mathematics/invention debate are also brought in. This meets the Satisfactory descriptor's requirement for arguments offered with examples and some awareness of other points of view. The essay does not reach the Good band for several reasons. First, evaluation is weak. The student acknowledges counter-positions (axiom-dependence, Gödel, non-Euclidean geometry, human error) but deflects them rather than genuinely evaluating them. For instance, Gödel's incompleteness theorems are mentioned in a single clause without any exploration of what incompleteness actually entails for mathematical certainty. Second, examples are used illustratively (they confirm the point already made) rather than analytically (they could also challenge or complicate the point). The Newton-Einstein example is well chosen but treated superficially: no reflection on what this tells us about the epistemic status of current theories. Third, the philosophical concepts (deductive vs inductive reasoning, falsifiability, the discovered/invented debate) are named but not critically interrogated. The essay would need sustained engagement with implications and genuine weighing of perspectives to merit a 7 or above.",
    "overall": "This essay is a competent but largely descriptive engagement with the prescribed title. The student identifies relevant areas of knowledge, selects appropriate examples (Pythagoras, Gödel, Popper, Newton/Einstein, the black swan), and maintains a consistent thread throughout. However, the exploration remains at a surface level: arguments are stated and illustrated rather than critically developed, and the essay reads more like a structured summary of well-known TOK content than an independent, analytical investigation. The student's own reasoning rarely goes beyond restating received views, and genuine evaluation of competing perspectives is thin. The essay satisfies the Satisfactory band (5-6) descriptor by maintaining focus on the title, offering examples to support arguments, and showing some awareness of different points of view, but it does not reach the Good band (7-8) because evaluation is too shallow, examples are used illustratively rather than analytically, and implications of key claims are seldom explored.",
    "risks": [
      {
        "title": "Descriptive rather than evaluative treatment of counterarguments",
        "description": "The essay's biggest weakness is that counterarguments are listed and then dismissed rather than genuinely evaluated. For example, the student mentions Gödel's incompleteness theorems but does not explain what they mean or why they matter, and then continues to assert mathematical certainty as though Gödel had not been mentioned. The non-Euclidean geometry point is similarly deflected with a one-sentence response. This pattern prevents the essay from reaching the Good band, which requires 'some evaluation of points of view', and certainly keeps it away from the Excellent band, which requires 'different points of view evaluated'. The IB holistic instrument places significant weight on this."
      },
      {
        "title": "Examples used illustratively rather than analytically",
        "description": "Every example in the essay is deployed to confirm the point the student has already stated. Pythagoras' theorem confirms that proofs work. The black swan confirms that induction is unreliable. The Newton-Einstein case confirms that science cannot attain certainty. None of the examples is interrogated for the tensions it might reveal. For instance, if the Newton-Einstein shift is used to show science cannot be certain, the essay should explore what this implies for all current scientific theories, or whether it means all scientific claims are equally uncertain. This analytical thinness keeps the work in the Satisfactory band."
      },
      {
        "title": "Underdeveloped exploration of implications",
        "description": "The Excellent band descriptor requires consideration of implications. The essay rarely asks 'so what?' For example: if mathematics depends on axioms, does this mean mathematical certainty is conditional rather than absolute? If certainty is unattainable in science, does this matter for how we use scientific knowledge in public policy or medicine? These questions are gestured at but never pursued. The claim that 'the answer to the question depends on which area of knowledge we are talking about' as a conclusion is an observation rather than an insight, and it does not synthesise the argument in a way that produces new understanding."
      },
      {
        "title": "Shallow handling of philosophical concepts",
        "description": "The essay names significant philosophical positions (Popper's falsifiability, the mathematical Platonism vs formalism debate, deductive vs inductive reasoning) but does not engage with their content critically. Popper's argument, for instance, is summarised in two sentences and accepted as given. The student does not ask whether Popper's criterion itself is contested (it is: the Duhem-Quine thesis complicates simple falsification), or what it means for scientific practice. Similarly, the invented/discovered debate is raised and then dropped without any clear implication for the main argument. Naming a philosopher without engaging with their reasoning does not constitute critical exploration."
      },
      {
        "title": "Introduction frames the essay rather than engaging the title",
        "description": "The opening paragraph defines certainty, states the two areas, and announces the conclusion. While this is organised, it is mechanical and does not signal genuine intellectual engagement with the complexity of the question. The definition of certainty as 'knowledge that cannot be doubted' is offered without justification or acknowledgment that this is itself a contested definition. A more sophisticated entry into the question would consider why certainty is philosophically interesting, or acknowledge that different definitions of certainty might lead to different conclusions."
      }
    ],
    "leverage": [
      {
        "title": "Genuinely evaluate the counterarguments already present in the essay",
        "description": "The essay already contains the right counterarguments. The student mentions Gödel, non-Euclidean geometry, axiom-dependence, and the possibility that mathematics is invented. Instead of briefly acknowledging and then dismissing these, the student should sit with them. For example: Gödel showed that in any sufficiently complex formal system there are true statements that cannot be proved within that system. If this is so, what does it mean to say mathematics is 'certain'? Is the student claiming certainty only for what has been proved, or for mathematics as a whole? Engaging this tension seriously, rather than deflecting it, would move the essay into the Good band immediately. No new research is needed, only deeper use of what is already there."
      },
      {
        "title": "Use the Newton-Einstein example to explore implications for current science",
        "description": "The Newton-Einstein case is the strongest example in the essay, but it is left undeveloped. The student should ask: if Newton's laws, confirmed by observation for over two centuries, turned out to be incomplete, what does this imply for theories accepted today? For example, quantum mechanics and general relativity are both extraordinarily well-confirmed but are known to be mutually inconsistent. Does this mean we currently hold contradictory scientific knowledge? What are the implications for the concept of certainty? This line of analysis would demonstrate the kind of critical exploration the Good and Excellent bands require."
      },
      {
        "title": "Complicate the definition of certainty to drive a more nuanced argument",
        "description": "The essay defines certainty as 'knowledge that cannot be doubted' and then applies it uniformly. A more analytical approach would distinguish between logical certainty (a proof cannot be doubted if the axioms and logic are accepted), empirical certainty (overwhelming evidence that it would be irrational to reject), and practical certainty (sufficient confidence to act on). This would allow the student to argue, for instance, that mathematics achieves logical certainty, science achieves practical certainty in many cases, and the question of whether genuine empirical certainty is possible is philosophically open. This kind of conceptual unpacking is what separates Good and Excellent essays from Satisfactory ones."
      },
      {
        "title": "Develop the connection between mathematics and natural science more analytically",
        "description": "The essay notes that scientists use mathematics but does not develop this observation. The fact that physics, for example, is expressed in mathematics is philosophically significant. If a scientific theory is a mathematical model, and mathematical deductions from that model are certain, then what is the source of scientific uncertainty? It lies in the step from model to world, that is, in whether the model correctly represents reality. Exploring this would sharpen the distinction the essay is trying to draw and add analytical depth without requiring entirely new content."
      },
      {
        "title": "Sharpen the conclusion to synthesise rather than summarise",
        "description": "The conclusion currently repeats the essay's claims. A stronger conclusion would reflect on what the comparison of mathematics and the natural sciences reveals about knowledge and certainty more broadly. For instance: the question reveals that 'certainty' may not be a single concept but a family of related concepts, and that different knowledge-seeking practices aim at different kinds of assurance. This kind of synthesis demonstrates the critical and coherent thinking the higher bands reward."
      }
    ],
    "nextSteps": [
      "Take the three counterarguments already in the essay (Gödel, non-Euclidean geometry, the invented/discovered debate) and write a full paragraph on each that does not end with a dismissal. Instead, concede what the counterargument genuinely challenges, then explain how the main argument can be refined in light of it rather than simply reasserted. This single change addresses the most significant gap between the current essay and the Good band.",
      "Expand the Newton-Einstein section to ask what it implies for all current scientific theories, including quantum mechanics, and consider whether the student's conclusion (certainty is unattainable in science) should be nuanced. For example: is there a difference between saying scientific knowledge is uncertain in principle and saying it is unreliable in practice? Bring in a concrete contemporary example, such as climate science or the germ theory of disease, to test where the argument leads.",
      "Revise the introduction to pose the question as genuinely open rather than pre-answered. Remove the announcement of the conclusion from the first paragraph. Instead, use the introduction to unpack why the question is philosophically interesting, and acknowledge that certainty could mean different things in the two areas, setting up a more nuanced argument that the body of the essay then develops."
    ]
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
    "criterionComment": "The essay sits firmly in the Excellent band (9-10). It sustains focus on the title from the opening definition to the final sentence, links both areas of knowledge explicitly and consistently, and develops clear, coherent arguments that are effectively supported by specific, well-integrated examples. Implications are considered: the essay argues that science's inability to reach certainty is not a weakness but the source of its reliability, and that the appropriate question for any knowledge claim is 'certain relative to what?' Different points of view are evaluated, including the Platonist and formalist positions in mathematics and the objection about setting the bar too high in science. What prevents a 10 is that the Platonist-formalist distinction, the only place where mathematical epistemology is genuinely contested at a foundational level, is introduced and then set aside rather than evaluated for its consequences. A fully Excellent response at 10 would follow through on what the disagreement between those two views implies for the student's central claim about conditional certainty. All other features of the Excellent band are met at a high level.",
    "overall": "This is an excellent TOK essay that sustains focused engagement with the prescribed title throughout. The student demonstrates a mature, philosophically precise understanding of what 'certainty' means, opening with a definitional distinction that drives the entire argument and never losing sight of it. The essay is structured around a genuine thesis: mathematics achieves a conditional, internal certainty; the natural sciences cannot achieve certainty about the world but produce reliable, revisable knowledge. This thesis is developed with logical discipline across every paragraph. Arguments are supported by specific, well-chosen examples: Euclid's infinitely-many-primes proof, the non-Euclidean geometry episode, Gödel's incompleteness theorems, Appel-Haken and Hales computer-assisted proofs, the Newton-to-Einstein transition via Mercury's perihelion precession, the Higgs boson five-sigma announcement, and the OPERA neutrino anomaly. Each example is used analytically, not decoratively. The OPERA-versus-Higgs comparison is particularly effective: it distinguishes random from systematic error and uses the contrast to make a genuine epistemological point about what statistical confidence actually measures. Multiple perspectives are identified and evaluated: Platonist versus formalist views of mathematical objects, the objection that demanding freedom from revision sets the bar too high for science, and the implied instrumentalist reading of Newtonian mechanics (still used for spacecraft despite being 'wrong'). The satellite navigation coda, showing where the two areas of knowledge meet, is a thoughtful and original touch. Implications are considered explicitly in the conclusion, where the student argues that the unattainability of certainty in science is not a defect but constitutive of scientific reliability. The writing is unusually clear and precise. The essay falls just short of a 10 because the evaluation of the Platonist-formalist distinction is brief rather than fully developed: the student notes both positions but does not pursue what follows for the overall argument from choosing one over the other, which leaves the most philosophically rich point in the essay slightly underdeveloped. The treatment of perspectives in mathematics is therefore slightly thinner than in the science sections. This is a minor limitation in an otherwise outstanding piece of work.",
    "risks": [
      {
        "title": "Underdeveloped evaluation of competing mathematical ontologies",
        "description": "The Platonist-formalist distinction is the one place where the essay raises a genuinely contested philosophical question about mathematics and then does not evaluate it. The student correctly identifies that on either view 'the certainty is internal to mathematics,' but does not ask whether the two views actually agree on what that internality means, what is at stake between them, or how the choice affects the claim that mathematical certainty is conditional. A Platonist might argue that certainty about abstract objects is not conditional at all, since the objects exist independently of any axiom choice. That objection is available in the text but not engaged with. This is the only point in the essay where evaluation of points of view falls short of the fully sustained standard expected at 10."
      },
      {
        "title": "The 'practical certainty' concept is asserted more than it is examined",
        "description": "In the Higgs paragraph the essay introduces 'practical certainty' as a distinct concept and concludes that it differs from logical certainty because it 'remains open in principle.' This is a strong and correct point, but it is stated rather than fully explored. The essay does not ask, for example, whether the distinction between practical and logical certainty is stable, or whether a sufficiently well-supported scientific claim could ever close the gap. This is a smaller gap than the Platonist-formalist issue but it means the philosophical treatment of the science side, while stronger overall, also has a moment where an implication is noted but not pursued."
      }
    ],
    "leverage": [
      {
        "title": "Develop the Platonist-formalist evaluation into a genuine comparison with consequences",
        "description": "Give the Platonist position its strongest form: if mathematical objects exist independently of us and axioms are attempts to describe them, then certainty is not conditional on axiom choice at all, it is conditional on whether we have identified the right axioms, which is an empirical-like question about abstract reality. Then evaluate: does this strengthen or weaken the overall thesis? Does it bring mathematics closer to the sciences than the essay implies? Working through this comparison would demonstrate exactly the kind of evaluation of perspectives the Excellent band requires and could lift the score to 10."
      },
      {
        "title": "Deepen the 'practical certainty' analysis by engaging with its limits",
        "description": "The essay could ask whether 'practical certainty' is really a form of certainty at all or simply a very high credence. If it is only high credence, does that mean the essay's conclusion ('certainty is attainable to a small extent at most' in science) is too generous? Alternatively, if community consensus plus independent replication genuinely constitutes a kind of certainty, what distinguishes it in kind from mathematical certainty rather than merely in degree? Pressing this question would make the comparison between the two areas of knowledge sharper and more critically engaged."
      },
      {
        "title": "Connect the Gödel point more explicitly to the title's 'to what extent' framing",
        "description": "The essay discusses Gödel's results clearly but treats them primarily as a limit on mathematical certainty. It could go further and ask how much they actually reduce certainty for working mathematicians: Gödel's unprovable statements are not encountered in ordinary mathematical practice, so is the limitation theoretical rather than practical? Engaging with this would show more nuanced evaluation of the 'extent' dimension of the title, which the question explicitly asks for."
      }
    ],
    "nextSteps": [
      "Expand the paragraph on Platonist and formalist views by following the disagreement to its conclusion: argue explicitly what the thesis about conditional certainty looks like if Platonism is true and whether that changes how one should answer the title, then evaluate which view is more defensible or more relevant to the question.",
      "Add one to two sentences to the practical certainty discussion that ask whether practical certainty differs from logical certainty in kind or only in degree, and use the answer to sharpen the conclusion about how much certainty science can attain.",
      "Revise the Gödel discussion to include a brief acknowledgment that unprovable statements rarely arise in mathematical practice and evaluate whether this means Gödel limits the extent of certainty in principle more than in practice, tying the observation back to the 'to what extent' framing of the title."
    ]
  }
] as const;

const card = { border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, margin: "28px 0" };
const small = { fontSize: "0.85rem", color: "#4b5563", lineHeight: 1.6 };

export default function SampleReports() {
  return (
    <ResourceArticle
      title="Sample IBLens Reports: Three Essays, Three Honest Grades | IBLens"
      description="Real, unedited IBLens output: three demonstration TOK essays on one title, written at three levels of quality and marked 2/10, 5/10 and 9/10 on the holistic instrument, each with its full report."
      canonical="/resources/sample-reports"
      datePublished="2026-07-03"
      dateModified="2026-09-13"
    >
      <h1>Three essays. Three honest grades.</h1>

      <p>
        A grader is only useful if the mark moves when the quality of the work moves. To show how IBLens behaves, we wrote three
        demonstration essays on one TOK-style title, <em>To what extent is certainty attainable in the natural sciences and
        mathematics?</em>, at deliberately different levels of quality, and ran each one through the grader the way a student
        would: pasted into the analyzer, with no account.
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
        Before publishing, we checked the reports against the TOK instrument. A first run told the developing essay that the
        Satisfactory band requires evaluation of other points of view, which it does not: evaluation is described from the Good
        band up. We corrected the grader&rsquo;s TOK instructions, which every TOK report uses, and ran all three essays again.
        These are the reports from that second run.
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
                <p key={i} style={{ marginTop: 10, lineHeight: 1.7, whiteSpace: "pre-line", fontWeight: i === 0 ? 600 : 400 }}>{p}</p>
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
          <p style={{ ...small, marginTop: 0 }}>{r.criterionComment}</p>

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
            <p style={{ ...small, marginTop: 8 }}>{r.overall}</p>
          </details>
        </div>
      ))}

      <h2>Why the spread matters</h2>
      <p>
        The weak essay scored 2, the developing essay 5 and the strong essay 9, one in each of three bands: Rudimentary,
        Satisfactory and Excellent. The mark moved with the quality, and every report, the strong one included, says what would
        move it further. IBLens is instructed to apply the criteria as written and to be honest about weaknesses, because a low mark you see before
        you submit is one you can still change.
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
