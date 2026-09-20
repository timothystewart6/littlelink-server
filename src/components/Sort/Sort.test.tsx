import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Sort from './Sort'

describe('Sort', () => {
  it('sorts children in descending order by order prop', () => {
    const { container } = render(
      <Sort>
        <div order={1}>First</div>
        <div order={3}>Third</div>
        <div order={2}>Second</div>
      </Sort>,
    )
    const children = container.querySelectorAll('div')
    expect(children.length).toBe(3)
    // Sorts in descending order (higher order first)
    expect(children[0].textContent).toBe('Third')
    expect(children[1].textContent).toBe('Second')
    expect(children[2].textContent).toBe('First')
  })

  it('puts children without order prop at the end', () => {
    const { container } = render(
      <Sort>
        <div order={3}>Third</div>
        <div>No order</div>
        <div order={1}>First</div>
      </Sort>,
    )
    const children = container.querySelectorAll('div')
    expect(children.length).toBe(3)
    // Children with order prop come first (descending), then those without
    expect(children[0].textContent).toBe('Third')
    expect(children[1].textContent).toBe('First')
    expect(children[2].textContent).toBe('No order')
  })

  it('preserves relative order of children with same order prop', () => {
    const { container } = render(
      <Sort>
        <div order={2}>A</div>
        <div order={2}>B</div>
        <div order={1}>C</div>
      </Sort>,
    )
    const children = container.querySelectorAll('div')
    expect(children.length).toBe(3)
    // Same order prop preserves relative order (stable sort), higher order first
    expect(children[0].textContent).toBe('A')
    expect(children[1].textContent).toBe('B')
    expect(children[2].textContent).toBe('C')
  })
})
