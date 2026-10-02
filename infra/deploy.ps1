<#
.SYNOPSIS
  Repeatable provisioning for the SDLI website. Safe to re-run (idempotent).

.DESCRIPTION
  1. Creates the resource group and deploys infra/main.bicep.
  2. Stores the Static Web Apps deployment token as a GitHub Actions secret (never printed).
  3. Sets GitHub Actions variables (SITE_URL, ALLOW_INDEXING).
  4. Sets Static Web App application settings (Application Insights connection string,
     allowed hosts and, if provided, the GitHub OAuth app credentials for Decap CMS).

.EXAMPLE
  ./infra/deploy.ps1 -Repo michaelsrichter/sdli-website
  ./infra/deploy.ps1 -Repo michaelsrichter/sdli-website -OAuthClientId Iv1.xxxx -OAuthClientSecret (Read-Host -AsSecureString)
#>
param(
  [string]$ResourceGroup = 'rg-sdli-web',
  [string]$Location = 'eastus2',
  [string]$Name = 'swa-sdli-web',
  [Parameter(Mandatory)][string]$Repo,
  [string]$CustomDomain = '',
  [string]$OAuthClientId = '',
  [securestring]$OAuthClientSecret
)
$ErrorActionPreference = 'Stop'

az group create --name $ResourceGroup --location $Location --tags project=sdli-website owner="Swing Dance Long Island" managedBy=bicep --output none
$out = az deployment group create --resource-group $ResourceGroup --name "sdli-$(Get-Date -Format yyyyMMddHHmmss)" `
  --template-file "$PSScriptRoot/main.bicep" --parameters "$PSScriptRoot/main.bicepparam" --parameters staticWebAppName=$Name location=$Location `
  --query properties.outputs --output json | ConvertFrom-Json
$hostName = $out.defaultHostname.value
Write-Host "Static Web App: https://$hostName"

# Deployment token -> GitHub secret, piped so it is never displayed.
az staticwebapp secrets list --name $Name --resource-group $ResourceGroup --query properties.apiKey --output tsv |
  gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN --repo $Repo
$siteUrl = if ($CustomDomain) { "https://$CustomDomain" } else { "https://$hostName" }
gh variable set SITE_URL --repo $Repo --body $siteUrl
gh variable set ALLOW_INDEXING --repo $Repo --body ($(if ($CustomDomain) { 'true' } else { 'false' }))

$settings = @("ALLOWED_HOSTS=$hostName$(if ($CustomDomain) { ",$CustomDomain" })")
if ($out.appInsightsName.value) {
  $conn = az monitor app-insights component show --app $out.appInsightsName.value --resource-group $ResourceGroup --query connectionString --output tsv
  $settings += "APPLICATIONINSIGHTS_CONNECTION_STRING=$conn"
}
if ($OAuthClientId -and $OAuthClientSecret) {
  $plain = [Runtime.InteropServices.Marshal]::PtrToStringBSTR([Runtime.InteropServices.Marshal]::SecureStringToBSTR($OAuthClientSecret))
  $settings += "GITHUB_OAUTH_CLIENT_ID=$OAuthClientId", "GITHUB_OAUTH_CLIENT_SECRET=$plain"
}
az staticwebapp appsettings set --name $Name --resource-group $ResourceGroup --setting-names @settings --output none
Write-Host 'App settings updated (values not shown).'
