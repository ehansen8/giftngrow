import { render } from '@testing-library/react'
import { StatsCard } from '../../../../src/components/tracking/stats/StatsCard'

describe('StatsCard', () => {
  it('renders card value and body text', () => {
    const card = {
      value: 42,
      body: 'States',
    }
    const { getByText } = render(<StatsCard card={card} />)
    expect(getByText(card.value.toString())).toBeInTheDocument()
    expect(getByText(card.body)).toBeInTheDocument()
  })
})
