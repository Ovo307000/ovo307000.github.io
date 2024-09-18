export interface NavItem {
  path: string
  name: string
}

export interface PersonalInfo {
  name: string
  phone: string
  email: string
  github: string
}

export interface Education {
  school: string
  major: string
  period: string
}

export interface Skill {
  category: string
  items: string[]
}

export interface Project {
  name: string
  description: string
  responsibilities: string
  techStack: string[]
  achievements: string[]
  github: string
}
