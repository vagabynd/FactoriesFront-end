import React from 'react';

class Home extends React.Component{
    render(){
        console.log(process.env.REACT_APP_API_URL);
        return <h4>Home</h4>;
    }
}
export default Home;