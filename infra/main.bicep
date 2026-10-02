// Swing Dance Long Island website infrastructure.
// Deploy:  az deployment group create -g rg-sdli-web -f infra/main.bicep -p infra/main.bicepparam
targetScope = 'resourceGroup'

@description('Azure region for the Static Web App. Static Web Apps is offered in a limited set of regions; East US 2 is closest to Long Island.')
@allowed(['eastus2', 'centralus', 'westus2', 'westeurope', 'eastasia'])
param location string = 'eastus2'

@description('Globally unique name for the Static Web App.')
param staticWebAppName string

@description('Static Web Apps plan. Free covers this site; Standard adds SLA, private endpoints and more custom domains.')
@allowed(['Free', 'Standard'])
param skuName string = 'Free'

@description('Create Log Analytics + Application Insights for OpenTelemetry metrics and events from /api/telemetry.')
param enableMonitoring bool = true

@description('Region for monitoring resources.')
param monitoringLocation string = location

@description('Daily ingestion cap for Log Analytics in GB. Keeps monitoring cost near zero for a small site.')
param logAnalyticsDailyCapGb string = '0.1'

@description('Resource tags.')
param tags object = {
  project: 'sdli-website'
  owner: 'Swing Dance Long Island'
  environment: 'production'
  managedBy: 'bicep'
  costCenter: 'volunteer'
}

resource swa 'Microsoft.Web/staticSites@2024-04-01' = {
  name: staticWebAppName
  location: location
  tags: tags
  sku: {
    name: skuName
    tier: skuName
  }
  properties: {
    // Deployed by GitHub Actions with a deployment token (no repository link needed here).
    allowConfigFileUpdates: true
    stagingEnvironmentPolicy: 'Enabled'
    enterpriseGradeCdnStatus: 'Disabled'
  }
}

resource workspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = if (enableMonitoring) {
  name: 'log-${staticWebAppName}'
  location: monitoringLocation
  tags: tags
  properties: {
    sku: { name: 'PerGB2018' }
    retentionInDays: 30
    workspaceCapping: { dailyQuotaGb: json(logAnalyticsDailyCapGb) }
    features: { enableLogAccessUsingOnlyResourcePermissions: true }
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = if (enableMonitoring) {
  name: 'appi-${staticWebAppName}'
  location: monitoringLocation
  tags: tags
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: workspace.id
    IngestionMode: 'LogAnalytics'
    DisableIpMasking: false
    RetentionInDays: 30
  }
}

output staticWebAppName string = swa.name
output defaultHostname string = swa.properties.defaultHostname
output siteUrl string = 'https://${swa.properties.defaultHostname}'
output appInsightsName string = enableMonitoring ? appInsights.name : ''
output logAnalyticsWorkspaceName string = enableMonitoring ? workspace.name : ''
