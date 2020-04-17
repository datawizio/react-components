import React from 'react'

interface ITest {
  /**
    * Header text
    **/
  header: string,
  /**
   * Body text
   */
  body: string
}

export const Test: React.FC<ITest> = ({header, body}) => {
  return (
    <div>
      <h1>{header}</h1>
      {body}
    </div>
  )
}
