import React from 'react'
import { SpinLoading } from 'antd-mobile'
import styled from "styled-components"

const Loader = () => {
  return (
    <StyledLoader>
      <SpinLoading style={{ '--size': '48px' }} />
    </StyledLoader>
  )
}

export default Loader

const StyledLoader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`