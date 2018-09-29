import React from 'react'
import styled from 'styled-components'
import { slide, scale } from './transitions';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import NewEventMain from './components/Events/newEventMain';
import RegistrationPage from './components/RegistrationPage';
import LoginPage  from './components/LoginPage';

const Wrapper = styled.div`
width: 100vw;
height: 100vh;
position: absolute;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
background-color: ${props => props.color};
`

const Button = styled.button`
background: white;
border: 1px #333;
height: 60px;
font-size: 30px;
border-radius: 5px;
cursor: pointer;
padding: 0 30px;
margin: 10px 30px;
&:focus {
  outline: none;
}
`

const Footer = styled.div`
display: flex;
justify-content: space-between;
width: 300px;
padding: 20px;
`

const Page = ({ history, to, ...props, children }) => (
  <Wrapper {...props}>
    {children}
  </Wrapper>
)

export const registrationPage = (props) => <Page color='#ffec44' to='/yellow' {...props}> <RegistrationPage /> </Page> 
export const homePage = (props) => <Page color='#ffec44' to='/yellow' {...props}> <LandingPage /> </Page> 
export const loginPage = (props) => <Page color='#ffec44' to='/yellow' {...props}> <LoginPage /> </Page> 