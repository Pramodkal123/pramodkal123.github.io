/**
 * VIGOROUS PROPERTY — DEMONSTRATION PORTFOLIO
 * None of the records below represents a verified Vigorous Property commission.
 * Replace with client-approved CMS entries before making the directory public.
 */
export type ProjectType = 'New Builds' | 'Renovations' | 'Extensions' | 'Loft Conversions' | 'Roofing & Roof Repairs';
export type ProjectStatus = 'Completed' | 'In Progress';
export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: ProjectType;
  location: string;
  status: ProjectStatus;
  image: string;
  imageAlt: string;
  galleryImages: string[];
  description: string;
  completedAt: string | null;
  publishApproved: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

/** Do not turn this on until approved individual project routes actually exist. */
export const PROJECT_NAVIGATION_ENABLED = false;
export const PROJECTS_INITIAL_COUNT = 6;

export const projects: PortfolioProject[] = [
  {id:'vp-demo-01',slug:'wimbledon-house-extension',title:'Wimbledon House Extension',category:'Extensions',location:'Wimbledon',status:'Completed',image:'/images/project-extension.webp',imageAlt:'Illustrative image of a contemporary house extension',galleryImages:[],description:'Demonstration project record — not a verified Vigorous Property commission.',completedAt:null,publishApproved:false},
  {id:'vp-demo-02',slug:'richmond-new-build-home',title:'Richmond New Build Home',category:'New Builds',location:'Richmond',status:'Completed',image:'/images/new-build.webp',imageAlt:'Illustrative image of a new-build residence',galleryImages:[],description:'Demonstration project record — not a verified Vigorous Property commission.',completedAt:null,publishApproved:false},
  {id:'vp-demo-03',slug:'clapham-property-renovation',title:'Clapham Property Renovation',category:'Renovations',location:'Clapham',status:'In Progress',image:'/images/project-renovation.webp',imageAlt:'Illustrative contemporary renovated interior',galleryImages:[],description:'Demonstration project record — not a verified Vigorous Property commission.',completedAt:null,publishApproved:false},
  {id:'vp-demo-04',slug:'brixton-loft-conversion',title:'Brixton Loft Conversion',category:'Loft Conversions',location:'Brixton',status:'Completed',image:'/images/project-loft.webp',imageAlt:'Illustrative photograph of a loft conversion',galleryImages:[],description:'Demonstration project record — not a verified Vigorous Property commission.',completedAt:null,publishApproved:false},
  {id:'vp-demo-05',slug:'hampstead-roof-replacement',title:'Hampstead Roof Replacement',category:'Roofing & Roof Repairs',location:'Hampstead',status:'Completed',image:'/images/services/service-roofing.webp',imageAlt:'Illustrative roofing work on a property',galleryImages:[],description:'Demonstration project record — not a verified Vigorous Property commission.',completedAt:null,publishApproved:false},
  {id:'vp-demo-06',slug:'fulham-rear-extension',title:'Fulham Rear Extension',category:'Extensions',location:'Fulham',status:'In Progress',image:'/images/project-extension1.webp',imageAlt:'Illustrative image of a residential extension',galleryImages:[],description:'Demonstration project record — not a verified Vigorous Property commission.',completedAt:null,publishApproved:false},
  {id:'vp-demo-07',slug:'islington-terrace-renovation',title:'Islington Terrace Renovation',category:'Renovations',location:'Islington',status:'Completed',image:'/images/renovation.webp',imageAlt:'Illustrative property renovation photograph',galleryImages:[],description:'Demonstration project record — not a verified Vigorous Property commission.',completedAt:null,publishApproved:false},
  {id:'vp-demo-08',slug:'kingston-new-build-development',title:'Kingston New Build Development',category:'New Builds',location:'Kingston',status:'In Progress',image:'/images/hero-extension1.webp',imageAlt:'Illustrative image of a building project',galleryImages:[],description:'Demonstration project record — not a verified Vigorous Property commission.',completedAt:null,publishApproved:false},
  {id:'vp-demo-09',slug:'croydon-roof-repairs',title:'Croydon Roof Repairs',category:'Roofing & Roof Repairs',location:'Croydon',status:'Completed',image:'/images/services/service-roofing.webp',imageAlt:'Illustrative photograph of roofing work',galleryImages:[],description:'Demonstration project record — not a verified Vigorous Property commission.',completedAt:null,publishApproved:false},
  {id:'vp-demo-10',slug:'ealing-home-extension',title:'Ealing Home Extension',category:'Extensions',location:'Ealing',status:'Completed',image:'/images/extension.webp',imageAlt:'Illustrative image of a home extension',galleryImages:[],description:'Demonstration project record — not a verified Vigorous Property commission.',completedAt:null,publishApproved:false},
];

export const projectCategories: ProjectType[] = ['New Builds','Renovations','Extensions','Loft Conversions','Roofing & Roof Repairs'];
export const projectLocations = [...new Set(projects.map(project => project.location))].sort((a,b) => a.localeCompare(b));
export const futureProjectHref = (project: PortfolioProject) => `/projects/${project.slug}/`;
