/**
 * Services directory content. Client-editable copy; verify before production publication.
 * The navigation flag must remain false until the corresponding service-detail page
 * is approved, implemented and tested. No placeholder URLs are emitted.
 */
export const ENABLE_SERVICE_PAGE_NAVIGATION = false;

export interface ServiceRecord {
  id: string;
  slug: string;
  title: string;
  description: string;
  route: string;
  image: string;
  imageAlt: string;
  imageIsTemporary: boolean;
  published: boolean;
  detailPageReady: boolean;
}

export const services: ServiceRecord[] = [
  {
    id: '01', slug: 'new-builds', title: 'New Builds',
    description: 'High-quality, bespoke new build projects delivered with attention to detail, functionality and lasting value.',
    route: '/services/new-builds/', image: '/images/services/service-new-builds.webp',
    imageAlt: 'Illustrative modern building exterior', imageIsTemporary: false,
    published: true, detailPageReady: false,
  },
  {
    id: '02', slug: 'house-extensions', title: 'House Extensions',
    description: 'Create additional space and enhance your property with thoughtfully designed and professionally delivered extensions.',
    route: '/services/house-extensions/', image: '/images/extension.webp',
    imageAlt: 'Illustrative house extension with glazed doors', imageIsTemporary: true,
    published: true, detailPageReady: false,
  },
  {
    id: '03', slug: 'loft-conversions', title: 'Loft Conversions',
    description: 'Transform unused roof space into practical, comfortable and beautifully finished living areas.',
    route: '/services/loft-conversions/', image: '/images/loft.webp',
    imageAlt: 'Illustrative loft conversion interior', imageIsTemporary: true,
    published: true, detailPageReady: false,
  },
  {
    id: '04', slug: 'property-renovations', title: 'Property Renovations',
    description: 'Comprehensive renovation solutions to modernise, improve and enhance existing properties.',
    route: '/services/property-renovations/', image: '/images/services/service-renovations.webp',
    imageAlt: 'Illustrative renovated residential interior', imageIsTemporary: false,
    published: true, detailPageReady: false,
  },
  {
    id: '05', slug: 'kitchen-renovations', title: 'Kitchen Renovations',
    description: 'Functional, modern kitchen renovations tailored to the needs and character of your property.',
    route: '/services/kitchen-renovations/', image: '/images/about-interior2.webp',
    imageAlt: 'Illustrative modern residential interior', imageIsTemporary: true,
    published: true, detailPageReady: false,
  },
  {
    id: '06', slug: 'bathroom-renovations', title: 'Bathroom Renovations',
    description: 'Quality bathroom renovations combining practical design, comfort and attention to detail.',
    route: '/services/bathroom-renovations/', image: '/images/renovation.webp',
    imageAlt: 'Illustrative completed residential renovation', imageIsTemporary: true,
    published: true, detailPageReady: false,
  },
  {
    id: '07', slug: 'roofing-and-roof-repairs', title: 'Roofing & Roof Repairs',
    description: 'Roof installations, repairs and maintenance services designed to help protect your property.',
    route: '/services/roofing-and-roof-repairs/', image: '/images/services/service-roofing.webp',
    imageAlt: 'Illustrative close-up of a residential roof', imageIsTemporary: false,
    published: true, detailPageReady: false,
  },
];

export const publishedServices = services.filter((service) => service.published);
export const isServiceLinkEnabled = (service: ServiceRecord) =>
  ENABLE_SERVICE_PAGE_NAVIGATION && service.detailPageReady && service.published;
