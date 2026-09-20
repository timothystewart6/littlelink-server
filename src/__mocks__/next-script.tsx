import React from 'react'

/**
 * Mock for next/script that renders a plain <script> element so it can be
 * observed in jsdom tests.
 */
export default function Script({
  id,
  src,
  children,
  ...rest
}: {
  id?: string
  src?: string
  children?: React.ReactNode
  [key: string]: unknown
}) {
  return (
    <script id={id} src={src} {...rest}>
      {children}
    </script>
  )
}
