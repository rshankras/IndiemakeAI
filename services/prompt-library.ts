// This file contains the comprehensive prompt library for IndieMark AI.
// It is structured to be used by the generation service to create customized
// marketing campaigns based on user input.

export const promptLibrary = {
  "version": "1.0",
  "lastUpdated": "2025-11-03",
  "description": "Comprehensive prompt library for IndieMark AI - Marketing content generation for indie app developers",

  "imagePrompts": {
    "aspirational": {
      "heroGroupVacation": {
        "template": "Create a stunning, aspirational vacation scene: Group of {{numPeople}} diverse friends at {{location}} during golden hour sunset. One person holding {{deviceType}} showing {{appName}} app with '{{specificDetail}}' visible on screen. Everyone relaxed, laughing, drinks in hand, celebrating. Golden hour lighting, warm tones, peaceful. Mood: '{{moodPhrase}}'. Style: {{visualStyle}}. Aspect ratio: {{aspectRatio}}.",
        "variables": {
          "numPeople": "4-5",
          "location": "beach/rooftop/mountain viewpoint",
          "deviceType": "iPhone/iPad",
          "appName": "user's app name",
          "specificDetail": "key metric or feature visible",
          "moodPhrase": "This is how [activity] should feel",
          "visualStyle": "Travel influencer content",
          "aspectRatio": "4:5 for Instagram"
        },
        "bestFor": ["launch", "aspiration", "social apps", "travel apps"],
        "audienceFit": ["social", "travel", "lifestyle"],
        "engagementRate": 6.1
      },

      "mountainSunriseMeditation": {
        "template": "Create a breathtaking landscape photograph: Person sitting on a flat rock overlooking misty mountain valley at sunrise. Person in meditation pose (lotus position), seen from behind/side angle. They're wearing {{deviceType}} clearly visible on wrist showing {{appName}} app interface with '{{specificDetail}}' readable on screen. Golden hour lighting streaming from right, creating warm glow. Peaceful mist in valley below. Majestic mountains in background. Person wearing simple, comfortable clothing (neutral colors). Natural, unposed moment of genuine practice. Atmosphere: serene, sacred, aspirational. Mood: '{{moodPhrase}}'. Style: {{visualStyle}}. Aspect ratio: {{aspectRatio}}.",
        "variables": {
          "deviceType": "Apple Watch",
          "appName": "user's app name",
          "specificDetail": "key feature detail",
          "moodPhrase": "This is [practice/activity] done right",
          "visualStyle": "National Geographic meets mindfulness content",
          "aspectRatio": "4:5 for Instagram"
        },
        "bestFor": ["launch", "inspiration", "meditation apps", "health apps"],
        "audienceFit": ["meditation", "health", "wellness", "spiritual"],
        "engagementRate": 5.2
      },

      "morningRitualPeace": {
        "template": "Peaceful home scene: Person (late 20s-early 30s) sitting cross-legged on meditation cushion in minimalist room, soft morning light streaming through window. {{deviceType}} on wrist clearly visible showing {{appName}} app mid-practice ('{{specificDetail}}' visible). Small altar with candle and incense nearby. Expression of deep peace and focus. Natural, unposed moment. Clean, simple space (white walls, wooden floor, minimal furniture). Mood: '{{moodPhrase}}'. Atmosphere: Calm, sacred, accessible. Style: {{visualStyle}}. Aspect ratio: {{aspectRatio}}.",
        "variables": {
          "deviceType": "Apple Watch/iPhone",
          "appName": "user's app name",
          "specificDetail": "progress or feature detail",
          "moodPhrase": "This could be your morning",
          "visualStyle": "Natural lifestyle photography, warm tones",
          "aspectRatio": "4:5"
        },
        "bestFor": ["daily practice", "routine", "morning content"],
        "audienceFit": ["meditation", "productivity", "wellness"],
        "engagementRate": 4.9
      },

      "collegeRoadTrip": {
        "template": "Inside car at scenic viewpoint: {{numPeople}} college-age friends (18-24) on road trip adventure. One person in front seat holding {{deviceType}} showing {{appName}} with '{{groupName}}' visible. Backpacks, snacks, maps visible. Youthful, adventurous energy. App shows clear breakdown: {{expenseBreakdown}}. Mountain road visible through windshield. Golden hour lighting. Everyone smiling, excited. Mood: '{{moodPhrase}}'. Style: {{visualStyle}}. Aspect ratio: {{aspectRatio}}.",
        "variables": {
          "numPeople": "4-5",
          "deviceType": "iPhone",
          "appName": "user's app name",
          "groupName": "Trip name or group name",
          "expenseBreakdown": "key expenses shown",
          "moodPhrase": "Living best life on budget",
          "visualStyle": "Youth adventure content, authentic travel",
          "aspectRatio": "4:5 or 9:16 for Reels"
        },
        "bestFor": ["student audience", "adventure", "youth marketing"],
        "audienceFit": ["social", "travel", "student", "budget"],
        "engagementRate": 5.9
      }
    },

    "painPoint": {
      "restaurantBillConfusion": {
        "template": "Trendy restaurant scene: Table of {{numPeople}} friends finishing dinner, bills and receipts scattered on table. One person holding {{deviceType}} showing {{appName}} app with bill clearly visible on screen, everyone looking at phone. Warm restaurant lighting, evening setting. Empty plates, wine glasses show good meal just finished. Natural expressions of relief and satisfaction. Phone screen shows clear bill split among {{numPeople}} people. Background shows other diners slightly blurred. Mood: '{{moodPhrase}}'. Style: {{visualStyle}}. Aspect ratio: {{aspectRatio}}.",
        "variables": {
          "numPeople": "6",
          "deviceType": "iPhone",
          "appName": "user's app name",
          "moodPhrase": "This app just saved us 45 minutes of awkwardness",
          "visualStyle": "Lifestyle content, authentic moment, candid",
          "aspectRatio": "1:1 square"
        },
        "bestFor": ["problem awareness", "relatable", "use case"],
        "audienceFit": ["social", "dining", "groups"],
        "engagementRate": 5.5
      },

      "morningChaosVsCalm": {
        "template": "Split screen comparison: LEFT - Person stressed in messy bedroom, alarm blaring (phone showing 6:00 AM with multiple snooze notifications), rushing, chaos, clothes everywhere, harsh artificial lighting, stressed expression grabbing phone. RIGHT - Same person calm and centered in meditation pose on yoga mat wearing {{deviceType}} showing {{appName}}, soft morning natural light, peaceful expression, organized room, serene. Dramatic contrast showing transformation. Text overlay optional: 'Old me vs. New me'. Style: {{visualStyle}}. Aspect ratio: {{aspectRatio}}.",
        "variables": {
          "deviceType": "Apple Watch",
          "appName": "user's app name",
          "visualStyle": "Relatable before/after storytelling, authentic transformation",
          "aspectRatio": "1:1 square"
        },
        "bestFor": ["transformation", "relatability", "before/after"],
        "audienceFit": ["productivity", "wellness", "meditation"],
        "engagementRate": 5.4
      },

      "spreadsheetChaos": {
        "template": "Split screen comparison: LEFT - Person stressed at laptop late at night, multiple Excel spreadsheets visible on screen, scattered receipts covering desk, multiple coffee cups, clock showing 11:47 PM, messy desk, frustrated expression, harsh lighting. RIGHT - Same person relaxed, clean organized desk, just holding {{deviceType}} showing {{appName}} app with simple '{{successMessage}}' screen, smiling, daylight streaming through window, organized. Dramatic contrast between chaos and simplicity. Style: {{visualStyle}}. Aspect ratio: {{aspectRatio}}.",
        "variables": {
          "deviceType": "iPhone/iPad",
          "appName": "user's app name",
          "successMessage": "Done! or Settled Up! or Completed!",
          "visualStyle": "Problem-solution storytelling, relatable content",
          "aspectRatio": "1:1 square"
        },
        "bestFor": ["pain point", "transformation", "productivity"],
        "audienceFit": ["productivity", "finance", "organization"],
        "engagementRate": 5.8
      },

      "thatFriendCallout": {
        "template": "Humorous but relatable scene: Group of {{numPeople}} friends at coffee shop, 3 looking slightly annoyed/amused at 4th friend who's 'forgetting wallet' again. One person holding {{deviceType}} showing {{appName}} with that friend's name highlighted owing {{amountOwed}} from multiple occasions. Casual coffee shop setting, afternoon light. Expressions are playful, not mean. Screen clearly shows running tab of unpaid expenses. Mood: '{{moodPhrase}}' Tone: Humorous, relatable, slightly calling out. Style: {{visualStyle}}. Aspect ratio: {{aspectRatio}}.",
        "variables": {
          "numPeople": "4",
          "deviceType": "iPhone",
          "appName": "user's app name",
          "amountOwed": "amount with currency symbol",
          "moodPhrase": "We all have THAT friend 😂",
          "visualStyle": "Relatable social content, candid moment",
          "aspectRatio": "1:1 square"
        },
        "bestFor": ["viral potential", "tagging", "humor", "social"],
        "audienceFit": ["social", "groups", "young adults"],
        "engagementRate": 7.1
      }
    },

    "feature": {
      "appleWatchCloseup": {
        "template": "Close-up product photography shot: {{deviceType}} on wrist during {{activity}}. Watch face displaying {{appName}} interface with '{{featureDetail}}' clearly visible and {{animationDetail}}. Person's hand in {{handPosition}}. Soft focus background showing {{backgroundSetting}}. Natural skin tones, {{lightingType}} light from side. Watch is the hero of the image, screen clearly readable, beautiful bokeh in background. Mood: '{{moodPhrase}}'. Style: {{visualStyle}}. Aspect ratio: {{aspectRatio}}.",
        "variables": {
          "deviceType": "Apple Watch",
          "activity": "meditation/workout/activity session",
          "appName": "user's app name",
          "featureDetail": "specific feature or metric",
          "animationDetail": "animation description if applicable",
          "handPosition": "meditation mudra/relaxed position/gesture",
          "backgroundSetting": "meditation space/workspace/activity setting",
          "lightingType": "morning/golden hour/soft",
          "moodPhrase": "Traditional practice meets modern tool",
          "visualStyle": "Premium product photography meets lifestyle aesthetic",
          "aspectRatio": "4:5"
        },
        "bestFor": ["feature highlight", "product focus", "detail showcase"],
        "audienceFit": ["tech-savvy", "Apple ecosystem users"],
        "engagementRate": 4.7
      },

      "noSignupPrivacy": {
        "template": "Split vertical comparison: LEFT - Phone showing typical app signup flow (email, password, permissions), person looking skeptical. RIGHT - {{appName}} opening immediately to main screen, 'No signup required' text visible, person relieved. Clean design. Text overlay: 'Your {{dataType}} is YOUR business'. Style: {{visualStyle}}. Aspect ratio: {{aspectRatio}}.",
        "variables": {
          "appName": "user's app name",
          "dataType": "expenses/meditation/data type",
          "visualStyle": "Tech comparison, clean UI focus",
          "aspectRatio": "1:1 or 4:5"
        },
        "bestFor": ["privacy feature", "USP", "differentiation"],
        "audienceFit": ["privacy-conscious", "tech users"],
        "engagementRate": 4.5
      },

      "healthKitIntegration": {
        "template": "Split screen or layered composition: LEFT/TOP - {{deviceType}} showing {{appName}} with activity completion. RIGHT/BOTTOM - iPhone Health app showing {{metricType}} being logged automatically. Connection line or animation between the two. Clean, technical but approachable. Person in background using app naturally. Mood: '{{moodPhrase}}'. Style: {{visualStyle}}. Aspect ratio: {{aspectRatio}}.",
        "variables": {
          "deviceType": "Apple Watch/iPhone",
          "appName": "user's app name",
          "metricType": "Meditation Minutes/Mindful Minutes/Activity",
          "moodPhrase": "It all counts, automatically",
          "visualStyle": "Tech feature showcase, Apple ecosystem aesthetic",
          "aspectRatio": "1:1 or 4:5"
        },
        "bestFor": ["integration showcase", "Apple ecosystem", "automation"],
        "audienceFit": ["health-conscious", "quantified self", "Apple users"],
        "engagementRate": 4.3
      }
    },

    "achievement": {
      "streakCelebration": {
        "template": "Joyful celebration shot: Person smiling genuinely, looking at {{deviceType}} showing '{{streakNumber}} Day Streak! 🎉' achievement screen on {{appName}} app. Natural setting (could be home, outdoors, or {{activityLocation}}). Genuine expression of accomplishment and pride. {{deviceType}} screen clearly shows streak achievement with confetti animation. Person wearing casual, comfortable clothing. Soft natural lighting. Background slightly blurred, focus on person and device. Mood: '{{moodPhrase}}'. Style: {{visualStyle}}. Aspect ratio: {{aspectRatio}}.",
        "variables": {
          "deviceType": "Apple Watch/iPhone",
          "streakNumber": "number (e.g., 7, 30, 108)",
          "appName": "user's app name",
          "activityLocation": "yoga studio/workplace/relevant location",
          "moodPhrase": "I actually did it - X days of daily practice",
          "visualStyle": "User achievement content, authentic celebration",
          "aspectRatio": "4:5 or 9:16 for Reels"
        },
        "bestFor": ["milestones", "motivation", "user stories"],
        "audienceFit": ["all", "especially habit-building apps"],
        "engagementRate": 6.5
      }
    }
  },

  "captionTemplates": {
    "painPointHook": {
      "template": "{{relatableMoment}}\n\n{{awkwardPart}}\n• {{detail1}}\n• {{detail2}}\n• {{detail3}}\n\n{{timeWasted}} later, still figuring it out.\n\nThere's a better way.\n\n{{appName}}. {{whatItDoes}}. {{timeSaved}}.\n\nDownload free: [link in bio]\n\n{{hashtags}}",
      "variables": {
        "relatableMoment": "Opening line (e.g., 'The bill arrives', '6 AM alarm goes off')",
        "awkwardPart": "The problematic part (e.g., 'The awkward part:', 'Then comes:')",
        "detail1": "First problem point",
        "detail2": "Second problem point",
        "detail3": "Third problem point",
        "timeWasted": "Time spent on problem (e.g., '45 minutes', '3 hours')",
        "appName": "user's app name",
        "whatItDoes": "Brief solution",
        "timeSaved": "Time saved with solution",
        "hashtags": "relevant hashtag set"
      },
      "bestFor": ["problem awareness", "relatable content", "first touch"],
      "engagementRate": 4.2
    },

    "transformationStory": {
      "template": "BEFORE {{appName}}:\n{{beforeSituation}}\n⏰ Time: {{beforeTime}}\n😤 Stress: {{beforeStress}}\n🤝 {{metricType}}: {{beforeMetric}}\n\nAFTER {{appName}}:\n{{afterSituation}}\n⏰ Time: {{afterTime}}\n😊 Stress: {{afterStress}}\n🤝 {{metricType}}: {{afterMetric}}\n\nTime saved per {{frequency}}: {{timeSaved}}\n\nTry it free: [link]\n\n{{hashtags}}",
      "variables": {
        "appName": "user's app name",
        "beforeSituation": "Painful situation description",
        "beforeTime": "Time spent before (e.g., '3 hours')",
        "beforeStress": "Stress level (e.g., 'Maximum', 'High')",
        "metricType": "Relevant metric (e.g., 'Friendships', 'Progress', 'Peace of mind')",
        "beforeMetric": "Metric before (e.g., 'Tested', 'None', 'Low')",
        "afterSituation": "Easy solution description",
        "afterTime": "Time spent after (e.g., '10 minutes')",
        "afterStress": "Stress after (e.g., 'Zero', 'Minimal')",
        "afterMetric": "Metric after (e.g., 'Stronger', 'Visible', 'High')",
        "frequency": "Per what (e.g., 'trip', 'day', 'week')",
        "timeSaved": "Total time saved",
        "hashtags": "relevant hashtag set"
      },
      "bestFor": ["transformation", "before/after", "results"],
      "engagementRate": 5.1
    },

    "specificNumbers": {
      "template": "{{scenarioName}} for {{numPeople}} {{peopleType}}: {{totalAmount}}\n\nPer person: {{perPersonAmount}}\n\nBut:\n• {{complication1}}\n• {{complication2}}\n• {{complication3}}\n\nWITH {{appName}}:\n{{solution}}. {{timeframe}}. Done.\n\nFree download: [link]\n\n{{hashtags}}",
      "variables": {
        "scenarioName": "Trip/event name (e.g., 'Goa trip', 'Bachelor party')",
        "numPeople": "Number of people",
        "peopleType": "Type (e.g., 'friends', 'roommates', 'colleagues')",
        "totalAmount": "Total amount with currency",
        "perPersonAmount": "Per person amount",
        "complication1": "Who paid for what",
        "complication2": "Another payment complication",
        "complication3": "Third complication",
        "appName": "user's app name",
        "solution": "How app solves it",
        "timeframe": "How long it took (e.g., '5 minutes', '30 seconds')",
        "hashtags": "relevant hashtag set"
      },
      "bestFor": ["concrete examples", "use cases", "specificity"],
      "engagementRate": 4.8
    },

    "thatFriendCallout": {
      "template": "We all have that {{personType}} who {{behavior}} 😂\n\n\"{{excuse1}}\"\n\"{{excuse2}}\"\n\n[{{timeElapsed}} later...]\n\n{{appName}} tracks it all:\n{{personName}} owes {{amountOwed}}\n\nScreenshots don't lie 📸\n\nTag that {{personType}} 👇\n\nDownload: [link]\n\n{{hashtags}}",
      "variables": {
        "personType": "friend/roommate/colleague",
        "behavior": "forgot wallet again/never pays back",
        "excuse1": "Common excuse 1",
        "excuse2": "Common excuse 2",
        "timeElapsed": "Time passed (e.g., '3 weeks', '2 months')",
        "appName": "user's app name",
        "personName": "Example name or 'that friend'",
        "amountOwed": "Amount with currency",
        "hashtags": "relevant hashtag set"
      },
      "bestFor": ["viral potential", "tagging", "humor", "engagement"],
      "engagementRate": 6.2
    },

    "founderStory": {
      "template": "Real talk:\n\nI built {{appName}} because {{genuineReason}}\n\n{{specificProblem}}\n\nSo I built this.\n\nNow {{userCount}}+ people are using it.\n\nAnd hopefully, {{positiveImpact}}.\n\nThat's why I do this.\n\nDownload: [link in bio]\n\n{{hashtags}}",
      "variables": {
        "appName": "user's app name",
        "genuineReason": "Real founder motivation",
        "specificProblem": "Problem that motivated building",
        "userCount": "Number of users",
        "positiveImpact": "Impact on users' lives",
        "hashtags": "relevant hashtag set"
      },
      "bestFor": ["authenticity", "personal story", "connection"],
      "engagementRate": 3.8
    },

    "morningRitualHook": {
      "template": "{{timeOfDay}}.\n\nThe alarm goes off.\n\nOld me: {{oldBehavior1}}. {{oldBehavior2}}. {{oldBehavior3}}. {{oldResult}}.\n\nNew me:\n• {{newBehavior1}}\n• {{newBehavior2}}\n• {{newBehavior3}}\n• {{newDuration}} of {{activity}}\n\nThen I start my day.\n\n{{outcome}}.\n\nDownload {{appName}}: [link in bio]\n{{requirement}}\n\n{{hashtags}}",
      "variables": {
        "timeOfDay": "Time (e.g., '5:47 AM', '6:00 AM')",
        "oldBehavior1": "Bad habit 1",
        "oldBehavior2": "Bad habit 2",
        "oldBehavior3": "Bad habit 3",
        "oldResult": "Negative outcome",
        "newBehavior1": "New habit step 1",
        "newBehavior2": "New habit step 2",
        "newBehavior3": "New habit step 3",
        "newDuration": "Time spent (e.g., '10 minutes')",
        "activity": "Activity name (e.g., 'peace', 'meditation')",
        "outcome": "Positive result",
        "appName": "user's app name",
        "requirement": "Device/requirement if any",
        "hashtags": "relevant hashtag set"
      },
      "bestFor": ["routine", "habit building", "morning content"],
      "engagementRate": 4.5
    },

    "tradition108": {
      "template": "{{number}} {{item}}.\n\nSacred number in:\n• {{tradition1}}: {{tradition1Detail}}\n• {{tradition2}}: {{tradition2Detail}}\n• {{tradition3}}: {{tradition3Detail}}\n\nFor centuries, practitioners used {{oldMethod}}.\n\nNow? {{modernMethod}}.\n\nAncient practice. Modern tool.\n\n{{appName}}. Built for {{platform}}.\n\nDownload: [link in bio]\n\n{{hashtags}}",
      "variables": {
        "number": "Sacred number (e.g., '108')",
        "item": "Item type (e.g., 'beads', 'repetitions')",
        "tradition1": "Tradition 1 name",
        "tradition1Detail": "Detail about tradition 1",
        "tradition2": "Tradition 2 name",
        "tradition2Detail": "Detail about tradition 2",
        "tradition3": "Tradition 3 name",
        "tradition3Detail": "Detail about tradition 3",
        "oldMethod": "Traditional method",
        "modernMethod": "Your app's method",
        "appName": "user's app name",
        "platform": "Platform (e.g., 'Apple Watch')",
        "hashtags": "relevant hashtag set"
      },
      "bestFor": ["education", "tradition", "cultural connection"],
      "engagementRate": 4.6
    }
  },

  "hashtagSets": {
    "travelFocus": "#{{AppName}} #GroupTravel #TravelWithFriends #VacationPlanning #BudgetTravel #TravelIndia #BackpackIndia #TravelHacks #GoaTrip #FriendshipGoals",
    "roommateFocus": "#{{AppName}} #RoommateLife #BillSplit #CollegeLife #AdultingLife #MoneyManagement #SharedApartment #CityLife #RoommateGoals",
    "diningSocial": "#{{AppName}} #DinnerWithFriends #BillSplit #RestaurantLife #FoodieLife #BrunchSquad #FriendshipGoals #SquadGoals",
    "techApp": "#{{AppName}} #iOSApp #TechForGood #AppStore #MobileApp #ProductivityApp #FinanceApp #TechTools",
    "eventsWedding": "#{{AppName}} #BacheloretteParty #BachelorParty #WeddingSeason #EventPlanning #GroupEvents #PartyPlanning",
    "meditationDaily": "#{{AppName}} #Meditation #DailyMeditation #MeditationPractice #Mindfulness #OmChanting #108Beads #MalaMeditation #SpiritualPractice #InnerPeace",
    "appleWatchTech": "#{{AppName}} #AppleWatch #AppleWatchApp #WatchOS #HealthKit #AppleHealth #TechForGood #MindfulTech #WearableTech",
    "morningRoutine": "#{{AppName}} #MorningRitual #MorningMeditation #MorningRoutine #5AMClub #MorningMotivation #DailyRituals #HealthyHabits #MindfulMorning",
    "spiritualTraditional": "#{{AppName}} #108Beads #SacredPractice #HinduPractice #BuddhistMeditation #YogaPractice #SpiritualJourney #AncientWisdom #ModernMindfulness",
    "progressCommunity": "#{{AppName}} #MeditationStreak #MeditationJourney #MindfulLiving #InnerGrowth #DailyPractice #ConsistencyIsKey #MeditationCommunity",
    "productivityTools": "#{{AppName}} #Productivity #ProductivityHacks #WorkSmart #TimeManagement #DigitalTools #LifeHacks #Efficiency",
    "healthWellness": "#{{AppName}} #Health #Wellness #SelfCare #MentalHealth #HealthyLifestyle #WellnessJourney #Mindfulness"
  },

  "categoryMappings": {
    "meditation": {
      "primaryAudience": ["spiritual seekers", "wellness enthusiasts", "Apple Watch users"],
      "bestImagePrompts": ["mountainSunriseMeditation", "morningRitualPeace", "appleWatchCloseup", "streakCelebration"],
      "bestCaptions": ["morningRitualHook", "transformationStory", "tradition108", "founderStory"],
      "hashtagSets": ["meditationDaily", "appleWatchTech", "morningRoutine", "spiritualTraditional", "progressCommunity"],
      "visualStyle": "National Geographic meets mindfulness content",
      "mood": "Peace, serenity, sacred practice",
      "peopleCount": 1,
      "deviceType": "Apple Watch"
    },
    "expense": {
      "primaryAudience": ["travelers", "roommates", "social groups", "students"],
      "bestImagePrompts": ["heroGroupVacation", "restaurantBillConfusion", "spreadsheetChaos", "thatFriendCallout", "collegeRoadTrip"],
      "bestCaptions": ["painPointHook", "specificNumbers", "thatFriendCallout", "transformationStory"],
      "hashtagSets": ["travelFocus", "roommateFocus", "diningSocial", "techApp"],
      "visualStyle": "Travel influencer content",
      "mood": "Fun, relatable, relief",
      "peopleCount": "4-6",
      "deviceType": "iPhone"
    },
    "productivity": {
      "primaryAudience": ["professionals", "students", "entrepreneurs"],
      "bestImagePrompts": ["spreadsheetChaos", "morningRitualPeace", "noSignupPrivacy"],
      "bestCaptions": ["painPointHook", "transformationStory", "founderStory"],
      "hashtagSets": ["productivityTools", "techApp", "morningRoutine"],
      "visualStyle": "Clean professional aesthetic",
      "mood": "Efficiency, clarity, relief",
      "peopleCount": 1,
      "deviceType": "iPhone/iPad/Mac"
    },
    "health": {
      "primaryAudience": ["fitness enthusiasts", "Apple Watch users", "health-conscious"],
      "bestImagePrompts": ["appleWatchCloseup", "healthKitIntegration", "streakCelebration", "morningRitualPeace"],
      "bestCaptions": ["transformationStory", "morningRitualHook", "founderStory"],
      "hashtagSets": ["healthWellness", "appleWatchTech", "progressCommunity"],
      "visualStyle": "Fitness lifestyle content",
      "mood": "Achievement, progress, vitality",
      "peopleCount": 1,
      "deviceType": "Apple Watch"
    },
    "social": {
      "primaryAudience": ["young adults", "friend groups", "event organizers"],
      "bestImagePrompts": ["heroGroupVacation", "thatFriendCallout", "restaurantBillConfusion", "collegeRoadTrip"],
      "bestCaptions": ["thatFriendCallout", "painPointHook", "specificNumbers"],
      "hashtagSets": ["diningSocial", "eventsWedding", "travelFocus"],
      "visualStyle": "Social media influencer style",
      "mood": "Fun, FOMO, celebration",
      "peopleCount": "4-6",
      "deviceType": "iPhone"
    }
  },

  "campaignStructures": {
    "30DayLaunch": {
      "week1": {
        "theme": "Problem Awareness",
        "goal": "200 downloads, 10 reviews",
        "postTypes": ["painPoint", "painPoint", "relatable", "solution tease"],
        "frequency": "4x this week"
      },
      "week2": {
        "theme": "Launch & Education",
        "goal": "500 total downloads, 25 reviews",
        "postTypes": ["launch", "tutorial", "userStory", "feature"],
        "frequency": "5x this week"
      },
      "week3": {
        "theme": "Use Cases & Growth",
        "goal": "1,500 total downloads, 40 reviews",
        "postTypes": ["useCase", "useCase", "testimonial", "milestone"],
        "frequency": "4x this week"
      },
      "week4": {
        "theme": "Momentum & Community",
        "goal": "3,000 total downloads, 50+ reviews",
        "postTypes": ["userSpotlight", "feature", "transformation", "founderStory", "thankYou"],
        "frequency": "5x this week"
      }
    },

    "weeklyContentMix": {
      "monday": {"type": "painPoint", "goal": "Relatable struggles"},
      "tuesday": {"type": "useCase", "goal": "Specific scenarios"},
      "wednesday": {"type": "feature", "goal": "How it works"},
      "thursday": {"type": "socialProof", "goal": "Testimonials"},
      "friday": {"type": "aspirational", "goal": "Dream life"},
      "saturday": {"type": "community", "goal": "Milestones"},
      "sunday": {"type": "rest", "goal": "Optional content"}
    }
  },

  "promptCustomizationRules": {
    "deviceTypeSelection": {
      "meditation": "Apple Watch",
      "health": "Apple Watch",
      "fitness": "Apple Watch",
      "expense": "iPhone",
      "social": "iPhone",
      "productivity": "iPhone/iPad/Mac",
      "default": "iPhone"
    },

    "peopleCountSelection": {
      "meditation": 1,
      "health": 1,
      "productivity": 1,
      "expense": "4-6",
      "social": "4-6",
      "travel": "4-5",
      "default": 1
    },

    "visualStyleMapping": {
      "meditation": "National Geographic meets mindfulness content",
      "health": "Fitness lifestyle content",
      "productivity": "Clean professional aesthetic, modern workspace",
      "expense": "Travel influencer content",
      "social": "Social media influencer style, candid moments",
      "travel": "Travel influencer content, Instagram-worthy",
      "default": "Natural lifestyle photography"
    },

    "moodPhraseFormulas": {
      "aspirational": "This is how {{activity}} should feel",
      "problem": "We've all been here",
      "solution": "There's a better way",
      "transformation": "From {{before}} to {{after}}",
      "achievement": "I actually did it",
      "tradition": "Ancient practice. Modern tool."
    }
  }
};
