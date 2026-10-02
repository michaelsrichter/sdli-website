'use strict';
/**
 * OpenTelemetry setup for Azure Monitor (Application Insights).
 * Enabled only when APPLICATIONINSIGHTS_CONNECTION_STRING is configured.
 */
const { metrics } = require('@opentelemetry/api');
const { logs } = require('@opentelemetry/api-logs');

let enabled = false;
const conn = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;
if (conn) {
  try {
    const { useAzureMonitor } = require('@azure/monitor-opentelemetry');
    useAzureMonitor({
      azureMonitorExporterOptions: { connectionString: conn },
      samplingRatio: 1,
      enableLiveMetrics: false,
      instrumentationOptions: { http: { enabled: true }, azureSdk: { enabled: false } },
    });
    enabled = true;
  } catch (err) {
    console.warn('[telemetry] Azure Monitor OpenTelemetry could not start:', err && err.message);
  }
}

const meter = metrics.getMeter('sdli.web', '1.0.0');
const logger = logs.getLogger('sdli.web', '1.0.0');

const instruments = {
  pageViews: meter.createCounter('sdli.web.page_views', { description: 'Page views (cookieless, anonymous)', unit: '{view}' }),
  interactions: meter.createCounter('sdli.web.interactions', { description: 'Visitor actions such as add to calendar, share and directions', unit: '{action}' }),
  eventViews: meter.createCounter('sdli.web.event_views', { description: 'Event detail page views', unit: '{view}' }),
  consent: meter.createCounter('sdli.web.consent_updates', { description: 'Analytics consent choices', unit: '{choice}' }),
  rejected: meter.createCounter('sdli.telemetry.rejected', { description: 'Telemetry requests rejected by validation or rate limits', unit: '{request}' }),
  cmsAuth: meter.createCounter('sdli.cms.auth', { description: 'Decap CMS GitHub sign-in attempts', unit: '{attempt}' }),
  vitals: {
    LCP: meter.createHistogram('sdli.web.vitals.lcp', { description: 'Largest Contentful Paint', unit: 'ms' }),
    INP: meter.createHistogram('sdli.web.vitals.inp', { description: 'Interaction to Next Paint', unit: 'ms' }),
    CLS: meter.createHistogram('sdli.web.vitals.cls', { description: 'Cumulative Layout Shift x 1000', unit: '1' }),
    FCP: meter.createHistogram('sdli.web.vitals.fcp', { description: 'First Contentful Paint', unit: 'ms' }),
    TTFB: meter.createHistogram('sdli.web.vitals.ttfb', { description: 'Time to First Byte', unit: 'ms' }),
  },
};

/** Emit an Application Insights custom event (customEvents table) through the OpenTelemetry logs API. */
function customEvent(name, attributes) {
  logger.emit({ body: name, attributes: { 'microsoft.custom_event.name': name, ...attributes } });
}

/** Serverless instances may freeze between invocations, so flush after each request (bounded). */
async function flush(timeoutMs = 1500) {
  if (!enabled) return;
  const tasks = [];
  const mp = metrics.getMeterProvider();
  const lp = logs.getLoggerProvider();
  if (mp && typeof mp.forceFlush === 'function') tasks.push(mp.forceFlush());
  if (lp && typeof lp.forceFlush === 'function') tasks.push(lp.forceFlush());
  await Promise.race([Promise.allSettled(tasks), new Promise((r) => setTimeout(r, timeoutMs))]);
}

module.exports = {
  instruments,
  customEvent,
  flush,
  get enabled() {
    return enabled;
  },
};
