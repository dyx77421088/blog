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
const lockStep = defineNoteConfig({
  dir: 'lockStep',
  link: '/lockStep/',
  // 这里是需要顺序显示
  sidebar: ['create.md', 'udp-start.md', 'udp-chat.md', 'unity-udp.md', 'create-commit.md', 'proto.md', 'proto2.md'],
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [linkNote, psNote, lockStep],
})
