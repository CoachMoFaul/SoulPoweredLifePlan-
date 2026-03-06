// Life planning coaching prompts organized by category and phase

export const CATEGORIES = [
  { id: 'health',          label: 'Health & Wellness',  color: '#10b981', emoji: '💚', bg: '#d1fae5' },
  { id: 'career',          label: 'Career & Purpose',   color: '#3b82f6', emoji: '💼', bg: '#dbeafe' },
  { id: 'relationships',   label: 'Relationships',      color: '#f59e0b', emoji: '❤️',  bg: '#fef3c7' },
  { id: 'finances',        label: 'Finances',           color: '#8b5cf6', emoji: '💰', bg: '#ede9fe' },
  { id: 'spiritual',       label: 'Spiritual Growth',   color: '#ec4899', emoji: '✨', bg: '#fce7f3' },
  { id: 'personal',        label: 'Personal Growth',    color: '#f97316', emoji: '🌱', bg: '#ffedd5' },
]

export const INTAKE_QUESTIONS = [
  {
    id: 'motivation',
    question: "What brought you here today? What do you most want to change or create in your life?",
    placeholder: "Share whatever feels true for you right now…",
    type: 'textarea',
  },
  {
    id: 'strengths',
    question: "What are 3 strengths or qualities you're most proud of?",
    placeholder: "e.g., I'm resilient, creative, and deeply caring…",
    type: 'textarea',
  },
  {
    id: 'obstacles',
    question: "What tends to hold you back or get in your way?",
    placeholder: "Be honest — awareness is the first step to change…",
    type: 'textarea',
  },
  {
    id: 'vision',
    question: "Describe your ideal life 12 months from now. Where are you? Who's with you? How do you feel?",
    placeholder: "Dream big and write in present tense, as if it's already true…",
    type: 'textarea',
  },
  {
    id: 'commitment',
    question: "On a scale of 1–10, how committed are you to making real changes starting today?",
    placeholder: '',
    type: 'scale',
    min: 1,
    max: 10,
  },
]

export const CATEGORY_PROMPTS = {
  health: [
    "How would you rate your energy and vitality right now?",
    "What does feeling truly healthy look and feel like for you?",
    "What one habit, if you did it consistently, would most improve your health?",
    "What obstacles have prevented you from taking care of your body?",
    "What does rest and recovery look like for you right now?",
  ],
  career: [
    "Are you doing work that feels meaningful and aligned with your purpose?",
    "What would your dream professional life look like in 3 years?",
    "What skills do you most want to develop in the next 6 months?",
    "What's one thing about your career you'd change tomorrow if you could?",
    "How do you want to be remembered for your professional contributions?",
  ],
  relationships: [
    "Which relationship in your life needs the most attention and care right now?",
    "How do you show up for the people who matter most to you?",
    "What patterns in your relationships would you like to change?",
    "What kind of community or social connection do you want more of?",
    "How do you prioritize time with the people you love?",
  ],
  finances: [
    "How do you feel when you think about your financial situation?",
    "What would financial freedom look and feel like for you?",
    "What one financial habit would make the biggest difference in your life?",
    "Are your spending habits aligned with your values and goals?",
    "What financial goal would give you the most peace of mind to achieve?",
  ],
  spiritual: [
    "How connected do you feel to something larger than yourself?",
    "What practices or rituals bring you a sense of peace and purpose?",
    "When do you feel most alive, aligned, and in flow?",
    "How do you nurture your inner life on a daily basis?",
    "What does living with intention and meaning look like for you?",
  ],
  personal: [
    "What personal qualities do you most want to cultivate this year?",
    "What have you always wanted to learn or explore but haven't yet?",
    "How do you practice self-compassion when you fall short?",
    "What limiting beliefs are you ready to release?",
    "How do you celebrate your wins, big and small?",
  ],
}

export const SMART_GOAL_PROMPTS = [
  { id: 'specific',    label: 'Specific',    question: "What exactly do you want to achieve? Be as clear and detailed as possible.",           placeholder: "I want to…" },
  { id: 'measurable',  label: 'Measurable',  question: "How will you measure your progress and know when you've succeeded?",                    placeholder: "I'll know I've succeeded when…" },
  { id: 'achievable',  label: 'Achievable',  question: "What steps will you take? What resources or support do you need?",                      placeholder: "To achieve this I will…" },
  { id: 'relevant',    label: 'Relevant',    question: "Why does this goal matter to you? How does it connect to your bigger vision?",           placeholder: "This matters because…" },
  { id: 'timebound',   label: 'Time-Bound',  question: "By when will you achieve this? What's your target completion date?",                    placeholder: "I will complete this by…" },
]

export const DAILY_INTENTION_PROMPTS = [
  "What is the ONE thing I must accomplish today?",
  "How do I want to feel at the end of today?",
  "What will I do today to move closer to my big vision?",
  "What might get in my way, and how will I handle it?",
  "Who can I show up for today?",
]

export const REFLECTION_PROMPTS = [
  "What went well today that I want to celebrate?",
  "What challenged me, and what did I learn from it?",
  "Did I live in alignment with my values today?",
  "What would I do differently tomorrow?",
  "What am I most grateful for right now?",
]
