import { shallow } from 'enzyme'
import React from 'react'

import HistoryItem from '../history-item'

describe('HistoryItem React component', () => {
  let props
  let mountedItem

  const historyItem = () => {
    if (!mountedItem) {
      mountedItem = shallow(<HistoryItem {...props} />)
    }
    return mountedItem
  }

  beforeEach(() => {
    props = {
      cell: {
        id: 0,
        display: true,
        lastRan: new Date('2018-06-16T10:32:46.422Z'),
        content: 'var a = 3',
      },
      display: true,
    }
    mountedItem = undefined
  })

  it('always renders one div with correct class', () => {
    expect(historyItem().find('div.cell-history-container').length).toBe(1)
  })

  it('always renders div with correct class when display is false', () => {
    props.display = false
    expect(historyItem().find('div.cell-history-container').hasClass('hidden-cell'))
      .toBe(true)
  })

  it('always renders div with correct class when display is true', () => {
    props.display = true
    expect(historyItem().find('div.cell-history-container').hasClass('hidden-cell'))
      .toBe(false)
  })

  it('always renders one div with classes cell and history-cell', () => {
    expect(historyItem().find('div.cell.history-cell').length)
      .toBe(1)
  })

  it('always renders one div with class history-content inside history-cell', () => {
    expect(historyItem().wrap(historyItem().find('div.history-cell'))
      .find('div.history-content')).toHaveLength(1)
  })

  it('always renders one div with class history-date inside history-cell', () => {
    expect(historyItem().wrap(historyItem().find('div.history-cell'))
      .find('div.history-date')).toHaveLength(1)
  })
  // TODO: rewrite this to be looking for pre tags.
  it('always renders one pre inside history-content', () => {
    expect(historyItem().wrap(historyItem().find('pre.history-item-code'))).toHaveLength(1)
  })

  // it("sets the CodeMirror's value prop to be history item's cell's content", () => {
  //   expect(historyItem().find(CodeMirror).props().value)
  //     .toBe(props.cell.content)
  // })

  it('always renders one div with class cell-controls', () => {
    expect(historyItem().find('div.cell-controls').length)
      .toBe(1)
  })
})
