import { usePageMeta } from '../hooks/usePageMeta'
import { defaultMeta } from '../lib/seo'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Ecosystem } from '../sections/Ecosystem'
import { EngineeringMeetsAI } from '../sections/EngineeringMeetsAI'
import { Experience } from '../sections/Experience'
import { Hero } from '../sections/Hero'
import { Initiative } from '../sections/Initiative'
import { Resume } from '../sections/Resume'
import { Skills } from '../sections/Skills'
import { WebsiteProjects } from '../sections/WebsiteProjects'
import { WhatIBuild } from '../sections/WhatIBuild'

export default function Home() {
  usePageMeta(defaultMeta)
  return (
    <>
      <Hero />
      <About />
      <Ecosystem />
      <Experience />
      <Skills />
      <WhatIBuild />
      <EngineeringMeetsAI />
      <WebsiteProjects />
      <Initiative />
      <Resume />
      <Contact />
    </>
  )
}
