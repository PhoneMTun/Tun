import React from 'react'
import login_form from '../components/form/login_form'
import axios from 'axios';
export default function Loginpage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:5000/user/${id}`)
        .then((res) => {
            console.log(res);
            // setSuccessfull(true);
            navigate('/Home');
        })
        .catch(err => {
            if (err.response) {
                setError(err.response.data.errors);
            }
        });
        
    }


    return (

        <login_form 
            formData={formData} 
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            error={error}
        />

  )
}
