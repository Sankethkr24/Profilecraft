import { createSlice } from '@reduxjs/toolkit';

const initialSampleProfiles = [
  {
    id: 'prof-001',
    type: 'matrimony',
    name: 'Ananya Sharma',
    headline: 'Software Engineer at ABC Tech',
    phone: '+91 98765 43210',
    email: 'ananya@example.com',
    location: 'Bengaluru, Karnataka',
    photoUri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'I am a simple, kind and optimistic person who believes in balance and continuous growth. Looking for a life partner who values family, mutual respect and happy conversations.',
    age: '26 Years',
    height: "5'4\"",
    caste: 'Hindu Brahmin',
    education: ['B.E. Computer Science - RVCE'],
    experience: ['Software Engineer at ABC Technologies'],
    skills: ['React Native', 'Java', 'Problem Solving'],
    templateId: 'trad-classic-01',
    updatedAt: 'Today',
  },
  {
    id: 'prof-002',
    type: 'professional',
    name: 'Sanketh Kumar',
    headline: 'Senior Full Stack & Mobile Architect',
    phone: '+91 98765 00000',
    email: 'sanketh@example.com',
    location: 'Bengaluru, India',
    photoUri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Passionate software architect with 5+ years of experience building high-scale cross-platform applications.',
    education: ['B.Tech Computer Science - NIT Karnataka'],
    experience: ['Senior Developer at Tech Corp (2022 - Present)', 'Frontend Lead at Startup (2020 - 2022)'],
    skills: ['React Native', 'JavaScript', 'Node.js', 'Redux', 'REST APIs'],
    company: 'Tech Corp',
    experienceYears: '5+ Years',
    templateId: 'elegant-modern-02',
    updatedAt: 'Yesterday',
  },
  {
    id: 'prof-003',
    type: 'student',
    name: 'Priya Patel',
    headline: 'B.E. Computer Science • 2026 Batch',
    phone: '+91 98765 11111',
    email: 'priya.patel@college.edu',
    location: 'Pune, Maharashtra',
    photoUri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    bio: 'Curious undergraduate student passionate about machine learning, open-source development, and cloud computing.',
    degree: 'B.E. Computer Science',
    college: 'Pune Institute of Tech',
    cgpa: '9.2 CGPA',
    education: ['B.E. Computer Science - PIT (2022 - 2026)'],
    experience: ['Google Developer Student Club Lead', 'Summer Intern at CloudNine'],
    skills: ['Python', 'Data Structures', 'TensorFlow', 'React'],
    templateId: 'min-clean-04',
    updatedAt: '2 days ago',
  },
  {
    id: 'prof-004',
    type: 'freelancer',
    name: 'Arjun Mehta',
    headline: 'Full-Stack UI/UX & Mobile Developer',
    phone: '+91 98765 22222',
    email: 'arjun@designcraft.studio',
    location: 'Mumbai, India',
    photoUri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'Independent product designer and React Native engineer helping fast-growing startups build zero-to-one mobile experiences.',
    hourlyRate: '$50/hr',
    availability: 'Part-Time Contract',
    experienceYears: '4+ Years Freelance',
    services: ['Mobile App Design', 'React Native Dev', 'Design Systems'],
    skills: ['Figma', 'React Native', 'Node.js', 'GraphQL'],
    templateId: 'mod-exec-03',
    updatedAt: '3 days ago',
  },
];

const profileSlice = createSlice({
  name: 'profiles',
  initialState: {
    list: initialSampleProfiles,
    activeProfile: null,
    loading: false,
    error: null,
  },
  reducers: {
    setProfiles: (state, action) => {
      state.list = action.payload;
    },
    saveProfile: (state, action) => {
      const existingIndex = state.list.findIndex((p) => p.id === action.payload.id);
      if (existingIndex >= 0) {
        state.list[existingIndex] = { ...action.payload, updatedAt: 'Just now' };
      } else {
        state.list.unshift({ ...action.payload, updatedAt: 'Just now' });
      }
    },
    deleteProfile: (state, action) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
    duplicateProfile: (state, action) => {
      const target = state.list.find((p) => p.id === action.payload);
      if (target) {
        const copy = {
          ...target,
          id: `prof-${Date.now()}`,
          name: `${target.name} (Copy)`,
          updatedAt: 'Just now',
        };
        state.list.unshift(copy);
      }
    },
    setActiveProfile: (state, action) => {
      state.activeProfile = action.payload;
    },
  },
});

export const {
  setProfiles,
  saveProfile,
  deleteProfile,
  duplicateProfile,
  setActiveProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
