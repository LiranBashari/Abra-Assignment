import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GetAll, Create } from '../Routes';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

function PetList() {
  const navigate = useNavigate()

  const [petsList, setPetsLists] = useState([]);
  const [petsNumber, setPetsNumber] = useState(0);
  const [petsAges, setPetsAges] = useState(0);

  const getSumOfAllAges = () =>{
    // lets sum the ages
  }

  useEffect(() => {
    const getPetslist = async () => {
      try {
        const response = await axios.get(GetAll);
        setPetsLists(response.data);
        setPetsNumber(response.data.length)
        setPetsAges(getSumOfAllAges())
      } catch (error) {
        console.error('Error fetching petslists:', error);
      }
    };
    getPetslist();
  }, []);
  

  const handelBackToForm = () => {
    navigate('/')
  }
    
    return (
        <Container>
          <HeaderContainer>
            <h1>Pet list</h1>
            <label>Number of pets: {petsNumber} </label>
            <label>Sum of all ages: {petsAges} </label>
            <button onClick={() => handelBackToForm() }>Go Back</button>
          </HeaderContainer>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Color</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {petsList.map((pet) => (
                <tr key={pet.Id}>
                  <td>{pet.name}</td>
                  <td>{pet.age}</td>
                  <td>{pet.color}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
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
        background-color: #333;
        color: white;
        border: none;
        font-size: large;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        cursor: pointer;
        &:hover {
          background-color: #555;
        }
      }

      label {
        color: white;
      }
    `;
    
    const Table = styled.table`
      width: 100%;
    
      th, td {
        padding: 10px;
        border-bottom: 1px solid #444;
        color: white;
      }
    
      th {
        text-align: left;
      }
    
      td {
        button {
          padding: 5px 10px;
          background-color: #333;
          color: white;
          border: none;
          cursor: pointer;
          gap: 2rem;
          margin-right: 1rem;
          &:hover {
          background-color: #555;
          }
        }
      }
    
      .actions {
        text-align: right;
      }
    `;

export default PetList