import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'



const linkNote = defineNoteConfig({
  dir: 'work',
  link: '/work/',
  sidebar: 'auto',
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [linkNote],
})
