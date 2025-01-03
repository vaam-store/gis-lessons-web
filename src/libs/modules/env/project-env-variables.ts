type ProjectEnvVariablesType = Pick<
  ImportMetaEnv,
  'VITE_SERVICE_VERSION' | 'VITE_SERVICE_NAME'
>;

// Environment Variable Template to Be Replaced at Runtime
const projectEnvVariables: ProjectEnvVariablesType = {
  VITE_SERVICE_VERSION: '${VITE_SERVICE_VERSION}',
  VITE_SERVICE_NAME: '${VITE_SERVICE_NAME}',
};

interface ProjectEnvVariables {
  envVariables: ProjectEnvVariablesType;
}

// Returning the variable value from runtime or obtained as a result of the build
export const getProjectEnvVariables = (): ProjectEnvVariables => {
  return {
    envVariables: {
      VITE_SERVICE_NAME: !projectEnvVariables.VITE_SERVICE_NAME.includes(
        'VITE_',
      )
        ? projectEnvVariables.VITE_SERVICE_NAME
        : import.meta.env.VITE_SERVICE_NAME,
      VITE_SERVICE_VERSION: !projectEnvVariables.VITE_SERVICE_VERSION.includes(
        'VITE_',
      )
        ? projectEnvVariables.VITE_SERVICE_VERSION
        : import.meta.env.VITE_SERVICE_VERSION,
    },
  };
};
