import { evaluateAllCells, setViewMode } from './actions/actions'
import { getStatePropsFromUrlParams } from './tools/query-param-tools'

export default function handleReportViewModeInitialization(store) {
  const otherParams = getStatePropsFromUrlParams()
  if (otherParams.viewMode === 'REPORT_VIEW') {
    store.dispatch(setViewMode(otherParams.viewMode))
    store.dispatch(evaluateAllCells())
  }
}
