import styled from 'styled-components'
import { ScanningOutline } from 'antd-mobile-icons'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const Search = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }
  return (
    <>
      <StyledSearchBar>
        <form onSubmit={handleSubmit}>
          <div className='searchbar-scanning-logo'>
            <ScanningOutline fontSize={24} />
          </div>
          <input 
            type="text" 
            name='q'
            placeholder='请搜寻喜欢的宝贝' 
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className='searchbar-button'>
            <button type='submit'>搜索</button>
          </div>
        </form>
      </StyledSearchBar>
    </>
  )
}

export default Search

const StyledSearchBar = styled.div`
  flex: 1;
  form {
    display: flex;
    background: #fff;
    border-radius: 16px;
    text-align: center;
    padding-left: 8px;
    .searchbar-scanning-logo {
      width: 30px;
      align-self: center;
      color: #9E9B98;
    }
    input {
      display: block;
      line-height: 30px;
      flex: 1;
      padding: 0 4px;
      border: 0;
      &:focus {
        outline: 0;
      }
    }
    .searchbar-button {
      width: 60px;
      button {
        font-weight: bold;
        width: 100%;
        line-height: 30px;
        border-radius: 16px;
        background: rgb(225, 37, 27);
        border: 2px solid #fff;
        color: #fff;
        text-align: center;
      }
    }
  }
`