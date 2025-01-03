import { getProjectEnvVariables } from '@mod/env';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { Resource } from '@opentelemetry/resources';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import {
  ConsoleSpanExporter,
  WebTracerProvider,
} from '@opentelemetry/sdk-trace-web';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';

const { envVariables } = getProjectEnvVariables();

// Create a provider
const provider = new WebTracerProvider({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: envVariables.VITE_SERVICE_NAME,
    [ATTR_SERVICE_VERSION]: envVariables.VITE_SERVICE_VERSION,
  }),
  spanProcessors: [
    // Export traces to Tempo (OTLP)
    new SimpleSpanProcessor(
      new OTLPTraceExporter({
        url:
          window.location.protocol + '//' + window.location.host + '/misc/tp',
      }),
    ),
    new SimpleSpanProcessor(new ConsoleSpanExporter()),
  ],
});

// Register the provider globally
provider.register({
  contextManager: new ZoneContextManager(),
});

// Instrument fetch and XMLHttpRequest
registerInstrumentations({
  instrumentations: [
    // getWebAutoInstrumentations initializes all the package.
    // it's possible to configure each instrumentation if needed.
    getWebAutoInstrumentations({
      '@opentelemetry/instrumentation-fetch': {
        enabled: import.meta.env.PROD,
      },
      '@opentelemetry/instrumentation-document-load': {
        enabled: import.meta.env.PROD,
      },
      '@opentelemetry/instrumentation-xml-http-request': {
        enabled: import.meta.env.PROD,
      },
      '@opentelemetry/instrumentation-user-interaction': {
        enabled: import.meta.env.PROD,
      },
    }),
  ],
});
