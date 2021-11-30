export const POST_DASHBOARD_UPDATE = `#graphql
  mutation CreateDashboardSummary($data: DashboardSummaryCreateInput!) {
    createDashboardSummary(data: $data) {
      id
    }
  }
`
