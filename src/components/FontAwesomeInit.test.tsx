import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import FontAwesomeInit from './FontAwesomeInit'

describe('FontAwesomeInit', () => {
  it('renders children', () => {
    const { container } = render(
      <FontAwesomeInit>
        <span>Test</span>
      </FontAwesomeInit>,
    )
    expect(container.querySelector('span')).not.toBeNull()
  })
})
