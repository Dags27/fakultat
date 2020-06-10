const context = new Map(); // keeps instances of services

export const getService = <T extends any>(Service: new () => T): T => {
  if (context.has(Service)) {
    return context.get(Service);
  }
  const service = new Service();
  context.set(Service, service);
  return service;
};