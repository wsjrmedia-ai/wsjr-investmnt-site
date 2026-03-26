import servicesData from '@/data/services.json';

/**
 * Get all services: name, shortDesc, thumbImg + common description
 */
export const getAllServicesOverview = () => {
  const { commonDescription, services } = servicesData;
  return services.map(({ name, shortDesc, thumbImg,url }) => ({
    name,
    shortDesc,
    thumbImg,
    commonDescription,
    url
  }));
};

/**
 * Get full details of a service by name (case-insensitive)
 * @param {string} serviceName
 * @returns {object|null}
 */
export const getServiceDetailsByName = (serviceName) => {
  return servicesData.services.find(
    (service) => service.url.toLowerCase() === serviceName.toLowerCase()
  ) || null;
};

/**
 * Get textWithImage section and template by service name
 * @param {string} serviceName
 * @returns {{ template: string, textWithImageSection: object } | null}
 */
export const getTextWithImageByServiceName = (serviceName) => {
  const service = getServiceDetailsByName(serviceName);
  if (!service) return null;

  return {
    template: service.textWithImageTemplate,
    textWithImageSection: service.textWithImageSection
  };
};

/**
 * Get process section template and process data by service name
 * @param {string} serviceName
 * @returns {{ template: string, processSection: object } | null}
 */
export const getProcessTemplateByServiceName = (serviceName) => {
  const service = getServiceDetailsByName(serviceName);
  if (!service) return null;

  return {
    template: service.processSectionTemplate,
    processSection: service.processSection
  };
};

/**
 * Get only the textWithImageTemplate name by service name
 * @param {string} serviceName
 * @returns {string|null}
 */
export const getImageWithTextTemplateByServiceName = (serviceName) => {
  const service = getServiceDetailsByName(serviceName);
  return service?.textWithImageTemplate || null;
};

export const getProcessTemplateName = (serviceName) => {
  const service = getServiceDetailsByName(serviceName);
  return service?.processSectionTemplate || null;
};

export const getHeroTemplateName = (serviceName) => {
  const service = getServiceDetailsByName(serviceName);
  return service?.herotemplate || null;
};


/**
 * Get whyChooseSection by service name
 * @param {string} serviceName
 * @returns {{ description: string, features: string[] } | null}
 */
export const getWhyChooseSectionByServiceName = (serviceName) => {
  const service = getServiceDetailsByName(serviceName);
  return service?.whyChooseSection || null;
};

/**
 * Get hero section by service name
 * @param {string} serviceName
 * @returns {{ bg: string, header: string, description: string } | null}
 */
export const getHeroSectionByServiceName = (serviceName) => {
  const service = getServiceDetailsByName(serviceName);
  return service?.hero || null;
};

