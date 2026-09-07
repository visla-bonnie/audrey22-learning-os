(function(){
  const Q = (id,subject,skill,level,prompt,choices,answer,explanation,hint,extra={}) => ({id,subject,skill,level,prompt,choices,answer,explanation,hint,...extra});

  const SKILLS = {
    Math:[
      'Fractions & Decimals','Percent','Ratios & Proportions','Integers','Expressions','Equations','Inequalities','Geometry','Statistics','Probability','Word Problems','Quantitative Reasoning','Functions','Systems of Equations','Exponents & Polynomials','Quadratics'
    ],
    English:[
      'Grammar','Sentence Structure','Punctuation','Vocabulary in Context','Writing Mechanics','Verbal Reasoning','Writing Concepts & Skills','Main Idea','Inference','Evidence','Author’s Purpose','Writing Logic'
    ],
    Science:[
      'Experimental Design','Cells & Genetics','Ecosystems','Matter','Forces & Motion','Energy','Earth Systems','Space Science','Data & Graphs'
    ],
    'Social Studies':[
      'Primary & Secondary Sources','Cause & Effect','Geography','Civics','Ancient Civilizations','Medieval & Early Modern World','U.S. History','Economics','Historical Reasoning'
    ],
    Reasoning:['Patterns','Logic','Data Reasoning','Multi-Step Reasoning'],
    'Transfer Prep':['Verbal Reasoning','Quantitative Reasoning','Reading Strategy','Math Achievement','Writing Sample']
  };

  const english = [
    Q('e1','English','Grammar','CORE','Choose the sentence with correct subject-verb agreement.',[
      'The group of players are practicing after school.','The group of players is practicing after school.','The group of players were practicing after school every day.','The group of players have practiced after school.'
    ],1,'The subject is “group,” which is singular, so the verb should be “is.”','Find the true subject, not the noun closest to the verb.'),
    Q('e2','English','Sentence Structure','CORE','Which option is a complete sentence?',[
      'Because the rain started suddenly.','Running toward the gym before practice.','The team moved practice indoors.','While everyone waited for the coach.'
    ],2,'A complete sentence needs a subject, a verb, and a complete thought. “The team moved practice indoors” has all three.','Ask: Can this stand alone and make complete sense?'),
    Q('e3','English','Punctuation','CORE','Which sentence uses the comma correctly?',[
      'After practice Audrey, finished her homework.','After practice, Audrey finished her homework.','After, practice Audrey finished her homework.','After practice Audrey, finished her homework.'
    ],1,'An introductory phrase such as “After practice” is followed by a comma.','Look for the introductory phrase.'),
    Q('e4','English','Vocabulary in Context','CORE','In the sentence “Maya was reluctant to speak first, but she finally raised her hand,” what does reluctant most nearly mean?',[
      'eager','hesitant','angry','careless'
    ],1,'“Reluctant” means unwilling or hesitant. The contrast with “finally raised her hand” supports that meaning.','Use the rest of the sentence as evidence.'),
    Q('e5','English','Writing Logic','CORE','Which transition best completes the sentence? “The first experiment failed. ___, the team changed one variable and tried again.”',[
      'For example','However','As a result','Meanwhile'
    ],2,'The second action happens because the first experiment failed, so “As a result” shows cause and effect.','Ask what relationship connects the two sentences.'),
    Q('e6','English','Grammar','CORE','Which sentence uses the pronoun correctly?',[
      'Me and Jordan finished the project.','Jordan and me finished the project.','Jordan and I finished the project.','Jordan and myself finished the project.'
    ],2,'“Jordan and I” is correct because the pronoun is part of the subject.','Remove “Jordan and” and see which pronoun sounds correct.'),
    Q('e7','English','Punctuation','CORE','Which sentence correctly uses a semicolon?',[
      'The library was closing; we checked out our books quickly.','The library; was closing, we checked out our books quickly.','The library was closing; because it was late.','The library was; closing we checked out our books quickly.'
    ],0,'A semicolon can join two closely related independent clauses. Both sides here can stand alone.','Check whether both sides of the semicolon are complete sentences.'),
    Q('e8','English','Sentence Structure','PLACEMENT','Which revision best fixes the run-on sentence? “The class finished the lab everyone compared results.”',[
      'The class finished the lab, everyone compared results.','The class finished the lab; everyone compared results.','The class finished, the lab everyone compared results.','The class finished the lab everyone; compared results.'
    ],1,'A semicolon correctly separates the two independent clauses.','Find the two complete thoughts.'),
    Q('e9','English','Vocabulary in Context','CORE','What does “conspicuous” most nearly mean in this sentence? “Her bright orange jacket was conspicuous in the crowd of dark coats.”',[
      'easy to notice','very expensive','poorly made','comfortable'
    ],0,'The bright orange jacket stands out from the dark coats, so “conspicuous” means easy to notice.','Look for contrast clues.'),
    Q('e10','English','Writing Logic','PLACEMENT','Which sentence best supports the claim “Regular exercise can improve concentration”?',[
      'Many students own athletic shoes.','A study found that students who took short activity breaks returned to class more focused.','School gyms contain many kinds of equipment.','Some sports are played outdoors.'
    ],1,'The study directly connects activity with improved focus, so it is relevant evidence.','Choose evidence that directly proves the claim.'),
    Q('e11','English','Grammar','CORE','Choose the sentence with the correct verb tense.',[
      'Yesterday we walk to the library.','Yesterday we walked to the library.','Yesterday we walking to the library.','Yesterday we walks to the library.'
    ],1,'“Yesterday” signals past tense, so “walked” is correct.','Use the time word.'),
    Q('e12','English','Punctuation','CORE','Which sentence correctly punctuates a list?',[
      'Bring a pencil notebook, calculator and ruler.','Bring a pencil, notebook, calculator, and ruler.','Bring, a pencil notebook calculator and ruler.','Bring a pencil notebook calculator, and ruler.'
    ],1,'Items in a series should be separated by commas.','Count the separate items.'),
    Q('e13','English','Vocabulary in Context','CORE','In “The coach’s concise instructions took less than a minute,” concise most nearly means:',[
      'confusing','brief and clear','loud','repeated'
    ],1,'“Concise” means brief but complete or clear.','Use “took less than a minute” as a clue.'),
    Q('e14','English','Grammar','PLACEMENT','Which sentence uses “their/there/they’re” correctly?',[
      'Their going to finish there project.','They’re going to finish their project there.','There going to finish they’re project their.','They’re going to finish there project their.'
    ],1,'They’re = they are, their = possession, there = place.','Expand “they’re” to “they are.”'),
    Q('e15','English','Sentence Structure','CORE','Which sentence contains a dependent clause?',[
      'The bell rang.','We packed our bags.','When the bell rang, we packed our bags.','Students left.'
    ],2,'“When the bell rang” cannot stand alone, so it is a dependent clause.','Look for a clause beginning with a subordinating word such as when, because, although, or if.'),
    Q('e16','English','Writing Logic','CORE','Which sentence is the strongest topic sentence for a paragraph about why sleep matters for students?',[
      'I went to bed at ten last night.','Sleep helps students learn, recover, and manage emotions.','My pillow is blue.','Some students like music.'
    ],1,'A topic sentence should introduce the paragraph’s central idea, and this one previews several reasons sleep matters.','Pick the sentence broad enough to organize the whole paragraph.'),
    Q('e17','English','Grammar','CORE','Which sentence is written in active voice?',[
      'The final shot was made by Nina.','Nina made the final shot.','The final shot had been made.','The shot was being made by Nina.'
    ],1,'In active voice, the subject performs the action: Nina made the shot.','Ask who is doing the action.'),
    Q('e18','English','Punctuation','PLACEMENT','Which sentence correctly uses quotation marks and punctuation?',[
      'Coach said “Stay focused”.','Coach said, “Stay focused.”','Coach said “Stay focused.”','Coach said, “Stay focused”.'
    ],1,'A comma introduces the quotation, and the period goes inside the closing quotation mark in standard American English.','Look at both the comma before the quote and the period placement.'),
    Q('e19','English','Vocabulary in Context','CORE','“The evidence was ambiguous, so the class debated two possible explanations.” Ambiguous most nearly means:',[
      'clear and certain','open to more than one interpretation','completely false','unimportant'
    ],1,'If the evidence supports debate between two explanations, it is ambiguous—unclear or open to multiple meanings.','The consequence “debated two explanations” is your clue.'),
    Q('e20','English','Writing Logic','PLACEMENT','Which revision is most precise? “The scientist did stuff to the samples.”',[
      'The scientist did things to the samples.','The scientist carefully measured and heated the samples.','The scientist worked with samples somehow.','The samples were there.'
    ],1,'Precise verbs such as “measured” and “heated” communicate exactly what happened.','Replace vague words with specific actions.'),
    Q('e21','English','Grammar','CORE','Which sentence correctly uses an apostrophe to show possession?',[
      'The players shoes were muddy.','The player’s shoes were muddy.','The players’s shoes were muddy.','The players shoe’s were muddy.'
    ],1,'For one player, add apostrophe + s: player’s shoes.','First decide whether the owner is singular or plural.'),
    Q('e22','English','Sentence Structure','PLACEMENT','Which sentence contains parallel structure?',[
      'She likes hiking, to swim, and biking.','She likes to hike, swim, and biking.','She likes hiking, swimming, and biking.','She likes hike, swimming, and to bike.'
    ],2,'All three items use the same -ing form, which creates parallel structure.','The items in a list should use matching grammatical forms.'),
    Q('e23','English','Vocabulary in Context','CORE','“The committee reached a unanimous decision.” Unanimous means:',[
      'decided by one person','agreed on by everyone','made quickly','kept secret'
    ],1,'A unanimous decision is one everyone agrees on.','Think of “uni-” as one shared choice.'),
    Q('e24','English','Punctuation','CORE','Which sentence needs a comma before the coordinating conjunction?',[
      'I wanted to practice but the gym was closed.','I practiced quietly in my room.','The gym closed early.','We stretched before practice.'
    ],0,'Two independent clauses joined by “but” need a comma: “I wanted to practice, but the gym was closed.”','Check whether both sides of “but” could stand alone.'),
    Q('e25','English','Writing Logic','PLACEMENT','Which concluding sentence best follows a paragraph arguing that schools should provide more outdoor learning?',[
      'Outdoor classes can make learning active, memorable, and connected to the real world.','My backpack is heavy.','There are many kinds of trees.','School starts in the morning.'
    ],0,'A conclusion should reinforce the central claim without introducing an unrelated idea.','Return to the paragraph’s main claim.'),
    Q('e26','English','Grammar','CORE','Which sentence correctly uses a comparative adjective?',[
      'This trail is more steep than that one.','This trail is steeper than that one.','This trail is steepest than that one.','This trail is most steep than that one.'
    ],1,'For most one-syllable adjectives, use -er to compare two things: steeper.','Two things are being compared.'),
    Q('e27','English','Vocabulary in Context','PLACEMENT','“Despite the setback, the team remained resilient.” Resilient most nearly means:',[
      'able to recover and keep going','unable to change','easily distracted','extremely lucky'
    ],0,'“Despite the setback” signals that the team recovered and continued, which is resilience.','Use the contrast word “despite.”'),
    Q('e28','English','Grammar','CORE','Which sentence uses a colon correctly?',[
      'She packed three things: water, a map, and a jacket.','She packed: three things water, a map, and a jacket.','She: packed three things water, a map, and a jacket.','She packed three: things water a map and a jacket.'
    ],0,'A colon can introduce a list after a complete clause.','The words before the colon should form a complete statement.'),
    Q('e29','English','Sentence Structure','PLACEMENT','Which sentence best combines the ideas without unnecessary repetition? “The test was difficult. The test required careful reading.”',[
      'The test was difficult, and the test required careful reading.','The difficult test required careful reading.','The test was difficult because the test was difficult.','The test required reading and the test.'
    ],1,'The revision is concise and keeps both ideas without repeating “the test.”','Look for the clearest, least repetitive version.'),
    Q('e30','English','Writing Logic','CORE','Which statement is a claim rather than a fact?',[
      'Water freezes at 0°C under standard conditions.','California is on the west coast of the United States.','School uniforms improve student focus.','Earth has one moon.'
    ],2,'“School uniforms improve student focus” is arguable and would need evidence, so it is a claim.','A claim is something reasonable people could debate.'),

    Q('erb_vr1','English','Verbal Reasoning','ERB PRIORITY','Which pair has the same relationship as BIRD : NEST?',[
      'bee : hive','book : page','shoe : foot','river : water'
    ],0,'A bird lives in a nest; a bee lives in a hive. The relationship is animal to home.','Name the relationship in words before choosing.'),
    Q('erb_vr2','English','Verbal Reasoning','ERB PRIORITY','Which word does NOT belong with the others?',[
      'triangle','rectangle','circle','equation'
    ],3,'Triangle, rectangle, and circle are geometric figures; equation is a mathematical statement.','Find the shared category.'),
    Q('erb_vr3','English','Verbal Reasoning','ERB PRIORITY','All kestrels are birds. Some birds migrate. Which conclusion MUST be true?',[
      'All kestrels migrate.','Some kestrels migrate.','Kestrels are birds.','No kestrels migrate.'
    ],2,'The only guaranteed conclusion is the statement already given: all kestrels are birds. The migration information does not tell us whether kestrels migrate.','Separate what must be true from what might be true.'),
    Q('erb_vr4','English','Verbal Reasoning','ERB PRIORITY','COMPASS is to DIRECTION as THERMOMETER is to:',[
      'weather','temperature','glass','distance'
    ],1,'A compass measures or indicates direction; a thermometer measures temperature.','Ask what each tool tells you.'),
    Q('erb_vr5','English','Verbal Reasoning','ERB PRIORITY','If every member of Team A completed the challenge, and Audrey is a member of Team A, what follows?',[
      'Audrey probably completed it.','Audrey completed it.','Audrey designed the challenge.','No conclusion is possible.'
    ],1,'This is deductive reasoning: the rule applies to every member, and Audrey is a member, so she completed it.','Apply the general rule to the specific case.'),
    Q('erb_vr6','English','Verbal Reasoning','ERB PRIORITY','Which word best completes the relationship? GENEROUS : SELFISH :: CAUTIOUS : ___',[
      'careful','reckless','quiet','patient'
    ],1,'Generous and selfish are opposites; cautious and reckless are also opposites.','Look for the same kind of relationship.'),
    Q('erb_vr7','English','Verbal Reasoning','ERB PRIORITY','Three clues describe one word: “can be supported by evidence,” “can be tested,” “may be revised.” Which word fits best?',[
      'hypothesis','rumor','decoration','tradition'
    ],0,'A hypothesis can be tested with evidence and revised when new evidence appears.','Think of a claim used in scientific reasoning.'),
    Q('erb_vr8','English','Verbal Reasoning','ERB PRIORITY','Which statement best completes the logic? If the library is open, the lights are on. The lights are NOT on. Therefore:',[
      'the library is not open','the library is definitely crowded','the lights are broken','nothing can be concluded'
    ],0,'If open → lights on. Since the lights are not on, the condition for being open is not met.','Use the contrapositive of the rule.'),
    Q('erb_wm1','English','Writing Mechanics','ERB BUILD','Which sentence is written correctly?',[
      'After the game we ate, dinner.','After the game, we ate dinner.','After, the game we ate dinner.','After the game we, ate dinner.'
    ],1,'An introductory phrase is followed by a comma; no comma belongs between the verb and its object.','Find the introductory phrase.'),
    Q('erb_wm2','English','Writing Mechanics','ERB BUILD','Choose the sentence with correct capitalization.',[
      'We visited yosemite national park in July.','We visited Yosemite National Park in July.','We visited Yosemite national park in july.','We visited yosemite National Park in July.'
    ],1,'The official place name and the month are proper nouns and should be capitalized.','Look for names of specific places and months.'),
    Q('erb_wm3','English','Writing Mechanics','ERB BUILD','Which sentence avoids a pronoun-agreement error?',[
      'Every player should bring their water bottle to this one-student drill.','Each of the two teams should bring its roster.','Neither student finished their individual form.','A person should bring our notebook.'
    ],1,'“Each ... team” is singular, so “its” agrees clearly.','Match the pronoun to the noun it replaces.'),
    Q('erb_wm4','English','Writing Mechanics','ERB BUILD','Which sentence uses the apostrophe correctly?',[
      'The three players helmets were lined up.','The three player’s helmets were lined up.','The three players’ helmets were lined up.','The three players helmet’s were lined up.'
    ],2,'The helmets belong to multiple players, so the plural possessive is players’.','Make the owner plural first, then add the possessive apostrophe.'),
    Q('erb_wm5','English','Writing Mechanics','ERB BUILD','Which revision fixes the sentence fragment? “Although the team practiced for two hours.”',[
      'Although the team practiced for two hours.','The team practiced for two hours.','Although, the team practiced for two hours.','Practiced for two hours.'
    ],1,'“Although” makes the original clause dependent. Removing it creates a complete independent clause.','Can the sentence stand alone?'),
    Q('erb_wm6','English','Writing Mechanics','ERB BUILD','Which sentence uses commas correctly with a nonessential phrase?',[
      'My coach who grew up in France speaks three languages.','My coach, who grew up in France, speaks three languages.','My coach who grew up, in France speaks three languages.','My coach, who grew up in France speaks, three languages.'
    ],1,'The phrase “who grew up in France” adds nonessential information and should be set off with commas.','Can the sentence still identify the coach without the phrase?'),
    Q('erb_wc1','English','Writing Concepts & Skills','ERB PRIORITY','Which sentence is the strongest thesis for an essay about whether schools should offer more outdoor learning?',[
      'Outdoor learning exists.','Schools should offer more outdoor learning because it can deepen observation, improve engagement, and connect lessons to real environments.','I once had class outside.','Some days are sunny.'
    ],1,'A strong thesis states a clear position and previews the main reasons the essay will develop.','Choose the sentence that can guide an entire essay.'),
    Q('erb_wc2','English','Writing Concepts & Skills','ERB PRIORITY','A paragraph argues that school gardens help science learning. Which detail is MOST relevant?',[
      'The garden fence is green.','Students measured soil moisture, tracked plant growth, and compared the results with their hypotheses.','The cafeteria serves lunch at noon.','Some students prefer basketball.'
    ],1,'This detail directly shows students doing scientific observation, measurement, and hypothesis testing in the garden.','Pick evidence that directly supports the paragraph’s claim.'),
    Q('erb_wc3','English','Writing Concepts & Skills','ERB PRIORITY','Which order is most logical for an explanatory paragraph?',[
      'conclusion → random detail → topic sentence','topic sentence → supporting evidence → explanation → concluding sentence','supporting evidence → title → unrelated example','quotation → new topic → topic sentence'
    ],1,'Effective explanatory writing usually introduces the idea, supports it, explains the support, then closes the point.','Think beginning, proof, reasoning, finish.'),
    Q('erb_wc4','English','Writing Concepts & Skills','ERB PRIORITY','Which transition best signals contrast?',[
      'for example','therefore','however','similarly'
    ],2,'“However” signals a contrast between ideas.','Ask whether the writer is adding, causing, comparing, or contrasting.'),
    Q('erb_wc5','English','Writing Concepts & Skills','ERB PRIORITY','Which sentence best fits a formal report for a science teacher?',[
      'The experiment was super cool and kinda weird.','The results were awesome!','The second trial produced a 12% increase in growth compared with the control group.','You won’t believe what happened next.'
    ],2,'Formal academic writing uses precise, objective language and relevant data.','Match tone and word choice to audience and purpose.'),
    Q('erb_wc6','English','Writing Concepts & Skills','ERB PRIORITY','Which revision is most concise without losing meaning? “Due to the fact that it was raining, the game was moved indoors.”',[
      'Because it was raining, the game was moved indoors.','It was raining due to the fact, and the game was moved indoors.','The game, because of rain that was happening, moved indoors.','Due to rain being a thing, indoors was chosen.'
    ],0,'“Because it was raining” communicates the same idea more directly and efficiently.','Remove unnecessary words while preserving meaning.'),
    Q('erb_wc7','English','Writing Concepts & Skills','ERB PRIORITY','A writer wants to persuade students to reduce food waste. Which opening is most effective?',[
      'Food is a noun.','Our cafeteria throws away dozens of untouched items each day; small changes in what we take can cut that waste.','Lunch happens every day.','Some plates are round.'
    ],1,'The opening gives a concrete problem and immediately points toward a meaningful action, fitting a persuasive purpose.','Choose an opening aligned to purpose and audience.'),
    Q('erb_wc8','English','Writing Concepts & Skills','ERB PRIORITY','Which sentence best explains HOW the evidence supports the claim? Claim: “Short movement breaks can help students refocus.” Evidence: “Students made fewer attention errors after a five-minute walk.”',[
      'The walk was five minutes.','This result suggests that brief movement can reset attention, because students made fewer mistakes afterward.','Students sometimes walk.','Errors can happen in school.'
    ],1,'The sentence connects the evidence to the claim by explaining the meaning of the lower error rate.','Do not repeat the evidence; explain why it matters.')
  ];

  const science = [
    Q('s1','Science','Experimental Design','CORE','A student tests whether sunlight affects plant growth. One plant gets 8 hours of light and 50 mL of water; the other gets no light and 100 mL of water. What is the biggest problem?',[
      'The plants are green.','More than one variable changed.','The student used water.','The experiment lasted several days.'
    ],1,'Both sunlight and water amount changed, so the experiment cannot isolate the effect of sunlight.','A fair test changes one independent variable at a time.'),
    Q('s2','Science','Cells & Genetics','CORE','Which structure controls most activities of a eukaryotic cell?',[
      'cell membrane','nucleus','ribosome','cytoplasm'
    ],1,'The nucleus contains DNA and directs many cell activities.','Think about where genetic instructions are stored.'),
    Q('s3','Science','Ecosystems','CORE','If the number of hawks in an ecosystem decreases sharply, what is a likely short-term effect on their prey?',[
      'The prey population may increase.','The prey population must disappear.','Plants will stop photosynthesizing.','Water will evaporate faster.'
    ],0,'With fewer predators, more prey may survive, so the prey population can increase.','Think predator-prey relationship.'),
    Q('s4','Science','Matter','CORE','Which change is a chemical change?',[
      'ice melting','paper tearing','iron rusting','water boiling'
    ],2,'Rusting forms new substances (iron oxides), so it is a chemical change.','Ask whether a new substance forms.'),
    Q('s5','Science','Forces & Motion','CORE','A skateboarder travels 24 meters in 6 seconds. What is the average speed?',[
      '4 m/s','18 m/s','30 m/s','144 m/s'
    ],0,'Speed = distance ÷ time = 24 ÷ 6 = 4 m/s.','Use speed = distance / time.'),
    Q('s6','Science','Energy','CORE','Which example shows potential energy being converted mainly into kinetic energy?',[
      'A book resting on a shelf','A ball rolling down a hill','A battery stored in a drawer','A lamp turned off'
    ],1,'As the ball rolls downhill, gravitational potential energy decreases while kinetic energy increases.','Look for stored energy turning into motion.'),
    Q('s7','Science','Earth Systems','CORE','Which process most directly turns liquid water into water vapor?',[
      'condensation','evaporation','precipitation','freezing'
    ],1,'Evaporation changes liquid water into gas.','Think of a puddle disappearing on a warm day.'),
    Q('s8','Science','Space Science','CORE','Why do we see different phases of the Moon?',[
      'Earth’s shadow always covers different parts of the Moon.','The Moon changes shape.','We see different portions of the Moon’s sunlit half as it orbits Earth.','Clouds block part of the Moon each night.'
    ],2,'Half of the Moon is always illuminated by the Sun; our viewing angle changes as the Moon orbits Earth.','Focus on the Moon’s orbit and sunlight.'),
    Q('s9','Science','Data & Graphs','PLACEMENT','A graph shows temperature rising from 15°C at 8 a.m. to 27°C at 2 p.m. What is the total increase?',[
      '12°C','15°C','27°C','42°C'
    ],0,'27 − 15 = 12°C.','Find change = final − initial.'),
    Q('s10','Science','Experimental Design','PLACEMENT','What is the dependent variable in an experiment testing how fertilizer amount affects plant height?',[
      'amount of fertilizer','plant height','type of ruler','number of pots'
    ],1,'The dependent variable is what is measured in response to the change—in this case, plant height.','Independent = changed; dependent = measured.'),
    Q('s11','Science','Cells & Genetics','CORE','Which cell structure regulates what enters and leaves the cell?',[
      'nucleus','cell membrane','mitochondrion','chromosome'
    ],1,'The cell membrane controls movement of substances into and out of the cell.','Think of the cell’s boundary or gate.'),
    Q('s12','Science','Ecosystems','PLACEMENT','Why is biodiversity often important to ecosystem stability?',[
      'Every species uses exactly the same resources.','Greater variety can provide multiple organisms that fill related ecological roles.','Biodiversity prevents all environmental changes.','Only ecosystems with one species are stable.'
    ],1,'A variety of species can make ecosystems more resilient because functions are not dependent on a single species.','Think redundancy and resilience.'),
    Q('s13','Science','Matter','CORE','An atom has 8 protons. What determines that it is oxygen?',[
      'its number of protons','its number of neutrons only','its temperature','its state of matter'
    ],0,'An element’s identity is determined by its number of protons (atomic number).','Atomic number = number of protons.'),
    Q('s14','Science','Forces & Motion','PLACEMENT','Two students push a box in opposite directions with 40 N and 25 N. What is the net force?',[
      '65 N toward the stronger push','15 N toward the stronger push','15 N toward the weaker push','0 N'
    ],1,'Opposite forces subtract: 40 − 25 = 15 N, in the direction of the 40 N push.','Subtract opposing forces.'),
    Q('s15','Science','Energy','CORE','Which energy transfer occurs when a metal spoon warms in hot soup?',[
      'conduction','reflection','photosynthesis','magnetism'
    ],0,'Heat moves through direct contact from the soup into the spoon by conduction.','Direct contact is the clue.'),
    Q('s16','Science','Earth Systems','CORE','Which layer of Earth is liquid and helps generate Earth’s magnetic field?',[
      'crust','mantle','outer core','inner core'
    ],2,'The outer core is liquid iron-rich material; its motion contributes to Earth’s magnetic field.','The inner core is solid; the outer core is liquid.'),
    Q('s17','Science','Space Science','PLACEMENT','A light-year is a measure of:',[
      'time','distance','brightness','mass'
    ],1,'A light-year is the distance light travels in one year.','Despite the word “year,” it measures how far, not how long.'),
    Q('s18','Science','Data & Graphs','PLACEMENT','A class records 12, 15, 14, 18, and 16 bean sprouts in five trays. What is the mean?',[
      '14','15','16','75'
    ],1,'The total is 75. Divide by 5 trays: 75 ÷ 5 = 15.','Mean = total ÷ number of values.'),
    Q('s19','Science','Experimental Design','CORE','Why do scientists repeat trials?',[
      'To guarantee the hypothesis is correct','To improve reliability and reduce the effect of random error','To change the independent variable each time','To avoid recording data'
    ],1,'Repeated trials help show whether results are consistent and less likely due to chance.','Think reliability.'),
    Q('s20','Science','Cells & Genetics','PLACEMENT','If a trait is controlled by a recessive allele, when is the recessive phenotype most likely to appear?',[
      'When at least one dominant allele is present','When two recessive alleles are present','Whenever the organism is older','Only in plants'
    ],1,'For a simple dominant-recessive pattern, the recessive phenotype appears when no dominant allele is present.','Recessive traits are masked by dominant alleles.'),
    Q('s21','Science','Ecosystems','CORE','Which organism is a producer?',[
      'hawk','mushroom','grass','rabbit'
    ],2,'Grass makes its own food through photosynthesis, so it is a producer.','Producers capture energy and make food.'),
    Q('s22','Science','Matter','PLACEMENT','Which statement best describes particles in a gas?',[
      'They are tightly packed and only vibrate.','They are close together and slide past one another.','They are far apart and move freely.','They have no motion.'
    ],2,'Gas particles are widely spaced and move freely in many directions.','Compare solids, liquids, and gases.'),
    Q('s23','Science','Forces & Motion','CORE','If an object moves at constant velocity in a straight line, the net force on it is:',[
      'zero','increasing','always downward only','equal to its mass'
    ],0,'Constant velocity means no acceleration, so the net force is zero.','No acceleration → balanced forces.'),
    Q('s24','Science','Energy','PLACEMENT','Why does a dark surface usually warm faster in sunlight than a light surface?',[
      'Dark surfaces absorb more radiant energy.','Dark surfaces create energy.','Light surfaces have no particles.','Dark surfaces stop conduction.'
    ],0,'Dark surfaces generally absorb more incoming radiation, converting more of it to thermal energy.','Think absorption vs reflection.'),
    Q('s25','Science','Earth Systems','PLACEMENT','Which evidence best supports the idea that tectonic plates move?',[
      'Similar fossils and rock layers are found on continents now far apart.','All mountains are the same height.','Ocean water is salty.','The Moon has craters.'
    ],0,'Matching fossils and rock structures across separated continents are evidence that those landmasses were once connected.','Look for evidence connecting distant continents.'),
    Q('s26','Science','Space Science','CORE','What causes day and night on Earth?',[
      'Earth’s rotation','Earth’s revolution around the Sun','the Moon’s orbit','changes in the Sun’s brightness'
    ],0,'Earth rotates on its axis about once every 24 hours, causing day and night.','Rotation is spinning; revolution is orbiting.'),
    Q('s27','Science','Data & Graphs','CORE','Which graph is usually best for showing change over time?',[
      'line graph','pie chart','Venn diagram','map scale'
    ],0,'Line graphs make trends over continuous time easy to see.','Think of plotting a value across days or months.'),
    Q('s28','Science','Experimental Design','PLACEMENT','A control group is useful because it:',[
      'provides a baseline for comparison','must receive the largest treatment','removes the need to measure results','makes every trial identical'
    ],0,'A control group helps show what happens without the tested treatment or variable.','Think comparison baseline.'),
    Q('s29','Science','Ecosystems','PLACEMENT','Energy in most ecosystems originally enters through:',[
      'decomposers','sunlight captured by producers','predators','soil minerals alone'
    ],1,'Producers capture sunlight and convert it to chemical energy, which then moves through food webs.','Start at the base of most food chains.'),
    Q('s30','Science','Matter','CORE','Which property can help distinguish a pure substance without changing its identity?',[
      'density','opinion','location','age of the container'
    ],0,'Density is a characteristic physical property that can help identify substances.','Choose a measurable physical property.'),
  ];

  const social = [
    Q('h1','Social Studies','Primary & Secondary Sources','CORE','Which is a primary source for studying the California Gold Rush?',[
      'A modern textbook chapter','A miner’s diary written in 1849','A documentary made in 2020','A website summarizing several historians'
    ],1,'A diary created by someone during the event is a firsthand primary source.','Primary sources come directly from the time or people being studied.'),
    Q('h2','Social Studies','Cause & Effect','CORE','Which statement best describes cause and effect?',[
      'A cause explains why something happened; an effect is what happened as a result.','A cause and effect are always the same event.','An effect always happens before its cause.','Cause and effect only apply in science.'
    ],0,'Causes help explain why events occur; effects are consequences that follow.','Think “because” and “therefore.”'),
    Q('h3','Social Studies','Geography','CORE','Lines of latitude measure distance:',[
      'east or west of the Prime Meridian','north or south of the Equator','above sea level','between cities only'
    ],1,'Latitude measures angular distance north or south of the Equator.','Latitude lines run east-west but measure north-south position.'),
    Q('h4','Social Studies','Civics','CORE','What is one main purpose of checks and balances in the U.S. government?',[
      'To give one branch all power','To prevent any one branch from becoming too powerful','To eliminate elections','To combine federal and state governments into one office'
    ],1,'Checks and balances distribute power so branches can limit one another.','Think power control.'),
    Q('h5','Social Studies','Ancient Civilizations','CORE','Why did many early civilizations develop near rivers?',[
      'Rivers provided water, fertile soil, and transportation.','Rivers prevented all conflicts.','Rivers guaranteed equal wealth.','Rivers made farming unnecessary.'
    ],0,'River valleys offered water, fertile floodplains, and routes for travel and trade.','Think food, water, and movement.'),
    Q('h6','Social Studies','Economics','CORE','If demand for a product rises while supply stays the same, what often happens to price?',[
      'It tends to rise.','It must fall to zero.','It can never change.','It becomes unrelated to demand.'
    ],0,'With more buyers competing for the same supply, price often rises.','More demand + same supply usually pushes price up.'),
    Q('h7','Social Studies','Historical Reasoning','PLACEMENT','A historian compares two newspaper articles from opposing political groups covering the same event. Why?',[
      'To identify differing perspectives and possible bias','To prove newspapers are never useful','To avoid checking evidence','To replace all primary sources'
    ],0,'Comparing sources helps historians identify perspective, bias, agreement, and disagreement.','Different sources can frame the same event differently.'),
    Q('h8','Social Studies','U.S. History','CORE','What was a major purpose of the U.S. Constitution?',[
      'To create a framework for the federal government','To declare independence from Britain','To purchase Louisiana','To end the Civil War'
    ],0,'The Constitution establishes the structure, powers, and limits of the U.S. federal government.','Do not confuse the Constitution with the Declaration of Independence.'),
    Q('h9','Social Studies','Geography','PLACEMENT','A map scale says 1 inch = 40 miles. Two cities are 3.5 inches apart on the map. About how far apart are they?',[
      '43.5 miles','80 miles','140 miles','350 miles'
    ],2,'3.5 × 40 = 140 miles.','Multiply map distance by the scale.'),
    Q('h10','Social Studies','Civics','CORE','Which level of government usually manages a city fire department?',[
      'local government','foreign government','only the Supreme Court','the United Nations'
    ],0,'City services such as fire departments are typically managed by local government.','Think closest level to the community.'),
    Q('h11','Social Studies','Primary & Secondary Sources','PLACEMENT','Which question is most useful when evaluating a historical source?',[
      'Who created it, when, and for what purpose?','Is the paper old-looking?','Does it agree with me?','Is it the longest source available?'
    ],0,'Authorship, timing, audience, and purpose are central to evaluating reliability and perspective.','Ask who, when, why, and for whom.'),
    Q('h12','Social Studies','Cause & Effect','PLACEMENT','Which is the strongest causal claim?',[
      'Event A happened before Event B, so A definitely caused B.','Multiple sources show that drought reduced harvests, which contributed to migration.','Two events happened in the same century, so one caused the other.','The effect happened first.'
    ],1,'A strong causal claim uses evidence and allows for multiple contributing factors.','Timing alone does not prove causation.'),
    Q('h13','Social Studies','Ancient Civilizations','CORE','What was cuneiform?',[
      'A writing system used in ancient Mesopotamia','A Roman road','An Egyptian pyramid','A Greek military formation'
    ],0,'Cuneiform was a wedge-shaped writing system developed in Mesopotamia.','Think ancient writing.'),
    Q('h14','Social Studies','Economics','CORE','Opportunity cost is:',[
      'the value of the next-best option you give up','the total amount of money in a bank','a government tax only','a product’s color'
    ],0,'Choosing one option means giving up another; the next-best forgone option is the opportunity cost.','Every choice has a trade-off.'),
    Q('h15','Social Studies','U.S. History','PLACEMENT','Why was the Louisiana Purchase significant?',[
      'It roughly doubled the size of the United States.','It ended World War II.','It created the Constitution.','It abolished all taxes.'
    ],0,'The 1803 purchase from France greatly expanded U.S. territory.','Think land expansion.'),
    Q('h16','Social Studies','Civics','PLACEMENT','Which branch of the U.S. federal government interprets laws?',[
      'legislative','executive','judicial','local'
    ],2,'The judicial branch interprets laws and the Constitution in cases brought before courts.','Legislative makes laws; executive enforces them.'),
    Q('h17','Social Studies','Geography','CORE','A region defined by shared language, religion, or customs is primarily a:',[
      'cultural region','time zone','watershed only','longitude line'
    ],0,'Cultural regions are defined by shared human characteristics.','The clue is shared culture.'),
    Q('h18','Social Studies','Historical Reasoning','PLACEMENT','Two sources disagree about the number of people at a protest. What should a careful historian do?',[
      'Choose the larger number automatically','Compare how each source gathered information and seek additional evidence','Ignore both sources','Average the numbers without investigation'
    ],1,'Historians evaluate methods, perspective, and corroborating evidence rather than choosing arbitrarily.','Corroborate.'),
    Q('h19','Social Studies','Ancient Civilizations','CORE','The Nile River was especially important to ancient Egypt because its flooding:',[
      'helped renew fertile farmland','made agriculture impossible','eliminated trade','prevented settlement'
    ],0,'Regular Nile flooding deposited fertile silt that supported agriculture.','Think farming.'),
    Q('h20','Social Studies','Economics','PLACEMENT','A family has $60 to spend. They choose a $45 museum trip instead of a $40 concert. What is the opportunity cost?',[
      '$60','the museum trip','the concert they gave up','$5 only'
    ],2,'The opportunity cost is the next-best alternative forgone: the concert.','Not just the money difference—the lost alternative.'),
    Q('h21','Social Studies','U.S. History','CORE','The Declaration of Independence was adopted in:',[
      '1776','1787','1865','1914'
    ],0,'The Declaration of Independence was adopted on July 4, 1776.','Think July 4.'),
    Q('h22','Social Studies','Civics','CORE','Which is a responsibility of citizens rather than a guaranteed constitutional right?',[
      'serving on a jury when summoned','freedom of speech','freedom of religion','protection from unreasonable searches'
    ],0,'Jury service is a civic responsibility; the others are constitutional rights/protections.','Separate duties from protected freedoms.'),
    Q('h23','Social Studies','Primary & Secondary Sources','CORE','A photograph taken during a historical event is usually considered:',[
      'a primary source','always a secondary source','fiction','a law'
    ],0,'A photograph created at the time can provide direct evidence from the event.','Created during the event = often primary.'),
    Q('h24','Social Studies','Geography','PLACEMENT','Why do coastal climates often have smaller temperature swings than inland climates?',[
      'Large bodies of water heat and cool more slowly than land.','Ocean water has no temperature.','Coasts are always at higher elevation.','Wind stops at the shoreline.'
    ],0,'Water changes temperature more slowly than land, moderating nearby climates.','Think thermal properties of water.'),
    Q('h25','Social Studies','Historical Reasoning','CORE','What does corroboration mean in history?',[
      'Checking one source against other evidence','Memorizing one source word for word','Ignoring disagreement','Using only modern sources'
    ],0,'Corroboration means comparing sources to see where evidence agrees, conflicts, or adds context.','Cross-check evidence.'),
    Q('h26','Social Studies','Ancient Civilizations','PLACEMENT','Which development most directly allowed ancient societies to keep tax records, laws, and trade accounts?',[
      'writing systems','mountain ranges','monsoons','stone tools alone'
    ],0,'Writing allowed information to be recorded, stored, and transmitted.','Think record-keeping.'),
    Q('h27','Social Studies','Economics','CORE','A budget is best described as:',[
      'a plan for income and spending','a type of tax only','a bank loan','a price increase'
    ],0,'A budget is a plan for how money will be earned, saved, and spent.','Plan your money.'),
    Q('h28','Social Studies','Civics','PLACEMENT','Federalism is a system in which power is shared between:',[
      'national and state governments','only judges and lawyers','businesses and customers','cities in different countries'
    ],0,'In U.S. federalism, authority is divided between the national government and state governments.','Think two levels of government sharing authority.'),
    Q('h29','Social Studies','U.S. History','PLACEMENT','What was one major result of the Industrial Revolution in the United States?',[
      'Growth of factories and urbanization','The end of all immigration','The disappearance of machines','A return to only subsistence farming'
    ],0,'Industrialization expanded factories, changed work, and contributed to urban growth.','Think factories and cities.'),
    Q('h30','Social Studies','Cause & Effect','CORE','Which signal word most often introduces an effect?',[
      'therefore','because','since','due to'
    ],0,'“Therefore” usually signals a result or effect; the others commonly introduce causes.','Effect = result.'),
    Q('ca7_1','Social Studies','Medieval & Early Modern World','CA G7','Which Roman contribution had a lasting influence on later legal systems?',['written laws and ideas of citizenship','the printing press','steam engines','representative democracy in its modern form'],0,'Roman law and ideas of citizenship influenced later European and American legal traditions.','Think law and civic life.'),
    Q('ca7_2','Social Studies','Medieval & Early Modern World','CA G7','Why was Constantinople strategically important to the Byzantine Empire?',['It sat at a major crossroads between Europe and Asia.','It was isolated from trade routes.','It had no access to water.','It was located in western France.'],0,'Constantinople controlled important land and sea routes linking Europe and Asia.','Think location and trade.'),
    Q('ca7_3','Social Studies','Medieval & Early Modern World','CA G7','Which achievement is associated with scholars in the medieval Islamic world?',['Advances in mathematics, medicine, astronomy, and preservation of classical learning','The invention of the Roman Senate','The building of Machu Picchu','The creation of feudal Japan'],0,'Scholars across the Islamic world made major contributions in science, mathematics, medicine, geography, and philosophy.','Think intellectual exchange.'),
    Q('ca7_4','Social Studies','Medieval & Early Modern World','CA G7','The Silk Roads were especially important because they:',['connected regions through trade and cultural exchange','prevented ideas from spreading','linked only two European cities','ended maritime trade'],0,'The Silk Roads moved goods, technologies, religions, and ideas across Eurasia.','Trade routes move more than products.'),
    Q('ca7_5','Social Studies','Medieval & Early Modern World','CA G7','What helped the West African empires of Ghana and Mali become wealthy?',['Control of important trade routes, including gold and salt trade','Large coal factories','Atlantic steamships','Roman aqueducts'],0,'Ghana and Mali benefited from controlling trans-Saharan trade, especially gold and salt.','Think trade geography.'),
    Q('ca7_6','Social Studies','Medieval & Early Modern World','CA G7','Why is Mansa Musa remembered in world history?',['His pilgrimage displayed Mali’s wealth and connected it more closely with the wider Islamic world.','He founded the Roman Empire.','He led the Protestant Reformation.','He conquered the Aztec Empire.'],0,'Mansa Musa’s pilgrimage highlighted Mali’s wealth and strengthened cultural and religious connections.','Think Mali and pilgrimage.'),
    Q('ca7_7','Social Studies','Medieval & Early Modern World','CA G7','In medieval Europe, feudalism was primarily a system based on:',['land, loyalty, and obligations between social groups','factory wages and labor unions','direct democracy','global stock markets'],0,'Feudal relationships often involved landholding, protection, service, and loyalty.','Think land and obligations.'),
    Q('ca7_8','Social Studies','Medieval & Early Modern World','CA G7','Why is the Magna Carta historically significant?',['It helped establish the idea that rulers are subject to law.','It created the Byzantine Empire.','It abolished all taxes in Europe.','It started the Renaissance in Italy.'],0,'The Magna Carta limited royal power and contributed to later ideas about rule of law and representative institutions.','Think limits on government power.'),
    Q('ca7_9','Social Studies','Medieval & Early Modern World','CA G7','Which development helped Renaissance ideas spread more rapidly across Europe?',['the printing press','the decline of all cities','the end of trade','the disappearance of universities'],0,'Printing made books and ideas cheaper and easier to reproduce and distribute.','Think communication technology.'),
    Q('ca7_10','Social Studies','Medieval & Early Modern World','CA G7','Humanism during the Renaissance emphasized:',['the study of human potential and classical texts','the rejection of all art','the end of scientific inquiry','only military training'],0,'Renaissance humanism emphasized classical learning, human experience, and individual potential.','Think classical learning and people.'),
    Q('ca7_11','Social Studies','Medieval & Early Modern World','CA G7','One major result of the Protestant Reformation was:',['greater religious division in Western Christianity','the reunification of all Christian churches','the end of printing','the fall of the Roman Republic'],0,'The Reformation challenged the authority of the Catholic Church and led to new Protestant traditions.','Think religious change in Europe.'),
    Q('ca7_12','Social Studies','Medieval & Early Modern World','CA G7','Which practice best reflects the Scientific Revolution?',['testing ideas through observation and experiment','accepting every traditional explanation without question','avoiding measurement','using only myths as evidence'],0,'Scientific Revolution thinkers increasingly emphasized observation, measurement, experimentation, and mathematical reasoning.','Think evidence and testing.'),
    Q('ca7_13','Social Studies','Medieval & Early Modern World','CA G7','Which idea is most closely associated with Enlightenment thinkers?',['Government should be justified by reason and protect individual rights.','Kings should have unlimited power because of tradition alone.','Scientific evidence should be ignored.','Trade should be eliminated.'],0,'Enlightenment thinkers debated natural rights, reason, limited government, and social contracts.','Think reason, rights, government.'),
    Q('ca7_14','Social Studies','Medieval & Early Modern World','CA G7','A major motivation for European ocean exploration in the 1400s and 1500s was to:',['find new trade routes and gain wealth and influence','avoid all contact with Asia','end navigation technology','stop using spices'],0,'European states sought direct trade routes, wealth, and political or religious influence.','Think trade, wealth, power.'),
    Q('ca7_15','Social Studies','Medieval & Early Modern World','CA G7','Which achievement is associated with the Maya?',['advanced calendars and astronomical observations','the Magna Carta','Roman roads','the movable-type printing press in Europe'],0,'Maya civilization developed sophisticated calendars, mathematics, astronomy, architecture, and writing.','Think Mesoamerican science and math.'),
    Q('ca7_16','Social Studies','Medieval & Early Modern World','CA G7','The Inca adapted to the Andes Mountains partly by using:',['terrace farming and extensive road systems','large river barges on the Nile','desert camel caravans only','European factories'],0,'Terracing made mountain slopes farmable, and roads connected the Inca Empire across difficult terrain.','Think mountain adaptation.'),
    Q('ca7_17','Social Studies','Medieval & Early Modern World','CA G7','Which statement best describes a consequence of the Columbian Exchange?',['Plants, animals, diseases, and people moved between the Eastern and Western Hemispheres.','The Americas became completely isolated.','European trade with the Americas ended immediately.','No ecological changes occurred.'],0,'The Columbian Exchange reshaped diets, populations, economies, and environments across continents.','Think biological and cultural exchange.'),
    Q('ca7_18','Social Studies','Medieval & Early Modern World','CA G7','Why did the Black Death produce major social and economic change in Europe?',['A huge population loss disrupted labor systems and changed bargaining power.','It caused Europe’s population to double.','It immediately ended all wars.','It created the Byzantine Empire.'],0,'Massive mortality created labor shortages and contributed to changes in wages, social relations, and institutions.','Think labor supply after population loss.'),
    Q('ca7_19','Social Studies','Medieval & Early Modern World','CA G7','Which is the best example of cultural diffusion?',['A mathematical idea developed in one region is adopted and expanded in another.','A mountain blocks all travel.','A community uses no outside ideas for centuries.','A law applies only inside one classroom.'],0,'Cultural diffusion is the spread of ideas, technologies, beliefs, or customs between societies.','Think ideas moving across cultures.'),
    Q('ca7_20','Social Studies','Medieval & Early Modern World','CA G7','A historian studying the Crusades compares Christian, Muslim, and Byzantine accounts. What is the main benefit?',['It reveals different perspectives and helps evaluate bias and evidence.','It guarantees all sources will agree.','It makes chronology unnecessary.','It removes the need for context.'],0,'Comparing perspectives helps historians understand how different groups interpreted the same events and strengthens source evaluation.','Multiple perspectives improve historical reasoning.')
  ];

  const transfer = [
    Q('t1','Transfer Prep','Verbal Reasoning','TRANSFER','Choose the word most nearly opposite in meaning to “scarce.”',['rare','plentiful','fragile','hidden'],1,'“Scarce” means in short supply; “plentiful” is its opposite.','Translate the word into a simple meaning first.'),
    Q('t2','Transfer Prep','Verbal Reasoning','TRANSFER','BOOK is to READ as SONG is to:',['listen','paper','shelf','chapter'],0,'A book is something you read; a song is something you listen to.','Identify the action normally associated with each noun.'),
    Q('t3','Transfer Prep','Verbal Reasoning','TRANSFER','The scientist was ___ about the surprising result, so she repeated the experiment before making a claim.',['reckless','skeptical','careless','silent'],1,'Skeptical fits because she wanted more evidence before accepting the result.','Use the consequence in the second half as a clue.'),
    Q('t4','Transfer Prep','Verbal Reasoning','TRANSFER','Which pair has the same relationship as PUPPY : DOG?',['sapling : tree','book : library','wheel : car','river : ocean'],0,'A puppy is a young dog; a sapling is a young tree.','Look for young form → mature form.'),
    Q('t5','Transfer Prep','Verbal Reasoning','TRANSFER','All zoras are blue. No blue objects are transparent. Which statement must be true?',['No zoras are transparent.','All transparent objects are zoras.','Some zoras are transparent.','All blue objects are zoras.'],0,'If every zora is blue and nothing blue is transparent, then no zora can be transparent.','Chain the two facts together.'),
    Q('t6','Transfer Prep','Verbal Reasoning','TRANSFER','Which word does NOT belong with the others?',['triangle','square','circle','rectangle'],2,'Triangle, square, and rectangle are polygons made of straight sides; a circle is not.','Find the shared category.'),
    Q('t7','Transfer Prep','Quantitative Reasoning','TRANSFER','Quantity A: 35% of 80. Quantity B: 28. Which is greater?',['Quantity A','Quantity B','They are equal','Cannot be determined'],2,'35% of 80 = 0.35×80 = 28, so the quantities are equal.','Convert the percent to a decimal or fraction.'),
    Q('t8','Transfer Prep','Quantitative Reasoning','TRANSFER','A pattern begins 3, 8, 13, 18. What is the 8th term?',['33','38','40','43'],1,'The pattern adds 5. Terms 5–8 are 23, 28, 33, 38.','Find the constant difference.'),
    Q('t9','Transfer Prep','Quantitative Reasoning','TRANSFER','If 4 notebooks cost $10 at the same rate, how much do 10 notebooks cost?',['$20','$22.50','$25','$40'],2,'Each notebook costs $2.50, so 10 cost $25.','Find the unit rate first.'),
    Q('t10','Transfer Prep','Quantitative Reasoning','TRANSFER','A number is increased by 20% and becomes 72. What was the original number?',['54','60','62','86.4'],1,'If original is x, then 1.2x=72, so x=60.','Work backward by dividing by 1.2.'),
    Q('t11','Transfer Prep','Quantitative Reasoning','TRANSFER','Which fraction is greatest?',['5/8','7/12','3/5','11/20'],0,'5/8=.625, 3/5=.6, 7/12≈.583, 11/20=.55.','Compare using decimals or common denominators.'),
    Q('t12','Transfer Prep','Quantitative Reasoning','TRANSFER','A square has perimeter 36 cm. What is its area?',['36 cm²','72 cm²','81 cm²','1296 cm²'],2,'Each side is 36÷4=9 cm; area=9²=81 cm².','Perimeter first, then area.'),
    Q('t13','Transfer Prep','Math Achievement','TRANSFER','Solve: 5x − 7 = 28',['x=5','x=7','x=9','x=21'],1,'Add 7 to get 5x=35, then divide by 5: x=7.','Use inverse operations.'),
    Q('t14','Transfer Prep','Math Achievement','TRANSFER','What is 3/4 ÷ 2/5?',['3/10','5/6','15/8','8/15'],2,'Divide by multiplying by the reciprocal: 3/4×5/2=15/8.','Keep-change-flip, then simplify.'),
    Q('t15','Transfer Prep','Math Achievement','TRANSFER','The angle supplementary to 67° measures:',['23°','67°','113°','293°'],2,'Supplementary angles total 180°, so 180−67=113°.','Supplementary means sum to 180°.'),
    Q('t16','Transfer Prep','Math Achievement','TRANSFER','A jacket costs $64 after a 20% discount. What was its original price?',['$76.80','$80','$84','$96'],1,'After a 20% discount, price is 80% of original: .8x=64, so x=80.','The sale price is 80% of the original.'),
    Q('t17','Transfer Prep','Reading Strategy','TRANSFER','When two answer choices both seem reasonable on a reading test, what should you do first?',['Choose the longer one','Pick the one best supported by the passage','Choose the more interesting one','Guess immediately'],1,'Reading-comprehension answers should be anchored in textual evidence, not plausibility alone.','Ask: which choice can I prove from the text?'),
    Q('t18','Transfer Prep','Reading Strategy','TRANSFER','An author gives statistics immediately after making a claim. The statistics most likely serve to:',['change the subject','provide evidence for the claim','introduce a character','create rhyme'],1,'Statistics placed after a claim usually function as supporting evidence.','Connect structure to purpose.'),
    Q('t19','Transfer Prep','Writing Sample','TRANSFER','Which thesis is strongest for an essay about whether schools should require community service?',['Community service exists in many places.','Schools should require limited community service because it builds civic responsibility and gives students real-world experience.','I have many thoughts about volunteering.','Service is interesting.'],1,'The strongest thesis takes a clear position and previews reasons.','Look for claim + reasons.'),
    Q('t20','Transfer Prep','Writing Sample','TRANSFER','Which sentence best improves a paragraph that gives evidence but no analysis?',['This evidence matters because it shows how the policy changed student behavior.','Here is another random fact.','The paragraph is now finished.','Evidence is evidence.'],0,'Strong analytical writing explains why evidence supports the claim.','Add the “so what?” after evidence.'),
    Q('t21','Transfer Prep','Verbal Reasoning','TRANSFER','BENEvolent most nearly means:',['kind','noisy','temporary','careless'],0,'Benevolent means kind or well-meaning.','Think of “benefit” and “bene-” as a helpful clue.'),
    Q('t22','Transfer Prep','Verbal Reasoning','TRANSFER','MIGRATE is to MOVE as OBSERVE is to:',['notice','forget','hide','argue'],0,'Migrate is a type of moving; observe is a type of noticing.','Find the closest action relationship.'),
    Q('t23','Transfer Prep','Quantitative Reasoning','TRANSFER','The mean of five numbers is 18. What is their total?',['23','36','72','90'],3,'Mean = total ÷ 5, so total=18×5=90.','Reverse the mean formula.'),
    Q('t24','Transfer Prep','Math Achievement','TRANSFER','Which expression is equivalent to 4(2x−3)+5?',['8x−7','8x−12','6x+2','8x+17'],0,'Distribute: 8x−12+5=8x−7.','Distribute, then combine constants.')
  ];

  const reasoning = [
    Q('r1','Reasoning','Patterns','BOSS','What is the next number? 2, 6, 12, 20, 30, ___',[
      '36','40','42','44'
    ],2,'The differences are +4, +6, +8, +10, so the next difference is +12. 30 + 12 = 42.','Look at the differences between consecutive terms.'),
    Q('r2','Reasoning','Logic','BOSS','All falcons are birds. Some birds migrate. Which statement must be true?',[
      'All falcons migrate.','Some falcons migrate.','Falcons are birds.','No falcons migrate.'
    ],2,'The first statement directly guarantees that falcons are birds. Nothing tells us whether falcons migrate.','Only choose what is logically guaranteed.'),
    Q('r3','Reasoning','Multi-Step Reasoning','BOSS','A team wins 60% of its first 10 games. It then wins its next 5 games. What fraction of all 15 games has it won?',[
      '3/5','2/3','11/15','4/5'
    ],2,'60% of 10 is 6 wins. Add 5 more wins: 11 wins out of 15, or 11/15.','Convert the percent to a number of wins first.'),
    Q('r4','Reasoning','Data Reasoning','BOSS','Four quiz scores are 82, 88, 90, and 100. What score on a fifth quiz would make the mean 90?',[
      '80','85','90','95'
    ],2,'A mean of 90 over 5 quizzes needs 450 total points. Current total is 360, so the fifth score must be 90.','Target total = mean × number of values.'),
    Q('r5','Reasoning','Patterns','BOSS','Which number does not belong? 9, 16, 25, 36, 45, 49',[
      '16','25','45','49'
    ],2,'All except 45 are perfect squares: 3², 4², 5², 6², 7².','Look for a shared number property.'),
    Q('r6','Reasoning','Logic','BOSS','If no red blocks are heavy, and block A is red, what must be true?',[
      'A is heavy.','A is not heavy.','A is blue.','A is the lightest block.'
    ],1,'The rule says red blocks are not heavy, and A is red, so A is not heavy.','Apply the rule directly.'),
    Q('r7','Reasoning','Multi-Step Reasoning','BOSS','A store reduces a $80 item by 25%, then adds 10% sales tax to the discounted price. What is the final price?',[
      '$60','$64','$66','$68'
    ],2,'25% off $80 gives $60. Ten percent tax on $60 is $6. Final price = $66.','Do the discount first, then calculate tax on the new price.'),
    Q('r8','Reasoning','Data Reasoning','BOSS','A runner’s mile times are 8:10, 7:55, 7:48, and 7:42. Which statement is best supported?',[
      'The runner is getting slower.','The runner is improving over these four runs.','The runner will definitely run under 7:00 next time.','The runner’s speed is unchanged.'
    ],1,'The times decrease each run, which indicates improvement. The data do not guarantee a future time.','Describe what the data show, not what they guarantee.'),
    Q('r9','Reasoning','Patterns','BOSS','Find the next term: 1, 4, 9, 16, 25, ___',[
      '30','32','35','36'
    ],3,'These are square numbers: 1², 2², 3², 4², 5², so next is 6² = 36.','Write each term as a power if possible.'),
    Q('r10','Reasoning','Logic','BOSS','Three students—A, B, and C—finish a race. A finishes before B. C finishes after B. Who finishes second?',[
      'A','B','C','Cannot be determined'
    ],1,'The order must be A, then B, then C, so B is second.','Translate the statements into an order.'),
    Q('r11','Reasoning','Multi-Step Reasoning','BOSS','A tank is 3/5 full. After 24 liters are added, it is 9/10 full. What is the tank’s capacity?',[
      '60 L','72 L','80 L','96 L'
    ],2,'The increase is 9/10 − 3/5 = 9/10 − 6/10 = 3/10. If 3/10 of the tank is 24 L, the full capacity is 24 ÷ 0.3 = 80 L.','Find what fraction of the tank the 24 liters represents.'),
    Q('r12','Reasoning','Data Reasoning','BOSS','The median of five numbers is 18. Which list could be the five numbers?',[
      '8, 10, 12, 18, 30','9, 12, 18, 22, 40','18, 20, 21, 22, 23','5, 8, 9, 10, 18'
    ],1,'For five ordered numbers, the median is the third number. Only the second list has 18 as the third value.','Median of five values = the middle (third) value.'),
    Q('r13','Reasoning','Patterns','BOSS','A pattern uses the rule “multiply by 2, then add 1.” Starting at 3, what is the third new term?',[
      '7','15','31','63'
    ],2,'Start at 3: 3×2+1=7, then 15, then 31. The third new term is 31.','Apply the rule one step at a time.'),
    Q('r14','Reasoning','Logic','BOSS','If every student in Club X plays a sport, and Lina is in Club X, what can you conclude?',[
      'Lina plays a sport.','Lina plays basketball.','Every athlete is in Club X.','Lina is the club president.'
    ],0,'Membership in Club X guarantees only that Lina plays some sport.','Do not add information that was never stated.'),
    Q('r15','Reasoning','Multi-Step Reasoning','BOSS','A class has 30 students. 40% are in band. Of the band students, 25% play percussion. How many students play percussion?',[
      '3','6','8','12'
    ],0,'40% of 30 = 12 band students. 25% of 12 = 3 percussion students.','Work from the whole group to the subgroup.'),
    Q('r16','Reasoning','Data Reasoning','BOSS','A scatter plot shows points trending upward from left to right. This most likely indicates:',[
      'a positive association','a negative association','no variables','a guaranteed cause-and-effect relationship'
    ],0,'An upward trend indicates positive association, but association alone does not prove causation.','Direction of the trend matters.'),
    Q('r17','Reasoning','Logic','BOSS','Exactly one of these statements is true: (1) The key is in Box A. (2) The key is not in Box A. What can you conclude?',[
      'The key is in A.','The key is not in A.','Exactly one statement must be true no matter where the key is.','Both statements are false.'
    ],2,'The statements are direct opposites, so one must be true and the other false. The location itself cannot be determined from that fact alone.','Notice the two statements are negations.'),
    Q('r18','Reasoning','Patterns','BOSS','What comes next? A, C, F, J, O, ___',[
      'S','T','U','V'
    ],2,'Letter positions increase by +2, +3, +4, +5, so next is +6: O → U.','Convert letters to positions or track the skip size.'),
    Q('r19','Reasoning','Multi-Step Reasoning','BOSS','A rectangle’s length increases by 20% while its width decreases by 20%. Compared with the original area, the new area is:',[
      'the same','4% smaller','4% larger','40% smaller'
    ],1,'Area factor = 1.20 × 0.80 = 0.96, so the new area is 96% of the original—4% smaller.','Percent changes on different dimensions multiply.'),
    Q('r20','Reasoning','Data Reasoning','BOSS','A survey of 50 students finds 18 prefer soccer, 12 basketball, 10 volleyball, and 10 other sports. What percent prefer basketball?',[
      '12%','20%','24%','38%'
    ],2,'12 out of 50 = 0.24 = 24%.','Part ÷ whole × 100%.'),
  ];

  const readingSets = [
    {
      id:'p1', title:'The Quiet Minute',
      passage:`At the end of every practice, Coach Rivera asked the team to sit quietly for sixty seconds. At first, the players treated the routine like a joke. Some stared at the clock. Others tried not to laugh. But after a few weeks, Audrey noticed something surprising. During the quiet minute, she could replay one mistake from practice without feeling embarrassed by it. She began asking herself two questions: What happened? What will I try next time?\n\nThe routine did not make the team instantly better. It did something less dramatic but more useful: it made reflection normal. Players started giving one another specific feedback instead of saying only “good job” or “you messed up.” By midseason, the team still made mistakes, but they recovered from them faster.`,
      qs:[
        ['Main Idea','What is the central idea of the passage?',['The team disliked practice.','A brief reflection routine helped players learn from mistakes.','Coach Rivera wanted practices to be shorter.','Audrey stopped making mistakes.'],1,'The passage focuses on how the quiet minute normalized reflection and improved learning from mistakes.','Look for the idea developed across both paragraphs.'],
        ['Inference','What can be inferred about Audrey by midseason?',['She had become comfortable examining mistakes.','She refused feedback from teammates.','She no longer cared about sports.','She had never made another mistake.'],0,'Her questions and improved recovery show she became more comfortable using mistakes as information.','Use her changed behavior, not an extreme claim.'],
        ['Evidence','Which detail best supports the idea that the routine changed team culture?',['Some players stared at the clock.','The routine lasted sixty seconds.','Players began giving one another specific feedback.','The team practiced every week.'],2,'Specific peer feedback shows the group’s behavior changed beyond the quiet minute itself.','Choose the detail that shows a group-wide change.'],
        ['Author’s Purpose','Why does the author say the routine did something “less dramatic but more useful”?',['To criticize the coach','To emphasize that steady reflection mattered more than instant improvement','To show the routine was boring','To prove the team won every game'],1,'The phrase contrasts flashy instant results with the deeper value of a repeatable learning habit.','What contrast is the author making?']
      ]
    },
    {
      id:'p2', title:'The Bridge Sensor',
      passage:`A city engineering team placed sensors on an old pedestrian bridge. The sensors measured tiny changes in vibration as people crossed. Most days, the data followed a familiar pattern. One Monday, however, the sensors recorded a slightly stronger vibration near the center span. The change was small enough that no pedestrian would have noticed it.\n\nInstead of closing the bridge immediately, engineers compared the new data with weather records, maintenance logs, and measurements from previous months. They discovered that unusually high temperatures had caused metal components to expand. The bridge was safe, but the team scheduled an inspection to confirm that the expansion joints were working correctly. The sensors had not “predicted a disaster.” They had helped engineers notice a change early enough to investigate it carefully.`,
      qs:[
        ['Main Idea','What is the main idea?',['Sensors can replace engineers.','Small data changes can help experts investigate problems before they become serious.','Hot weather always damages bridges.','Pedestrians should avoid old bridges.'],1,'The passage shows sensors detecting a subtle change that prompted careful investigation.','Focus on why the sensors were useful.'],
        ['Evidence','Which detail best shows that the engineers did not jump to conclusions?',['The bridge was old.','They compared sensor data with weather records and maintenance logs.','Pedestrians did not notice the vibration.','The sensors were near the center span.'],1,'Comparing multiple sources shows careful analysis rather than an immediate assumption of danger.','Look for a step that checks alternative explanations.'],
        ['Inference','Why did the engineers still schedule an inspection after deciding the bridge was safe?',['They wanted to verify that the expansion joints worked correctly.','They did not understand temperature.','They wanted to remove the sensors.','The bridge had already collapsed.'],0,'The passage states the inspection would confirm the joints were functioning as expected.','Use the stated purpose of the inspection.'],
        ['Vocabulary in Context','In the passage, “familiar pattern” most nearly means:', ['a pattern they recognized from normal conditions','a secret code','a dangerous warning','a random mistake'],0,'The sensors usually followed a known normal pattern, making the change easier to notice.','Think “recognized from experience.”']
      ]
    },
    {
      id:'p3', title:'Why Mangroves Matter',
      passage:`Mangrove forests grow along tropical coastlines where salt water and fresh water meet. Their tangled roots create a nursery for young fish, crabs, and other animals. The same roots also slow waves and trap sediment, which can reduce erosion along the shore.\n\nFor many years, some communities removed mangroves to make space for roads, buildings, or shrimp farms. More recently, scientists and local residents have worked together to restore them. Restoration is not as simple as planting trees anywhere along the coast. Teams must study water flow, soil conditions, and the species that originally lived in the area. A successful project rebuilds an ecosystem, not just a line of trees.`,
      qs:[
        ['Main Idea','Which statement best expresses the main idea?',['Mangroves are useful coastal ecosystems, and restoring them requires understanding local conditions.','All tropical coasts should become shrimp farms.','Mangrove roots are harmful to fish.','Planting any tree near water will restore an ecosystem.'],0,'Both paragraphs emphasize mangrove benefits and the complexity of restoration.','Choose an idea that covers both paragraphs.'],
        ['Inference','Why might simply planting mangrove seedlings fail?',['Mangroves cannot grow near coasts.','Restoration must match water flow, soil, and local species.','Young fish eat all seedlings.','Mangroves only grow in cities.'],1,'The passage explains that successful restoration depends on environmental conditions, not just planting.','Use the final three sentences.'],
        ['Evidence','Which detail best supports the claim that mangroves protect shorelines?',['They grow in the tropics.','Their roots slow waves and trap sediment.','They provide space for roads.','They contain fresh water only.'],1,'Slowing waves and trapping sediment directly reduce erosion.','Look for a physical mechanism.'],
        ['Author’s Purpose','Why does the author include examples of roads, buildings, and shrimp farms?',['To show reasons mangroves were removed','To recommend building more roads','To explain how fish reproduce','To compare tropical weather patterns'],0,'The examples explain human pressures that led to mangrove loss.','Ask what question those examples answer.']
      ]
    },
    {
      id:'p4', title:'The Library Map',
      passage:`When the school library was renovated, the librarian invited students to help redesign the signs. The old system labeled sections with numbers and abbreviations. It was efficient for adults who already understood the layout, but new students often wandered between shelves.\n\nThe student team watched how visitors moved through the room. They noticed that people paused most often at two intersections. Instead of adding more signs everywhere, they created two large color-coded maps at those decision points. They also replaced abbreviations with plain-language labels such as “Science & Technology” and “Stories & Literature.” After the changes, new students reached requested sections faster, even though the library contained fewer signs than before.`,
      qs:[
        ['Main Idea','What problem-solving lesson does the passage illustrate?',['More information is always better.','Observe users and place clear information where decisions happen.','Libraries should remove all labels.','Adults should design everything alone.'],1,'The team observed behavior and improved the system by placing clearer guidance at key points.','Think design based on actual user behavior.'],
        ['Evidence','What evidence suggests the redesign worked?',['The library was renovated.','Students liked colors.','New students reached sections faster.','There were books about science.'],2,'Faster navigation is a direct outcome showing improved usability.','Choose the measurable result.'],
        ['Inference','Why were the old abbreviations a problem for new students?',['They required prior knowledge of the system.','They were too colorful.','They made books heavier.','They changed every day.'],0,'The passage says the system worked for adults who already understood it, implying newcomers lacked that background knowledge.','Compare experienced and new users.'],
        ['Vocabulary in Context','In this passage, “efficient” most nearly means:', ['working with little wasted effort','decorative','confusing','expensive'],0,'The old system was quick for people who understood it, so “efficient” means working effectively with little wasted effort.','Think speed and effort.'],
      ]
    },
    {
      id:'p5', title:'The Extra Ten Percent',
      passage:`A student council planned a food drive and set a goal of collecting 1,000 items. After the first week, the group had 640 items. Several students suggested lowering the goal because the remaining amount seemed large. Priya disagreed. She divided the remaining 360 items by the six school days left and showed that the group needed an average of 60 items per day.\n\nThe calculation changed the conversation. A vague problem—“We are still far away”—became a daily target the group could act on. The students created classroom challenges and posted progress each afternoon. They eventually collected 1,108 items. Priya later said the most useful part was not exceeding the goal; it was turning a large task into smaller measurable steps.`,
      qs:[
        ['Main Idea','What is the passage mainly about?',['Food drives are easy.','Breaking a large goal into measurable steps can make it more manageable.','Student councils should lower difficult goals.','Priya wanted to collect exactly 1,000 items.'],1,'The passage emphasizes converting a vague challenge into daily targets.','Focus on Priya’s lesson in the last sentence.'],
        ['Evidence','Which detail best shows the plan became actionable?',['The original goal was 1,000 items.','The group needed about 60 items per day.','Priya disagreed with students.','The drive lasted more than a week.'],1,'A concrete daily target tells the group what to do each day.','Look for a number that guides action.'],
        ['Inference','Why did the calculation change the conversation?',['It made the remaining challenge feel specific instead of vague.','It guaranteed every classroom would donate.','It reduced the number of school days.','It changed the original goal to 640.'],0,'The passage directly contrasts the vague feeling of being far away with a specific daily target.','Contrast “far away” with “60 items per day.”'],
        ['Author’s Purpose','Why does the author include the final total of 1,108 items?',['To show the strategy was followed by a successful outcome','To prove all goals should be exceeded by 108','To explain how food is priced','To show the original goal was unnecessary'],0,'The final number provides evidence that the group’s plan worked well.','What does the result demonstrate?']
      ]
    },
    {
      id:'p6', title:'The Practice Debate',
      passage:`Two musicians in the same school orchestra had very different practice habits. Elena practiced for ninety minutes every Saturday. Marcus practiced for fifteen minutes on most weekdays. Over a month, their total practice time was similar, but Marcus improved more consistently on difficult passages.\n\nTheir teacher explained that the difference might not be the total time alone. Frequent practice gave Marcus more chances to notice mistakes, sleep, return, and test whether the corrections stayed. Elena’s long session was still useful, especially before a rehearsal, but one weekly session gave her fewer cycles of practice and review. The teacher’s point was not that fifteen minutes is always ideal; it was that learning often benefits from being revisited over time.`,
      qs:[
        ['Main Idea','What is the central idea?',['Long practice sessions are useless.','Learning can benefit from shorter practice spread across multiple days.','Musicians should never practice on weekends.','Marcus practiced more total hours.'],1,'The passage emphasizes the benefit of revisiting learning across time.','The last sentence states the main lesson.'],
        ['Inference','What likely helped Marcus retain corrections?',['He practiced only easy music.','He had repeated cycles of practice, rest, and return.','He never made mistakes.','He practiced for ninety minutes daily.'],1,'The teacher explains that frequent practice created more opportunities to correct, rest, and test retention.','Use the teacher’s explanation.'],
        ['Evidence','Which detail weakens the idea that Marcus improved simply because he practiced more total time?',['Their total monthly practice time was similar.','Marcus practiced on weekdays.','Elena played orchestra music.','The teacher spoke to both students.'],0,'Similar total time makes practice distribution a more plausible explanation for the difference.','Find the detail that controls for total time.'],
        ['Author’s Purpose','Why does the author say “fifteen minutes is not always ideal”?',['To avoid turning one example into a universal rule','To argue that practice is unnecessary','To show Marcus was wrong','To recommend exactly ninety minutes'],0,'The author clarifies that the broader principle is spacing and revisiting, not one magic duration.','Distinguish principle from exact number.'],
      ]
    },
    {
      id:'p7', title:'A Small Change in the Stream',
      passage:`Students testing a local stream found that the water’s pH had changed from 7.2 to 6.8 since the previous month. The difference looked small, and one student suggested ignoring it. Their science teacher disagreed. Because the pH scale is logarithmic, a change that appears small numerically can represent a much larger change in acidity.\n\nThe class did not assume pollution was the cause. They checked recent rainfall, repeated the measurement with a second meter, and sampled another location upstream. The second meter gave a similar reading, while the upstream site remained near its earlier pH. The results did not yet prove what caused the change, but they gave the class a stronger reason to investigate the downstream area.`,
      qs:[
        ['Main Idea','What is the main lesson of the passage?',['Small-looking measurements can matter, and unusual results should be checked with additional evidence.','Every pH change proves pollution.','Students should ignore repeated measurements.','Rainfall always lowers pH.'],0,'The class treats the change seriously while verifying it carefully and avoiding an unsupported conclusion.','Combine the lesson from both paragraphs.'],
        ['Evidence','Which step best increased confidence that the original pH reading was real?',['The teacher disagreed.','The class used a second meter and got a similar reading.','The stream was local.','One student wanted to ignore the result.'],1,'Independent measurement with another meter helps verify the result.','Look for replication.'],
        ['Inference','Why did the upstream sample matter?',['It gave a comparison location that had not changed in the same way.','It guaranteed pollution downstream.','It changed the pH scale.','It made the meter unnecessary.'],0,'The upstream site serves as a useful comparison, narrowing where the change may be occurring.','Think control/comparison.'],
        ['Author’s Purpose','Why mention that the pH scale is logarithmic?',['To explain why a small numerical change may be scientifically meaningful','To teach students how to draw maps','To prove the stream is safe','To show 6.8 is larger than 7.2'],0,'The detail explains why the numerical difference should not be dismissed as trivial.','Why did the teacher care about 0.4?']
      ]
    },
    {
      id:'p8', title:'The Two Maps',
      passage:`A class studying migration looked at two maps of the same region. One map showed national borders. The other showed mountains, rivers, and deserts. At first, several students focused only on the political map because migration data were reported by country. But when they compared both maps, a pattern became clearer: many routes followed river valleys and avoided high mountain ranges.\n\nThe teacher asked the class why both maps were necessary. Political boundaries helped students describe where people started and ended their journeys. Physical geography helped explain why certain routes were easier or harder. Neither map told the whole story alone. Together, they helped students move from describing a pattern to explaining it.`,
      qs:[
        ['Main Idea','What is the passage mainly showing?',['Different types of maps can answer different questions about the same event.','Political maps are always more useful.','Mountains prevent all migration.','Countries should change their borders.'],0,'The passage explains how political and physical maps contribute different information.','Look at the teacher’s comparison in paragraph two.'],
        ['Inference','Why did routes often follow river valleys?',['They may offer easier terrain and access than high mountains.','Rivers always mark national borders.','People cannot see mountains on maps.','Valleys are always inside one country.'],0,'The passage contrasts river valleys with difficult mountain terrain.','Use physical geography.'],
        ['Evidence','Which sentence best supports the idea that one source was not enough?',['Migration data were reported by country.','Neither map told the whole story alone.','Several students focused on one map.','The class studied a region.'],1,'That sentence directly states that each map provided incomplete information by itself.','Choose the most direct support.'],
        ['Author’s Purpose','What distinction does the author make between describing and explaining?',['Describing identifies a pattern; explaining gives reasons for it.','Describing is always wrong.','Explaining uses no evidence.','There is no difference.'],0,'The political map helps describe where movement occurred, while physical geography helps explain why routes formed.','Think “what happened” vs “why.”']
      ]
    }
  ];

  function mulberry32(seed){return function(){let t=seed+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296}}
  const ri=(rng,min,max)=>Math.floor(rng()*(max-min+1))+min;
  const pick=(rng,arr)=>arr[Math.floor(rng()*arr.length)];
  const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
  const frac=(n,d)=>{const g=gcd(n,d);return `${n/g}/${d/g}`};
  const shuffle=(rng,arr)=>arr.map(v=>[rng(),v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);

  function mcFromCorrect(rng, correct, wrongs){
    const vals = shuffle(rng,[correct,...wrongs.filter(x=>String(x)!==String(correct)).slice(0,3)]);
    return {choices:vals.map(String), answer:vals.findIndex(x=>String(x)===String(correct))};
  }

  function mathQuestion(skill,rng,level='CORE'){
    let id='m'+Date.now()+Math.floor(rng()*1e6), prompt, correct, wrongs, explanation, hint;
    switch(skill){
      case 'Fractions & Decimals':{
        const d1=pick(rng,[4,5,6,8,10,12]); const d2=pick(rng,[4,5,6,8,10,12]);
        const n1=ri(rng,1,d1-1), n2=ri(rng,1,d2-1); const l=d1*d2/gcd(d1,d2);
        const num=n1*(l/d1)+n2*(l/d2); correct=frac(num,l);
        prompt=`Compute: ${n1}/${d1} + ${n2}/${d2}`;
        wrongs=[`${n1+n2}/${d1+d2}`,frac(Math.abs(n1*(l/d1)-n2*(l/d2)),l),frac(num+1,l)];
        explanation=`Use a common denominator of ${l}. The numerator becomes ${n1*(l/d1)} + ${n2*(l/d2)} = ${num}, then simplify to ${correct}.`;
        hint='Find a common denominator before adding numerators.';break;
      }
      case 'Percent':{
        const base=pick(rng,[40,50,60,80,120,150,200,240]); const pct=pick(rng,[10,15,20,25,30,40]);
        const inc=rng()<.5; correct=inc?base*(1+pct/100):base*(1-pct/100);
        prompt=`A price of $${base} is ${inc?'increased':'decreased'} by ${pct}%. What is the new price?`;
        wrongs=[base*(pct/100),base+(inc?1:-1)*pct,base*(1+(inc?-1:1)*pct/100)];
        explanation=`${pct}% of ${base} is ${base*pct/100}. ${inc?'Add':'Subtract'} that amount: ${correct}.`;
        hint=`Find ${pct}% of ${base} first.`;break;
      }
      case 'Ratios & Proportions':{
        const a=ri(rng,2,8), b=ri(rng,2,8), k=ri(rng,2,7); correct=b*k;
        prompt=`A mix uses a ratio of ${a}:${b}. If the first quantity is ${a*k}, what is the second quantity?`;
        wrongs=[a*k+b,b+k,a*b*k];
        explanation=`${a} was multiplied by ${k} to get ${a*k}, so multiply ${b} by the same scale factor: ${b}×${k}=${correct}.`;
        hint='Ratios stay equivalent when both parts use the same scale factor.';break;
      }
      case 'Integers':{
        const a=ri(rng,-15,15), b=ri(rng,-15,15); correct=a-b;
        prompt=`Evaluate: ${a} − (${b})`;
        wrongs=[a+b,b-a,Math.abs(a-b)];
        explanation=`Subtracting ${b} gives ${a-b}. Remember that subtracting a negative is the same as adding.`;
        hint='Rewrite subtraction of a negative as addition when needed.';break;
      }
      case 'Expressions':{
        const x=ri(rng,2,8), a=ri(rng,2,6), b=ri(rng,1,10), c=ri(rng,1,5); correct=a*(x+b)-c;
        prompt=`Evaluate ${a}(x + ${b}) − ${c} when x = ${x}.`;
        wrongs=[a*x+b-c,a*(x+b+c),a*x+b+c];
        explanation=`Substitute x=${x}: ${a}(${x}+${b})−${c}=${a}×${x+b}−${c}=${correct}.`;
        hint='Substitute first, then follow order of operations.';break;
      }
      case 'Equations':{
        const x=ri(rng,-8,12), a=ri(rng,2,7), b=ri(rng,-10,10), c=a*x+b; correct=x;
        prompt=`Solve for x: ${a}x ${b>=0?'+':'−'} ${Math.abs(b)} = ${c}`;
        wrongs=[x+1,x-1,Math.round((c+b)/a)];
        explanation=`Undo ${b>=0?'adding':'subtracting'} ${Math.abs(b)}, then divide by ${a}. The solution is x=${x}.`;
        hint='Use inverse operations to isolate x.';break;
      }
      case 'Inequalities':{
        const a=ri(rng,2,6), b=ri(rng,-6,8), x=ri(rng,1,8), c=a*x+b; correct=`x > ${x}`;
        prompt=`Solve: ${a}x ${b>=0?'+':'−'} ${Math.abs(b)} > ${c}`;
        wrongs=[`x < ${x}`,`x ≥ ${x}`,`x > ${c}`];
        explanation=`Subtract ${b} from both sides and divide by positive ${a}; the inequality direction stays the same, giving x>${x}.`;
        hint='Because you divide by a positive number, the inequality sign does not flip.';break;
      }
      case 'Geometry':{
        const w=ri(rng,4,14), h=ri(rng,3,12); correct=w*h;
        prompt=`A rectangle is ${w} cm by ${h} cm. What is its area?`;
        wrongs=[2*(w+h),w+h,w*h*2];
        explanation=`Area of a rectangle = length × width = ${w}×${h}=${correct} cm².`;
        hint='Area measures the space inside, not the distance around.';break;
      }
      case 'Statistics':{
        const vals=[ri(rng,6,18),ri(rng,6,18),ri(rng,6,18),ri(rng,6,18)]; const sum=vals.reduce((a,b)=>a+b,0); const target=sum%4===0?sum/4:null;
        if(target!==null){correct=target;prompt=`Find the mean of ${vals.join(', ')}.`;wrongs=[Math.max(...vals),Math.min(...vals),sum];explanation=`Add the values to get ${sum}, then divide by 4: ${sum}÷4=${target}.`;hint='Mean = sum ÷ number of values.'}
        else return mathQuestion('Probability',rng,level);
        break;
      }
      case 'Probability':{
        const red=ri(rng,2,8), blue=ri(rng,2,8), total=red+blue; correct=frac(red,total);
        prompt=`A bag has ${red} red marbles and ${blue} blue marbles. What is the probability of drawing a red marble?`;
        wrongs=[frac(blue,total),frac(red,blue),`${red}/${total+1}`];
        explanation=`Probability = favorable outcomes ÷ total outcomes = ${red}/${total} = ${correct}.`;
        hint='Count red marbles, then count all marbles.';break;
      }
      case 'Word Problems':{
        const rate=ri(rng,4,12), hours=ri(rng,2,6), extra=ri(rng,5,20); correct=rate*hours+extra;
        prompt=`Audrey earns $${rate} per hour for ${hours} hours of helping at an event, plus a $${extra} bonus. How much does she earn total?`;
        wrongs=[rate*(hours+extra),rate+hours+extra,rate*hours];
        explanation=`Hourly pay is ${rate}×${hours}=$${rate*hours}. Add the $${extra} bonus for $${correct}.`;
        hint='Separate hourly earnings from the bonus.';break;
      }
      case 'Quantitative Reasoning':{
        const type=ri(rng,0,3);
        if(type===0){
          const a=ri(rng,2,9), b=ri(rng,2,9), c=ri(rng,2,9); correct=a*c>b*c?'Quantity A':'Quantity B';
          if(a===b) correct='Equal';
          prompt=`Compare the quantities. Quantity A: ${a} × ${c}. Quantity B: ${b} × ${c}.`;
          wrongs=['Quantity A','Quantity B','Equal'].filter(x=>x!==correct);
          explanation=`Both quantities are multiplied by the same positive number ${c}, so compare ${a} and ${b}. The correct relationship is ${correct}.`;
          hint='When the same positive factor multiplies both quantities, compare the original numbers.';
        }else if(type===1){
          const start=ri(rng,1,5), step=ri(rng,2,6); correct=start+step*4;
          prompt=`Find the next term: ${[0,1,2,3].map(i=>start+step*i).join(', ')}, __`;
          wrongs=[correct-step+1,correct+step,correct*2];
          explanation=`The pattern adds ${step} each time, so the next term is ${correct}.`;
          hint='Look at the difference between consecutive terms.';
        }else if(type===2){
          const total=pick(rng,[20,40,50,80,100]), pct=pick(rng,[10,20,25,40,50]); correct=total*pct/100;
          prompt=`Without a calculator, determine ${pct}% of ${total}.`;
          wrongs=[total+pct,total-pct,pct/100];
          explanation=`${pct}% = ${pct}/100. Multiply by ${total}: ${correct}.`;
          hint='Rewrite the percent as a fraction or decimal.';
        }else{
          const vals=[4,6,8,10]; const add=ri(rng,2,8); correct='The mean increases by '+add;
          prompt=`Every value in the data set 4, 6, 8, 10 is increased by ${add}. What happens to the mean?`;
          wrongs=['The mean stays the same','The mean doubles','The mean decreases by '+add];
          explanation=`Adding the same number to every data value increases the mean by that same number, ${add}.`;
          hint='Imagine computing the old mean and the new mean.';
        }
        break;
      }
      case 'Functions':{
        const m=ri(rng,2,6), b=ri(rng,-5,8), x=ri(rng,-3,7); correct=m*x+b;
        prompt=`For f(x) = ${m}x ${b>=0?'+':'−'} ${Math.abs(b)}, find f(${x}).`;
        wrongs=[m+b+x,m*x-b,m+x+b];
        explanation=`Substitute x=${x}: f(${x})=${m}(${x})${b>=0?'+':'−'}${Math.abs(b)}=${correct}.`;
        hint='Replace x with the given input.';break;
      }
      case 'Systems of Equations':{
        const x=ri(rng,1,8), y=ri(rng,1,8), s=x+y, d=x-y; correct=`(${x}, ${y})`;
        prompt=`Solve the system: x + y = ${s} and x − y = ${d}`;
        wrongs=[`(${y}, ${x})`,`(${s}, ${d})`,`(${x+1}, ${y-1})`];
        explanation=`Add the equations: 2x=${s+d}, so x=${x}. Then y=${s}−${x}=${y}.`;
        hint='Add the equations to eliminate y.';break;
      }
      case 'Exponents & Polynomials':{
        const a=ri(rng,2,6), b=ri(rng,2,5); correct=a+b;
        prompt=`Simplify: ${a}x² + ${b}x²`;
        wrongs=[`${a*b}x²`,`${a+b}x⁴`,`${a*b}x⁴`]; correct=`${a+b}x²`;
        explanation=`These are like terms because both have x². Add coefficients: ${a}+${b}=${a+b}, giving ${correct}.`;
        hint='Like terms have the same variable part.';break;
      }
      case 'Quadratics':{
        const r1=ri(rng,1,6), r2=ri(rng,1,6); const sum=r1+r2, prod=r1*r2; correct=`x = ${r1} or x = ${r2}`;
        prompt=`Solve: x² − ${sum}x + ${prod} = 0`;
        wrongs=[`x = ${sum} or x = ${prod}`,`x = -${r1} or x = -${r2}`,`x = ${r1+r2}`];
        explanation=`Factor: (x−${r1})(x−${r2})=0, so x=${r1} or x=${r2}.`;
        hint=`Find two numbers that add to ${sum} and multiply to ${prod}.`;break;
      }
      default:return mathQuestion('Equations',rng,level);
    }
    const mc=mcFromCorrect(rng,correct,wrongs);
    return Q(id,'Math',skill,level,prompt,mc.choices,mc.answer,explanation,hint);
  }

  function flattenReading(){
    const out=[];
    readingSets.forEach(set=>set.qs.forEach((x,i)=>{
      const [skill,prompt,choices,answer,explanation,hint]=x;
      out.push(Q(`${set.id}q${i+1}`,'Reading',skill,'CORE',prompt,choices,answer,explanation,hint,{passage:set.passage,passageTitle:set.title,readingSet:set.id}));
    }));
    return out;
  }

  const reading = flattenReading();

  window.A22_BANK={SKILLS,english,science,social,transfer,reasoning,reading,readingSets,mathQuestion,mulberry32,pick,shuffle};
})();
