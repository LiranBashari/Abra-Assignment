import React, { useState} from 'react';
import axios from 'axios';
import { GetAll, Create } from '../Routes';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Home = () => {
  const navigate = useNavigate()
  const toastOptions = {position:"bottom-right", pauseOnHover:true, draggable:true}

  const [formValues, setFormValues] = useState({
      Name:"",
      Color:"",
      Age:"",
  })
  const options = ["Dog", "Cat", "Horse", "Other"];
  const [petType, setPetType] = useState(options[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isValid()){
      // send to server for save in DB
      const {data} = await axios.post(Create, {
        Name: formValues.Name,
        Color: formValues.Color, 
        Age: formValues.Age,
        Type: petType,
      })
      console.log(data.data)
    }
  };

  function isHexadecimal(s) {
    try {
        // Attempt to parse the string as an integer in base 16 (hexadecimal)
        let value = parseInt(s, 16);
        return !isNaN(value); // If successful, the string is hexadecimal
    } catch (e) {
        return false; // If an exception is caught, the string is not hexadecimal
    }
}

  function isValid() {
    const {Name, Color, Age} = formValues;
    if (Name.length > 25 || Name.length < 1) {
      toast.error("Name must be no empty or no more than 25 characters", toastOptions)
      return false;
    } else if (!isHexadecimal(Color)) {
      toast.error("The Color is not hexadecimal", toastOptions)
      return false;
    }
    else if (parseInt(Age) > 20 || parseInt(Age) < 0){
      toast.error("Age must be positive or less than 20", toastOptions)
      return false;
    }
    return true;
  }
  
  function handelChange(event) {
    setFormValues({...formValues, [event.target.name]: event.target.value});
  }

  const handelPetListButton = () => {
    navigate('/petlist')
  }

  return (
    <Container>
      <HeaderContainer>
        <h1>Pet list</h1>
        <button onClick={() => handelPetListButton() }>Pets list</button>
      </HeaderContainer>
      <FormContainer>
          <form onSubmit={(event => handleSubmit(event))}>
              <div className="brand">
                  <h1>Create A New Pet</h1>
              </div>
              <input className="input" type="text" placeholder="Name" name="Name" onChange={(event => handelChange(event))}/>
              <input className="input" type="text" placeholder="Color" name="Color" onChange={(event => handelChange(event))}/>
              <input className="input" type="text" placeholder="Age" name="Age" onChange={(event => handelChange(event))}/>
              <label>please choose your type </label>
              <select placeholder="Please choose a type: " className="select"
                onChange={(e) => setPetType(e.target.value)} defaultValue={petType}>
                <option name = "Dog" value="Dog">Dog</option>
                <option name = "Cat" value="Cat">Cat</option>
                <option name = "Horse" value="Horse">Horse</option>
                <option name = "Other" value="Other">Other</option>
              </select>
              <button type="submit">Create</button>
          </form>
      </FormContainer>
      <ToastContainer/>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #15151c;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px;

  h1 {
    color: white;
    margin: 0;
  }
  button {
    background-color: #b7edfc;
    cursor: pointer;
    padding: 1rem;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight : bold;
    &:hover {
      background-color: rgba(21, 21, 28, 0.46);
    }
  }

`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #15151c;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }

  form {
    max-width: 30rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    background-color: rgba(120, 131, 154, 0.33);
    border-radius: 2rem;
    gap: 1rem;
    padding: 3rem 5rem;
  }
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;

  h1 {
    color: white;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #b7edfc;
    border-radius: 0.4rem;
    font-size: 1rem;
    color: white;
  }
  label{
    color: white
  }
  select {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #b7edfc;
    border-radius: 0.4rem;
    font-size: 1rem;
  }

  button {
    background-color: #b7edfc;
    cursor: pointer;
    padding: 1rem;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight : bold;
    &:hover {
      background-color: rgba(21, 21, 28, 0.46);
    }
  }
  
  p{
    color: white;
    font-family: Cursive,serif;
  }
`;


export default Home;
