import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'



const linkNote = defineNoteConfig({
  dir: 'work',
  link: '/work/',
  sidebar: 'auto',
})
const psNote = defineNoteConfig({
  dir: 'ps',
  link: '/ps/',
  sidebar: 'auto',
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [linkNote, psNote],
})
