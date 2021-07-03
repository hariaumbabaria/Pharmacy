import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs'
import { useState } from 'react';
import Output from './Output';
import { medicinefinder } from '../service/service';
import axios from 'axios';

const url = 'http://localhost:5000/api';

const district = [
'Ahmedabad','Amreli','Anand','Aravalli','Banaskantha (Palanpur)','Bharuch','Bhavnagar','Botad','Chhota Udepur','Dahod',
'Dangs (Ahwa)','Devbhoomi Dwarka','Gandhinagar','Gir Somnath','Jamnagar','Junagadh','Kachchh','Kheda (Nadiad)','Mahisagar',
'Mehsana','Morbi','Narmada (Rajpipla)','Navsari','Panchmahal','Patan','Porbandar','Rajkot','Sabarkantha','Surat',
'Surendranagar','Tapi','Vadodara','Valsad']

const Search = () => {

    const medicinenameinitial = {
        name: '',
        district: ''
    }

    
    const [medicinename, setMedicinename] = useState(medicinenameinitial);

    const [ clickdone, setClickdone ] = useState(false);

    const [ userdata,setUserdata ] = useState([]);

   
    const [medicinedata, setMedicinedata] = useState([]);

    const medicinefinder = async(medicine) => {
        try {
            axios.get(`${url}/medicine/search`, {'params': {name: medicine.name}})
                 .then((response) => {
                     setMedicinedata(response.data);
                 })
        }
        catch(error) {
            console.log('Error while finding medicine',error);
        }
    }

    const userFinder = (medicine) => {
        try {
            console.log(medicine.username)
            axios.get(`${url}/user/search`,{'params':{name:medicine.username}})
            .then ((res) => {
                setUserdata(res.data);
            })
        }catch(err) {
            console.log('Error while finding User',err);
        }
    }
    
    const onValueChange = (e) => {
        setMedicinename({...medicinename, [e.target.name]: e.target.value });
    }

    const clickhandler = () => {
        setClickdone(true)
        medicinefinder(medicinename)
        userFinder(medicinedata)
        console.log(userdata);
    }

    return (
        <>
            {
                clickdone ? 
                <Output medicine={medicinedata} user={userdata}/>
                :
                <div style={{ display: 'block', 
                width: '35%',
                margin: '100px auto',
                borderRadius: '5px',
                background: 'rgba(255,255,255, 0.15)',
                padding: 30 }}>
                    <h4 style={{color: '#ffffff', marginLeft: '30%', marginBottom: 30}}>
                        <BsSearch style={{color: '#ffffff', fontSize: 20}} className="mr-2"/>
                        Search Medicines
                    </h4>
                    <Form>
                    <Form.Group>
                        <Form.Label style={{fontSize: 20, color: '#ffffff'}}>
                            <span>Enter Medicine Name</span>
                        </Form.Label>
                        <Form.Control type="text" onChange={(e) => onValueChange(e)} value={medicinename.name} name="name" placeholder="Enter Medicine Name"/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label style={{fontSize: 20, color: '#ffffff'}}>Select District Name</Form.Label>
                            <Form.Control onChange={(e) => onValueChange(e)} value={medicinename.district} name="district" as="select">
                            {
                                district.map((dis) => (
                                    <option>{dis}</option>
                                ))
                            }
                            </Form.Control>
                        </Form.Group>
                        <Button onClick={clickhandler} size="lg" variant="success" type="submit" style={{marginLeft: '40%', marginTop: 20}}>
                            Submit
                        </Button>
                    </Form>
                </div>
            }
        </>
    )
}

export default Search;